/*
 * TownMarketChart.tsx — the two charts in a town page's market section.
 * Lazy-loaded from Neighborhoods.tsx so recharts only downloads on town pages.
 *
 * DaysOnMarketChart: the latest 4 quarters (navy) side by side with the same quarters a
 *   year earlier (light), so each pair reads as "this year vs last year".
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
  // Pair each of the latest 4 quarters with the same quarter a year earlier.
  const recent = quarters.slice(-4);
  const byQuarter = new Map(quarters.map((q) => [q.quarter, q]));
  const priorOf = (q: string) => {
    const [qq, yy] = q.split(" '");
    return byQuarter.get(`${qq} '${String(Number(yy) - 1).padStart(2, "0")}`);
  };
  const MONTHS: Record<string, string> = { Q1: "Jan–Mar", Q2: "Apr–Jun", Q3: "Jul–Sep", Q4: "Oct–Dec" };
  const data = recent.map((q) => {
    const prior = priorOf(q.quarter);
    return {
      label: MONTHS[q.quarter.split(" ")[0]],
      now: q.dom,
      before: prior?.dom,
      nowName: quarterLong(q.quarter).split(" (")[0],
      beforeName: prior ? quarterLong(prior.quarter).split(" (")[0] : "",
      nowSold: q.sold,
      beforeSold: prior?.sold,
    };
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
                  {d.before != null && <p className="text-gray-500">{d.beforeName}: <b className="text-gray-700">{d.before} days</b> · {d.beforeSold} sales</p>}
                  <p className="text-[#0D2137]">{d.nowName}: <b>{d.now} days</b> · {d.nowSold} sales</p>
                </div>
              );
            }}
          />
          <Bar dataKey="before" fill={LIGHT} radius={[4, 4, 0, 0]} maxBarSize={40}>
            <LabelList dataKey="before" position="top" style={{ ...labelStyle, fill: "#6B7280" }} />
          </Bar>
          <Bar dataKey="now" fill={NAVY} radius={[4, 4, 0, 0]} maxBarSize={40}>
            <LabelList dataKey="now" position="top" style={labelStyle} />
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
