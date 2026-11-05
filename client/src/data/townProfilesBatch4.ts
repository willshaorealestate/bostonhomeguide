/*
 * townProfilesBatch4.ts — North / Route 3 and I-93: Westford, Chelmsford, Tewksbury, Wilmington,
 * Woburn, Stoneham, Reading and North Reading. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch4Profiles: Record<string, TownProfile> = {
  westford: {
    tagline: "Kimball Farm, a ski area and a historic town common, with five village areas",
    glance: [
      pop("24,643"),
      { label: "Size", value: "31.3 sq mi" },
      from(26, "northwest"),
      { label: "Incorporated", value: "1729" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$13.11"),
    ],
    feel: [
      "Westford is a large town of orchards, ponds and wooded hills spread across several village areas: Forge Village, Graniteville, Nabnasset, Parker Village and the center around Westford Common. I-495 runs through the middle of town, and US Route 3 crosses its eastern edge.",
      "Westford Common is the traditional heart of town. Kimball Farm, with its ice cream stand and seasonal attractions, draws crowds in summer, Nashoba Valley Ski Area runs in winter, and the Bruce Freeman Rail Trail runs north-south for walking and biking. There is no commuter rail station; LRTA buses connect to the Lowell station.",
    ],
    highlights: [
      { icon: "farm", title: "Kimball Farm", text: "A farm with an ice cream stand and seasonal attractions." },
      { icon: "tree", title: "Nashoba Valley Ski Area", text: "A ski and snow-tubing area." },
      { icon: "trail", title: "Bruce Freeman Rail Trail", text: "A paved rail trail running through Westford between Chelmsford and Carlisle." },
      { icon: "history", title: "Westford Common", text: "The historic town center on Main Street." },
    ],
    events: [],
    gettingAround: [
      "I-495 through town; US Route 3 nearby",
      "Routes 40, 110 and 225",
      "LRTA bus to the Lowell commuter rail station",
    ],
    photos: [],
    sources: [wiki("Westford", "census, area, history, villages, points of interest, transportation"), DOR_TAX],
  },

  chelmsford: {
    tagline: "Where I-495 meets Route 3, with a historic center, the Middlesex Canal and a rail trail",
    glance: [
      pop("36,392"),
      { label: "Size", value: "23.1 sq mi" },
      from(22, "northwest"),
      { label: "Incorporated", value: "1655" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$13.27"),
    ],
    feel: [
      "Chelmsford is a large suburban town at the crossing of I-495 and Route 3, with a town center at Central Square and smaller village areas in North, South, East and West Chelmsford. The Merrimack and Concord rivers run along its northern and eastern edges.",
      "Central Square has shops, restaurants and the town's historic buildings, and the Bruce Freeman Rail Trail starts at the Lowell line and runs south past the center. Six state routes cross town along with I-495 and Route 3, and LRTA buses connect to the commuter rail in Lowell.",
    ],
    highlights: [
      { icon: "history", title: "Chelmsford Center Historic District", text: "The historic town center around Central Square." },
      { icon: "museum", title: "Old Chelmsford Garrison House", text: "A 1691 house, now a museum." },
      { icon: "trail", title: "Bruce Freeman Rail Trail", text: "A paved trail from the Lowell line south through Chelmsford." },
      { icon: "river", title: "Merrimack and Concord rivers", text: "Along the town's northern and eastern edges." },
    ],
    events: [],
    gettingAround: [
      "I-495 and US Route 3",
      "Routes 3A, 4, 27, 40, 110 and 129",
      "LRTA buses to the Lowell commuter rail station",
    ],
    photos: [],
    sources: [wiki("Chelmsford", "census, area, history, historic places, transportation"), DOR_TAX],
  },

  tewksbury: {
    tagline: "Between the Merrimack and Shawsheen rivers, where I-93 meets I-495",
    glance: [
      pop("31,342"),
      { label: "Size", value: "21.1 sq mi" },
      from(20, "north-northwest"),
      { label: "Incorporated", value: "1734" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.56"),
    ],
    feel: [
      "Tewksbury is a broad suburban town between the Merrimack River on the north and the Shawsheen River in the south, with I-93 and I-495 running through it. Neighborhoods spread out from the Town Common and along the main roads, Routes 38 and 133.",
      "The Town Common, with town hall nearby, is the civic center, and shopping and services line Route 38. The Market Basket supermarket chain is headquartered in town. LRTA buses connect to the Lowell and Wilmington commuter rail stations.",
    ],
    highlights: [
      { icon: "river", title: "Merrimack and Shawsheen rivers", text: "The Merrimack along the north and the Shawsheen through the south of town." },
      { icon: "history", title: "Town Common", text: "The civic center of town." },
      { icon: "store", title: "Market Basket headquarters", text: "The regional supermarket chain is based in Tewksbury." },
    ],
    events: [],
    gettingAround: [
      "I-93 and I-495",
      "Routes 38 and 133",
      "LRTA bus to Lowell and the Wilmington commuter rail station",
    ],
    photos: [],
    sources: [wiki("Tewksbury", "census, area, history, geography, hospital, transportation"), DOR_TAX],
  },

  wilmington: {
    tagline: "Two commuter rail stations, a lake beach on Silver Lake and the source of the Ipswich River",
    glance: [
      pop("23,349"),
      { label: "Size", value: "17.2 sq mi" },
      from(14, "north-northwest"),
      { label: "Incorporated", value: "1730" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.41"),
    ],
    feel: [
      "Wilmington is a wooded suburban town with wetlands, brooks and Silver Lake spread through it; the Ipswich River begins here. I-93 runs through town, and neighborhoods spread out from the Town Common, Silver Lake and North Wilmington.",
      "The center has the Town Common, Rotary Park and the library, and Yentile Farm is a large public recreation area nearby. In summer the town beach on Silver Lake opens for swimming, and Ristuccia Ice Arena offers skating and lessons. Two commuter rail stations, on the Lowell and Haverhill lines, put the train within reach of most of town.",
    ],
    highlights: [
      { icon: "river", title: "Silver Lake", text: "The town beach, a playground, Fullerton Park and Landry Park." },
      { icon: "tree", title: "Ristuccia Ice Arena", text: "An ice rink with public skating and lessons." },
      { icon: "tree", title: "Yentile Farm Recreational Facility", text: "A large public recreation area near the town center." },
      { icon: "history", title: "Town Common", text: "The Town Common and Rotary Park in the center of town." },
    ],
    events: [],
    gettingAround: [
      "MBTA Lowell Line at Wilmington; Haverhill Line at North Wilmington",
      "I-93 through town",
      "Routes 38, 62 and 129",
    ],
    photos: [],
    sources: [wiki("Wilmington", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },

  woburn: {
    tagline: "Horn Pond, the Middlesex Canal and a transit hub with Amtrak and commuter rail",
    glance: [
      pop("40,876"),
      { label: "Size", value: "12.9 sq mi" },
      from(10, "north-northwest"),
      { label: "Incorporated", value: "1642", note: "a city since 1889" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$9.15"),
    ],
    feel: [
      "Woburn is a small city at the crossing of I-93 and I-95, with a traditional downtown around its library, neighborhoods on the surrounding hills, and office parks and shopping near the highways. Horn Pond, on the west side, is its best-known open space.",
      "The path around Horn Pond is a favorite for walkers and runners, and Horn Pond Mountain above it has trails with views. Downtown has shops and restaurants along Main Street, and the H. H. Richardson library is a city landmark. The Anderson Regional Transportation Center offers commuter rail, Amtrak and airport buses.",
    ],
    highlights: [
      { icon: "river", title: "Horn Pond", text: "A pond with walking paths, at the source of the Mystic River." },
      { icon: "museum", title: "Woburn Public Library", text: "The former Winn Memorial Library, designed by H. H. Richardson." },
      { icon: "history", title: "Middlesex Canal and Baldwin House", text: "A section of the 1803 canal beside a historic house." },
      { icon: "store", title: "Downtown Woburn", text: "Shops and restaurants along Main Street." },
    ],
    events: [],
    gettingAround: [
      "Anderson Regional Transportation Center: MBTA Lowell Line, Amtrak Downeaster and airport buses",
      "I-93 and I-95/Route 128",
      "MBTA bus routes",
    ],
    photos: [],
    sources: [wiki("Woburn", "census, area, history, points of interest, transportation"), DOR_TAX],
  },

  stoneham: {
    tagline: "The Stone Zoo, the Middlesex Fells and a town center inside Route 128",
    glance: [
      pop("23,244"),
      { label: "Size", value: "6.7 sq mi" },
      from(9, "north"),
      { label: "Incorporated", value: "1725" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      tax("$10.06"),
    ],
    feel: [
      "Stoneham is a compact town just north of Boston, inside Route 128, with a traditional town center and Town Common. The southern part of town is woodland in the Middlesex Fells Reservation, around Spot Pond and Bear Hill.",
      "The Fells puts hiking, mountain biking and Spot Pond's shoreline close by, and the Stone Zoo is in the Fells. The Tri-Community Greenway links the center with Woburn and Winchester for walking and biking, the 132 bus connects to the Orange Line, and I-93 and I-95 both have exits in town.",
    ],
    highlights: [
      { icon: "tree", title: "Middlesex Fells Reservation", text: "State woodland with trails, Spot Pond and Bear Hill." },
      { icon: "museum", title: "Stone Zoo", text: "A zoo in the Fells, run by Zoo New England." },
      { icon: "trail", title: "Tri-Community Greenway", text: "A path linking Stoneham with Woburn and Winchester." },
      { icon: "history", title: "Town Common", text: "The town center, inside Route 128." },
    ],
    events: [],
    gettingAround: [
      "I-93 and I-95/Route 128",
      "Route 28 through town",
      "MBTA 132 bus to the Orange Line at Oak Grove and Malden Center",
    ],
    photos: [],
    sources: [wiki("Stoneham", "census, area, history, geography, transportation"), DOR_TAX],
  },

  reading: {
    tagline: "A downtown on the commuter rail, the 1694 Parker Tavern, and I-93 and Route 128 at the edge of town",
    glance: [
      pop("25,518"),
      { label: "Size", value: "9.9 sq mi" },
      from(13, "north"),
      { label: "Incorporated", value: "1644" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$10.96"),
    ],
    feel: [
      "Reading is a suburban town with a walkable downtown on Main Street (Route 28) around the Common and the commuter rail station. Neighborhoods spread out from the center, with conservation land in several areas, and I-93 and Route 128 meet at the edge of town.",
      "Downtown has shops and restaurants within walking distance of the train to North Station, and more shopping sits around Walkers Brook Drive. Burbank Arena has an ice rink, the Parker Tavern museum opens its 1694 building to visitors, and the Walnut Street School is home to a community theater.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Reading", text: "Shops and restaurants around the Common and the train station." },
      { icon: "museum", title: "Parker Tavern", text: "The town's oldest building, from 1694, now a museum." },
      { icon: "tree", title: "Burbank Arena", text: "The town's ice rink." },
      { icon: "school", title: "Walnut Street School", text: "A historic school building, now home to a community theater." },
    ],
    events: [],
    gettingAround: [
      "MBTA Haverhill Line at Reading",
      "I-93 and I-95/Route 128",
      "Route 28 through downtown",
    ],
    photos: [],
    sources: [wiki("Reading", "census, area, history, points of interest, transportation"), DOR_TAX],
  },

  "north-reading": {
    tagline: "The Ipswich River and part of Harold Parker State Forest, set off from Reading in 1853",
    glance: [
      pop("15,554"),
      { label: "Size", value: "13.5 sq mi" },
      from(15, "north"),
      { label: "Incorporated", value: "1853" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$13.02"),
    ],
    feel: [
      "North Reading is a wooded suburban town along the Ipswich River, with neighborhoods set among trees and conservation land and a small town center.",
      "The Ipswich River runs through the middle of town, with Ipswich River Park on its banks for sports and recreation, and part of Harold Parker State Forest, with ponds, trails, camping and a swimming beach, is in North Reading. Routes 28 and 62 are the main roads, and I-93 is just west of town.",
    ],
    highlights: [
      { icon: "river", title: "Ipswich River", text: "The river that runs through town, with Ipswich River Park on its banks." },
      { icon: "tree", title: "Harold Parker State Forest", text: "State forest with ponds and trails, partly in North Reading." },
    ],
    events: [],
    gettingAround: [
      "Routes 28 and 62",
      "I-93 nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("North Reading", "census, area, history"), DOR_TAX],
  },
};
