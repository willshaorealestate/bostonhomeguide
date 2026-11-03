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
  "Lexington": [
    { year: 2021, median: 1405000, sold: 463 },
    { year: 2022, median: 1438000, sold: 383 },
    { year: 2023, median: 1506000, sold: 335 },
    { year: 2024, median: 1599000, sold: 305 },
    { year: 2025, median: 1795000, sold: 326 },
    { year: 2026, median: 1645000, sold: 255, through: "Sep" },
  ],
  "Bedford": [
    { year: 2021, median: 780000, sold: 173 },
    { year: 2022, median: 904500, sold: 160 },
    { year: 2023, median: 907500, sold: 126 },
    { year: 2024, median: 951418, sold: 118 },
    { year: 2025, median: 999400, sold: 124 },
    { year: 2026, median: 1050000, sold: 107, through: "Sep" },
  ],
};

export const townQuarterly: Record<string, TownQuarter[]> = {
  "Lexington": [
    { quarter: "Q4 '24", dom: 46, listToSale: 102, sold: 57, active: 0 },
    { quarter: "Q1 '25", dom: 54, listToSale: 102, sold: 42, active: 0 },
    { quarter: "Q2 '25", dom: 27, listToSale: 104, sold: 94, active: 0 },
    { quarter: "Q3 '25", dom: 32, listToSale: 102, sold: 119, active: 0 },
    { quarter: "Q4 '25", dom: 53, listToSale: 101, sold: 71, active: 0 },
    { quarter: "Q1 '26", dom: 48, listToSale: 100, sold: 34, active: 0 },
    { quarter: "Q2 '26", dom: 41, listToSale: 101, sold: 113, active: 0 },
    { quarter: "Q3 '26", dom: 58, listToSale: 100, sold: 108, active: 0 },
  ],
  "Bedford": [
    { quarter: "Q4 '24", dom: 43, listToSale: 100, sold: 22, active: 0 },
    { quarter: "Q1 '25", dom: 33, listToSale: 103, sold: 17, active: 0 },
    { quarter: "Q2 '25", dom: 35, listToSale: 102, sold: 33, active: 0 },
    { quarter: "Q3 '25", dom: 39, listToSale: 101, sold: 42, active: 0 },
    { quarter: "Q4 '25", dom: 54, listToSale: 100, sold: 32, active: 0 },
    { quarter: "Q1 '26", dom: 55, listToSale: 100, sold: 29, active: 0 },
    { quarter: "Q2 '26", dom: 29, listToSale: 102, sold: 32, active: 0 },
    { quarter: "Q3 '26", dom: 41, listToSale: 102, sold: 46, active: 1 },
  ],
};
