/*
 * townProfilesBatch2.ts — profiles for Newton, Wellesley, Needham, Weston, Sudbury, Wayland, Natick
 * and Waltham. Same rules as townProfiles.ts: facts from the listed sources, in our own words;
 * describe places, amenities, history and getting around, never the people who live there.
 *
 * Tax rates are residential rates per $1,000 from the Massachusetts DOR Division of Local Services:
 * the latest certified fiscal year for each town (FY2027 once certified, otherwise FY2026).
 * "From Boston" marked straight-line is measured from the town center to downtown Boston.
 * Photos list the planned photo spots; a photo with no `src` is left off the live page.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };

export const batch2Profiles: Record<string, TownProfile> = {
  newton: {
    tagline: "Thirteen villages along the Charles River, Heartbreak Hill, and two Green Line branches",
    glance: [
      { label: "Population", value: "88,923", note: "2020 Census" },
      { label: "Size", value: "18.2 sq mi" },
      { label: "From Boston", value: "~8 miles", note: "west" },
      { label: "Incorporated", value: "1688", note: "as a town; a city since 1874" },
      { label: "Government", value: "Mayor and City Council", note: "24 councilors" },
      { label: "Property tax rate", value: "$9.69", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Newton is a city made up of 13 villages, each with its own name and many with their own small business district, among them Newton Centre, West Newton, Newtonville, Auburndale, Waban and Chestnut Hill. The Charles River runs along much of the city's edge, past the villages of Newton Upper Falls and Newton Lower Falls.",
      "The Boston Marathon climbs through Newton on Commonwealth Avenue, where the last of the Newton hills is known as Heartbreak Hill. Crystal Lake, a 33-acre pond, sits in Newton Centre, and Boston College's main campus is in Chestnut Hill.",
    ],
    highlights: [
      { icon: "trail", title: "Heartbreak Hill", text: "The final climb of the Newton hills on the Boston Marathon course, along Commonwealth Avenue." },
      { icon: "museum", title: "Jackson Homestead", text: "An 1809 house that was a stop on the Underground Railroad, now home to Historic Newton's museum." },
      { icon: "river", title: "Crystal Lake", text: "A 33-acre pond in Newton Centre." },
      { icon: "school", title: "Boston College", text: "The university's main campus is in the village of Chestnut Hill." },
    ],
    events: [
      { name: "Boston Marathon", when: "April (Patriots' Day)", text: "The course runs through Newton on Washington Street and Commonwealth Avenue, including Heartbreak Hill." },
    ],
    gettingAround: [
      "MBTA Green Line D branch (to Riverside) and B branch (to Boston College)",
      "MBTA Worcester Line at Newtonville, West Newton and Auburndale",
      "Mass Pike (I-90), Route 9 and I-95/Route 128",
    ],
    photos: [
      { caption: "Newton City Hall", src: "/images/towns/profiles/newton-city-hall.jpg", credit: "© Kenneth C. Zirkel · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "Newton's city seal", src: "/images/towns/profiles/newton-city-seal.jpg", credit: "© Pikiwedia3000 · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
    ],
    sources: [
      { label: "Newton, Massachusetts (Wikipedia): census, area, history, government, villages, landmarks, transit", url: "https://en.wikipedia.org/wiki/Newton,_Massachusetts" },
      { label: "City of Newton: about Newton (incorporation as a town and as a city)", url: "https://www.newtonma.gov/about" },
      DOR_TAX,
    ],
  },

  wellesley: {
    tagline: "Three commuter rail stops, Lake Waban and three college campuses",
    glance: [
      { label: "Population", value: "29,550", note: "2020 Census" },
      { label: "Size", value: "10.5 sq mi" },
      { label: "From Boston", value: "~13 miles", note: "west, straight-line" },
      { label: "Incorporated", value: "1881", note: "formerly West Needham" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board" },
      { label: "Property tax rate", value: "$10.17", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Wellesley has three village centers on the MBTA Worcester Line, Wellesley Square, Wellesley Hills and Wellesley Farms, each with its own station. Wellesley Square, along Central Street and Washington Street, is the main shopping district.",
      "Three colleges have campuses in town: Wellesley College, whose campus borders Lake Waban, Babson College and MassBay Community College. The path around Lake Waban is a popular walk, and the Boston Marathon passes through the center of town each April.",
    ],
    highlights: [
      { icon: "river", title: "Lake Waban", text: "A lake on the edge of the Wellesley College campus." },
      { icon: "history", title: "Babson World Globe", text: "A 28-foot globe on the Babson College campus." },
      { icon: "store", title: "Wellesley Square", text: "The town's main shopping district, next to the Wellesley Square commuter rail station." },
      { icon: "school", title: "Three colleges", text: "Wellesley College, Babson College and MassBay Community College." },
    ],
    events: [
      { name: "Boston Marathon", when: "April (Patriots' Day)", text: "The course runs through Wellesley past Wellesley College and through Wellesley Square." },
      { name: "Thanksgiving football", when: "Thanksgiving Day", text: "Wellesley High School plays Needham High School every Thanksgiving, a game first played in 1882." },
    ],
    gettingAround: [
      "MBTA Worcester Line at Wellesley Square, Wellesley Hills and Wellesley Farms",
      "I-95/Route 128 and Routes 9, 16 and 135",
      "MetroWest Regional Transit Authority buses",
    ],
    photos: [
      { caption: "Wellesley Town Hall", src: "/images/towns/profiles/wellesley-town-hall.jpg", credit: "© Jameslwoodward · CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0" },
      { caption: "Entering Wellesley on Route 16", src: "/images/towns/profiles/wellesley-route-16-sign.jpg", credit: "© John Phelan · CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
    ],
    sources: [
      { label: "Wellesley, Massachusetts (Wikipedia): census, area, government, colleges, transit", url: "https://en.wikipedia.org/wiki/Wellesley,_Massachusetts" },
      { label: "Encyclopaedia Britannica: Wellesley", url: "https://www.britannica.com/place/Wellesley" },
      { label: "Needham, Massachusetts (Wikipedia): Thanksgiving football game since 1882", url: "https://en.wikipedia.org/wiki/Needham,_Massachusetts" },
      DOR_TAX,
    ],
  },

  needham: {
    tagline: "Four commuter rail stops, the Charles River on two sides, and a town hall on the common",
    glance: [
      { label: "Population", value: "32,091", note: "2020 Census" },
      { label: "Size", value: "12.7 sq mi" },
      { label: "From Boston", value: "~10 miles", note: "southwest" },
      { label: "Incorporated", value: "1711" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$10.83", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Needham Center is built around the Town Common and town hall, with shops and restaurants nearby, and Needham Heights has a second business district along Highland Avenue. The town has four stations on the MBTA Needham Line, at Needham Heights, Needham Center, Needham Junction and Hersey.",
      "The Charles River forms nearly all of the town's southern and northeastern boundaries, with Cutler Park along the river. Olin College of Engineering has its campus in Needham, and office parks sit along I-95/Route 128, which has three exits in town.",
    ],
    highlights: [
      { icon: "history", title: "Town Common and Town Hall", text: "The town hall, dedicated in 1903, stands on the common in Needham Center." },
      { icon: "tree", title: "Cutler Park", text: "Open land and trails along the Charles River." },
      { icon: "river", title: "Rosemary Lake", text: "A lake where one of the William Carter Company's knitting mills once stood." },
      { icon: "school", title: "Olin College of Engineering", text: "A small engineering college with its campus in Needham." },
    ],
    events: [
      { name: "Thanksgiving football", when: "Thanksgiving Day", text: "Needham High School plays Wellesley High School every Thanksgiving, a game first played in 1882." },
    ],
    gettingAround: [
      "MBTA Needham Line at Needham Heights, Needham Center, Needham Junction and Hersey",
      "I-95/Route 128, with three exits in town",
      "Route 135",
    ],
    photos: [
      { caption: "Needham Town Hall", src: "/images/towns/profiles/needham-town-hall.jpg", credit: "© Magicpiano · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "Needham Junction commuter rail station", src: "/images/towns/profiles/needham-junction-station.jpg", credit: "© John Phelan · CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
    ],
    sources: [
      { label: "Needham, Massachusetts (Wikipedia): census, area, government, landmarks, events, transit", url: "https://en.wikipedia.org/wiki/Needham,_Massachusetts" },
      { label: "Town of Needham: town facts (distance from Boston, area)", url: "https://needhamma.gov/DocumentView.asp?DID=2169" },
      DOR_TAX,
    ],
  },

  weston: {
    tagline: "More than 2,000 acres of conservation land, a historic town green and two commuter rail stops",
    glance: [
      { label: "Population", value: "11,851", note: "2020 Census" },
      { label: "Size", value: "17.3 sq mi" },
      { label: "From Boston", value: "~12 miles", note: "west, straight-line" },
      { label: "Incorporated", value: "1713" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$10.88", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Weston's town center is built around the Town Green, with the Town Hall facing it and a small cluster of shops nearby. Route 20, the old Boston Post Road, runs through a historic district that includes the Golden Ball Tavern museum.",
      "Conservation land covers more than 2,000 acres, about 18 percent of the town, with trails throughout. The Weston Reservoir, the aqueduct paths, the Case Estates and the Mass Central Rail Trail–Wayside are all in town.",
    ],
    highlights: [
      { icon: "museum", title: "Golden Ball Tavern", text: "An 18th-century tavern on the Boston Post Road, now a museum." },
      { icon: "river", title: "Weston Reservoir", text: "A reservoir with a walking path around it, next to the Weston Aqueduct." },
      { icon: "trail", title: "Conservation trails", text: "More than 2,000 acres of conservation land, including the Case Estates." },
      { icon: "school", title: "Regis College", text: "A university with its campus in Weston." },
    ],
    events: [],
    gettingAround: [
      "MBTA Fitchburg Line at Kendal Green and Silver Hill",
      "Mass Pike (I-90), I-95/Route 128, and Routes 20 and 30",
      "Mass Central Rail Trail–Wayside",
    ],
    photos: [
      { caption: "Mass Central Rail Trail–Wayside in Weston", src: "/images/towns/profiles/weston-rail-trail.jpg", credit: "© John Phelan · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "Weston Reservoir", src: "/images/towns/profiles/weston-reservoir.jpg", credit: "© NewtonCourt · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
    ],
    sources: [
      { label: "Weston, Massachusetts (Wikipedia): census, area, government, history, conservation land, transit", url: "https://en.wikipedia.org/wiki/Weston,_Massachusetts" },
      DOR_TAX,
    ],
  },

  sudbury: {
    tagline: "Longfellow's Wayside Inn, a 7.6-mile rail trail and refuge land along the Sudbury River",
    glance: [
      { label: "Population", value: "18,934", note: "2020 Census" },
      { label: "Size", value: "24.6 sq mi" },
      { label: "From Boston", value: "~18 miles", note: "west, straight-line" },
      { label: "Incorporated", value: "1639" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$14.27", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Sudbury is a large, wooded town of conservation land, wetlands and old farms, with a historic town center around its common and most of its shops and businesses along Route 20. Great Meadows National Wildlife Refuge lines the Sudbury River on the east side of town, and Nobscot Hill rises in the south.",
      "The Mass Central Rail Trail–Wayside crosses town on a 7.6-mile paved section, and conservation land has trails throughout. In South Sudbury, Longfellow's Wayside Inn still serves meals and rents rooms, with a working grist mill on its grounds. Sudbury has no commuter rail station; Routes 20 and 117 lead toward I-95 and I-495.",
    ],
    highlights: [
      { icon: "history", title: "Longfellow's Wayside Inn", text: "An inn serving meals and lodging since the early 1700s, named for Longfellow's Tales of a Wayside Inn." },
      { icon: "farm", title: "Wayside Inn Grist Mill", text: "A working grist mill Henry Ford built on the inn's property." },
      { icon: "river", title: "Great Meadows National Wildlife Refuge", text: "Wetlands and trails along the Sudbury River." },
      { icon: "trail", title: "Mass Central Rail Trail–Wayside", text: "A 7.6-mile paved section crossing Sudbury, part of a trail toward Boston." },
    ],
    events: [],
    gettingAround: [
      "US Route 20 and Routes 27 and 117",
      "No commuter rail station in town",
      "Mass Central Rail Trail–Wayside",
    ],
    photos: [
      { caption: "Poor Farm Meadow conservation land", src: "/images/towns/profiles/sudbury-poor-farm-meadow.jpg", credit: "© John Phelan · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "Mass Central Rail Trail bridge over Hop Brook", src: "/images/towns/profiles/sudbury-rail-trail-bridge.jpg", credit: "© John Phelan · CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0" },
    ],
    sources: [
      { label: "Sudbury, Massachusetts (Wikipedia): census, area, government, Wayside Inn, rail trail", url: "https://en.wikipedia.org/wiki/Sudbury,_Massachusetts" },
      { label: "Encyclopaedia Britannica: Sudbury", url: "https://www.britannica.com/place/Sudbury-Massachusetts" },
      DOR_TAX,
    ],
  },

  wayland: {
    tagline: "Ten miles of the Sudbury River, a town beach on Lake Cochituate and a rail trail into Wayland Center",
    glance: [
      { label: "Population", value: "13,943", note: "2020 Census" },
      { label: "Size", value: "15.9 sq mi" },
      { label: "From Boston", value: "~18 miles", note: "west, by road" },
      { label: "Incorporated", value: "1780", note: "as East Sudbury; renamed Wayland in 1835" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      { label: "Property tax rate", value: "$14.83", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Wayland is a wooded town with two centers: Wayland Center, where Routes 20, 27 and 126 meet, and the village of Cochituate to the south, near Lake Cochituate. The Sudbury River runs about 10 miles through town, with its meadows left in their natural state.",
      "The town beach and boat launch are on Lake Cochituate, the Mass Central Rail Trail–Wayside ends in Wayland Center, and conservation land across town has trails, some open to horseback riding. There is no commuter rail station; Routes 20 and 30 are the main roads east toward Boston.",
    ],
    highlights: [
      { icon: "river", title: "Sudbury River", text: "About 10 miles of river and meadows running through town." },
      { icon: "tree", title: "Lake Cochituate", text: "The town beach and a boat launch on the lake." },
      { icon: "trail", title: "Mass Central Rail Trail–Wayside", text: "A rail trail from Weston that ends in Wayland Center." },
      { icon: "farm", title: "Conservation trails", text: "Trails on town conservation land, some open to horseback riding." },
    ],
    events: [],
    gettingAround: [
      "Routes 20, 27, 30 and 126",
      "No commuter rail station in town",
      "Mass Central Rail Trail–Wayside",
    ],
    photos: [
      { caption: "Wayland High School", src: "/images/towns/profiles/wayland-high-school.jpg", credit: "© John Phelan · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "Wayland Public Library", src: "/images/towns/profiles/wayland-public-library.jpg", credit: "© John Phelan · CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0" },
    ],
    sources: [
      { label: "Wayland, Massachusetts (Wikipedia): census, area, history, government", url: "https://en.wikipedia.org/wiki/Wayland,_Massachusetts" },
      { label: "Town of Wayland: about the town (distance, Sudbury River, Lake Cochituate, trails)", url: "https://www.wayland.ma.us/node/462" },
      { label: "Streetsblog Massachusetts: Wayland's aqueducts and rail trails", url: "https://mass.streetsblog.org/2021/11/06/travel-guide-waylands-aqueducts-and-the-new-cochituate-rail-trail" },
      DOR_TAX,
    ],
  },

  natick: {
    tagline: "A downtown on the commuter rail, Lake Cochituate and four miles of the Boston Marathon",
    glance: [
      { label: "Population", value: "37,006", note: "2020 Census" },
      { label: "Size", value: "16.1 sq mi" },
      { label: "From Boston", value: "~16 miles", note: "west, straight-line" },
      { label: "Incorporated", value: "1781" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      { label: "Property tax rate", value: "$12.17", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Natick Center, around the town common, is the town's downtown, with a commuter rail station a few blocks away. South Natick, on the Charles River, and West Natick are its other villages, and the Natick Mall and the shopping along Route 9 are on the north side of town.",
      "Lake Cochituate lies along the town's northern edge, and the Cochituate Rail Trail follows its shore into Natick Center. The Boston Marathon runs through Natick on Route 135, from about mile 8 to mile 12.",
    ],
    highlights: [
      { icon: "river", title: "Lake Cochituate", text: "A large lake on the town's northern edge, with a state park beach." },
      { icon: "trail", title: "Cochituate Rail Trail", text: "A rail trail along the lake shore, ending near Natick Center." },
      { icon: "history", title: "Natick Center", text: "The town common and downtown, with a commuter rail station." },
      { icon: "store", title: "Natick Mall", text: "A regional shopping mall on Route 9." },
    ],
    events: [
      { name: "Boston Marathon", when: "April (Patriots' Day)", text: "The course runs through Natick on Route 135, from about mile 8 to mile 12." },
    ],
    gettingAround: [
      "MBTA Worcester Line at Natick Center and West Natick",
      "Routes 9, 27 and 135",
      "Cochituate Rail Trail",
    ],
    photos: [
      { caption: "Natick Center", src: "/images/towns/profiles/natick-center.jpg", credit: "© Rames1651 · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
      { caption: "MathWorks' Lakeside campus", src: "/images/towns/profiles/natick-mathworks.jpg", credit: "© 4300streetcar · CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0" },
    ],
    sources: [
      { label: "Natick, Massachusetts (Wikipedia): census, area, government, villages, marathon route, transit", url: "https://en.wikipedia.org/wiki/Natick,_Massachusetts" },
      { label: "Streetsblog Massachusetts: the Cochituate Rail Trail", url: "https://mass.streetsblog.org/2021/11/06/travel-guide-waylands-aqueducts-and-the-new-cochituate-rail-trail" },
      DOR_TAX,
    ],
  },

  waltham: {
    tagline: "The Watch City: a riverwalk on the Charles, Moody Street's restaurants and two historic estates",
    glance: [
      { label: "Population", value: "65,218", note: "2020 Census" },
      { label: "Size", value: "13.8 sq mi" },
      { label: "From Boston", value: "~9 miles", note: "west" },
      { label: "Incorporated", value: "1738", note: "as a town; a city since 1884" },
      { label: "Government", value: "Mayor and City Council", note: "15 councilors" },
      { label: "Property tax rate", value: "$10.32", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Waltham is a small city on the Charles River, with a lively downtown along Main Street and Moody Street, neighborhoods on the hills around it, and office parks along Route 128.",
      "Moody Street is known for its long stretch of restaurants, and the Charles River Riverwalk follows the river through the center of the city. Gore Place and the Lyman Estate have grounds open to visitors, Brandeis University and Bentley University have their campuses here, and the city has two commuter rail stations on the Fitchburg Line.",
    ],
    highlights: [
      { icon: "river", title: "Charles River Riverwalk", text: "A path along the Charles River through downtown Waltham." },
      { icon: "store", title: "Moody Street", text: "A downtown street known for its row of restaurants." },
      { icon: "history", title: "Gore Place and the Lyman Estate", text: "Two historic country estates, both open to visitors." },
      { icon: "museum", title: "Charles River Museum of Industry & Innovation", text: "A museum of the region's industrial history, in a former Boston Manufacturing Company building." },
    ],
    events: [],
    gettingAround: [
      "MBTA Fitchburg Line at Waltham and Brandeis/Roberts",
      "I-95/Route 128 and Route 20",
      "MBTA bus routes",
    ],
    photos: [
      { caption: "Charles River at the Moody Street Dam", src: "/images/towns/profiles/waltham-moody-street-dam.jpg", credit: "© 4300streetcar · CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0" },
      { caption: "Historic Moody Street Fire Station", src: "/images/towns/profiles/waltham-moody-street-fire-station.jpg", credit: "© Magicpiano · CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" },
    ],
    sources: [
      { label: "Waltham, Massachusetts (Wikipedia): census, area, history, government, landmarks, transit", url: "https://en.wikipedia.org/wiki/Waltham,_Massachusetts" },
      DOR_TAX,
    ],
  },
};
