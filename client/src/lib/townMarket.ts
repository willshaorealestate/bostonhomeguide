/*
 * townMarket.ts — helpers for the town-page market section (no chart library here,
 * so the summary text renders without loading recharts).
 */
import type { TownMonth } from "@/data/townMarketHistory";

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "Sep '26" → "September 2026" */
export function longMonth(label: string): string {
  const [mon, yy] = label.split(" '");
  const i = SHORT.indexOf(mon);
  return i === -1 ? label : `${LONG[i]} 20${yy}`;
}

/** 1090000 → "$1.09M", 875000 → "$875K" */
export function shortPrice(n: number): string {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M` : `$${Math.round(n / 1000)}K`;
}

/**
 * 3-month average of monthly medians, weighted by homes sold. null for the first two months
 * (not enough history) and for any window with no sales.
 */
export function rollingMedianAvg(history: TownMonth[], window = 3): Array<number | null> {
  return history.map((_, i) => {
    if (i < window - 1) return null;
    const slice = history.slice(i - window + 1, i + 1).filter((h) => h.sold > 0);
    const sold = slice.reduce((s, h) => s + h.sold, 0);
    if (!sold) return null;
    return slice.reduce((s, h) => s + h.median * h.sold, 0) / sold;
  });
}

export type TownMarketSummary = {
  latest: TownMonth;
  latestLabel: string;
  soldTotal: number;
  fewestSold: number;
  startAvg: number | null;
  endAvg: number | null;
  startRange: string;
  endRange: string;
  sentences: string[];
};

export function summarizeTown(town: string, history: TownMonth[]): TownMarketSummary | null {
  if (history.length < 3) return null;
  const latest = history[history.length - 1];
  const avg = rollingMedianAvg(history);
  const startIdx = avg.findIndex((v) => v !== null);
  const startAvg = startIdx === -1 ? null : avg[startIdx];
  const endAvg = avg[avg.length - 1];
  const range = (i: number) => `${history[i - 2].month.split(" ")[0]}–${history[i].month}`;
  const soldTotal = history.reduce((s, h) => s + h.sold, 0);
  const fewestSold = Math.min(...history.map((h) => h.sold));
  const latestLabel = longMonth(latest.month);

  const sentences: string[] = [];
  if (latest.sold > 0) {
    sentences.push(
      `${town}'s median sale price was ${shortPrice(latest.median)} in ${latestLabel}, based on ${latest.sold} ${latest.sold === 1 ? "sale" : "sales"}. ` +
        `Homes averaged ${latest.dom} days on market and sold for ${latest.listToSale}% of list price.`
    );
  }
  if (startAvg && endAvg && startIdx !== avg.length - 1) {
    const change = ((endAvg - startAvg) / startAvg) * 100;
    const dir = Math.abs(change) < 2 ? "held roughly steady" : change > 0 ? `rose ${Math.round(change)}%` : `fell ${Math.round(-change)}%`;
    sentences.push(
      `Using a 3-month average to smooth out month-to-month swings, the median ${dir}, from ${shortPrice(startAvg)} (${range(startIdx)}) to ${shortPrice(endAvg)} (${range(avg.length - 1)}).`
    );
  }
  sentences.push(`${soldTotal.toLocaleString()} homes sold in ${town} over the past ${history.length} months.`);

  return {
    latest, latestLabel, soldTotal, fewestSold, startAvg, endAvg,
    startRange: startIdx === -1 ? "" : range(startIdx),
    endRange: range(avg.length - 1),
    sentences,
  };
}
