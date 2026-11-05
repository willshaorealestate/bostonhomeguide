/*
 * townProfilesBatch5.ts — North Shore edge and inner north: Melrose, Wakefield, Lynnfield, Andover,
 * North Andover, Medford and Malden. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch5Profiles: Record<string, TownProfile> = {
  melrose: {
    tagline: "A historic downtown, three commuter rail stops and the eastern edge of the Middlesex Fells",
    glance: [
      pop("29,817"),
      { label: "Size", value: "4.8 sq mi" },
      from(7, "north"),
      { label: "Incorporated", value: "1850", note: "a city since 1900" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.47"),
    ],
    feel: [
      "Melrose is a small, hilly city just north of Boston, with a historic Main Street downtown, tree-lined neighborhoods and Ell Pond near the center. The Middlesex Fells Reservation runs along its west side, with Mount Hood and Swains Pond on the east.",
      "Downtown Melrose, on the National Register of Historic Places, has shops and restaurants along Main Street, a short walk from the path around Ell Pond. Three commuter rail stations on the Haverhill Line serve the city, the Orange Line's Oak Grove station is at the Malden line, and Mount Hood has a city-owned golf course and park.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Melrose", text: "The city's Main Street downtown, on the National Register of Historic Places." },
      { icon: "river", title: "Ell Pond", text: "The city's largest pond, near the center of Melrose." },
      { icon: "tree", title: "Middlesex Fells and Pine Banks Park", text: "Woodland trails along the city's west side." },
      { icon: "tree", title: "Mount Hood", text: "A city-owned golf course and park on the east side, near Swains Pond." },
    ],
    events: [],
    gettingAround: [
      "MBTA Haverhill Line, three stations in Melrose",
      "Orange Line at Oak Grove, at the Malden line",
      "Route 99; I-93, I-95 and Route 1 nearby",
    ],
    photos: [],
    sources: [wiki("Melrose", "census, area, history, geography, historic places, transportation"), DOR_TAX],
  },

  wakefield: {
    tagline: "Lake Quannapowitt, a town common for summer concerts and two commuter rail stations",
    glance: [
      pop("27,090"),
      { label: "Size", value: "7.9 sq mi" },
      from(10, "north"),
      { label: "Incorporated", value: "1812" },
      { label: "Government", value: "Open Town Meeting", note: "with a Town Council and Town Administrator" },
      tax("$11.74"),
    ],
    feel: [
      "Wakefield is a suburban town built around Lake Quannapowitt, with the town common at the lake's southern end and a downtown along Main Street (Route 129). Greenwood, in the south, is the town's other village area, and I-95/Route 128 crosses the north side of town.",
      "The path around the lake is a popular loop for walking, running and biking, and the common hosts summer band concerts, Festival by the Lake in June, the Fourth of July parade and Festival Italia in August; a townwide Porchfest began in 2024. Two commuter rail stations, Wakefield and Greenwood, run trains to North Station.",
    ],
    highlights: [
      { icon: "river", title: "Lake Quannapowitt", text: "A lake with a popular path for walking, running and biking." },
      { icon: "history", title: "Town Common", text: "The central park at the south end of the lake, home to concerts and festivals." },
      { icon: "museum", title: "Lucius Beebe Memorial Library", text: "The town's public library." },
      { icon: "museum", title: "Wakefield History Museum", text: "On Prospect Street." },
    ],
    events: [
      { name: "Festival by the Lake", when: "Second Saturday in June", text: "A day-long festival on the common." },
      { name: "Fourth of July parade", when: "July 4", text: "The Independence Day parade and Home Town March." },
      { name: "Concerts on the Common", when: "July to September", text: "A summer band concert series." },
      { name: "Festival Italia", when: "August", text: "Usually the third Saturday in August." },
    ],
    gettingAround: [
      "MBTA Haverhill Line at Wakefield and Greenwood",
      "I-95/Route 128, with several exits",
      "Route 129 as Main Street",
    ],
    photos: [],
    sources: [wiki("Wakefield", "census, area, history, points of interest, annual events, transportation"), DOR_TAX],
  },

  lynnfield: {
    tagline: "Two village centers, lakes and ponds, and MarketStreet shopping at Route 128",
    glance: [
      pop("13,000"),
      { label: "Size", value: "10.5 sq mi" },
      from(13, "north"),
      { label: "Incorporated", value: "1814" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$11.46"),
    ],
    feel: [
      "Lynnfield is a wooded suburban town with two village centers, Lynnfield Center and South Lynnfield, and lakes and ponds spread through it, including Suntaug Lake and Pillings Pond. The Ipswich River forms its northern border, and part of Lynn Woods covers the southeast corner.",
      "MarketStreet Lynnfield, an outdoor center with more than 80 shops and restaurants and a winter ice rink, sits at Route 128, and Route 1 runs through South Lynnfield. There is no commuter rail station, so most trips are by car on Route 128 and Route 1.",
    ],
    highlights: [
      { icon: "store", title: "MarketStreet Lynnfield", text: "An outdoor shopping and dining center at Route 128." },
      { icon: "river", title: "Suntaug Lake and Pillings Pond", text: "Two of the town's lakes and ponds." },
      { icon: "tree", title: "Lynn Woods Reservation", text: "Part of the large woodland reservation is in Lynnfield's southeast corner." },
      { icon: "river", title: "Ipswich River", text: "Forms the town's northern border." },
    ],
    events: [],
    gettingAround: [
      "I-95/Route 128 and US Route 1",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Lynnfield", "census, area, history, villages, geography, transportation"), DOR_TAX],
  },

  andover: {
    tagline: "Two commuter rail stops, 3,000 acres of conservation land and Phillips Academy's Addison Gallery",
    glance: [
      pop("36,569"),
      { label: "Size", value: "32.1 sq mi" },
      from(21, "north-northwest"),
      { label: "Incorporated", value: "1646" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.31"),
    ],
    feel: [
      "Andover is a large town with a classic New England downtown along Main Street, the village of Ballardvale on the Shawsheen River, and wide stretches of woods and conservation land. About 3,000 acres are protected by the town and the Andover Village Improvement Society.",
      "Downtown has shops and restaurants close to the Andover commuter rail station, and Phillips Academy's campus, with the Addison Gallery of American Art, sits on the hill just south of it. AVIS reservations and Harold Parker State Forest offer miles of trails, and Pomps Pond has a town beach.",
    ],
    highlights: [
      { icon: "museum", title: "Addison Gallery of American Art", text: "A museum on the Phillips Academy campus, open to the public." },
      { icon: "tree", title: "AVIS reservations", text: "Trails across land protected by the Andover Village Improvement Society." },
      { icon: "tree", title: "Harold Parker State Forest", text: "State forest on the Andover, North Reading and Middleton line." },
      { icon: "river", title: "Pomps Pond", text: "The town beach." },
    ],
    events: [],
    gettingAround: [
      "MBTA Haverhill Line at Andover and Ballardvale",
      "I-93 and I-495 meet in town",
      "Routes 28, 125 and 133",
    ],
    photos: [],
    sources: [wiki("Andover", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },

  "north-andover": {
    tagline: "Lake Cochichewick, hilltop reservations and Merrimack College, along the Merrimack River",
    glance: [
      pop("30,915"),
      { label: "Size", value: "27.8 sq mi" },
      from(21, "north"),
      { label: "Incorporated", value: "1855" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.24"),
    ],
    feel: [
      "North Andover is a large town of hills, woods and farmland along the Merrimack River, with Lake Cochichewick filling much of its northeast. It has two centers: the downtown on Main Street and the Old Center, a historic district around the town common.",
      "Events gather at the Old Center, including a sheep shearing festival each spring, and the North Andover Youth Center is there too. Weir Hill and Osgood Hill have trails along the lake, and Harold Parker State Forest has trails, a campground and a swimming beach. Merrimack College is in town, and commuter rail is nearby in Andover and Lawrence.",
    ],
    highlights: [
      { icon: "river", title: "Lake Cochichewick", text: "A large lake in the northeast of town." },
      { icon: "tree", title: "Weir Hill and Osgood Hill", text: "Two reservations with trails along the lake." },
      { icon: "tree", title: "Harold Parker State Forest", text: "State forest with ponds and trails, partly in North Andover." },
      { icon: "school", title: "Merrimack College", text: "A college with its campus in North Andover." },
    ],
    events: [],
    gettingAround: [
      "I-495 and Routes 114, 125 and 133",
      "MBTA commuter rail at Andover and Lawrence, nearby",
    ],
    photos: [],
    sources: [wiki("North Andover", "census, area, history, geography, government"), DOR_TAX],
  },

  medford: {
    tagline: "The Mystic River, the Middlesex Fells and the Green Line, home to most of Tufts University",
    glance: [
      pop("59,659"),
      { label: "Size", value: "8.7 sq mi" },
      from(5, "north-northwest"),
      { label: "Incorporated", value: "1630", note: "a city since 1892" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$8.63"),
    ],
    feel: [
      "Medford is a small city on both sides of the Mystic River, with Medford Square as its traditional downtown and neighborhood centers such as West Medford and Medford Hillside. The Middlesex Fells Reservation covers much of the north side of the city.",
      "Parks and paths follow the Mystic River, and the Fells has trails and reservoirs close to many neighborhoods. Most of Tufts University's campus is in Medford, and the Green Line's Medford/Tufts station and the West Medford commuter rail stop connect the city to Boston, with I-93 running through it.",
    ],
    highlights: [
      { icon: "river", title: "Mystic River", text: "Flows through the middle of the city, with parks along its banks." },
      { icon: "tree", title: "Middlesex Fells Reservation", text: "Woodland trails on the city's north side." },
      { icon: "museum", title: "Royall House and Slave Quarters", text: "A 1692 house museum, with the only surviving slave quarters in Massachusetts." },
      { icon: "school", title: "Tufts University", text: "Most of the campus is in Medford." },
    ],
    events: [],
    gettingAround: [
      "MBTA Green Line at Medford/Tufts",
      "MBTA Lowell Line at West Medford",
      "I-93 and Routes 16, 28, 38 and 60",
    ],
    photos: [],
    sources: [wiki("Medford", "census, area, history, geography, points of interest"), DOR_TAX],
  },

  malden: {
    tagline: "Two Orange Line stations, an H. H. Richardson library and the edge of the Middlesex Fells",
    glance: [
      pop("66,263"),
      { label: "Size", value: "5.1 sq mi" },
      from(5, "north"),
      { label: "Incorporated", value: "1649", note: "a city since 1882" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.40"),
    ],
    feel: [
      "Malden is a hilly, densely built city just north of Boston, with a downtown around Malden Center and the Middlesex Fells rising in its northwest corner. It has about 30 parks, from neighborhood playgrounds to Fellsmere Pond and Pine Banks Park.",
      "Malden Center, with the H. H. Richardson library, shops and restaurants, sits on both the Orange Line and the commuter rail, and Oak Grove station serves the north end of the city. The Northern Strand Trail, also called Bike to the Sea, runs from Malden toward the coast.",
    ],
    highlights: [
      { icon: "museum", title: "Converse Memorial Library", text: "The public library, designed by H. H. Richardson and built in 1885." },
      { icon: "tree", title: "Middlesex Fells Reservation", text: "Cliffs and trails in the city's northwest corner." },
      { icon: "tree", title: "Pine Banks Park", text: "A park shared with Melrose." },
      { icon: "trail", title: "Northern Strand Trail", text: "A rail trail from Malden toward the coast, also called Bike to the Sea." },
    ],
    events: [],
    gettingAround: [
      "MBTA Orange Line at Malden Center and Oak Grove",
      "MBTA Haverhill Line at Malden Center",
      "US Route 1 and Routes 28, 60 and 99",
    ],
    photos: [],
    sources: [wiki("Malden", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },
};
