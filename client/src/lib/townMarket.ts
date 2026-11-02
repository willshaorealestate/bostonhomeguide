/*
 * townMarket.ts — helpers for the town-page market section (no chart library here,
 * so the summary text renders without loading recharts).
 */
import type { TownYear, TownQuarter } from "@/data/townTrends";

/** 1090000 → "$1.09M", 1001000 → "$1.00M", 875000 → "$875K" */
export function shortPrice(n: number): string {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;
}

/** "Q3 '26" → "Q3 2026 (Jul–Sep)" */
export function quarterLong(q: string): string {
  const [qq, yy] = q.split(" '");
  const months = { Q1: "Jan–Mar", Q2: "Apr–Jun", Q3: "Jul–Sep", Q4: "Oct–Dec" }[qq] ?? "";
  return `${qq} 20${yy}${months ? ` (${months})` : ""}`;
}

const pct = (a: number, b: number) => Math.round(((a - b) / b) * 100);

export type Compare = { now: number; then: number | null; delta: number | null };

export type QuarterSummary = {
  latest: TownQuarter;
  yearAgo: TownQuarter | null;
  dom: Compare;
  ratio: Compare;
  sold: Compare;
  sentence: string;
};

export function summarizeQuarters(town: string, qs: TownQuarter[]): QuarterSummary | null {
  if (!qs.length) return null;
  const latest = qs[qs.length - 1];
  const yearAgo = qs.length >= 5 ? qs[qs.length - 5] : null;
  const cmp = (now: number, then?: number): Compare => ({ now, then: then ?? null, delta: then == null ? null : now - then });
  const dom = cmp(latest.dom, yearAgo?.dom);
  const ratio = cmp(latest.listToSale, yearAgo?.listToSale);
  const sold = cmp(latest.sold, yearAgo?.sold);

  let sentence = `In ${quarterLong(latest.quarter)}, ${latest.sold} homes sold in ${town}, averaging ${latest.dom} days on market and ${latest.listToSale}% of list price.`;
  if (yearAgo && dom.delta !== null) {
    const pace =
      Math.abs(dom.delta) <= 3 ? `about the same pace as` :
      dom.delta < 0 ? `${-dom.delta} days faster than` : `${dom.delta} days slower than`;
    sentence += ` That's ${pace} the same quarter a year earlier (${yearAgo.dom} days).`;
  }
  return { latest, yearAgo, dom, ratio, sold, sentence };
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
