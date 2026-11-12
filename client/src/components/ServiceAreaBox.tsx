import { useState } from "react";
import { Link } from "wouter";
import RegionMap, { AREA_COLORS, useCanHover, useRegionMap } from "./RegionMap";
import { allNeighborhoods, regions } from "@/data/neighborhoods";

/**
 * Contact page "Service Area" box: the area map plus every town with a guide, listed under its area.
 * The lists come straight from neighborhoods.ts, so they always match the guides page.
 */
export default function ServiceAreaBox() {
  const data = useRegionMap();
  const canHover = useCanHover();
  const [area, setArea] = useState<string | null>(null);
  const [town, setTown] = useState<string | null>(null);
  const areas = regions.filter((r) => r !== "All");

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-[#0D2137] mb-2">Service Area</h3>
      <p className="text-base text-gray-500 font-body mb-5">
        Will serves buyers and sellers across Greater Boston and MetroWest.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-5 items-start">
        <div className="bg-[#F7F8FA] rounded-xl p-2 md:sticky md:top-24">
          {data ? (
            <RegionMap
              data={data}
              area={area ?? "All"}
              activeSlug={town}
              onHover={setTown}
              label="Map of the towns Will serves, colored by area"
            />
          ) : (
            <div className="aspect-square" aria-hidden="true" />
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5">
          {areas.map((r) => {
            const towns = allNeighborhoods.filter((n) => n.region === r).sort((a, b) => a.name.localeCompare(b.name));
            return (
              <div
                key={r}
                onMouseEnter={canHover ? () => setArea(r) : undefined}
                onMouseLeave={canHover ? () => setArea(null) : undefined}
                className="rounded-xl p-3 transition-colors"
                style={{ background: area === r ? AREA_COLORS[r]?.fill : "#F4F6F8" }}
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0D2137] font-body uppercase tracking-wide mb-1">
                  <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: AREA_COLORS[r]?.dot }} />
                  {r}
                </p>
                <p className="text-sm text-gray-500 font-body leading-relaxed">
                  {towns.map((n, i) => (
                    <span key={n.slug}>
                      <Link
                        href={`/neighborhoods/${n.slug}`}
                        onMouseEnter={canHover ? () => setTown(n.slug) : undefined}
                        onMouseLeave={canHover ? () => setTown(null) : undefined}
                        className="hover:text-[#0D2137] hover:underline"
                      >
                        {n.name}
                      </Link>
                      {i < towns.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Link href="/neighborhoods" className="mt-4 inline-block text-sm text-[#0D2137] font-semibold font-body hover:underline">
        Explore the neighborhood guides →
      </Link>
    </div>
  );
}
