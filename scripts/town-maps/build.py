"""
Build the little "nearby towns" map for each town page.

Reads the MassGIS town boundaries (TOWNSSURVEY_POLYM shapefile, Massachusetts State Plane, meters)
and writes client/public/data/town-maps/<slug>.json: the town plus every town around it, as SVG paths
in a small local coordinate box, with a label spot for each town big enough to label.

Shared borders are simplified together (shapely.coverage_simplify), so neighbors still meet cleanly.
This is a one-off build step, not part of the site build. Run it again only if the town list changes:

    pip install pyshp shapely
    python3 scripts/town-maps/build.py <path to TOWNSSURVEY_POLYM (no extension)>

Boundary data: MassGIS (Bureau of Geographic Information), Municipalities / TOWNSSURVEY.
"""
import json
import re
import sys
from pathlib import Path

import shapefile
import shapely
from shapely.geometry import box, shape
from shapely.ops import polylabel

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "client/public/data/town-maps"
VIEW_W = 400            # SVG units across; heights follow the map's shape
ASPECT = 4 / 5          # height / width of the map box
PAD = 0.42              # padding around the town, as a share of its larger side
SIMPLIFY_M = 35         # meters: plenty of detail at sidebar size, small files
MIN_LABEL_R = 15        # SVG units: a town needs at least this much room inside to get a label

# Town pages whose map is skipped: Allston-Brighton is part of Boston, so it has no town boundary
SKIP = {"allston-brighton"}


def page_towns():
    src = (ROOT / "client/src/data/neighborhoods.ts").read_text()
    pairs = re.findall(r'slug: "([^"]+)",\s*\n\s*name: "([^"]+)"', src)
    if not pairs:  # name may come before slug
        pairs = [(s, n) for n, s in re.findall(r'name: "([^"]+)",\s*\n\s*slug: "([^"]+)"', src)]
    return {slug: name for slug, name in pairs}


def main(shp_path):
    pages = page_towns()
    by_name = {name.upper(): slug for slug, name in pages.items()}

    reader = shapefile.Reader(shp_path)
    names, geoms = [], []
    for sr in reader.iterShapeRecords():
        names.append(sr.record["TOWN"].strip())
        geoms.append(shapely.make_valid(shape(sr.shape.__geo_interface__)))
    simple = list(shapely.coverage_simplify(geoms, SIMPLIFY_M, simplify_boundary=True))
    tree = shapely.STRtree(simple)

    OUT.mkdir(parents=True, exist_ok=True)
    written = 0
    for slug, name in sorted(pages.items()):
        if slug in SKIP:
            continue
        try:
            i = names.index(name.upper())
        except ValueError:
            print(f"!! no boundary for {name}")
            continue
        town = simple[i]
        minx, miny, maxx, maxy = town.bounds
        cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
        side = max(maxx - minx, (maxy - miny) / ASPECT)
        w = side * (1 + 2 * PAD)
        h = w * ASPECT
        view = box(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
        scale = VIEW_W / w
        vh = round(h * scale)

        def to_xy(x, y):
            return (x - (cx - w / 2)) * scale, ((cy + h / 2) - y) * scale

        def path(g):
            parts = []
            polys = [g] if g.geom_type == "Polygon" else [p for p in getattr(g, "geoms", []) if p.geom_type == "Polygon"]
            for poly in polys:
                for ring in [poly.exterior, *poly.interiors]:
                    pts = [to_xy(x, y) for x, y in ring.coords[:-1]]
                    out, last = [], None
                    for x, y in pts:
                        p = (round(x, 1), round(y, 1))
                        if p != last:
                            out.append(p)
                            last = p
                    if len(out) >= 3:
                        parts.append("M" + "L".join(f"{x:g},{y:g}" for x, y in out) + "Z")
            return "".join(parts)

        shapes = []
        for j in map(int, tree.query(view)):
            if j == i:
                continue
            part = simple[j].intersection(view)
            if part.is_empty or part.area < (w * h) * 0.002:
                continue
            shapes.append((j, part))
        shapes.append((i, town))  # the town itself last, so it draws on top

        def text_box(name, is_self):
            # Same line-splitting rule as the TownMap component; rough DM Sans widths
            size = 17 if is_self else 13
            lines = [name] if (is_self or len(name) <= 9 or " " not in name) else name.split(" ", 1)
            return max(len(l) for l in lines) * size * 0.6 + 6, len(lines) * size * 1.15 + 2

        out_shapes, placed = [], []
        # Label the town itself first, then towns with pages, then the rest, biggest first
        order = sorted(shapes, key=lambda js: (js[0] != i, by_name.get(names[js[0]].upper()) is None, -js[1].area))
        for j, g in order:
            other_slug = by_name.get(names[j].upper())
            nice = names[j].title().replace("'S", "'s")
            tw, th = text_box(nice, j == i)
            label = None
            # Keep the whole label inside the map: only look for a spot in the part of the town
            # at least half a label away from the map's edges
            inset = box(cx - w / 2 + tw / 2 / scale, cy - h / 2 + th / 2 / scale, cx + w / 2 - tw / 2 / scale, cy + h / 2 - th / 2 / scale)
            room_part = g.intersection(inset)
            polys = [p for p in getattr(room_part, "geoms", [room_part]) if p.geom_type == "Polygon" and not p.is_empty]
            if polys:
                biggest = max(polys, key=lambda p: p.area)
                spot = polylabel(biggest, tolerance=10)
                room = g.boundary.distance(spot) * scale
                if room >= max(MIN_LABEL_R, th / 2) or j == i:
                    lx, ly = to_xy(spot.x, spot.y)
                    rect = (lx - tw / 2, ly - th / 2, lx + tw / 2, ly + th / 2)
                    if j == i or not any(rect[0] < r[2] and rect[2] > r[0] and rect[1] < r[3] and rect[3] > r[1] for r in placed):
                        placed.append(rect)
                        label = [round(lx, 1), round(ly, 1)]
            touches = j != i and simple[j].boundary.intersection(town.buffer(5)).length > 100
            out_shapes.append({
                "name": nice,
                "slug": other_slug if j != i else slug,
                "self": j == i,
                "neighbor": bool(touches),
                "d": path(g),
                "label": label,
                "_j": j,
            })
        # Draw order: neighbors first, the town itself last (on top)
        out_shapes.sort(key=lambda o: o["_j"] == i)
        for o in out_shapes:
            del o["_j"]
        (OUT / f"{slug}.json").write_text(json.dumps({"w": VIEW_W, "h": vh, "shapes": out_shapes}, separators=(",", ":")))
        written += 1
    print(f"wrote {written} maps to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1])
