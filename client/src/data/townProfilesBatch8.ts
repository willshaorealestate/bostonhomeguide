/*
 * townProfilesBatch8.ts — South: Dedham, Westwood, Norwood, Canton, Sharon, Stoughton, Milton,
 * Braintree and Quincy. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch8Profiles: Record<string, TownProfile> = {
  dedham: {
    tagline: "Dedham Square, Legacy Place and the Charles River, on Boston's southwest border",
    glance: [
      pop("25,364"),
      { label: "Size", value: "10.6 sq mi" },
      from(10, "southwest"),
      { label: "Incorporated", value: "1636" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.30"),
    ],
    feel: [
      "Dedham sits on Boston's southwest border along the Charles River, with two historic centers, Dedham Square and East Dedham, and neighborhoods spreading out between them. Legacy Place and the Route 1 corridor are its main shopping areas.",
      "Dedham Square has shops, restaurants, the Dedham Community Theatre and the Norfolk County courthouse, and the town-owned Endicott Estate hosts events in its gardens. Two commuter rail stations, Endicott and Dedham Corporate Center, run to Boston, and MBTA buses connect to Forest Hills.",
    ],
    highlights: [
      { icon: "history", title: "Fairbanks House", text: "The oldest surviving timber-frame house in the United States." },
      { icon: "store", title: "Dedham Square", text: "The historic town center around the Norfolk County Courthouse." },
      { icon: "tree", title: "Endicott Estate", text: "A town-owned estate whose house and gardens host events." },
      { icon: "store", title: "Legacy Place", text: "An outdoor shopping and dining center." },
    ],
    events: [],
    gettingAround: [
      "MBTA Franklin/Foxboro Line at Endicott and Dedham Corporate Center",
      "I-95/Route 128, US Route 1 and Route 1A",
      "MBTA bus routes to Forest Hills",
    ],
    photos: [],
    sources: [wiki("Dedham", "census, area, history, points of interest, transportation"), DOR_TAX],
  },

  westwood: {
    tagline: "The 1,137-acre Hale reservation, wooded neighborhoods and Route 128 station",
    glance: [
      pop("16,266"),
      { label: "Size", value: "11.1 sq mi" },
      from(12, "southwest"),
      { label: "Incorporated", value: "1897" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$12.87"),
    ],
    feel: [
      "Westwood is a wooded suburban town with a small town center, neighborhoods set among trees, and a large share of open land, including the 1,137-acre Hale reservation. Its far eastern corner is a transportation hub at Route 128 station.",
      "Hale has ponds, beaches and miles of walking trails, and Buckmaster Pond is another local spot. University Station, beside Route 128 station, has shops and restaurants. Commuters can take Amtrak or the Providence Line from Route 128 station, the Franklin Line from Islington, or I-95/Route 128.",
    ],
    highlights: [
      { icon: "tree", title: "Hale", text: "A 1,137-acre reservation with ponds, beaches and walking trails." },
      { icon: "store", title: "University Station", text: "Shops and restaurants next to Route 128 station." },
      { icon: "river", title: "Buckmaster Pond", text: "One of the town's ponds." },
    ],
    events: [],
    gettingAround: [
      "Route 128 station: Amtrak and MBTA Providence/Stoughton Line",
      "MBTA Franklin/Foxboro Line at Islington",
      "I-95/Route 128 and Route 109",
    ],
    photos: [],
    sources: [wiki("Westwood", "census, area, history, points of interest, transportation"), DOR_TAX],
  },

  norwood: {
    tagline: "Three commuter rail stations, a downtown on Washington Street and the Neponset River",
    glance: [
      pop("31,611"),
      { label: "Size", value: "10.6 sq mi" },
      from(14, "south-southwest"),
      { label: "Incorporated", value: "1872" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board" },
      tax("$9.82"),
    ],
    feel: [
      "Norwood is a suburban town along the Neponset River, with a busy downtown on Washington Street around the town common and neighborhoods spreading out from it. US Route 1 runs through the east side of town, lined with shopping and car dealerships.",
      "Downtown has shops and restaurants near Norwood Central, one of three commuter rail stations in town. The Skating Club of Boston's rink and training center opened in Norwood in 2020, Norwood Memorial Airport serves small planes, and I-95 has an exit in town.",
    ],
    highlights: [
      { icon: "store", title: "Norwood Center", text: "The downtown along Washington Street." },
      { icon: "river", title: "Neponset River", text: "Runs along the town on its way to Boston Harbor." },
      { icon: "tree", title: "Skating Club of Boston", text: "A rink and training center that opened in Norwood in 2020." },
      { icon: "plane", title: "Norwood Memorial Airport", text: "A general aviation airport." },
    ],
    events: [],
    gettingAround: [
      "MBTA Franklin/Foxboro Line, three stations in Norwood",
      "US Route 1 and I-95",
      "MBTA bus on Washington Street",
    ],
    photos: [],
    sources: [wiki("Norwood", "census, area, history, transportation, points of interest"), DOR_TAX],
  },

  canton: {
    tagline: "At the foot of Great Blue Hill, with the 1835 Canton Viaduct and two commuter rail stops",
    glance: [
      pop("24,370"),
      { label: "Size", value: "19.6 sq mi" },
      from(13, "south-southwest"),
      { label: "Incorporated", value: "1797" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$9.75"),
    ],
    feel: [
      "Canton sits at the foot of Great Blue Hill, with the Blue Hills Reservation along its northern edge and the Canton River linking a chain of ponds through the center of town. Neighborhoods spread out from Canton Center and Canton Corner, and the Neponset River forms the western border.",
      "The Blue Hills offer hiking, and the Blue Hills Ski Area runs in winter. Mass Audubon's Museum of American Bird Art and the Bradley Estate's gardens are open to visitors. Two commuter rail stations, Canton Junction and Canton Center, run to Boston, and I-93, I-95 and Route 128 all meet in town.",
    ],
    highlights: [
      { icon: "history", title: "Canton Viaduct", text: "An 1835 stone railroad bridge still carrying trains." },
      { icon: "tree", title: "Blue Hills Reservation", text: "Great Blue Hill and its trails rise along the town's northern edge." },
      { icon: "museum", title: "Museum of American Bird Art", text: "Mass Audubon's art museum and wildlife sanctuary." },
      { icon: "tree", title: "Blue Hills Ski Area", text: "A ski area on the Blue Hills." },
    ],
    events: [],
    gettingAround: [
      "MBTA Providence/Stoughton Line at Canton Junction and Canton Center",
      "I-93, I-95 and Route 128 meet in Canton",
      "Route 138",
    ],
    photos: [],
    sources: [wiki("Canton", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },

  sharon: {
    tagline: "Lake Massapoag, Moose Hill and Borderland, with a commuter rail stop to Boston and Providence",
    glance: [
      pop("18,575"),
      { label: "Size", value: "24.2 sq mi" },
      from(18, "south-southwest"),
      { label: "Incorporated", value: "1775" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$17.15"),
    ],
    feel: [
      "Sharon is a wooded town built around Lake Massapoag, with a small town center on Route 27 and a large share of conservation land.",
      "The lake has a town beach for swimming and boating, and trails cross the town, including the Massapoag Trail, the Warner Trail and the Bay Circuit Trail. Moose Hill Wildlife Sanctuary and part of Borderland State Park are here, and the commuter rail station runs trains to Boston and Providence.",
    ],
    highlights: [
      { icon: "river", title: "Lake Massapoag", text: "A lake with a town beach, swimming and boating." },
      { icon: "tree", title: "Moose Hill Wildlife Sanctuary", text: "Mass Audubon trails through woods and fields." },
      { icon: "tree", title: "Borderland State Park", text: "Ponds, trails and a historic mansion, partly in Sharon." },
      { icon: "trail", title: "Warner and Bay Circuit trails", text: "Long-distance trails crossing Sharon's conservation land." },
    ],
    events: [],
    gettingAround: [
      "MBTA Providence/Stoughton Line at Sharon",
      "Route 27 through the town center to Route 1",
      "I-95 nearby",
    ],
    photos: [],
    sources: [wiki("Sharon", "census, area, history, geography, parks, transportation"), DOR_TAX],
  },

  stoughton: {
    tagline: "A commuter rail town center, Ames Long Pond and a Fourth of July parade",
    glance: [
      pop("29,281"),
      { label: "Size", value: "16.3 sq mi" },
      from(17, "south"),
      { label: "Incorporated", value: "1726" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.81"),
    ],
    feel: [
      "Stoughton is a suburban town with a downtown around Stoughton Center and its commuter rail station, neighborhoods spreading out from it, and protected open space including Ames Long Pond, the Bird Street Sanctuary and a municipal golf course.",
      "Town traditions include a Fourth of July parade and fireworks, a Veterans Day parade, summer outdoor concerts and a holiday Parade of Lights in December. Ames Long Pond has town swimming programs, Halloran Park has courts and picnic areas, and the train runs from downtown to South Station.",
    ],
    highlights: [
      { icon: "river", title: "Ames Long Pond", text: "The town's swimming spot." },
      { icon: "tree", title: "Halloran Park", text: "A park with a basketball court, grills and picnic areas." },
      { icon: "store", title: "Stoughton Center", text: "The town center around the commuter rail station." },
    ],
    events: [
      { name: "Fourth of July", when: "July 4", text: "A parade and fireworks at the high school." },
      { name: "Holiday Parade of Lights", when: "December", text: "An evening holiday parade." },
    ],
    gettingAround: [
      "MBTA Providence/Stoughton Line at Stoughton",
      "Routes 27, 138 and 139",
      "Brockton Area Transit buses",
    ],
    photos: [],
    sources: [wiki("Stoughton", "census, area, history, arts and culture, transportation"), DOR_TAX],
  },

  milton: {
    tagline: "Between the Neponset River and the Blue Hills, with the Mattapan trolley",
    glance: [
      pop("28,630"),
      { label: "Size", value: "13.3 sq mi" },
      from(8, "south"),
      { label: "Incorporated", value: "1662" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$11.81"),
    ],
    feel: [
      "Milton is a hilly, green town between the Neponset River and the Blue Hills, with village centers at Milton Village, East Milton Square and Central Avenue, and kettle ponds such as Turner's Pond scattered through it.",
      "The Blue Hills Reservation covers the south of town, with Great Blue Hill and its historic weather observatory at the top. The Neponset River Greenway runs to Boston Harbor for biking and walking, the Mattapan trolley stops four times in town, and the Milton Arts Center is in East Milton.",
    ],
    highlights: [
      { icon: "tree", title: "Blue Hills Reservation", text: "Great Blue Hill and miles of trails along the south of town." },
      { icon: "trail", title: "Neponset River Greenway", text: "A path along the river to Boston Harbor." },
      { icon: "museum", title: "Blue Hill Observatory", text: "A historic weather observatory at the summit of Great Blue Hill." },
      { icon: "museum", title: "Milton Arts Center", text: "In East Milton." },
    ],
    events: [],
    gettingAround: [
      "MBTA Mattapan trolley: Milton, Central Avenue, Valley Road and Capen Street",
      "Routes 28 and 138",
      "I-93 along the southern and eastern edges",
    ],
    photos: [],
    sources: [wiki("Milton", "census, area, geography, transportation, arts"), DOR_TAX],
  },

  braintree: {
    tagline: "The end of the Red Line, Pond Meadow Park and Sunset Lake, where I-93 meets Route 3",
    glance: [
      pop("39,143"),
      { label: "Size", value: "14.6 sq mi" },
      from(11, "south-southeast"),
      { label: "Incorporated", value: "1640" },
      { label: "Government", value: "Mayor and Town Council", note: "officially the Town of Braintree" },
      tax("$10.06"),
    ],
    feel: [
      "Braintree is a suburban town south of Boston where I-93 and Route 3 meet, with a town center along Washington Street and the South Shore Plaza shopping area near the highways. Pond Meadow Park, Sunset Lake and part of the Blue Hills give it open space.",
      "Pond Meadow Park has trails around its pond, and Sunset Lake is a neighborhood park. Braintree station, at the end of the Red Line, also has commuter rail service, and the South Shore Plaza is one of the region's largest malls.",
    ],
    highlights: [
      { icon: "tree", title: "Pond Meadow Park", text: "A park with a pond and walking trails." },
      { icon: "river", title: "Sunset Lake", text: "A lake and park in town." },
      { icon: "store", title: "South Shore Plaza", text: "A regional shopping mall." },
    ],
    events: [],
    gettingAround: [
      "MBTA Red Line and commuter rail at Braintree",
      "I-93, Route 3 and Routes 37 and 53",
      "MBTA bus routes",
    ],
    photos: [],
    sources: [wiki("Braintree", "census, area, history, government, points of interest, transportation"), DOR_TAX],
  },

  quincy: {
    tagline: "The City of Presidents, with four Red Line stations and miles of shoreline on Quincy Bay",
    glance: [
      pop("101,636"),
      { label: "Size", value: "26.9 sq mi", note: "16.6 sq mi of land" },
      from(8, "south-southeast"),
      { label: "Incorporated", value: "1792", note: "a city since 1888" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.78"),
    ],
    feel: [
      "Quincy is a large city on Quincy Bay, with a busy downtown at Quincy Center, neighborhoods from Wollaston and North Quincy to Squantum and Houghs Neck, and miles of shoreline.",
      "Wollaston Beach, the largest beach on Boston Harbor, runs along Quincy Shore Drive, and Marina Bay has restaurants and a large marina. Four Red Line stations and commuter rail at Quincy Center connect the city to Boston, and Adams National Historical Park preserves the birthplaces of two presidents.",
    ],
    highlights: [
      { icon: "history", title: "Adams National Historical Park", text: "The birthplaces and homes of John Adams and John Quincy Adams." },
      { icon: "river", title: "Wollaston Beach", text: "A long public beach on Quincy Bay." },
      { icon: "store", title: "Quincy Center", text: "The downtown around the Quincy Center Red Line station." },
      { icon: "river", title: "Marina Bay", text: "Restaurants and a large marina on the bay." },
    ],
    events: [],
    gettingAround: [
      "MBTA Red Line: North Quincy, Wollaston, Quincy Center and Quincy Adams",
      "MBTA commuter rail at Quincy Center",
      "I-93 and Route 3A",
    ],
    photos: [],
    sources: [wiki("Quincy", "census, area, history, geography, transportation"), DOR_TAX],
  },
};
