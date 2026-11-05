/*
 * townSeo.ts — search title, meta description and the "Common questions" answers for a town page.
 *
 * Every answer is built from data the page already shows (MLS PIN medians, the DOR tax rate,
 * distance, MBTA rail, the Census commute time, the Boston Magazine rank), so the wording matches
 * how people search ("property tax rate in Lexington MA", "how far is Natick from Boston") while the
 * facts stay sourced. Fair housing: answers describe the place, never the people who live there.
 */
import type { Neighborhood } from "@/data/neighborhoods";
import type { TownProfile } from "@/data/townProfiles";
import { SCHOOL_RANK_SOURCE, COMMUTE_SOURCE } from "@/data/townSources";
import { shortPrice, type AnnualSummary } from "@/lib/townMarket";

export type TownQA = { q: string; a: string };

function glance(profile: TownProfile | undefined, label: string) {
  return profile?.glance.find((g) => g.label === label);
}

/** Median sale price for the page: this year so far if there is one, else the last full year (same as the stats bar) */
function median(n: Neighborhood, annual: AnnualSummary | null): { price: string; when: string } | null {
  if (annual) {
    const y = annual.ytd ?? annual.lastFull;
    return { price: shortPrice(y.median), when: annual.ytd ? `${y.year}, through ${annual.ytd.through}` : String(y.year) };
  }
  if (n.priceSource) return { price: n.medianPrice, when: n.priceSource.replace(/^MLS PIN,\s*/, "") };
  return null;
}

function tax(profile: TownProfile | undefined) {
  const g = glance(profile, "Property tax rate");
  if (!g) return null;
  const rate = parseFloat(g.value.replace(/[^0-9.]/g, ""));
  if (!rate) return null;
  return { value: g.value, rate, fy: g.note?.match(/FY\d{4}/)?.[0] ?? null };
}

function distance(profile: TownProfile | undefined) {
  const g = glance(profile, "From Boston");
  if (!g) return null;
  const miles = g.value.replace(/^~/, "").replace(/ miles?$/, "");
  const dir = g.note?.split(",")[0]?.trim() ?? "";
  return { miles, dir };
}

export function townTitle(n: Neighborhood) {
  return `${n.name}, MA Real Estate: Homes for Sale & Town Guide`;
}

/** Facts first (they're what make the result worth clicking), trimmed to fit Google's ~160 characters */
export function townDescription(n: Neighborhood, profile: TownProfile | undefined, annual: AnnualSummary | null) {
  const lead = `Homes for sale and real estate in ${n.name}, MA`;
  const tail = "Town guide and market data from REMAX agent Will Shao.";
  const facts: string[] = [];
  const m = median(n, annual);
  if (m) facts.push(`median sale price ${m.price} (${m.when.split(",")[0]})`);
  const t = tax(profile);
  if (t) facts.push(`tax rate ${t.value}/$1,000`);
  const d = distance(profile);
  if (d) facts.push(`~${d.miles} mi from Boston`);
  while (facts.length) {
    const s = `${lead}: ${facts.join(", ")}. ${tail}`;
    if (s.length <= 160) return s;
    facts.pop();
  }
  return `${lead}. ${tail}`;
}

function railSentence(n: Neighborhood) {
  switch (n.rail) {
    case "T + Commuter Rail": return `${n.name} has both MBTA subway (T) and Commuter Rail stations.`;
    case "Commuter Rail": return `${n.name} has an MBTA Commuter Rail station.`;
    case "T": return `${n.name} has MBTA subway (T) service.`;
    default: return `There's no MBTA rail station in ${n.name} itself.`;
  }
}

export function townQuestions(n: Neighborhood, profile: TownProfile | undefined, annual: AnnualSummary | null): TownQA[] {
  const out: TownQA[] = [];
  const T = n.name;

  if (annual) {
    out.push({ q: `How much do homes cost in ${T}, MA?`, a: `${annual.sentence} Figures are from MLS PIN, the regional listing service, and cover all home types.` });
  } else if (n.priceSource) {
    out.push({ q: `How much do homes cost in ${T}, MA?`, a: `The median sale price in ${T} was ${n.medianPrice} (${n.priceSource}).` });
  }

  const t = tax(profile);
  if (t) {
    const yearly = Math.round((t.rate * 1000) / 10) * 10;
    out.push({
      q: `What is the property tax rate in ${T}, MA?`,
      a: `${T}'s residential tax rate is ${t.value} per $1,000 of assessed value${t.fy ? ` for ${t.fy}` : ""}, from the Massachusetts Department of Revenue. On a home assessed at $1,000,000, that's about $${yearly.toLocaleString()} a year before any exemptions.`,
    });
  }

  const d = distance(profile);
  if (d) {
    out.push({
      q: `How far is ${T} from Boston?`,
      a: `${T} is about ${d.miles} miles${d.dir ? ` ${d.dir}` : ""} of downtown Boston in a straight line. ${railSentence(n)} The average travel time to work for people living in ${T} is ${Math.round(n.commuteMinutes)} minutes (${COMMUTE_SOURCE.label}).`,
    });
  }

  if (n.highSchool) {
    const ranks = n.schoolRanks;
    let a: string;
    if (ranks.length) {
      const list = ranks.map((r) => `#${r}`).join(" and ");
      a = `${T} is served by ${n.highSchool}, ranked ${list} of ${SCHOOL_RANK_SOURCE.total} in ${SCHOOL_RANK_SOURCE.label.replace(/ (\d{4})$/, "'s $1")} ranking of public high schools in the Boston area.`;
    } else if (n.highSchool.startsWith("Boston Public Schools")) {
      a = `Boston Public Schools runs the city's public high schools; rankings vary from school to school.`;
    } else {
      a = `${T} is served by ${n.highSchool}.`;
    }
    out.push({ q: `What public high school serves ${T}?`, a });
  }

  out.push({
    q: `Who can help me buy or sell a home in ${T}?`,
    a: `Will Shao, a REMAX Executive Realty agent with nearly 20 years of experience, works with buyers and sellers in ${T} and across Greater Boston and MetroWest, in English or conversational Mandarin. Call (781) 456-3541 or send him a message.`,
  });
  return out;
}

export function faqSchema(qas: TownQA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
