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
    tagline: "The Fairbanks House, Dedham Square and Legacy Place, on Boston's southwest border",
    glance: [
      pop("25,364"),
      { label: "Size", value: "10.6 sq mi" },
      from(10, "southwest"),
      { label: "Incorporated", value: "1636" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.30"),
    ],
    feel: [
      "Dedham was incorporated in 1636 and is called the \"mother of towns\" because 14 present-day communities were once inside its borders. It is the Norfolk County seat, and the courthouse in Dedham Square hosted the Sacco and Vanzetti trial in 1921. The Fairbanks House is the oldest surviving timber-frame house in the United States.",
      "Dedham voted in 1643 to fund the first taxpayer-supported public school in America, and Mother Brook, dug in 1639, was the first canal in North America. Today the town has two centers, historic Dedham Square and East Dedham, plus Legacy Place, an outdoor shopping center near Route 128.",
    ],
    highlights: [
      { icon: "history", title: "Fairbanks House", text: "The oldest surviving timber-frame house in the United States." },
      { icon: "store", title: "Dedham Square", text: "The historic town center around the Norfolk County Courthouse." },
      { icon: "river", title: "Mother Brook", text: "Dug in 1639, the first canal in North America." },
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
    tagline: "The 1,137-acre Hale reservation and University Station, beside Route 128 station",
    glance: [
      pop("16,266"),
      { label: "Size", value: "11.1 sq mi" },
      from(12, "southwest"),
      { label: "Incorporated", value: "1897", note: "formerly West Dedham" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$12.87"),
    ],
    feel: [
      "Westwood was West Dedham until 1897, the last town to split from Dedham. The Colburn School, built in 1877, is on the National Register of Historic Places.",
      "Hale, a 1,137-acre nonprofit reservation with beaches and walking trails, covers a large part of town. In the far eastern corner, University Station has shops and restaurants next to Route 128 station, which has both Amtrak and commuter rail service.",
    ],
    highlights: [
      { icon: "tree", title: "Hale", text: "A 1,137-acre reservation with ponds, beaches and walking trails." },
      { icon: "store", title: "University Station", text: "Shops and restaurants next to Route 128 station." },
      { icon: "river", title: "Buckmaster Pond", text: "One of the town's ponds." },
      { icon: "history", title: "Colburn School", text: "An 1877 school building on the National Register." },
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
      { label: "Incorporated", value: "1872", note: "formerly part of Dedham" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board" },
      tax("$9.82"),
    ],
    feel: [
      "Norwood was part of Dedham until 1872. It was first settled in 1678 when Ezra Morse built a sawmill in what is now South Norwood. The town center and downtown run along Washington Street.",
      "The Neponset River runs along the town on its way from Foxborough to Boston Harbor. Norwood has three stations on the Franklin/Foxboro commuter rail line, Route 1 runs through town, and Norwood Memorial Airport serves small planes. The F. Holland Day House, home of the photographer, is a historic house museum.",
    ],
    highlights: [
      { icon: "store", title: "Norwood Center", text: "The downtown along Washington Street." },
      { icon: "river", title: "Neponset River", text: "Runs along the town on its way to Boston Harbor." },
      { icon: "museum", title: "F. Holland Day House", text: "A historic house museum on Day Street." },
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
      { label: "Incorporated", value: "1797", note: "formerly part of Stoughton" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$9.75"),
    ],
    feel: [
      "Canton lies at the foot of Great Blue Hill. The Canton River runs through the center of town, linking Bolivar and Forge ponds before flowing into the Neponset River, which forms the town's western border.",
      "The Canton Viaduct, built in 1835, is one of the two oldest multiple-arch stone railroad bridges still in mainline use in the United States. The Canton Corner Historic District holds some of the town's oldest houses, and Mass Audubon's Museum of American Bird Art sits on a wildlife sanctuary in town.",
    ],
    highlights: [
      { icon: "history", title: "Canton Viaduct", text: "An 1835 stone railroad bridge still carrying trains." },
      { icon: "tree", title: "Blue Hills Reservation", text: "Great Blue Hill and its trails rise along the town's northern edge." },
      { icon: "museum", title: "Museum of American Bird Art", text: "Mass Audubon's art museum and wildlife sanctuary." },
      { icon: "history", title: "Canton Corner Historic District", text: "Historic houses, including the nearly 300-year-old David Tilden House." },
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
      { label: "Incorporated", value: "1775", note: "as Stoughtonham; renamed Sharon in 1783" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$17.15"),
    ],
    feel: [
      "Sharon began as a precinct of Stoughton, was incorporated as Stoughtonham in 1775 and took the name Sharon in 1783. Lake Massapoag, popular for swimming and boating, made the town a summer resort in its early years.",
      "A large share of the town is conservation land, with trails including the Massapoag Trail, the Warner Trail and part of the Bay Circuit Trail. Moose Hill Wildlife Sanctuary and part of Borderland State Park are in Sharon, and the commuter rail station on the Providence/Stoughton Line has stopped here since 1835.",
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
      { label: "Incorporated", value: "1726", note: "formerly part of Dorchester" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.81"),
    ],
    feel: [
      "Stoughton was settled in 1713 and incorporated in 1726 from the southwestern part of Dorchester. At first it included what are now Sharon, Canton and Avon. The commuter rail's Stoughton Branch ends at the station in the town center.",
      "The town runs swimming programs at Ames Long Pond, and Halloran Park has courts and picnic areas. Stoughton holds parades on the Fourth of July and Veterans Day, a holiday Parade of Lights in December, and summer outdoor concerts.",
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
      "Milton sits on hilly ground between the Neponset River to the north and the Blue Hills to the south, bounded by Brush Hill and Milton Hill. Kettle ponds left by glaciers dot the town.",
      "The Mattapan trolley, a light-rail extension of the Red Line, has four stops in Milton, and the Neponset River Greenway connects the town with Boston Harbor by bike. Great Blue Hill, with the historic Blue Hill weather observatory at its summit, rises on the town's southern edge.",
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
      "Braintree was incorporated in 1640, and both Quincy and Randolph were later split off from it. It is still officially called a town, though it has a mayor and council. General Sylvanus Thayer, the \"father of West Point,\" was born here.",
      "The Red Line ends at Braintree station, which also serves the commuter rail, and I-93 and Route 3 split in town. Pond Meadow Park, Sunset Lake and part of the Blue Hills offer open space, and the South Shore Plaza is a regional shopping center.",
    ],
    highlights: [
      { icon: "tree", title: "Pond Meadow Park", text: "A park with a pond and walking trails." },
      { icon: "river", title: "Sunset Lake", text: "A lake and park in town." },
      { icon: "store", title: "South Shore Plaza", text: "A regional shopping mall." },
      { icon: "history", title: "General Sylvanus Thayer Birthplace", text: "Birthplace of the \"father of West Point.\"" },
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
      { label: "Incorporated", value: "1792", note: "as a town; a city since 1888" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.78"),
    ],
    feel: [
      "Quincy is known as the City of Presidents: John Adams and John Quincy Adams were both born here, as was John Hancock. It split from Braintree in 1792 and became a city in 1888. For more than a century it was a granite-quarrying city, and the Granite Railway was the first commercial railroad in the United States.",
      "The city stretches along Quincy Bay, from Squantum and Wollaston Beach to Marina Bay, and the Fore River Shipyard built ships here for generations. Quincy has four Red Line stations: North Quincy, Wollaston, Quincy Center and Quincy Adams.",
    ],
    highlights: [
      { icon: "history", title: "Adams National Historical Park", text: "The birthplaces and homes of John Adams and John Quincy Adams." },
      { icon: "river", title: "Wollaston Beach", text: "A long public beach on Quincy Bay." },
      { icon: "store", title: "Quincy Center", text: "The downtown around the Quincy Center Red Line station." },
      { icon: "history", title: "Granite Railway", text: "The first commercial railroad in the United States." },
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
