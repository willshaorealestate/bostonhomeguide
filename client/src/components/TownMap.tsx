import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * A small clickable map of a town and the towns around it, for the "Explore nearby towns" box.
 * The map files are made once by scripts/town-maps/build.py from MassGIS town boundaries and
 * served from /data/town-maps/<slug>.json (a few KB each), so they stay out of the JS bundle.
 */
/** Label layout chosen by the build script so the name fits inside the town: size, angle and line breaks */
type MapLabel = { x: number; y: number; size: number; angle: number; lines: string[] };
type MapShape = { name: string; slug?: string | null; self: boolean; neighbor: boolean; d: string; label: MapLabel | null };
type TownMapData = { w: number; h: number; shapes: MapShape[] };

const cache = new Map<string, TownMapData | null>();

export function useTownMap(slug: string) {
  const [data, setData] = useState<TownMapData | null | undefined>(() => cache.get(slug));
  useEffect(() => {
    if (cache.has(slug)) { setData(cache.get(slug)); return; }
    let live = true;
    setData(undefined);
    fetch(`/data/town-maps/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((d: TownMapData | null) => { cache.set(slug, d); if (live) setData(d); });
    return () => { live = false; };
  }, [slug]);
  return data; // undefined while loading, null if this town has no map
}

function Label({ shape }: { shape: MapShape }) {
  const { x, y, size, angle, lines } = shape.label!;
  const fill = shape.self ? "#FFFFFF" : shape.slug ? "#0D2137" : "#9CA3AF";
  return (
    <text
      x={x}
      y={y - ((lines.length - 1) * size * 0.55)}
      transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={size}
      fontWeight={shape.self ? 700 : 600}
      fill={fill}
      stroke={shape.self ? "none" : "#FFFFFF"}
      strokeWidth={shape.self ? 0 : 3}
      paintOrder="stroke"
      strokeLinejoin="round"
      className="pointer-events-none select-none font-body"
    >
      {lines.map((l, k) => (
        <tspan key={k} x={x} dy={k === 0 ? 0 : size * 1.1}>{l}</tspan>
      ))}
    </text>
  );
}

export default function TownMap({ data, townName }: { data: TownMapData; townName: string }) {
  const [, navigate] = useLocation();
  return (
    <figure>
      <svg
        viewBox={`0 0 ${data.w} ${data.h}`}
        className="w-full h-auto rounded-xl bg-white"
        role="img"
        aria-label={`Map of ${townName} and the towns around it`}
      >
        {data.shapes.map((s) => {
          if (s.self) {
            return <path key={s.name} d={s.d} fill="#0D2137" stroke="#FFFFFF" strokeWidth={1.5} strokeLinejoin="round" />;
          }
          if (s.slug) {
            const href = `/neighborhoods/${s.slug}`;
            return (
              <a
                key={s.name}
                href={href}
                aria-label={`${s.name} town page`}
                onClick={(e) => { e.preventDefault(); navigate(href); }}
                className="group cursor-pointer focus:outline-none"
              >
                <title>{s.name}</title>
                <path d={s.d} strokeWidth={1.5} strokeLinejoin="round" className="fill-[#DCE3EC] stroke-white transition-colors group-hover:fill-[#EBD9AE] group-focus-visible:fill-[#EBD9AE]" />
              </a>
            );
          }
          return <path key={s.name} d={s.d} fill="#F4F6F8" stroke="#FFFFFF" strokeWidth={1.5} strokeLinejoin="round" />;
        })}
        {/* Labels last, so no town's fill covers a neighbor's name */}
        {data.shapes.map((s) => (s.label ? <Label key={`l-${s.name}`} shape={s} /> : null))}
      </svg>
      <figcaption className="mt-2 flex items-center justify-between gap-2 text-[11px] text-gray-500 font-body">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#DCE3EC]" /> Tap a town to explore it
        </span>
        <span className="text-gray-400">Boundaries: MassGIS</span>
      </figcaption>
    </figure>
  );
}
