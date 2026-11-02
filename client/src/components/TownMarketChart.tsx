/*
 * TownMarketChart.tsx — the two charts in a town page's market section.
 * Lazy-loaded from Neighborhoods.tsx so recharts only downloads on town pages.
 *
 * DaysOnMarketChart: last 8 quarters. Latest quarter in navy, the same quarter a year
 *   earlier in mid-blue, so the year-over-year comparison in the tiles is easy to find.
 * AnnualPriceChart: true annual MLS PIN medians, current year-to-date in a lighter shade.
 */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import type { TownYear, TownQuarter } from "@/data/townTrends";
import { shortPrice, quarterLong } from "@/lib/townMarket";

const NAVY = "#0D2137";
const MID = "#6F87A6";
const LIGHT = "#D5DCE5";
const tick = { fontSize: 11, fill: "#6B7280" };

export function DaysOnMarketChart({ quarters }: { quarters: TownQuarter[] }) {
  const last = quarters.length - 1;
  const data = quarters.map((q) => ({ ...q, label: q.quarter.replace(" '", " ’") }));
  return (
    <div className="font-body">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 22, right: 0, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
          <YAxis hide domain={[0, "dataMax"]} />
          <Tooltip
            cursor={{ fill: "#F4F6F8" }}
            formatter={(v: number) => [`${v} days`, "Avg. days on market"]}
            labelFormatter={(_, p) => (p?.[0] ? `${quarterLong(p[0].payload.quarter)} · ${p[0].payload.sold} sales` : "")}
            contentStyle={{ fontSize: 13, borderRadius: 8 }}
          />
          <Bar dataKey="dom" radius={[4, 4, 0, 0]} maxBarSize={44}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === last ? NAVY : i === last - 4 ? MID : LIGHT} />
            ))}
            <LabelList dataKey="dom" position="top" style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }} />
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
