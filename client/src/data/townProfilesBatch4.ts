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
      { label: "Incorporated", value: "1729", note: "formerly West Chelmsford" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$13.11"),
    ],
    feel: [
      "Westford began as West Chelmsford and became its own town in 1729. In the 1700s and 1800s it produced granite, apples and worsted yarn, and its village names still reflect that past: Forge Village, Graniteville, Nabnasset and Parker Village, plus the town center around Westford Common.",
      "Kimball Farm, with its ice cream stand and farm attractions, and the Nashoba Valley Ski Area are both in Westford, as is MIT's Haystack Observatory. The Bruce Freeman Rail Trail runs through town.",
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
      "Chelmsford was incorporated in 1655, and its militia fought at Lexington and Concord and at Bunker Hill. The town center, Central Square, sits in the Chelmsford Center Historic District, and the Old Chelmsford Garrison House from 1691 is now a museum.",
      "The Merrimack River runs along the town's northeast side and the Concord River along its eastern edge. I-495 and Route 3 cross in Chelmsford, and the Bruce Freeman Rail Trail starts at the Lowell line and runs south through town.",
    ],
    highlights: [
      { icon: "history", title: "Chelmsford Center Historic District", text: "The historic town center around Central Square." },
      { icon: "museum", title: "Old Chelmsford Garrison House", text: "A 1691 house, now a museum." },
      { icon: "trail", title: "Bruce Freeman Rail Trail", text: "A paved trail from the Lowell line south through Chelmsford." },
      { icon: "river", title: "Middlesex Canal", text: "A stretch of the 1802 canal that once linked the Merrimack River with Boston." },
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
      { label: "Incorporated", value: "1734", note: "formerly part of Billerica" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.56"),
    ],
    feel: [
      "Tewksbury was settled in 1637 and set off from Billerica in 1734. The Merrimack River forms part of its northern boundary, and the Shawsheen River runs through the southern end of town.",
      "Interstates 93 and 495 both run through Tewksbury. The town is home to Tewksbury Hospital, a state hospital whose Old Administration Building is a local landmark, and to the headquarters of the Market Basket supermarket chain.",
    ],
    highlights: [
      { icon: "river", title: "Merrimack and Shawsheen rivers", text: "The Merrimack along the north and the Shawsheen through the south of town." },
      { icon: "history", title: "Tewksbury Hospital", text: "A state hospital campus with a historic administration building." },
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
      { label: "Incorporated", value: "1730", note: "from parts of Woburn, Reading and Billerica" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.41"),
    ],
    feel: [
      "Wilmington was formed in 1730 from parts of Woburn, Reading and Billerica. Much of the town was built on wetlands; the Ipswich River begins here, and the Shawsheen River forms part of the border with Billerica. The Town Common and Rotary Park are in the center of town.",
      "The town has two commuter rail stations on two different lines: Wilmington station in the center on the Lowell Line, and North Wilmington on the Haverhill Line. Silver Lake has the town beach, a playground and two parks.",
    ],
    highlights: [
      { icon: "river", title: "Silver Lake", text: "The town beach, a playground, Fullerton Park and Landry Park." },
      { icon: "farm", title: "Baldwin Apple Monument", text: "Marks the site of the original Baldwin apple tree, on Chestnut Street." },
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
      { label: "Incorporated", value: "1642", note: "as a town; a city since 1889" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$9.15"),
    ],
    feel: [
      "Woburn was settled in 1640 near Horn Pond, a source of the Mystic River, and once included what are now Winchester, Burlington and parts of Stoneham and Wilmington. It became a city in 1889. The city's public library, designed by H. H. Richardson, sits near the city center.",
      "Horn Pond is the city's best-known open space, with a path around the water. A stretch of the Middlesex Canal passes by the 18th-century Baldwin House, and the Benjamin Thompson House is the birthplace of the scientist Count Rumford.",
    ],
    highlights: [
      { icon: "river", title: "Horn Pond", text: "A pond with walking paths, at the source of the Mystic River." },
      { icon: "museum", title: "Woburn Public Library", text: "The former Winn Memorial Library, designed by H. H. Richardson." },
      { icon: "history", title: "Middlesex Canal and Baldwin House", text: "A section of the 1803 canal beside a historic house." },
      { icon: "history", title: "Benjamin Thompson House", text: "Birthplace of Count Rumford." },
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
      { label: "Incorporated", value: "1725", note: "formerly part of Charlestown" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      tax("$10.06"),
    ],
    feel: [
      "Stoneham sits inside Route 128 on the north side of Boston, with two exits on I-93 and one on I-95. The town was part of Charlestown until it was incorporated in 1725.",
      "The Middlesex Fells Reservation covers the southern part of town, including Spot Pond and Bear Hill, and the Stone Zoo is in the Fells. The Tri-Community Greenway, a walking and biking path, connects Stoneham with Woburn and Winchester.",
    ],
    highlights: [
      { icon: "tree", title: "Middlesex Fells Reservation", text: "State woodland with trails, Spot Pond and Bear Hill." },
      { icon: "museum", title: "Stone Zoo", text: "A zoo in the Fells, run by Zoo New England." },
      { icon: "trail", title: "Tri-Community Greenway", text: "A path linking Stoneham with Woburn and Winchester." },
      { icon: "history", title: "Spot Pond Archeological District", text: "Traces of colonial history in the Fells." },
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
      "Reading was settled in the 1640s by families from Lynn. Its downtown grew up around the Common, where the meeting house was built in 1769, and today it has shops and restaurants near the commuter rail station.",
      "Reading sits near the junction of I-93 and I-95/Route 128. The town's oldest building, the Parker Tavern from 1694, is now a museum run by the Reading Antiquarian Society, and the Walnut Street School is home to a community theater.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Reading", text: "Shops and restaurants around the Common and the train station." },
      { icon: "museum", title: "Parker Tavern", text: "The town's oldest building, from 1694, now a museum." },
      { icon: "history", title: "Capt. Nathaniel Parker Red House", text: "The original town tavern, on the National Register of Historic Places." },
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
      { label: "Incorporated", value: "1853", note: "formerly part of Reading" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$13.02"),
    ],
    feel: [
      "North Reading began in 1651 as a land grant north of the Ipswich River given to the town of Reading. Farms along the river made up the early settlement, and the area became its own town in 1853.",
      "The Ipswich River still runs through the middle of town, with Ipswich River Park along its banks. Part of Harold Parker State Forest, with its ponds and trails, is in North Reading.",
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
