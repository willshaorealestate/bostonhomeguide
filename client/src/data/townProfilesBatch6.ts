/*
 * townProfilesBatch6.ts — MetroWest: Framingham, Ashland, Hopkinton, Sherborn, Holliston, Southborough,
 * Westborough and Northborough. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch6Profiles: Record<string, TownProfile> = {
  framingham: {
    tagline: "A downtown on the commuter rail, a historic common, state parks and the Route 9 shopping corridor",
    glance: [
      pop("72,362"),
      { label: "Size", value: "26.5 sq mi" },
      from(20, "west"),
      { label: "Incorporated", value: "1700", note: "as a town; a city since 2018" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.83"),
    ],
    feel: [
      "Framingham was incorporated in 1700 and was the largest town in Massachusetts until it became a city in 2018. It has two historic centers: Framingham Centre, around the town common, and downtown Framingham, around the commuter rail station near Farm Pond.",
      "Framingham State University, which traces its roots to the country's first public teachers college in 1839, is in Framingham Centre, and the Danforth Art Museum is downtown. The Golden Triangle along Route 9 and Route 30 is one of the region's biggest shopping areas, and Callahan State Park has trails on the city's north side.",
    ],
    highlights: [
      { icon: "history", title: "Framingham Centre Common", text: "The historic common and the buildings around it." },
      { icon: "tree", title: "Callahan State Park", text: "Fields, ponds and trails on the city's north side." },
      { icon: "tree", title: "Garden in the Woods", text: "The Native Plant Trust's botanical garden." },
      { icon: "museum", title: "Danforth Art Museum", text: "An art museum and school in downtown Framingham." },
    ],
    events: [],
    gettingAround: [
      "MBTA Framingham/Worcester Line at Framingham",
      "Mass Pike, Route 9 and Routes 30, 126 and 135",
      "MetroWest Regional Transit Authority buses",
    ],
    photos: [],
    sources: [wiki("Framingham", "census, area, history, neighborhoods, arts and culture, parks"), DOR_TAX],
  },

  ashland: {
    tagline: "Two state parks, a commuter rail station and the original start line of the Boston Marathon",
    glance: [
      pop("18,832"),
      { label: "Size", value: "12.9 sq mi" },
      from(22, "west-southwest"),
      { label: "Incorporated", value: "1846", note: "named for Henry Clay's Kentucky estate" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.71"),
    ],
    feel: [
      "Ashland, once called Unionville, was formed in 1846 from parts of Framingham, Hopkinton and Holliston and named for Henry Clay's estate. The Boston Marathon started in Ashland until the start line moved to Hopkinton in 1924. The town has a stop on the Framingham/Worcester commuter rail line.",
      "Open land covers a large part of town. Ashland State Park has a reservoir with a beach and a loop trail, part of Hopkinton State Park is in Ashland, and the Ashland Town Forest and Warren Woods have hiking trails.",
    ],
    highlights: [
      { icon: "river", title: "Ashland State Park", text: "A reservoir with a beach, boat launch and loop trail." },
      { icon: "tree", title: "Ashland Town Forest", text: "Trails among rock outcroppings and small caves." },
      { icon: "tree", title: "Warren Woods", text: "Town land with trails, once owned by inventor Henry E. Warren." },
      { icon: "farm", title: "Ashland Farmers Market", text: "Saturdays from June to October, with about two dozen vendors." },
    ],
    events: [
      { name: "Farmers market", when: "Saturdays, June to October", text: "Held each year since 2012, with live music." },
    ],
    gettingAround: [
      "MBTA Framingham/Worcester Line at Ashland",
      "Routes 126 and 135",
      "Mass Pike and I-495 nearby",
    ],
    photos: [],
    sources: [wiki("Ashland", "census, area, history, farmers market, open space, transportation"), DOR_TAX],
  },

  hopkinton: {
    tagline: "The start line of the Boston Marathon, two state parks and the village of Woodville",
    glance: [
      pop("18,758"),
      { label: "Size", value: "28.2 sq mi" },
      from(27, "west-southwest"),
      { label: "Incorporated", value: "1715" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$14.10"),
    ],
    feel: [
      "Hopkinton has been the starting point of the Boston Marathon since 1924, with the start line on Main Street in the town center. The town was incorporated in 1715 on land bought with a fund left by Edward Hopkins for the benefit of Harvard.",
      "Hopkinton village sits at the center of town on Route 135, and the village of Woodville is a historic district. Hopkinton State Park and Whitehall State Park both grew out of old reservoirs, and I-495 runs north-south through the town.",
    ],
    highlights: [
      { icon: "trail", title: "Boston Marathon start", text: "The start line on Main Street, used every Patriots' Day since 1924." },
      { icon: "river", title: "Hopkinton State Park", text: "A former reservoir with swimming, boat rentals and horseback riding trails." },
      { icon: "river", title: "Whitehall State Park", text: "A park around the former Whitehall Reservoir, on Route 135." },
      { icon: "history", title: "Woodville Historic District", text: "A village of Hopkinton, made a historic district in 2005." },
    ],
    events: [
      { name: "Boston Marathon", when: "April (Patriots' Day)", text: "The race starts on Main Street in Hopkinton." },
    ],
    gettingAround: [
      "I-495 through town",
      "Routes 85 and 135",
      "MBTA commuter rail at Southborough and Ashland, nearby",
    ],
    photos: [],
    sources: [wiki("Hopkinton", "census, area, history, villages, state parks, Boston Marathon"), DOR_TAX],
  },

  sherborn: {
    tagline: "Farm Pond, the Charles River and a crossroads town center on Routes 16 and 27",
    glance: [
      pop("4,401"),
      { label: "Size", value: "16.2 sq mi" },
      from(18, "west-southwest"),
      { label: "Incorporated", value: "1674" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.66"),
    ],
    feel: [
      "Sherborn was settled in 1652 and incorporated in 1674. Its small town center sits where Routes 16 and 27 cross, and the town shares a regional school system with Dover.",
      "Most of the town's water is in Farm Pond, and the Charles River runs along its eastern side, where Rocky Narrows Reservation has trails above the river.",
    ],
    highlights: [
      { icon: "river", title: "Farm Pond", text: "The town's largest pond." },
      { icon: "tree", title: "Rocky Narrows Reservation", text: "Trails and lookouts along the Charles River." },
      { icon: "history", title: "Sherborn Center", text: "The town center at the crossing of Routes 16 and 27." },
    ],
    events: [],
    gettingAround: [
      "Routes 16 and 27",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Sherborn", "census, area, history, geography"), DOR_TAX],
  },

  holliston: {
    tagline: "Fiske's General Store, the Arch Bridge and a rail trail through town",
    glance: [
      pop("14,996"),
      { label: "Size", value: "19 sq mi" },
      from(22, "west-southwest"),
      { label: "Incorporated", value: "1724" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.29"),
    ],
    feel: [
      "Holliston was incorporated in 1724 and grew as a string of villages along the Boston and Albany Railroad's Milford line. The old rail bed is now the Upper Charles Trail, and Fiske's General Store, open since 1863, is the oldest business in town.",
      "The Bogastow Brook Viaduct, known locally as the Arch Bridge, is a stone railroad bridge off Woodland Street. Bullard Farm, settled by one of the town's first families in 1652, and Lake Winthrop are also in Holliston.",
    ],
    highlights: [
      { icon: "store", title: "Fiske's General Store", text: "Founded in 1863, the oldest retail business in town." },
      { icon: "history", title: "Arch Bridge", text: "The stone Bogastow Brook Viaduct, off Woodland Street." },
      { icon: "trail", title: "Upper Charles Trail", text: "A rail trail on the old Milford branch line." },
      { icon: "farm", title: "Bullard Farm", text: "A homestead established in 1652 and farmed until 1916." },
    ],
    events: [],
    gettingAround: [
      "Routes 16 and 126",
      "I-495 and the Mass Pike nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Holliston", "census, area, history, villages, points of interest"), DOR_TAX],
  },

  southborough: {
    tagline: "Three villages, the Sudbury Reservoir and a commuter rail stop, with a Heritage Day parade",
    glance: [
      pop("10,450"),
      { label: "Size", value: "15.7 sq mi" },
      from(24, "west"),
      { label: "Incorporated", value: "1727", note: "formerly part of Marlborough" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.36"),
    ],
    feel: [
      "Southborough split off as the \"south borough\" of Marlborough in 1727. It includes the villages of Cordaville, Fayville and Southville, and its name is often written \"Southboro\" on signs and maps.",
      "About 35 percent of the town is open space, and a tenth of its area is covered by the Sudbury Reservoir, which has a trail along its shore. The commuter rail stops at Southborough station in Cordaville, and I-495 and the Mass Pike both pass through town.",
    ],
    highlights: [
      { icon: "river", title: "Sudbury Reservoir", text: "A reservoir covering a tenth of the town, with a shoreline trail." },
      { icon: "tree", title: "Breakneck Hill", text: "Conservation land with trails." },
      { icon: "trail", title: "Boroughs Loop Trail", text: "A long-distance trail through Southborough and neighboring towns." },
    ],
    events: [
      { name: "Heritage Day", when: "Columbus Day weekend", text: "A town parade, with a run/walk and pumpkin carving in the week before." },
    ],
    gettingAround: [
      "MBTA Framingham/Worcester Line at Southborough",
      "Routes 9, 30 and 85",
      "I-495 and the Mass Pike pass through, without exits in town",
    ],
    photos: [],
    sources: [wiki("Southborough", "census, area, history, villages, points of interest, events, transportation"), DOR_TAX],
  },

  westborough: {
    tagline: "The headwaters of two rivers, Lake Chauncy and a commuter rail station near I-495 and the Pike",
    glance: [
      pop("21,567"),
      { label: "Size", value: "21.6 sq mi" },
      from(29, "west-southwest"),
      { label: "Incorporated", value: "1717" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$15.93"),
    ],
    feel: [
      "Westborough sits beside the interchange of I-495 and the Mass Pike. Its town center is a rotary where Route 30 (Main Street) meets Route 135, and the West Main Street Historic District runs west from it. Inventor Eli Whitney was born in Westborough.",
      "The Sudbury and Assabet rivers both begin in Westborough, and the town has many lakes and ponds. Lake Chauncy is open for swimming, boating and fishing, and Fay Mountain is the town's high point.",
    ],
    highlights: [
      { icon: "river", title: "Lake Chauncy", text: "A lake with swimming, boating and fishing." },
      { icon: "trail", title: "Westborough Charm Bracelet", text: "A trail system linking conservation areas around town." },
      { icon: "tree", title: "Assabet Reservoir", text: "Hiking trails around the reservoir." },
      { icon: "history", title: "West Main Street Historic District", text: "Historic homes along West Main Street." },
    ],
    events: [],
    gettingAround: [
      "MBTA Framingham/Worcester Line at Westborough",
      "I-495, the Mass Pike and Route 9",
      "Routes 30 and 135; WRTA buses",
    ],
    photos: [],
    sources: [wiki("Westborough", "census, area, geography, historic places, points of interest, transportation"), DOR_TAX],
  },

  northborough: {
    tagline: "Farms along Route 20, the Assabet River and a town center at Routes 20 and 135",
    glance: [
      pop("15,741"),
      { label: "Size", value: "18.8 sq mi" },
      from(30, "west"),
      { label: "Incorporated", value: "1766", note: "as a district of Westborough; a town since 1775" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.82"),
    ],
    feel: [
      "Northborough began as the northern district of Westborough in 1766 and became its own town in 1775. Its name is often written \"Northboro.\" The town center sits on Route 20, the old Boston Post Road.",
      "The Assabet River flows through town, and farms and orchards, including Tougas Family Farm, are part of the landscape. The New England Baseball Complex is at the junction of Routes 9 and 20.",
    ],
    highlights: [
      { icon: "farm", title: "Tougas Family Farm", text: "A pick-your-own fruit farm." },
      { icon: "river", title: "Assabet River", text: "The river flows through town toward Marlborough and Hudson." },
      { icon: "tree", title: "New England Baseball Complex", text: "A large baseball facility at Routes 9 and 20." },
    ],
    events: [],
    gettingAround: [
      "Routes 9, 20 and 135",
      "I-290 and I-495 nearby",
      "MBTA commuter rail at Westborough, nearby",
    ],
    photos: [],
    sources: [wiki("Northborough", "census, area, history, geography"), DOR_TAX],
  },
};
