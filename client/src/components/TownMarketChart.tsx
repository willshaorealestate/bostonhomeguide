/*
 * TownMarketChart.tsx — the two charts in a town page's market section.
 * Lazy-loaded from Neighborhoods.tsx so recharts only downloads on town pages.
 *
 * DaysOnMarketChart: calendar quarters, this year (navy) next to last year (gray).
 *   Quarters of this year that haven't closed yet have no navy bar.
 * AnnualPriceChart: true annual MLS PIN medians, current year-to-date in a lighter shade.
 */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import type { TownYear, TownQuarter } from "@/data/townTrends";
import { shortPrice } from "@/lib/townMarket";

const NAVY = "#0D2137";
const MID = "#6F87A6";
const LIGHT = "#D5DCE5";
const tick = { fontSize: 11, fill: "#6B7280" };

/** Calendar years shown in the days-on-market chart: the latest quarter's year and the year before. */
export function domYears(quarters: TownQuarter[]): { current: number; previous: number } | null {
  const last = quarters[quarters.length - 1];
  if (!last) return null;
  const current = 2000 + Number(last.quarter.split(" '")[1]);
  return { current, previous: current - 1 };
}

export function DaysOnMarketChart({ quarters }: { quarters: TownQuarter[] }) {
  // Q1–Q4 across the bottom; for each, last year's bar (gray) next to this year's (navy).
  // Quarters this year that haven't happened yet simply have no navy bar.
  const yrs = domYears(quarters);
  if (!yrs) return null;
  const get = (qq: string, year: number) => quarters.find((q) => q.quarter === `${qq} '${String(year).slice(2)}`);
  const MONTHS: Record<string, string> = { Q1: "Jan–Mar", Q2: "Apr–Jun", Q3: "Jul–Sep", Q4: "Oct–Dec" };
  const data = ["Q1", "Q2", "Q3", "Q4"].map((qq) => {
    const prev = get(qq, yrs.previous), cur = get(qq, yrs.current);
    return { label: MONTHS[qq], qq, previous: prev?.dom, current: cur?.dom, prevSold: prev?.sold, curSold: cur?.sold };
  });
  const labelStyle = { fontSize: 11, fill: "#374151", fontWeight: 600 };
  return (
    <div className="font-body">
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} margin={{ top: 22, right: 0, bottom: 0, left: 0 }} barGap={4} barCategoryGap="22%">
          <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
          <YAxis hide domain={[0, "dataMax"]} />
          <Tooltip
            cursor={{ fill: "#F4F6F8" }}
            content={({ active, payload }) => {
              const d = payload?.[0]?.payload as (typeof data)[number] | undefined;
              if (!active || !d) return null;
              return (
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] shadow-sm">
                  <p className="font-semibold text-gray-700 mb-0.5">{d.label}</p>
                  {d.previous != null && <p className="text-gray-500">{yrs.previous}: <b className="text-gray-700">{d.previous} days</b> · {d.prevSold} sales</p>}
                  {d.current != null
                    ? <p className="text-[#0D2137]">{yrs.current}: <b>{d.current} days</b> · {d.curSold} sales</p>
                    : <p className="text-gray-400">{yrs.current}: not yet available</p>}
                </div>
              );
            }}
          />
          <Bar dataKey="previous" name={String(yrs.previous)} fill={LIGHT} radius={[4, 4, 0, 0]} maxBarSize={40}>
            <LabelList dataKey="previous" position="top" style={{ ...labelStyle, fill: "#6B7280" }} />
          </Bar>
          <Bar dataKey="current" name={String(yrs.current)} fill={NAVY} radius={[4, 4, 0, 0]} maxBarSize={40}>
            <LabelList dataKey="current" position="top" style={labelStyle} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AnnualPriceChart({ years }: { years: TownYear[] }) {
  const data = years.map((y) => ({
    ...y,
    label: y.through ? `${y.year}*` : `’${String(y.year).slice(2)}`,
    yearLabel: y.through ? `${y.year}*` : String(y.year),
    price: shortPrice(y.median),
  }));
  const tooltip = (
    <Tooltip
      cursor={{ fill: "#F4F6F8" }}
      formatter={(v: number) => [`$${v.toLocaleString()}`, "Median sale price"]}
      labelFormatter={(_, p) => {
        const y = p?.[0]?.payload as TownYear | undefined;
        return y ? `${y.year}${y.through ? ` (Jan–${y.through})` : ""} · ${y.sold} sales` : "";
      }}
      contentStyle={{ fontSize: 13, borderRadius: 8 }}
    />
  );
  const cells = data.map((y, i) => (
    <Cell key={i} fill={y.through ? LIGHT : NAVY} stroke={y.through ? MID : undefined} strokeDasharray={y.through ? "3 2" : undefined} />
  ));
  const labelStyle = { fontSize: 11, fill: "#374151", fontWeight: 600, stroke: "none" };

  return (
    <div className="font-body">
      {/* Phones: one row per year, so every price label has room */}
      <div className="sm:hidden">
        <ResponsiveContainer width="100%" height={data.length * 28 + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 52, bottom: 0, left: 0 }} barCategoryGap={5}>
            <XAxis type="number" hide domain={[0, "dataMax"]} />
            <YAxis type="category" dataKey="yearLabel" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} width={44} />
            {tooltip}
            <Bar dataKey="median" radius={[0, 4, 4, 0]}>
              {cells}
              <LabelList dataKey="price" position="right" style={labelStyle} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Wider screens: a column per year */}
      <div className="hidden sm:block">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 22, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
            <YAxis hide domain={[0, "dataMax"]} />
            {tooltip}
            <Bar dataKey="median" radius={[4, 4, 0, 0]} maxBarSize={44}>
              {cells}
              <LabelList dataKey="price" position="top" style={{ ...labelStyle, fontSize: 10 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
