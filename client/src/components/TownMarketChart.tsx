/*
 * TownMarketChart.tsx — the two charts in a town page's market section.
 * Lazy-loaded from Neighborhoods.tsx so recharts only downloads on town pages.
 *
 * DaysOnMarketChart: calendar quarters, this year (navy) next to last year (gray).
 *   Quarters of this year that haven't closed yet have no navy bar.
 * AnnualPriceChart: true annual MLS PIN medians as a line; the year-to-date point is marked "2026*".
 */
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import type { TownYear, TownQuarter } from "@/data/townTrends";
import { shortPrice } from "@/lib/townMarket";

const NAVY = "#0D2137";
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
  // Year written directly under each bar (below the baseline), so no color legend is needed
  const yearUnder = (year: number, color: string) => (props: { x?: number | string; y?: number | string; width?: number | string; height?: number | string; value?: unknown }) => {
    if (props.value == null) return null;
    const x = Number(props.x) + Number(props.width) / 2;
    const base = Number(props.y) + Number(props.height);
    // Narrow bars (phones) get the short form so neighboring years don't run together
    const narrow = Number(props.width) < 38;
    return (
      <text x={x} y={base + 15} textAnchor="middle" fontSize={11} fontWeight={600} fill={color}>
        {narrow ? `’${String(year).slice(2)}` : year}
      </text>
    );
  };
  return (
    <div className="font-body">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 22, right: 0, bottom: 4, left: 0 }} barGap={6} barCategoryGap="22%">
          <XAxis dataKey="label" tick={{ ...tick, fontSize: 12, fill: "#374151", dy: 20 }} height={44} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
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
            <LabelList dataKey="previous" content={yearUnder(yrs.previous, "#9CA3AF")} />
          </Bar>
          <Bar dataKey="current" name={String(yrs.current)} fill={NAVY} radius={[4, 4, 0, 0]} maxBarSize={40}>
            <LabelList dataKey="current" position="top" style={labelStyle} />
            <LabelList dataKey="current" content={yearUnder(yrs.current, NAVY)} />
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
    price: shortPrice(y.median),
  }));
  const medians = years.map((y) => y.median);
  // A line shows the trend best with a padded range rather than starting at $0
  const lo = Math.floor((Math.min(...medians) * 0.9) / 50_000) * 50_000;
  const hi = Math.ceil((Math.max(...medians) * 1.06) / 50_000) * 50_000;
  const last = data.length - 1;

  const tooltip = (
    <Tooltip
      cursor={{ stroke: "#D1D5DB" }}
      formatter={(v: number) => [`$${v.toLocaleString()}`, "Median sale price"]}
      labelFormatter={(_, p) => {
        const y = p?.[0]?.payload as TownYear | undefined;
        return y ? `${y.year}${y.through ? ` (Jan–${y.through})` : ""} · ${y.sold} sales` : "";
      }}
      contentStyle={{ fontSize: 13, borderRadius: 8 }}
    />
  );
  // Price above each point. On phones only the first and latest points are labeled so the
  // labels don't collide; the rest show on tap.
  const priceLabel = (only?: (i: number) => boolean) =>
    (props: { x?: number | string; y?: number | string; index?: number; value?: unknown }) => {
      const i = props.index ?? 0;
      if (only && !only(i)) return null;
      return (
        <text x={Number(props.x)} y={Number(props.y) - 10} textAnchor="middle" fontSize={11} fontWeight={600} fill="#374151">
          {data[i]?.price}
        </text>
      );
    };
  const line = (labels: ReturnType<typeof priceLabel>) => (
    <Line type="monotone" dataKey="median" stroke={NAVY} strokeWidth={2.5} dot={{ r: 3.5, fill: NAVY, strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false}>
      <LabelList dataKey="median" content={labels} />
    </Line>
  );
  const keyPoints = (i: number) => i === 0 || i === last;

  return (
    <div className="font-body">
      <div className="sm:hidden">
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={data} margin={{ top: 24, right: 22, bottom: 0, left: 22 }}>
            <CartesianGrid vertical={false} stroke="#EEF0F3" />
            <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
            <YAxis hide domain={[lo, hi]} />
            {tooltip}
            {line(priceLabel(keyPoints))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="hidden sm:block">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 26, right: 24, bottom: 0, left: 24 }}>
            <CartesianGrid vertical={false} stroke="#EEF0F3" />
            <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} interval={0} />
            <YAxis hide domain={[lo, hi]} />
            {tooltip}
            {line(priceLabel())}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
