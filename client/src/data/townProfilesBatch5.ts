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
      { label: "Incorporated", value: "1850", note: "as a town; a city since 1900" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.47"),
    ],
    feel: [
      "Melrose was part of Charlestown and then Malden before it became a town in 1850 and a city in 1900. Its early name, \"Ponde Fielde,\" came from its many ponds and streams. Downtown Melrose is listed on the National Register of Historic Places, as is the public library.",
      "Ell Pond sits near the center of the city, and the eastern reaches of the Middlesex Fells Reservation run along its west side. The city has three stations on the commuter rail's Haverhill Line, and the Orange Line's Oak Grove station is just over the line in Malden.",
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
      { label: "Incorporated", value: "1812", note: "as South Reading; renamed Wakefield in 1868" },
      { label: "Government", value: "Open Town Meeting", note: "with a Town Council and Town Administrator" },
      tax("$11.74"),
    ],
    feel: [
      "Wakefield was settled in 1638 as Lynn Village, became South Reading in 1812 and took the name Wakefield in 1868. The town common, at the southern end of Lake Quannapowitt, is the center of town life.",
      "The path around Lake Quannapowitt is a local favorite for walking, running and biking, and the common hosts summer concerts and festivals. The town has two commuter rail stations, Wakefield and Greenwood, and I-95/Route 128 runs through with several exits.",
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
      { label: "Incorporated", value: "1814", note: "a district separate from Lynn from 1782" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$11.46"),
    ],
    feel: [
      "Lynnfield grew as two villages under one town government: Lynnfield Center, which was mostly farmland, and South Lynnfield, a crossroads between larger neighboring towns. The two still have their own post offices and ZIP codes.",
      "The Ipswich River forms the town's northern border, and lakes and ponds cover more than 5 percent of the town, including Suntaug Lake and Pillings Pond. Part of Lynn Woods Reservation is in the southeast corner. Route 1 and I-95/Route 128 both run through town.",
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
      "Andover was settled in 1642 and incorporated in 1646. Its downtown runs along Main Street (Route 28), and the town also includes the village of Ballardvale. Phillips Academy, founded in 1778, has its campus in town, and its Addison Gallery of American Art is open to the public.",
      "Land conservation has a long history here: the Andover Village Improvement Society is the second-oldest land preservation society in the country, and together with the town it owns about 3,000 acres. The Shawsheen River runs through town, and I-93 and I-495 meet in Andover.",
    ],
    highlights: [
      { icon: "museum", title: "Addison Gallery of American Art", text: "A museum on the Phillips Academy campus, open to the public." },
      { icon: "tree", title: "AVIS reservations", text: "Trails across land protected by the Andover Village Improvement Society." },
      { icon: "tree", title: "Harold Parker State Forest", text: "State forest on the Andover, North Reading and Middleton line." },
      { icon: "history", title: "Chandler-Bigsby-Abbot House", text: "Built in 1673, the oldest house in Andover." },
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
      { label: "Incorporated", value: "1855", note: "formerly part of Andover" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.24"),
    ],
    feel: [
      "North Andover was the original village of Andover and became its own town in 1855. The Merrimack River forms part of its northwestern boundary, and Merrimack College has its campus in town.",
      "Lake Cochichewick fills much of the northeastern part of town, bordered by the Osgood Hill and Weir Hill reservations and the Reas Pond conservation area. Part of Harold Parker State Forest is in North Andover's south end.",
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
      "Medford was settled in 1630 and built clipper ships along the Mystic River in the 1800s. The Mystic still flows through the middle of the city, and the Old Ship Street Historic District keeps many of the historic homes from that era. A historical marker on High Street marks where \"Jingle Bells\" is said to have been written.",
      "Most of Tufts University's campus is in Medford, on the Somerville line, and the Green Line now reaches Medford/Tufts station. The Middlesex Fells Reservation covers much of the city's north side.",
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
      { label: "Incorporated", value: "1649", note: "as a town; a city since 1882" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.40"),
    ],
    feel: [
      "Malden is a hilly city north of the Mystic River, settled in 1640 as part of Charlestown and incorporated in 1649. It became a city in 1882. The Converse Memorial Library, designed by H. H. Richardson and built in 1885, is one of its best-known landmarks.",
      "The Middlesex Fells Reservation forms the city's northwest corner, where Boojum Rock is Malden's highest point. The Orange Line stops at Malden Center and Oak Grove, and the city has about 30 parks.",
    ],
    highlights: [
      { icon: "museum", title: "Converse Memorial Library", text: "The public library, designed by H. H. Richardson and built in 1885." },
      { icon: "tree", title: "Middlesex Fells Reservation", text: "Cliffs and trails in the city's northwest corner." },
      { icon: "tree", title: "Pine Banks Park", text: "A park shared with Melrose." },
      { icon: "river", title: "Fellsmere Pond", text: "A pond and surrounding park in Malden." },
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
