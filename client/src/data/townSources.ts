/*
 * townSources.ts — Where the town-page stats come from. Update yearly.
 */
export const SCHOOL_RANK_SOURCE = {
  label: "Boston Magazine 2026",
  total: 148,
  url: "https://www.bostonmagazine.com/news/best-public-high-schools-boston-2026-2027-chart/",
};

export const COMMUTE_SOURCE = {
  label: "U.S. Census ACS 2020–2024",
  url: "https://data.census.gov/table/ACSST5Y2024.S0801",
};

export const RAIL_SOURCE = {
  label: "MBTA",
  url: "https://www.mbta.com/stops",
};

/** "#3 of 148", "#6 & #18 of 148", "Varies" (Boston's many schools) or "Not listed" (not in the ranking) */
export function schoolRankLabel(ranks: number[], highSchool = ""): string {
  if (!ranks.length) return highSchool.startsWith("Boston Public Schools") ? "Varies by school" : "Not listed";
  return `${ranks.map((r) => `#${r}`).join(" & ")} of ${SCHOOL_RANK_SOURCE.total}`;
}
