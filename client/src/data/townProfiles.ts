/*
 * townProfiles.ts — the "what it's like to live here" profile on each town page.
 *
 * Every fact here comes from a source listed in that town's `sources`, written in our own words.
 * Fair housing: describe places, amenities, history and getting around — never the people
 * who live in a town (no "great for families", "safe", demographics, etc.).
 *
 * Photos must be licensed for reuse: Unsplash/Pexels (no credit needed), Wikimedia Commons (credit +
 * license link unless public domain), government photos, Will's own photos, or written permission.
 * `credit` is shown under the photo when set. A photo with no `src` is left off the page.
 * Current photos: Lexington statue and Wilson Farm from Unsplash (Unsplash License); Bedford bikeway
 * from Wikimedia Commons, Tim Pierce, public domain; Bedford town seal from Wikimedia Commons, public
 * domain (Will chose to use it; some towns restrict seal use, so remove it if Bedford asks).
 */
import { batch1Profiles } from "./townProfilesBatch1";
import { batch2Profiles } from "./townProfilesBatch2";
import { batch3Profiles } from "./townProfilesBatch3";
import { batch4Profiles } from "./townProfilesBatch4";
import { batch5Profiles } from "./townProfilesBatch5";
import { batch6Profiles } from "./townProfilesBatch6";
import { batch7Profiles } from "./townProfilesBatch7";
import { batch8Profiles } from "./townProfilesBatch8";
import { batch9Profiles } from "./townProfilesBatch9";

export type ProfileFact = { label: string; value: string; note?: string };
export type ProfileHighlight = { icon: "history" | "trail" | "tree" | "store" | "school" | "plane" | "river" | "farm" | "museum"; title: string; text: string };
export type ProfilePhoto = { caption: string; src?: string; credit?: string; licenseUrl?: string };
export type ProfileSource = { label: string; url: string };

export type TownProfile = {
  tagline: string;
  glance: ProfileFact[];
  feel: string[];
  highlights: ProfileHighlight[];
  events: { name: string; when: string; text: string }[];
  gettingAround: string[];
  /** Up to two small photos, shown beside the "What it's like" text. About 600px wide is plenty. */
  photos: ProfilePhoto[];
  /** A short note in Will's words: something the rest of the profile doesn't already say. Leave out when there isn't one. */
  localTake?: string;
  sources: ProfileSource[];
};

