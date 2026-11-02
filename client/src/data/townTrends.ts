/*
 * townTrends.ts — per-town MLS PIN figures for the town pages.
 *
 * annual:    one MLS PIN report per calendar year (true annual median, not an average of months).
 *            The current year is year-to-date and carries `through` (e.g. "Sep").
 * quarterly: one MLS PIN report per calendar quarter, last 8 quarters. `active` is the number
 *            of homes for sale at the end of the quarter, used for months of supply (absorption).
 *
 * Written by the market job (scripts/mlspin). A town with no entry keeps the simple
 * median-price box on its page.
 */
export type TownYear = { year: number; median: number; sold: number; through?: string };
export type TownQuarter = { quarter: string; dom: number; listToSale: number; sold: number; active?: number };

export const townAnnual: Record<string, TownYear[]> = {
};

export const townQuarterly: Record<string, TownQuarter[]> = {
};
