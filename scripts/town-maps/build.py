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
import math
import re
import sys
from pathlib import Path

import shapefile
import shapely
from shapely import affinity
from shapely.geometry import Point, box, shape
from shapely.ops import polylabel

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "client/public/data/town-maps"
VIEW_W = 400            # SVG units across; heights follow the map's shape
ASPECT = 4 / 5          # height / width of the map box
PAD = 0.42              # padding around the town, as a share of its larger side
PAD_BY_TOWN = {"boston": 0.02}
NEIGHBOR_STRIP_M = 1800  # meters of each bordering town to keep in a tight frame  # Boston is big: zoom in so the towns along its border are readable
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
        # Frame the map on the town's mainland: leave out small islands (Boston Harbor, Quincy Bay)
        parts = [p for p in getattr(town, "geoms", [town]) if p.geom_type == "Polygon"]
        biggest_part = max(p.area for p in parts)
        core = shapely.union_all([p for p in parts if p.area >= biggest_part * 0.02])
        if slug in PAD_BY_TOWN:
            # Tight frame for a big city, widened just enough to show a strip of every town on its border
            near = [simple[j].intersection(core.buffer(NEIGHBOR_STRIP_M)) for j in map(int, tree.query(core.buffer(10))) if j != i]
            core = shapely.union_all([core, *near])
        minx, miny, maxx, maxy = core.bounds
        cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
        side = max(maxx - minx, (maxy - miny) / ASPECT)
        w = side * (1 + 2 * PAD_BY_TOWN.get(slug, PAD))
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

        def to_svg(g):
            return affinity.affine_transform(g, [scale, 0, 0, -scale, -(cx - w / 2) * scale, (cy + h / 2) * scale])

        def options(name, is_self, long_angle, borders):
            """Label layouts to try, best first: big and level, then turned along the town, then smaller."""
            line_sets = [[name]]
            if " " in name:
                line_sets.append(name.split(" ", 1))
            elif "-" in name:
                first, rest = name.split("-", 1)
                line_sets.append([first + "-", rest])
            angles = [0] + sorted({a for a in (long_angle, -long_angle, 90, -60, 60, -30, 30) if abs(a) > 8}, key=lambda a: (a != long_angle, abs(a)))
            tiers = ([17, 15], [14, 13], [12, 11]) if is_self else ([13, 12], [11, 10], [9]) if borders else ([13, 12], [11, 10])
            for tier in tiers:
                for angle in angles:
                    for size in tier:
                        for lines in line_sets:
                            if angle and len(lines) > 1:
                                continue  # turned labels stay on one line
                            yield size, angle, lines

        def label_rect(x, y, size, angle, lines):
            tw = max(len(l) for l in lines) * size * 0.6 + 4
            th = len(lines) * size * 1.12
            r = box(x - tw / 2, y - th / 2, x + tw / 2, y + th / 2)
            return affinity.rotate(r, angle, origin=(x, y)) if angle else r

        def spots(gs):
            """Points well inside the shape, roomiest first."""
            polys = [p for p in getattr(gs, "geoms", [gs]) if p.geom_type == "Polygon" and not p.is_empty]
            if not polys:
                return []
            pts = [polylabel(max(polys, key=lambda p: p.area), tolerance=0.5)]
            x0, y0, x1, y1 = gs.bounds
            step = max(3.0, min(x1 - x0, y1 - y0) / 12)
            y = y0 + step / 2
            while y < y1:
                x = x0 + step / 2
                while x < x1:
                    pt = Point(x, y)
                    if gs.contains(pt):
                        pts.append(pt)
                    x += step
                y += step
            bnd = gs.boundary
            pts.sort(key=lambda pt: -bnd.distance(pt))
            return pts[:40]

        out_shapes, placed = [], []
        has_page = lambda j: by_name.get(names[j].upper()) is not None
        touching = lambda j: j != i and simple[j].boundary.intersection(town.buffer(5)).length > 100
        # Label the town itself first, then the towns that border it, then the rest; pages before non-pages
        # Within each group, the tightest towns go first: bigger towns have more room to place their names around them
        order = sorted(shapes, key=lambda js: (js[0] != i, not touching(js[0]), not has_page(js[0]), js[1].area))
        for j, g in order:
            other_slug = by_name.get(names[j].upper())
            nice = names[j].title().replace("'S", "'s")
            gs = to_svg(g)
            inner = gs.buffer(-1.5)
            shapely.prepare(inner)
            mrr = gs.minimum_rotated_rectangle
            c = list(mrr.exterior.coords)
            e1, e2 = (c[1][0] - c[0][0], c[1][1] - c[0][1]), (c[2][0] - c[1][0], c[2][1] - c[1][1])
            ex, ey = e1 if (e1[0] ** 2 + e1[1] ** 2) >= (e2[0] ** 2 + e2[1] ** 2) else e2
            long_angle = round(math.degrees(math.atan2(ey, ex)))
            long_angle = ((long_angle + 90) % 180) - 90  # keep text reading left to right
            cand = spots(gs)
            label = None
            for size, angle, lines in options(nice, j == i, long_angle, touching(j)):
                for pt in cand:
                    r = label_rect(pt.x, pt.y, size, angle, lines)
                    if inner.contains(r) and not any(r.intersects(q) for q in placed):
                        label = {"x": round(pt.x, 1), "y": round(pt.y, 1), "size": size, "angle": angle, "lines": lines}
                        placed.append(r.buffer(1.5))
                        break
                if label:
                    break
            if label is None and j != i and touching(j) and other_slug and cand:
                # A bordering town with a page should always be findable: center its name on the town at a
                # small size, letting it run a little past the border rather than leaving it unlabeled
                view_svg = box(0, 0, VIEW_W, vh)
                for angle in (long_angle, 0):
                    for pt in cand:
                        r = label_rect(pt.x, pt.y, 10, angle, [nice])
                        if view_svg.buffer(-1).contains(r) and not any(r.intersects(q) for q in placed) and r.intersection(gs).area > r.area * 0.5:
                            label = {"x": round(pt.x, 1), "y": round(pt.y, 1), "size": 10, "angle": angle, "lines": [nice]}
                            placed.append(r.buffer(1.5))
                            break
                    if label:
                        break
            if label is None and j == i and cand:
                # The town itself always gets its name, even if it has to spill over its border a little
                pt = cand[0]
                label = {"x": round(pt.x, 1), "y": round(pt.y, 1), "size": 12, "angle": 0, "lines": [nice]}
                placed.append(label_rect(pt.x, pt.y, 12, 0, [nice]).buffer(1.5))
            out_shapes.append({
                "name": nice,
                "slug": other_slug if j != i else slug,
                "self": j == i,
                "neighbor": bool(touching(j)),
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
