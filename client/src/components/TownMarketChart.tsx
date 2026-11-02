/*
 * TownMarketChart.tsx — 12-month price chart for a town page.
 * Loaded lazily from Neighborhoods.tsx so recharts only downloads when a town page is opened.
 *
 * Small towns can have 1–5 sales in a month, so a single month's median jumps around.
 * The line is a 3-month sales-weighted average of the monthly medians; each month's own
 * median is shown as a dot, and homes sold are bars so readers can see the sample size.
 */
import {
  ComposedChart, Bar, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { TownMonth } from "@/data/townMarketHistory";
import { rollingMedianAvg, shortPrice } from "@/lib/townMarket";

export default function TownMarketChart({ history }: { history: TownMonth[] }) {
  const avg = rollingMedianAvg(history);
  const prices = history.filter((h) => h.sold > 0).map((h) => h.median);
  // Pad the price axis so the lowest and highest months don't sit on the chart edges
  const lo = Math.floor((Math.min(...prices) * 0.92) / 50_000) * 50_000;
  const hi = Math.ceil((Math.max(...prices) * 1.04) / 50_000) * 50_000;
  const tick = { fontSize: 11, fill: "#6B7280" };
  const data = history.map((h, i) => ({
    month: h.month,
    sold: h.sold,
    monthly: h.sold > 0 ? h.median : undefined,
    avg3: avg[i] ?? undefined,
  }));

  return (
    <div className="font-body">
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" vertical={false} />
        <XAxis dataKey="month" tick={tick} interval="preserveStartEnd" minTickGap={8} />
        <YAxis
          yAxisId="price"
          tickFormatter={(v: number) => shortPrice(v)}
          tick={tick}
          width={56}
          domain={[lo, hi]}
          allowDataOverflow={false}
        />
        <YAxis yAxisId="sold" orientation="right" tick={tick} width={28} allowDecimals={false} />
        <Tooltip
          formatter={(value: number, name: string) =>
            name === "Homes sold" ? [value, name] : [`$${Math.round(value).toLocaleString()}`, name]
          }
          contentStyle={{ fontSize: 13, borderRadius: 8 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value: string) => <span style={{ color: "#4B5563" }}>{value}</span>} />
        <Bar yAxisId="sold" dataKey="sold" name="Homes sold" fill="#DCE1E8" radius={[3, 3, 0, 0]} barSize={18} />
        <Scatter yAxisId="price" dataKey="monthly" name="Monthly median" fill="#C89B3C" />
        <Line
          yAxisId="price"
          type="monotone"
          dataKey="avg3"
          name="3-month average"
          stroke="#0D2137"
          strokeWidth={2.5}
          dot={false}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
    </div>
  );
}
