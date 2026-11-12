"""
Build the one big "all towns" map used on the Neighborhood Guides page and the Contact page.

It is stitched together from the per-town maps that build.py already wrote
(client/public/data/town-maps/<slug>.json), so it needs no shapefile. Every one of those files
comes from the same simplified MassGIS coverage, but each sits in its own little frame. A town's
outline is identical in its own file and in a neighbor's file, up to a scale and a shift, so we
match those vertices to place every file on one shared frame, starting from Bedford.

Writes client/public/data/region-map.json:
  towns:   every town with a guide: slug, name, region, SVG path, label spot
  context: the bordering towns without a guide, drawn faintly around the edge
  regions: each area's outline and a zoom box (viewBox) that frames it

Run it again whenever a town is added or moved to another area (the regions come from
client/src/data/neighborhoods.ts; a test fails if this file and that one disagree):

    pip install shapely numpy
    python3 scripts/town-maps/build_region_map.py
"""
import json
import math
import re
from collections import defaultdict, deque
from pathlib import Path

import numpy as np
import shapely
import shapely.ops
from shapely import affinity
from shapely.geometry import Polygon

ROOT = Path(__file__).resolve().parents[2]
TOWN_MAPS = ROOT / "client/public/data/town-maps"
OUT = ROOT / "client/public/data/region-map.json"
START = "bedford"
VIEW_W = 1000.0


def towns_and_regions():
    src = (ROOT / "client/src/data/neighborhoods.ts").read_text()
    out = {}
    for block in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r'slug: "([^"]+)"', block)
        region = re.search(r'region: "([^"]+)"', block)
        name = re.search(r'name: "([^"]+)"', block)
        if slug and region and name:
            out[slug[1]] = (name[1], region[1])
    return out


def parse(d):
    rings, cur = [], []
    for cmd, x, y in re.findall(r"([MLZ])?\s*(-?[\d.]+)[ ,](-?[\d.]+)", d):
        if cmd == "M" and cur:
            rings.append(cur)
            cur = []
        cur.append((float(x), float(y)))
    if cur:
        rings.append(cur)
    return [np.array(r) for r in rings]


def on_edge(pt, w, h, eps=0.2):
    return pt[0] < eps or pt[1] < eps or abs(pt[0] - w) < eps or abs(pt[1] - h) < eps


def fit(src_rings, dst_rings, w, h):
    """Scale s and shift t with dst = s*src + t, found by matching edges that point the same way."""
    src = np.vstack(src_rings)
    dst = np.vstack(dst_rings)
    dst_in = np.array([q for q in dst if not on_edge(q, w, h)])  # skip points where the frame clipped the town
    if len(dst_in) < 3:
        return None
    src_edges = [(r[i], r[i + 1]) for r in src_rings for i in range(len(r) - 1)]
    dst_edges = [(r[i], r[i + 1]) for r in dst_rings for i in range(len(r) - 1)
                 if not on_edge(r[i], w, h) and not on_edge(r[i + 1], w, h)]
    best = (0, None)
    for a0, a1 in src_edges:
        va = a1 - a0
        la = np.hypot(*va)
        if la < 1:
            continue
        ang = math.atan2(va[1], va[0])
        for b0, b1 in dst_edges:
            vb = b1 - b0
            lb = np.hypot(*vb)
            if lb < 1 or abs((math.atan2(vb[1], vb[0]) - ang + math.pi) % (2 * math.pi) - math.pi) > 0.02:
                continue
            s = lb / la
            proj = src * s + (b0 - s * a0)
            n = int((np.min(np.linalg.norm(dst_in[:, None, :] - proj[None, :, :], axis=2), axis=1) < 0.35).sum())
            if n > best[0]:
                best = (n, (s, b0 - s * a0))
    if best[0] < max(4, 0.6 * len(dst_in)):
        return None
    s, t = best[1]
    dd = np.linalg.norm(dst_in[:, None, :] - (src * s + t)[None, :, :], axis=2)
    ok = dd.min(1) < 0.35
    A, B = src[dd.argmin(1)[ok]], dst_in[ok]
    M = np.zeros((2 * len(A), 3))
    y = np.zeros(2 * len(A))
    M[0::2, 0], M[0::2, 1], y[0::2] = A[:, 0], 1, B[:, 0]
    M[1::2, 0], M[1::2, 2], y[1::2] = A[:, 1], 1, B[:, 1]
    (s, tx, ty), *_ = np.linalg.lstsq(M, y, rcond=None)
    return s, np.array([tx, ty])


def poly(rings):
    return shapely.make_valid(shapely.union_all([Polygon(r).buffer(0) for r in rings if len(r) >= 3]))


def svg_path(g, tol):
    g = g.simplify(tol)
    out = []
    for p in getattr(g, "geoms", [g]):
        if p.geom_type != "Polygon" or p.is_empty:
            continue
        for ring in [p.exterior, *p.interiors]:
            c = list(ring.coords)[:-1]
            if len(c) >= 3:
                out.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in c) + "Z")
    return "".join(out)


