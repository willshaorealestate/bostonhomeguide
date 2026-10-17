/*
 * TownCompareTable.tsx — Market page "By Town" picker.
 * Region tabs filter the table only; the Town A / Town B picks stay selected across tabs,
 * so any two towns can be compared regardless of region.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { allNeighborhoods } from "@/data/neighborhoods";

export interface TownRow {
  town: string;
  medianPrice: number;
  dom: number;
  listToSale: number;
  sold?: number;
}

// Towns in the market data that don't have a town page yet
const EXTRA_REGIONS: Record<string, string> = {
  Watertown: "Boston & Inner Suburbs",
  Burlington: "Northwest of Boston",
};

const REGION_ORDER = [
  "Northwest of Boston",
  "Boston & Inner Suburbs",
  "North of Boston",
  "West of Boston",
  "Southwest of Boston",
  "South of Boston",
];
const ALL = "All towns";
const FOCUS = new Set(["Lexington", "Bedford", "Concord", "Acton"]);

type SortKey = "town" | "medianPrice" | "dom" | "listToSale" | "sold";

const shortPrice = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M` : `$${Math.round(n / 1000)}K`;

export default function TownCompareTable({
  rows,
  townA,
  townB,
  setTownA,
  setTownB,
}: {
  rows: TownRow[];
  townA: string;
  townB: string;
  setTownA: (t: string) => void;
  setTownB: (t: string) => void;
}) {
  const [region, setRegion] = useState(REGION_ORDER[0]);
  const [sortKey, setSortKey] = useState<SortKey>("medianPrice");
  const [dir, setDir] = useState<1 | -1>(-1);
  const [query, setQuery] = useState("");
  const [nextSlot, setNextSlot] = useState<"A" | "B">("B");
  const [inputA, setInputA] = useState(townA);
  const [inputB, setInputB] = useState(townB);

  // Every town page plus the extras, with its region and (if any) market data
  const towns = useMemo(() => {
    const byName = new Map(rows.map((r) => [r.town, r]));
    const list = allNeighborhoods.map((n) => ({ name: n.name, slug: n.slug as string | null, region: n.region, data: byName.get(n.name) }));
    for (const [name, reg] of Object.entries(EXTRA_REGIONS)) {
      if (!list.some((t) => t.name === name)) list.push({ name, slug: null, region: reg, data: byName.get(name) });
    }
    return list;
  }, [rows]);
  const withData = towns.filter((t) => t.data);

  const counts = (r: string) => (r === ALL ? towns.length : towns.filter((t) => t.region === r).length);

  const visible = towns
    .filter((t) => region === ALL || t.region === region)
    .filter((t) => !query || t.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "town") return a.name.localeCompare(b.name) * dir;
      const A = a.data?.[sortKey], B = b.data?.[sortKey];
      if (A == null && B == null) return a.name.localeCompare(b.name);
      if (A == null) return 1;
      if (B == null) return -1;
      return ((A as number) - (B as number)) * dir;
    });

  const pick = (t: string) => {
    if (t === townA || t === townB) return;
    if (nextSlot === "A") { setTownA(t); setInputA(t); setNextSlot("B"); }
    else { setTownB(t); setInputB(t); setNextSlot("A"); }
  };

  const commitInput = (value: string, slot: "A" | "B") => {
    const match = withData.find((t) => t.name.toLowerCase() === value.trim().toLowerCase());
    const other = slot === "A" ? townB : townA;
    if (match && match.name !== other) {
      if (slot === "A") { setTownA(match.name); setInputA(match.name); }
      else { setTownB(match.name); setInputB(match.name); }
    } else {
      // Not a town with data — put the current pick back
      if (slot === "A") setInputA(townA); else setInputB(townB);
    }
  };

  const sortBy = (k: SortKey) => {
    if (k === sortKey) setDir(dir === 1 ? -1 : 1);
    else { setSortKey(k); setDir(k === "town" ? 1 : -1); }
  };

  const cols: { k: SortKey; long: string; short: string; className?: string }[] = [
    { k: "town", long: "Town", short: "Town" },
    { k: "medianPrice", long: "Median price", short: "Median" },
    { k: "dom", long: "Days on market", short: "Days" },
    { k: "listToSale", long: "Sale vs. ask", short: "Sale/Ask" },
    { k: "sold", long: "Sales", short: "Sales", className: "hidden sm:table-cell" },
  ];

  return (
    <div>
      {/* Region tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 mb-3" role="tablist" aria-label="Regions">
        {[...REGION_ORDER, ALL].map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={r === region}
            onClick={() => { setRegion(r); setQuery(""); }}
            className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-body font-medium border whitespace-nowrap transition-colors ${
              r === region ? "bg-[#0D2137] text-white border-[#0D2137]" : "bg-[#FAF8F4] text-[#0D2137] border-gray-200 hover:border-[#0D2137]"
            }`}
          >
            {r}
            <span className="ml-1 text-xs opacity-60">{counts(r)}</span>
          </button>
        ))}
      </div>

      {region === ALL && (
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a town, e.g. Lexington"
          aria-label="Search towns"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-base font-body mb-3 focus:outline-none focus:border-[#0D2137]"
        />
      )}

      {/* Sortable table */}
      <div className="border border-gray-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead className="bg-[#F4F6F8]">
            <tr>
              <th className="w-9 sm:w-11 px-1 sm:px-2 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
                <span className="sr-only">Compare</span>+
              </th>
              {cols.map((c) => (
                <th
                  key={c.k}
                  onClick={() => sortBy(c.k)}
                  aria-sort={sortKey === c.k ? (dir === 1 ? "ascending" : "descending") : "none"}
                  className={`px-1.5 sm:px-3.5 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap ${
                    c.k === "town" ? "text-left" : "text-right"
                  } ${sortKey === c.k ? "text-[#0D2137]" : "text-gray-500"} ${c.className ?? ""}`}
                >
                  <span className="hidden sm:inline">{c.long}</span>
                  <span className="sm:hidden">{c.short}</span>
                  {sortKey === c.k && <span className="ml-1 text-[10px]">{dir === -1 ? "▼" : "▲"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => {
              const isA = t.name === townA, isB = t.name === townB;
              return (
                <tr key={t.name} className={`border-t border-gray-100 ${FOCUS.has(t.name) ? "bg-[#FBF6EA]" : ""}`}>
                  <td className="px-1 sm:px-2 py-2.5 text-center">
                    {t.data && (
                      <button
                        onClick={() => pick(t.name)}
                        aria-label={isA ? `${t.name} is Town A` : isB ? `${t.name} is Town B` : `Compare ${t.name}`}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border text-sm font-semibold leading-none ${
                          isA ? "bg-[#0D2137] text-white border-[#0D2137]"
                          : isB ? "bg-[#C89B3C] text-[#0D2137] border-[#C89B3C]"
                          : "bg-white text-[#0D2137] border-gray-200 hover:border-[#0D2137]"
                        }`}
                      >
                        {isA ? "A" : isB ? "B" : "+"}
                      </button>
                    )}
                  </td>
                  <td className="px-1.5 sm:px-3.5 py-2.5 text-left whitespace-nowrap">
                    {t.slug ? (
                      <Link href={`/neighborhoods/${t.slug}`} className="font-semibold text-[#0D2137] hover:underline">{t.name}</Link>
                    ) : (
                      <span className="font-semibold text-[#0D2137]">{t.name}</span>
                    )}
                    {region === ALL && <span className="block text-xs text-gray-400">{t.region}</span>}
                  </td>
                  {t.data ? (
                    <>
                      <td className="px-1.5 sm:px-3.5 py-2.5 text-right whitespace-nowrap">{shortPrice(t.data.medianPrice)}</td>
                      <td className="px-1.5 sm:px-3.5 py-2.5 text-right">{t.data.dom}</td>
                      <td className={`px-1.5 sm:px-3.5 py-2.5 text-right ${t.data.listToSale >= 100 ? "text-green-700" : "text-amber-700"}`}>
                        {Math.round(t.data.listToSale)}%
                      </td>
                      <td className="px-1.5 sm:px-3.5 py-2.5 text-right hidden sm:table-cell">{t.data.sold ?? "–"}</td>
                    </>
                  ) : (
                    <td colSpan={4} className="px-1.5 sm:px-3.5 py-2.5 text-right text-xs text-gray-400">Data coming soon</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 font-body mt-2 mb-6">
        Tap a column to sort. Tap + to compare a town, from any region, in the charts below.
      </p>

      {/* Town A / Town B — type any town, or tap + in the table */}
      <datalist id="compare-towns">
        {withData.map((t) => <option key={t.name} value={t.name}>{t.region}</option>)}
      </datalist>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { slot: "A" as const, label: "Town A", color: "#0D2137", value: inputA, set: setInputA },
          { slot: "B" as const, label: "Town B", color: "#C89B3C", value: inputB, set: setInputB },
        ].map(({ slot, label, color, value, set }) => (
          <label
            key={slot}
            className="block rounded-2xl border-2 border-dashed px-4 py-3"
            style={{ borderColor: color, background: `${color}0d` }}
          >
            <span className="flex items-center gap-2 mb-0.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
              <span className="text-xs font-semibold uppercase tracking-wider font-body" style={{ color: slot === "A" ? color : "#8a6a1f" }}>{label}</span>
            </span>
            <input
              list="compare-towns"
              value={value}
              onChange={(e) => set(e.target.value)}
              onBlur={(e) => commitInput(e.target.value, slot)}
              onKeyDown={(e) => { if (e.key === "Enter") commitInput((e.target as HTMLInputElement).value, slot); }}
              aria-label={label}
              className="w-full bg-transparent font-bold text-base text-[#0D2137] font-body focus:outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
