/*
 * townMarket.ts — helpers for the town-page market section (no chart library here,
 * so the summary text renders without loading recharts).
 */
import type { TownYear, TownQuarter, TownInventory } from "@/data/townTrends";

/** 1090000 → "$1.09M", 1001000 → "$1.00M", 875000 → "$875K" */
export function shortPrice(n: number): string {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;
}

/** "Q3 '26" → "July–September 2026" (plain months; visitors don't think in quarters) */
export function quarterMonths(q: string): string {
  const [qq, yy] = q.split(" '");
  const months = { Q1: "January–March", Q2: "April–June", Q3: "July–September", Q4: "October–December" }[qq] ?? qq;
  return `${months} 20${yy}`;
}

const yearOf = (q: string) => `20${q.split(" '")[1]}`;
const pct = (a: number, b: number) => Math.round(((a - b) / b) * 100);

/**
 * Months of supply (the absorption rate expressed in months): homes for sale now ÷ average
 * monthly sales in the latest quarter. How long current listings would last at the recent pace
 * of sales if nothing new came on the market.
 */
export function monthsOfSupply(inv: TownInventory | undefined, q: TownQuarter): number | null {
  if (!inv || q.sold <= 0) return null;
  return Math.round((inv.active / (q.sold / 3)) * 10) / 10;
}

/** Common rule of thumb: under 4 months favors sellers, 4–6 is balanced, over 6 favors buyers. */
export function supplyMarket(m: number): { label: string; band: "seller" | "balanced" | "buyer" } {
  if (m < 4) return { label: "Seller's market", band: "seller" };
  if (m <= 6) return { label: "Balanced market", band: "balanced" };
  return { label: "Buyer's market", band: "buyer" };
}

export type Compare = { now: number; then: number | null; delta: number | null };

export type QuarterSummary = {
  latest: TownQuarter;
  yearAgo: TownQuarter | null;
  dom: Compare;
  ratio: Compare;
  sold: Compare;
  supply: { now: number; asOf: string } | null;
  sentence: string;
  supplySentence: string | null;
};

export function summarizeQuarters(town: string, qs: TownQuarter[], inv?: TownInventory): QuarterSummary | null {
  if (!qs.length) return null;
  const latest = qs[qs.length - 1];
  const yearAgo = qs.length >= 5 ? qs[qs.length - 5] : null;
  const cmp = (now: number, then?: number): Compare => ({ now, then: then ?? null, delta: then == null ? null : now - then });
  const dom = cmp(latest.dom, yearAgo?.dom);
  const ratio = cmp(latest.listToSale, yearAgo?.listToSale);
  const sold = cmp(latest.sold, yearAgo?.sold);

  let sentence = `From ${quarterMonths(latest.quarter).replace("–", " through ")}, ${latest.sold} homes sold in ${town}, averaging ${latest.dom} days on market and ${latest.listToSale}% of list price.`;
  if (yearAgo && dom.delta !== null) {
    const pace =
      Math.abs(dom.delta) <= 3 ? `about the same pace as` :
      dom.delta < 0 ? `${-dom.delta} days faster than` : `${dom.delta} days slower than`;
    sentence += ` That's ${pace} the same months in ${yearOf(yearAgo.quarter)} (${yearAgo.dom} days).`;
  }
  const supplyNow = monthsOfSupply(inv, latest);
  const supply = supplyNow === null || !inv ? null : { now: supplyNow, asOf: inv.asOf };
  let supplySentence: string | null = null;
  if (supply && inv) {
    const perMonth = Math.round(latest.sold / 3);
    const asOf = new Date(`${inv.asOf}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    supplySentence =
      `As of ${asOf}, ${inv.active} ${inv.active === 1 ? "home was" : "homes were"} for sale in ${town}. ` +
      `At the recent pace of about ${perMonth} ${perMonth === 1 ? "sale" : "sales"} a month (${quarterMonths(latest.quarter).replace(/ \d{4}$/, "")}), ` +
      `that's ${supply.now} months of supply, which points to a ${supplyMarket(supply.now).label.toLowerCase()}.`;
  }
  return { latest, yearAgo, dom, ratio, sold, supply, sentence, supplySentence };
}

export type AnnualSummary = {
  lastFull: TownYear;
  prevFull: TownYear | null;
  first: TownYear;
  ytd: TownYear | null;
  yoy: number | null;
  sinceFirst: number | null;
  sentence: string;
};

export function summarizeYears(town: string, ys: TownYear[]): AnnualSummary | null {
  const full = ys.filter((y) => !y.through);
  if (!full.length) return null;
  const lastFull = full[full.length - 1];
  const prevFull = full.length > 1 ? full[full.length - 2] : null;
  const first = full[0];
  const ytd = ys.find((y) => y.through) ?? null;
  const yoy = prevFull ? pct(lastFull.median, prevFull.median) : null;
  const sinceFirst = first !== lastFull ? pct(lastFull.median, first.median) : null;

  const change = (n: number) => (n === 0 ? "unchanged" : n > 0 ? `up ${n}%` : `down ${-n}%`);
  let sentence = `${town}'s median sale price was ${shortPrice(lastFull.median)} in ${lastFull.year}, based on ${lastFull.sold} sales`;
  const parts: string[] = [];
  if (yoy !== null) parts.push(`${change(yoy)} from ${prevFull!.year}`);
  if (sinceFirst !== null) parts.push(`${change(sinceFirst)} since ${first.year}`);
  sentence += parts.length ? `, ${parts.join(" and ")}.` : ".";
  if (ytd) {
    sentence += ` So far in ${ytd.year} (through ${ytd.through}), the median is ${shortPrice(ytd.median)} on ${ytd.sold} sales.`;
  }
  return { lastFull, prevFull, first, ytd, yoy, sinceFirst, sentence };
}
