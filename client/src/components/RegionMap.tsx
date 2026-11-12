import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * The map of every town with a guide, colored by area. Used in the slide-out map on the
 * Neighborhood Guides page and in the Service Area box on the Contact page.
 * The map file is made by scripts/town-maps/build_region_map.py from the per-town maps and
 * served from /data/region-map.json (~40 KB gzipped), so it stays out of the JS bundle and
 * only loads when a map is shown.
 */
export type RegionMapTown = { slug: string; name: string; region: string; d: string; x: number; y: number };
export type RegionMapArea = { name: string; outline: string; zoom: [number, number, number, number] };
export type RegionMapData = { w: number; h: number; towns: RegionMapTown[]; context: string[]; regions: RegionMapArea[] };

/** Area colors: a light fill for the map and a stronger dot color for chips and legends */
export const AREA_COLORS: Record<string, { fill: string; dot: string }> = {
  "Boston & Inner Suburbs": { fill: "#C3D3E9", dot: "#5B7FB0" },
  "North of Boston": { fill: "#D8CFE8", dot: "#7D68A6" },
  "Northwest of Boston": { fill: "#C9DFCC", dot: "#4F8A5B" },
  "West of Boston": { fill: "#EBDDB5", dot: "#A88433" },
  "Southwest of Boston": { fill: "#EFCDBE", dot: "#B5654A" },
  "South of Boston": { fill: "#C3E0E2", dot: "#3E8A90" },
};

/** Short area names for small screens */
export const AREA_SHORT: Record<string, string> = {
  All: "All",
  "Boston & Inner Suburbs": "Inner",
  "North of Boston": "North",
  "Northwest of Boston": "Northwest",
  "West of Boston": "West",
  "Southwest of Boston": "Southwest",
  "South of Boston": "South",
};

const ACTIVE = "#0D2137";
const DIMMED = "#EEF1F5";

let cached: RegionMapData | null | undefined;
let pending: Promise<RegionMapData | null> | null = null;

export function loadRegionMap(): Promise<RegionMapData | null> {
  if (cached !== undefined) return Promise.resolve(cached);
  pending ??= fetch("/data/region-map.json")
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .then((d: RegionMapData | null) => (cached = d));
  return pending;
}

/** Loads the map once `enabled` turns true; undefined while loading, null if it failed */
export function useRegionMap(enabled = true) {
  const [data, setData] = useState<RegionMapData | null | undefined>(cached);
  useEffect(() => {
    if (!enabled || data !== undefined) return;
    let live = true;
    loadRegionMap().then((d) => { if (live) setData(d); });
    return () => { live = false; };
  }, [enabled, data]);
  return data;
}

/** True on devices with a real mouse; phones and tablets get tap-only behavior (no hover effects) */
export function useCanHover() {
  const [can, setCan] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches);
  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    if (!mq) return;
    const on = () => setCan(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return !!can;
}

type Props = {
  data: RegionMapData;
  /** "All" or an area name: towns outside it are grayed out */
  area: string;
  /** Town drawn in navy with its name over it */
  activeSlug?: string | null;
  /** Zoom to the selected area (used on phones so small towns are big enough to tap) */
  zoomToArea?: boolean;
  onHover?: (slug: string | null) => void;
  /** Tap/click on a town. Without it, towns are links to their guides. */
  onSelect?: (slug: string) => void;
  className?: string;
  label: string;
};

export default function RegionMap({ data, area, activeSlug, zoomToArea, onHover, onSelect, className, label }: Props) {
  const [, navigate] = useLocation();
  const canHover = useCanHover();
  const zoom = zoomToArea && area !== "All" ? data.regions.find((r) => r.name === area)?.zoom : undefined;
  const vb = zoom ?? [0, 0, data.w, data.h];
  const scale = vb[2] / data.w; // keeps the town-name label the same on-screen size when zoomed in
  const active = activeSlug ? data.towns.find((t) => t.slug === activeSlug) : undefined;

  return (
    <svg viewBox={vb.join(" ")} className={className ?? "w-full h-auto"} role="img" aria-label={label}>
      <g aria-hidden="true">
        {data.context.map((d, i) => (
          <path key={i} d={d} fill="#F1F3F6" stroke="#DCE1E8" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {data.towns.map((t) => {
        const inArea = area === "All" || t.region === area;
        const fill = t.slug === activeSlug ? ACTIVE : inArea ? AREA_COLORS[t.region]?.fill ?? "#DCE3EC" : DIMMED;
        const shape = (
          <path
            d={t.d}
            fill={fill}
            stroke="#FFFFFF"
            strokeWidth={1.2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="cursor-pointer transition-[fill] duration-150"
            onMouseEnter={canHover && onHover ? () => onHover(t.slug) : undefined}
            onMouseLeave={canHover && onHover ? () => onHover(null) : undefined}
          >
            <title>{t.name}</title>
          </path>
        );
        if (onSelect) {
          return <g key={t.slug} onClick={() => onSelect(t.slug)}>{shape}</g>;
        }
        const href = `/neighborhoods/${t.slug}`;
        return (
          <a key={t.slug} href={href} aria-label={`${t.name} guide`} onClick={(e) => { e.preventDefault(); navigate(href); }}>
            {shape}
          </a>
        );
      })}
      <g aria-hidden="true" pointerEvents="none">
        {data.regions.map((r) => (
          <path
            key={r.name}
            d={r.outline}
            fill="none"
            stroke="#0D2137"
            strokeOpacity={area === "All" ? 0.28 : r.name === area ? 0.75 : 0.1}
            strokeWidth={2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {active && (
          <text
            x={active.x}
            y={active.y - 30 * scale}
            fontSize={34 * scale}
            fontWeight={700}
            fill="#FFFFFF"
            stroke="#0D2137"
            strokeWidth={6 * scale}
            strokeLinejoin="round"
            paintOrder="stroke"
            textAnchor="middle"
            className="font-body select-none"
          >
            {active.name}
          </text>
        )}
      </g>
    </svg>
  );
}
