import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { allNeighborhoods, regions } from "@/data/neighborhoods";
import { AREA_COLORS, AREA_SHORT, type RegionMapData } from "./RegionMap";

const map: RegionMapData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../public/data/region-map.json"), "utf8"),
);

// The map file is built from neighborhoods.ts by scripts/town-maps/build_region_map.py.
// If a town is added or moved to another area, rerun that script.
describe("region map", () => {
  it("has every town with a guide, in the same area as its guide", () => {
    const onMap = new Map(map.towns.map((t) => [t.slug, t.region]));
    for (const n of allNeighborhoods) {
      expect(onMap.get(n.slug), `${n.name}: rerun scripts/town-maps/build_region_map.py`).toBe(n.region);
    }
    expect(map.towns.length).toBe(allNeighborhoods.length);
  });

  it("has an outline, a color and a short name for every area", () => {
    for (const r of regions.filter((r) => r !== "All")) {
      expect(map.regions.some((m) => m.name === r), r).toBe(true);
      expect(AREA_COLORS[r], r).toBeDefined();
      expect(AREA_SHORT[r], r).toBeDefined();
    }
  });
});
