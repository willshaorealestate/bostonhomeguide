import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { X, ArrowRight } from "lucide-react";
import RegionMap, { AREA_COLORS, AREA_SHORT, useCanHover, type RegionMapData } from "./RegionMap";
import { allNeighborhoods, regions, type Neighborhood } from "@/data/neighborhoods";

export function townRank(n: Neighborhood) {
  if (n.schoolRanks.length) return n.schoolRanks.map((r) => `#${r}`).join(" & ");
  return n.highSchool.startsWith("Boston Public Schools") ? "Varies" : "Not listed";
}

type Props = {
  open: boolean;
  onClose: () => void;
  data: RegionMapData | null | undefined;
  area: string;
  onArea: (area: string) => void;
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  onPick: (slug: string) => void;
  countLabel: string;
};

/**
 * The map that slides out from the right on the Neighborhood Guides page.
 * Desktop: hovering the map previews a town, hovering a photo card lights it up on the map.
 * Phones: full screen; picking an area zooms the map in so towns are big enough to tap,
 * with a list of that area's towns under it, and a tap shows a preview before opening a guide.
 */
export default function TownMapDrawer({ open, onClose, data, area, onArea, activeSlug, onHover, onPick, countLabel }: Props) {
  const canHover = useCanHover();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // On phones the preview can be off screen when a town is tapped in the list below it
  useEffect(() => {
    if (open && activeSlug && !canHover) previewRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [open, activeSlug, canHover]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const active = activeSlug ? allNeighborhoods.find((n) => n.slug === activeSlug) : undefined;
  const areaTowns = area === "All" ? [] : allNeighborhoods.filter((n) => n.region === area).sort((a, b) => a.name.localeCompare(b.name));
  const hint = canHover
    ? "Hover a town on the map to preview it, or hover a photo to see where the town is."
    : area === "All"
      ? "Tap an area above to zoom in, then tap a town to preview it."
      : "Tap a town on the map or in the list below.";

  return (
    <aside
      id="town-map"
      aria-label="Town map"
      inert={!open}
      className={`fixed inset-y-0 right-0 z-[60] w-full sm:w-[min(560px,100%)] bg-[#F7F8FA] overflow-y-auto [scrollbar-gutter:stable] shadow-[-16px_0_40px_rgba(13,33,55,0.18)] transition-[transform,visibility] duration-300 ${
        open ? "translate-x-0 visible" : "translate-x-full invisible"
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-white border-b border-gray-100">
        <div>
          <p className="text-lg font-bold text-[#0D2137] leading-tight">Town map</p>
          <p className="text-sm text-gray-500 font-body">{countLabel}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close map"
          className="w-11 h-11 shrink-0 rounded-full border border-gray-200 bg-white text-[#0D2137] flex items-center justify-center hover:border-[#0D2137] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3.5 sm:px-5 pt-4 pb-24 flex flex-col gap-3.5">
        <div role="group" aria-label="Zoom the map to an area" className="flex flex-wrap gap-1.5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={area === r}
              onClick={() => onArea(r)}
              className={`inline-flex items-center gap-1.5 min-h-11 px-2.5 sm:px-3.5 rounded-full text-sm font-semibold font-body border transition-colors ${
                area === r ? "bg-[#0D2137] text-white border-[#0D2137]" : "bg-white text-[#0D2137] border-gray-200 hover:border-[#0D2137]"
              }`}
            >
              {r !== "All" && <span aria-hidden="true" className="w-2 h-2 rounded-full shrink-0" style={{ background: AREA_COLORS[r]?.dot }} />}
              {AREA_SHORT[r] ?? r}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-2 sm:p-2.5">
          {data ? (
            <RegionMap
              data={data}
              area={area}
              activeSlug={activeSlug}
              zoomToArea
              onHover={onHover}
              onSelect={onPick}
              className="w-full h-auto sm:max-h-[max(320px,calc(100dvh-430px))]"
              label="Map of Will's town guides, colored by area"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center text-sm text-gray-400 font-body">
              {data === null ? "The map couldn't load. Try again in a moment." : "Loading map…"}
            </div>
          )}
        </div>

        {active ? (
          <div ref={previewRef} className="bg-white border border-gray-100 rounded-2xl p-3.5 flex flex-wrap items-center gap-4 scroll-mt-24">
            <img src={active.img} alt={active.name} className="w-full sm:w-[168px] aspect-video sm:aspect-auto sm:h-[126px] object-cover rounded-xl" />
            <div className="flex-1 basis-full sm:basis-[170px] min-w-0">
              <p className="text-2xl font-bold text-[#0D2137] leading-tight mb-2">{active.name}</p>
              <ul className="space-y-1 text-[15px] text-gray-600 font-body">
                <li><span className="font-bold text-[#0D2137]">{active.medianPrice}</span> {active.priceSource ? "median sale" : "avg. home value"}</li>
                <li><span className="font-bold text-[#0D2137]">{townRank(active)}</span> high school</li>
                <li><span className="font-bold text-[#0D2137]">{Math.round(active.commuteMinutes)} min</span> avg. commute</li>
              </ul>
            </div>
            <Link
              href={`/neighborhoods/${active.slug}`}
              className="flex-1 basis-full sm:basis-auto sm:grow-0 inline-flex items-center justify-center gap-2 min-h-[52px] px-5 rounded-xl bg-[#0D2137] text-white font-semibold font-body hover:bg-[#1A3A5C] transition-colors"
            >
              Open guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <p className="bg-white border border-gray-100 rounded-2xl px-5 py-4 text-base text-gray-600 font-body">{hint}</p>
        )}

        {areaTowns.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-1.5 grid grid-cols-2 gap-0.5">
            {areaTowns.map((n) => (
              <button
                key={n.slug}
                type="button"
                onClick={() => onPick(n.slug)}
                onMouseEnter={canHover ? () => onHover(n.slug) : undefined}
                onMouseLeave={canHover ? () => onHover(null) : undefined}
                className={`flex items-center gap-2.5 min-h-11 px-3 rounded-lg text-left text-[15px] font-body text-[#0D2137] transition-colors hover:bg-[#F4F6F8] ${
                  n.slug === activeSlug ? "bg-[#EEF1F5] font-bold" : "font-medium"
                }`}
              >
                <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: AREA_COLORS[n.region]?.dot }} />
                {n.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