const baseProfiles: Record<string, TownProfile> = {
  lexington: {
    tagline: "Where the Revolution began, with a walkable town center and miles of trails",
    glance: [
      { label: "Population", value: "34,454", note: "2020 Census" },
      { label: "Size", value: "16.5 sq mi" },
      { label: "From Boston", value: "~10 miles", note: "northwest" },
      { label: "Incorporated", value: "1713" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$12.31", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Lexington is best known for the Battle Green, site of the first battle of the Revolutionary War on April 19, 1775. History is part of everyday life here: colonial taverns sit a short walk from coffee shops, and the Minuteman Bikeway runs right through the middle of town.",
      "Lexington Center, along Massachusetts Avenue, is the town's walkable hub, with shops, restaurants, Cary Memorial Library and Depot Square. Beyond the center, residential neighborhoods spread out around a good deal of protected open space, from Willard's Woods to the meadows of East Lexington.",
    ],
    highlights: [
      { icon: "history", title: "Battle Green and historic houses", text: "Buckman Tavern, the Hancock-Clarke House and Munroe Tavern are open as museums, run by Lexington History Museums." },
      { icon: "museum", title: "Minute Man National Historical Park", text: "A 900-acre national park shared with Lincoln and Concord, with walking trails along the 1775 Battle Road." },
      { icon: "trail", title: "Minuteman Bikeway", text: "Runs through Lexington Center, east to Arlington and the Alewife Red Line station and west to Bedford." },
      { icon: "tree", title: "Open space", text: "Willard's Woods conservation area, plus Great Meadows in East Lexington (owned by Arlington)." },
      { icon: "farm", title: "Wilson Farm", text: "A working farm and farm stand that has been operating since 1884." },
      { icon: "school", title: "New Lexington High School", text: "Voters approved funding in December 2025. Construction is expected to start in late 2026, with the building opening in fall 2029." },
    ],
    events: [
      { name: "Patriots' Day", when: "Third Monday in April", text: "A dawn reenactment of the Battle of Lexington on the Battle Green, then an afternoon parade along Massachusetts Avenue." },
    ],
    gettingAround: [
      "Route 2 and Route 128 (I-95)",
      "MBTA buses to Alewife on the Red Line",
      "Lexpress, the town's own weekday bus",
      "Minuteman Bikeway to Alewife",
      "No commuter rail station in town",
    ],
    photos: [
      { caption: "Minuteman statue on the Battle Green", src: "/images/towns/profiles/lexington-minuteman-statue.jpg" },
      { caption: "Wilson Farm", src: "/images/towns/profiles/lexington-wilson-farm.jpg" },
    ],
    sources: [
      { label: "Town of Lexington: tax rates", url: "https://www.lexingtonma.gov/526/Tax-Rates" },
      { label: "Lexington History Museums: Patriots' Day", url: "https://lexingtonhistory.org/patriotsday" },
      { label: "Lexington, Massachusetts (Wikipedia): census, area, government, landmarks", url: "https://en.wikipedia.org/wiki/Lexington,_Massachusetts" },
      { label: "Lexington High School project vote (LHS Musket)", url: "https://lhsmusket.com/2510/news/passed-lexington-residents-vote-yes-on-debt-exclusion-vote/" },
      { label: "Boston Magazine: 2026 high school rankings", url: "https://www.bostonmagazine.com/news/best-public-high-schools-boston-2026-2027-chart/" },
    ],
  },

  bedford: {
    tagline: "A small town where three rail trails meet, right at Route 3 and Route 128",
    glance: [
      { label: "Population", value: "14,383", note: "2020 Census" },
      { label: "Size", value: "~14 sq mi" },
      { label: "From Boston", value: "~15 miles", note: "northwest" },
      { label: "Incorporated", value: "1729" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      { label: "Property tax rate", value: "$12.49", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Bedford is a smaller town with a lot of trails and open space for its size. It sits right at the junction of Route 3 and Route 128, which makes it an easy base for getting around the region.",
      "Great Road is the main street for shops, restaurants and town services, and Bedford Depot Park is where three rail trails meet. The history runs deep: the Bedford Flag, considered the oldest intact battle flag in the country, is on display at the Bedford Free Public Library.",
    ],
    highlights: [
      { icon: "trail", title: "Three rail trails at Bedford Depot", text: "The Minuteman Bikeway (to Lexington, Arlington and Cambridge), the Narrow Gauge Rail Trail (north to Billerica) and the Reformatory Branch Trail (to Concord Center) all start here." },
      { icon: "history", title: "The Bedford Flag", text: "Believed to have been carried to the Old North Bridge on April 19, 1775, it's on display at the Bedford Free Public Library." },
      { icon: "museum", title: "Job Lane House", text: "A saltbox house from about 1713, open for tours twice a month from May through December." },
      { icon: "river", title: "Rivers and conservation land", text: "The Concord River runs along the town's edge and the Shawsheen River runs through it, with conservation land, fields and walking trails." },
      { icon: "plane", title: "Hanscom Field and Hanscom Air Force Base", text: "A civilian airport next to the Air Force base, partly in Bedford. The base is one of the area's major employers." },
    ],
    events: [
      { name: "Bedford Day", when: "A Saturday in September", text: "The town's founding celebration: a 5K, a parade along Great Road, a fair by Town Hall and fireworks in the evening." },
    ],
    gettingAround: [
      "Route 3 and Route 128 (I-95)",
      "MBTA buses to Alewife on the Red Line",
      "Minuteman Bikeway to Lexington, Arlington and Alewife",
      "Hanscom Field for private and charter flights",
      "No commuter rail station in town",
    ],
    photos: [
      { caption: "Minuteman Bikeway in Bedford", src: "/images/towns/profiles/bedford-minuteman-bikeway.jpg" },
      { caption: "Town seal, with the Bedford Flag", src: "/images/towns/profiles/bedford-town-seal.jpg" },
    ],
    localTake: "Unlike many towns in the area, Bedford has one school per grade range (Davis, Lane, John Glenn Middle and Bedford High), so every student moves through the same four schools from kindergarten through graduation.",
    sources: [
      { label: "Town of Bedford: About Bedford", url: "https://bedfordma.gov/398/About-Bedford" },
      { label: "Town of Bedford: tax rate", url: "https://bedfordma.gov/712/Tax-Rate" },
      { label: "Friends of Bedford Depot Park: rail trails", url: "https://bedforddepot.org/?p=240648" },
      { label: "The Bedford Citizen: Bedford Day", url: "https://thebedfordcitizen.org/2024/09/get-ready-for-a-bedford-day-filled-with-lots-of-fun-activities-a-parade-and-fireworks/" },
      { label: "Hanscom AFB: Bedford's annual founding celebration", url: "https://www.hanscom.af.mil/News/Article-Display/Article/1312341/bedford-prepares-for-annual-founding-celebration/" },
      { label: "Bedford Public Schools (Wikipedia): schools and grades", url: "https://en.wikipedia.org/wiki/Bedford_Public_Schools_(Massachusetts)" },
      { label: "Bedford, Massachusetts (Wikipedia): area, rivers, transit, Bedford Flag", url: "https://en.wikipedia.org/wiki/Bedford,_Massachusetts" },
    ],
  },
};

// Profiles are added in batches; each batch lives in its own file
export const townProfiles: Record<string, TownProfile> = {
  ...baseProfiles, ...batch1Profiles, ...batch2Profiles, ...batch3Profiles, ...batch4Profiles,
  ...batch5Profiles, ...batch6Profiles, ...batch7Profiles, ...batch8Profiles, ...batch9Profiles,
};
