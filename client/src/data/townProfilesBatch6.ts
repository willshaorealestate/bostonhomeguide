/*
 * townProfilesBatch6.ts — MetroWest: Framingham, Ashland, Hopkinton, Sherborn, Holliston, Southborough,
 * Westborough, Northborough and Berlin. Same rules and sources as townProfilesBatch3.ts.
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
      { label: "Incorporated", value: "1700", note: "a city since 2018" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$11.83"),
    ],
    feel: [
      "Framingham is a large city with several business districts: downtown around the commuter rail station, the historic Framingham Centre around the common, and the Golden Triangle shopping area along Route 9. Between them are neighborhoods, ponds and parkland, including Farm Pond near downtown and Callahan State Park on the north side.",
      "Downtown has restaurants and shops with food from many cuisines, city hall in the Memorial Building, the library and the Amazing Things Arts Center, and the commuter rail runs to Boston and Worcester. Framingham State University is in Framingham Centre, Garden in the Woods and the Danforth Art Museum add gardens and art, and Route 9 and the Mass Pike carry most car trips.",
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
      { label: "Incorporated", value: "1846" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$12.71"),
    ],
    feel: [
      "Ashland is a suburban town in the hills west of Boston, with a small downtown near the commuter rail station and large areas of state park and town forest. Route 135 runs through the center as part of the Boston Marathon course.",
      "Ashland State Park has a reservoir with a beach and loop trail, part of Hopkinton State Park offers swimming, boating and riding trails, and the Ashland Town Forest and Warren Woods have hiking trails. A farmers market runs Saturdays from June to October with about two dozen vendors and live music, and the commuter rail station connects to Boston and Worcester.",
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
      "Hopkinton is a large, wooded town on hills west of Boston, split east and west by I-495, with a classic New England center at Main Street and the Town Common. Much of the town is woods, reservoirs and state parkland.",
      "The center, with the library, shops and the common, is where the Boston Marathon starts every April. Hopkinton State Park offers swimming, boat rentals and riding trails, and Whitehall State Park surrounds a former reservoir. There is no commuter rail station in town; Southborough and Ashland stations are nearby.",
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
      "Sherborn is a small rural town of woods, farms and fields, with a tiny town center where Routes 16 and 27 cross. Farm Pond holds most of the town's water, and the Charles River runs along its eastern side.",
      "Rocky Narrows Reservation has trails and lookouts above the Charles, and Farm Pond is the town's swimming spot. Sherborn shares its school system with Dover, and with no commuter rail station, Routes 16 and 27 are the main way in and out.",
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
      "Holliston is a suburban town with a small downtown along Washington Street and a mix of neighborhoods, farmland and woods. Lake Winthrop sits near the center, and the Upper Charles Trail crosses town on an old rail line.",
      "Downtown has Fiske's General Store, open since 1863, along with local shops and restaurants. Pleasure Point on Lake Winthrop has a beach, picnic area, playground and boat launch, and the lake is open for fishing, kayaking and swimming. The rail trail is used for biking, walking and cross-country skiing, and Pinecrest Golf Club is in town.",
    ],
    highlights: [
      { icon: "store", title: "Fiske's General Store", text: "Founded in 1863, the oldest retail business in town." },
      { icon: "history", title: "Arch Bridge", text: "The stone Bogastow Brook Viaduct, off Woodland Street." },
      { icon: "trail", title: "Upper Charles Trail", text: "A rail trail on the old Milford branch line." },
      { icon: "river", title: "Pleasure Point", text: "A beach, picnic area, playground and boat launch on Lake Winthrop." },
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
      { label: "Incorporated", value: "1727" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.36"),
    ],
    feel: [
      "Southborough is a town of villages, open space and reservoir land: about 35 percent of the town is open space, and the Sudbury Reservoir covers a tenth of it. Its downtown and the villages of Cordaville, Fayville and Southville sit along Routes 9, 30 and 85.",
      "School campuses frame the small downtown, and trails such as the Sudbury Reservoir Trail, the Boroughs Loop and Breakneck Hill wind through conservation land. Heritage Day on Columbus Day weekend brings a parade, and Southborough station in Cordaville has commuter trains to Boston and Worcester.",
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
      "Westborough is a suburban town at the junction of I-495 and the Mass Pike, with a downtown along Route 30 around a rotary at the center and the Route 9 commercial corridor on its north side. Lakes, ponds and reservoirs dot the town, and the Sudbury and Assabet rivers begin here.",
      "Lake Chauncy has a summer beach for swimming, boating and fishing, and the Westborough Charm Bracelet links trails through conservation land around town. Downtown has shops and restaurants near the West Main Street Historic District, and the commuter rail station on the Framingham/Worcester Line serves Boston and Worcester.",
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
      { label: "Incorporated", value: "1766" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.82"),
    ],
    feel: [
      "Northborough is a suburban town along Route 20, the old Boston Post Road, with a small town center where Routes 20 and 135 meet and farms and orchards on the hills around it. The Assabet River runs through town.",
      "Farms such as Tougas Family Farm offer pick-your-own fruit in season, the New England Baseball Complex at Routes 9 and 20 hosts games and tournaments, and Routes 9 and 20 carry most of the town's shopping. I-290 and I-495 are close by, and the nearest commuter rail is in Westborough.",
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

  berlin: {
    tagline: "Orchards, horse farms and Sawyer Hill, in the hills between Hudson and Northborough",
    glance: [
      pop("3,158"),
      { label: "Size", value: "13 sq mi" },
      from(29, "west"),
      { label: "Incorporated", value: "1812" },
      { label: "Government", value: "Open Town Meeting" },
      tax("$14.06"),
    ],
    feel: [
      "Berlin is a small, rural town in a low range of hills between the Nashua and Assabet river valleys. Sawyer Hill, a long ridge, runs along the east side of town, and Gates Pond, the town's only natural pond, sits at its foot.",
      "Farming here has shifted toward orchards and horse farms, which still cover much of the hillsides. The small town center sits along Route 62, and I-495 crosses the east side of town.",
    ],
    highlights: [
      { icon: "farm", title: "Orchards and horse farms", text: "Apple orchards and equestrian farms across the hills." },
      { icon: "tree", title: "Sawyer Hill", text: "A long ridge on the town's east side, with a hiking trail at Great Oak Farm." },
      { icon: "river", title: "Gates Pond", text: "The town's one natural pond, at the eastern foot of Sawyer Hill." },
      { icon: "trail", title: "Mass Central Rail Trail", text: "The cross-state trail's route runs through Berlin; it's on roads here for now, with an off-road section in the works." },
    ],
    events: [],
    gettingAround: [
      "I-495 on the east side of town",
      "Route 62 through the town center",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [
      wiki("Berlin", "census, history, geography, roads"),
      { label: "Central Massachusetts Regional Planning Commission: Berlin community snapshot", url: "https://cmrpc.org/data-center/community-snapshots/berlin/" },
      { label: "Mass Central Rail Trail: Berlin", url: "https://www.masscentralrailtrail.org/berlin" },
      { label: "W. A. Houghton, History of the Town of Berlin (1895): Gates Pond and Sawyer Hill", url: "https://ldsgenealogy.com/MA/books/History-of-the-town-of-Berlin-Worcester-county-Mass-from-1784-to-1895-part-4.htm" },
      { label: "Great Oak Farm trail on Sawyer Hill Road", url: "https://ebirdhotspots.com/birding-in-massachusetts/usma-worcester-county/usma-great-oak-farm/" },
      { label: "Town of Berlin assessor's database: FY2026 tax rates", url: "https://gis.vgsi.com/BerlinMA" },
    ],
  },
};