def main():
    pages = towns_and_regions()
    files = {p.stem: json.loads(p.read_text()) for p in sorted(TOWN_MAPS.glob("*.json"))}

    def self_shape(slug):
        return next(s for s in files[slug]["shapes"] if s["self"])

    # Place every file on Bedford's frame, one neighbor at a time
    T = {START: (1.0, np.zeros(2))}
    queue = deque([START])
    while queue:
        a = queue.popleft()
        sa, ta = T[a]
        for sh in files[a]["shapes"]:
            b = sh.get("slug")
            if sh["self"] or not b or b not in files or b in T:
                continue
            r = fit(parse(self_shape(b)["d"]), parse(sh["d"]), files[a]["w"], files[a]["h"])
            if r:
                s, t = r
                T[b] = (sa * s, sa * t + ta)
                queue.append(b)
    def placed(rings, slug):
        s, t = T[slug]
        return [r * s + t for r in rings]

    # A town whose own file can't be matched to its neighbors' (Berlin: its map was built from its
    # neighbors' maps, not the shapefile) is drawn from the copies of it in those neighbors' maps instead
    missing = sorted(set(files) - set(T))
    pieces = defaultdict(list)
    for slug in T:
        for sh in files[slug]["shapes"]:
            if not sh["self"] and (sh.get("slug") not in T):
                pieces[sh.get("slug") or sh["name"]].append(poly(placed(parse(sh["d"]), slug)))
    unplaced = [m for m in missing if not pieces.get(m)]
    if unplaced:
        raise SystemExit(f"Could not place: {unplaced}")
    if missing:
        print(f"drawn from neighbors' maps: {missing}")

    guides = {slug: poly(placed(parse(self_shape(slug)["d"]), slug)) for slug in T}
    for m in missing:
        guides[m] = shapely.union_all(pieces[m])
    ctx = {k: v for k, v in pieces.items() if k not in files}

    # One frame for the whole map, 1000 units wide
    allu = shapely.union_all(list(guides.values()))
    minx, miny, maxx, maxy = allu.bounds
    pad = 0.04 * max(maxx - minx, maxy - miny)
    minx, miny, maxx, maxy = minx - pad, miny - pad, maxx + pad, maxy + pad
    k = VIEW_W / (maxx - minx)
    W, H = VIEW_W, (maxy - miny) * k
    frame = lambda g: affinity.affine_transform(g, [k, 0, 0, k, -minx * k, -miny * k])
    guides = {s: frame(g) for s, g in guides.items()}
    allu = shapely.union_all(list(guides.values()))
    edge = allu.buffer(45, join_style="round")

    towns, by_region = [], defaultdict(list)
    for slug, g in sorted(guides.items(), key=lambda kv: pages[kv[0]][0]):
        name, region = pages[slug]
        by_region[region].append(g)
        parts = [p for p in getattr(g, "geoms", [g]) if p.geom_type == "Polygon"]
        main_part = max(parts, key=lambda p: p.area)
        spot = shapely.ops.polylabel(main_part, 0.5)
        towns.append({"slug": slug, "name": name, "region": region, "d": svg_path(g, 0.3),
                      "x": round(spot.x, 1), "y": round(spot.y, 1)})

    context = []
    for g in ctx.values():
        c = frame(shapely.union_all(g)).difference(allu.buffer(0.5)).intersection(edge)
        if c.area > 4:
            context.append(svg_path(c, 0.6))

    regions = []
    aspect = W / H
    for region, gs in by_region.items():
        u = shapely.union_all(gs).buffer(0.4).buffer(-0.4)
        parts = [p for p in getattr(u, "geoms", [u]) if p.geom_type == "Polygon"]
        biggest = max(p.area for p in parts)
        x0, y0, x1, y1 = shapely.union_all([p for p in parts if p.area > 0.05 * biggest]).bounds  # ignore harbor islands
        pad = 0.06 * max(x1 - x0, y1 - y0)
        x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
        bw, bh = x1 - x0, y1 - y0
        if bw / bh < aspect:  # same shape as the full map, so the map box never changes size when zooming
            x0 -= (bh * aspect - bw) / 2
            bw = bh * aspect
        else:
            y0 -= (bw / aspect - bh) / 2
            bh = bw / aspect
        regions.append({"name": region, "outline": svg_path(u, 0.6),
                        "zoom": [round(x0, 1), round(y0, 1), round(bw, 1), round(bh, 1)]})

    OUT.write_text(json.dumps({"w": W, "h": round(H, 1), "towns": towns, "context": context, "regions": regions},
                              separators=(",", ":")))
    print(f"wrote {OUT.relative_to(ROOT)}: {len(towns)} towns, {len(regions)} areas, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
