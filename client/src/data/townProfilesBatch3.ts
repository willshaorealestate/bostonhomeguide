/*
 * townProfilesBatch3.ts — Northwest / Route 2 and I-495: Stow, Boxborough, Bolton, Harvard, Maynard,
 * Littleton, Groton and Ayer. Same rules as townProfiles.ts: facts from the listed sources, in our own
 * words; describe places, amenities, history and getting around, never the people who live there.
 *
 * Tax rates are residential rates per $1,000 from the Massachusetts DOR Division of Local Services:
 * the latest certified fiscal year for each town (FY2027 once certified, otherwise FY2026).
 * "From Boston" is the straight-line distance from the middle of the town to the State House,
 * measured on MassGIS town boundaries. Photos can be added to `photos` over time.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch3Profiles: Record<string, TownProfile> = {
  stow: {
    tagline: "Orchards, Lake Boon and the Assabet River, with a military history museum",
    glance: [
      pop("7,174"),
      { label: "Size", value: "18.1 sq mi" },
      from(24, "west-northwest"),
      { label: "Incorporated", value: "1683" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$17.87"),
    ],
    feel: [
      "Stow is a rural town of orchards, farm stands and wooded hills, with the Assabet River running through it and Lake Boon along its southern edge. Much of the town is open land, including part of the Assabet River National Wildlife Refuge.",
      "Life here leans outdoors: pick-your-own orchards open each summer and fall, the town has four golf courses, and Pine Bluffs is a town park and beach on Lake Boon. The town center is small, with town offices and a community center in the former Pompositticut School. Stow has no commuter rail station; Routes 62 and 117 lead to Route 2 and I-495.",
    ],
    highlights: [
      { icon: "farm", title: "Orchards and farm stands", text: "Stow's farmland includes pick-your-own orchards that open each summer and fall." },
      { icon: "river", title: "Pine Bluffs", text: "A town park and beach on Lake Boon." },
      { icon: "museum", title: "American Heritage Museum", text: "A military history museum opened in 2018 on the grounds of the Collings Foundation." },
      { icon: "tree", title: "Assabet River National Wildlife Refuge", text: "Part of the refuge's trails and wetlands are in Stow." },
    ],
    events: [],
    gettingAround: [
      "Routes 62 and 117 through town",
      "I-495 and Route 2 nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Stow", "census, area, history, geography, points of interest, government"), DOR_TAX],
  },

  boxborough: {
    tagline: "Fourteen tracts of conservation land, a September Harvest Fair and quick access to I-495",
    glance: [
      pop("5,506"),
      { label: "Size", value: "10.4 sq mi" },
      from(25, "west-northwest"),
      { label: "Incorporated", value: "1783" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.39"),
    ],
    feel: [
      "Boxborough is a small, wooded town along I-495, with homes set among conservation land, fields and old farms. Fourteen separate tracts of state, nonprofit and town land have trails, from Steele Farm's open hillside to the Beaver Valley Preserve.",
      "Town life gathers at Flerra Meadows and Liberty Fields, with soccer and baseball fields, a playground and a pond, and a local cycling group rides out from Flerra Meadows. The Harvest Fair each September celebrates the town's farms, and Route 111 and I-495 make for an easy highway connection.",
    ],
    highlights: [
      { icon: "farm", title: "Steele Farm", text: "Town land with fields and trails, used for hiking and winter sledding." },
      { icon: "tree", title: "Beaver Valley Preserve", text: "Conservation land with a glacial esker more than a mile long." },
      { icon: "tree", title: "Flerra Meadows", text: "Soccer fields, a playground and a pond." },
      { icon: "tree", title: "Liberty Fields", text: "Baseball and soccer fields with a conservation trail." },
    ],
    events: [
      { name: "Harvest Fair", when: "September", text: "A town fair celebrating Boxborough's farming history." },
    ],
    gettingAround: [
      "I-495 and Route 111 through town",
      "Route 2 nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Boxborough", "census, area, history, attractions, conservation land, Harvest Fair"), DOR_TAX],
  },

  bolton: {
    tagline: "Apple orchards, a winery and the Bolton Flats along the Still River",
    glance: [
      pop("5,665"),
      { label: "Size", value: "20 sq mi" },
      from(28, "west"),
      { label: "Incorporated", value: "1738" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$18.07"),
    ],
    feel: [
      "Bolton is a hilly town of farms, apple orchards and woods along I-495, with Wattaquadock Hill and Vaughn Hill as its high points. The small town center sits along Route 117, and the Bolton Flats Wildlife Management Area stretches across fields and wetlands near the Still River.",
      "Much of life here is outdoors and on the farm: orchards and farm stands, Nashoba Valley Winery and The International Golf Club are all in town. Conservation land is spread across Bolton, and I-495 runs through it for commuting.",
    ],
    highlights: [
      { icon: "farm", title: "Orchards and Nashoba Valley Winery", text: "Apple orchards and a winery are among the town's farms." },
      { icon: "tree", title: "Bolton Flats Wildlife Management Area", text: "Open fields and wetlands near the Still and Nashua rivers." },
      { icon: "history", title: "Bolton Center Historic District", text: "Historic civic, church and commercial buildings along Route 117." },
      { icon: "tree", title: "The International Golf Club", text: "A golf club that has hosted several major tournaments." },
    ],
    events: [],
    gettingAround: [
      "I-495 and Route 117 through town",
      "Route 85",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Bolton", "census, area, history, historic districts, farms, wildlife area"), DOR_TAX],
  },

  harvard: {
    tagline: "Bare Hill Pond, Fruitlands and the Shaker Village, on a ridge between Route 2 and I-495",
    glance: [
      pop("6,851"),
      { label: "Size", value: "27 sq mi" },
      from(29, "west-northwest"),
      { label: "Incorporated", value: "1732" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.87"),
    ],
    feel: [
      "Harvard is a wooded, hilly town of orchards, fields and wetlands between Route 2 and I-495. A ridge runs along its eastern side, and Bare Hill Pond, a 320-acre lake with small islands, sits near the center of town.",
      "The town center is a classic New England common with the public library and town buildings around it. Summer days center on the Bare Hill Pond town beach and dock, fall brings people to the orchards, and Fruitlands Museum has trails and views across the Nashua River valley.",
    ],
    highlights: [
      { icon: "river", title: "Bare Hill Pond", text: "A 320-acre lake with a town beach and dock." },
      { icon: "museum", title: "Fruitlands Museum", text: "Site of the 1843 transcendentalist farm community, now a museum with trails." },
      { icon: "history", title: "Harvard Common", text: "The town center, with the public library and town buildings." },
      { icon: "farm", title: "Orchards", text: "Pick-your-own orchards and farm stands across town." },
    ],
    events: [],
    gettingAround: [
      "Route 2 along the north and I-495 along the east",
      "Route 110 through town",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Harvard", "census, area, history, geography, Bare Hill Pond, Shaker Village, Fruitlands"), DOR_TAX],
  },

  maynard: {
    tagline: "A mill-town downtown on the Assabet River, with a rail trail and a 1949 movie theater",
    glance: [
      pop("10,746"),
      { label: "Size", value: "5.4 sq mi" },
      from(21, "west-northwest"),
      { label: "Incorporated", value: "1871" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$16.62"),
    ],
    feel: [
      "Maynard is a compact town built around a walkable downtown and the brick mill complex on the Assabet River, with neighborhoods spreading out from the center. Part of the Assabet River National Wildlife Refuge lies on the town's southern side.",
      "Downtown has shops, restaurants, galleries and the Fine Arts Theatre, and the farmers market sets up beside the mill on summer Saturdays. Maynard Fest fills downtown every fall, and the Christmas Parade has run since 1966. The Assabet River Rail Trail runs through the center, linking downtown with the refuge and the South Acton commuter rail station.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Maynard", text: "Shops, restaurants and galleries around the former mill." },
      { icon: "museum", title: "Fine Arts Theatre", text: "A three-screen movie theater opened in 1949 and restored in 2007." },
      { icon: "trail", title: "Assabet River Rail Trail", text: "A trail from South Acton station through downtown Maynard and along the river." },
      { icon: "tree", title: "Assabet River National Wildlife Refuge", text: "A large part of the refuge is in Maynard." },
    ],
    events: [
      { name: "Maynard Fest", when: "Fall", text: "A downtown festival held every fall since 1992." },
      { name: "Farmers market", when: "Saturdays, June to October", text: "On Main Street next to the mill, since 1996." },
      { name: "Christmas Parade", when: "December", text: "A town parade held since 1966." },
    ],
    gettingAround: [
      "Routes 27, 62 and 117 through town",
      "Route 2 nearby",
      "MBTA Fitchburg Line at South Acton, reached by the rail trail",
    ],
    photos: [],
    sources: [wiki("Maynard", "census, area, history, downtown, sites of interest, events, transportation"), DOR_TAX],
  },

  littleton: {
    tagline: "A commuter rail stop at I-495, Littleton Common and lakes and orchards",
    glance: [
      pop("10,141"),
      { label: "Size", value: "17.6 sq mi" },
      from(26, "west-northwest"),
      { label: "Incorporated", value: "1715" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.02"),
    ],
    feel: [
      "Littleton is a town of lakes, orchards and wooded hills where I-495 meets Route 2. Littleton Common is the main village center, and lakes and ponds, including Long Lake, Fort Pond and Lake Nagog, cover about 5 percent of the town.",
      "Everyday errands center on Littleton Common, and the town has its own commuter rail station at Route 495 on the Fitchburg Line. The Littleton Conservation Trust looks after trails across town, and the Indian Hill Music Center offers lessons and concerts.",
    ],
    highlights: [
      { icon: "history", title: "Littleton Common", text: "The town's main village center." },
      { icon: "river", title: "Long Lake, Fort Pond and Lake Nagog", text: "Lakes and ponds that cover about 5 percent of the town." },
      { icon: "tree", title: "Conservation land", text: "Open land and trails protected by the Littleton Conservation Trust and the town." },
      { icon: "museum", title: "Indian Hill Music Center", text: "A music school and performance center in Littleton." },
    ],
    events: [],
    gettingAround: [
      "MBTA Fitchburg Line at Littleton/Route 495",
      "I-495, Route 2 and Routes 2A, 110 and 119",
      "LRTA and MART bus service",
    ],
    photos: [],
    sources: [wiki("Littleton", "census, area, history, organizations, transportation"), DOR_TAX],
  },

  groton: {
    tagline: "More than 100 miles of trails, two rivers and a hilltop castle",
    glance: [
      pop("11,315"),
      { label: "Size", value: "33.7 sq mi", note: "largest town by area in Middlesex County" },
      from(30, "northwest"),
      { label: "Incorporated", value: "1655" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$14.78"),
    ],
    feel: [
      "Groton is the largest town by area in Middlesex County and one of the most open: more than 30 percent of the land is protected, and the Nashua and Squannacook rivers wind through woods and fields. Gibbet Hill, topped by the ruins of a stone castle, rises over the town center.",
      "Main Street is the heart of town, with the Groton Inn and the public library, and Groton Hill Music Center hosts concerts. More than 100 miles of trails are open for walking and biking, the Nashua River Rail Trail runs through town, and orchards such as Autumn Hills sell fruit each fall.",
    ],
    highlights: [
      { icon: "trail", title: "Nashua River Rail Trail", text: "A paved trail through Groton, from Ayer north toward New Hampshire." },
      { icon: "tree", title: "Gibbet Hill", text: "A hill in the center of town with trails and the ruins of a stone castle." },
      { icon: "museum", title: "Groton Hill Music Center", text: "A concert hall and music school." },
      { icon: "farm", title: "Autumn Hills Orchard", text: "One of the town's orchards." },
    ],
    events: [],
    gettingAround: [
      "Routes 40, 111, 119 and 225",
      "Route 2 nearby",
      "MBTA Fitchburg Line at Ayer, next door",
    ],
    photos: [],
    sources: [wiki("Groton", "census, area, history, geography, points of interest, conservation land"), DOR_TAX],
  },

  ayer: {
    tagline: "A walkable Main Street downtown, a commuter rail station and the start of the Nashua River Rail Trail",
    glance: [
      pop("8,479"),
      { label: "Size", value: "9.6 sq mi" },
      from(30, "west-northwest"),
      { label: "Incorporated", value: "1871" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.59"),
    ],
    feel: [
      "Ayer is a small town with a compact, historic downtown on Main Street and a commuter rail station in the center. Sandy Pond and the Nashua River lie at its edges, and part of the former Fort Devens, now a mix of businesses and open land, extends into town.",
      "Downtown Ayer has shops and restaurants in its 19th-century buildings, a short walk from the train to North Station. The Nashua River Rail Trail starts here and heads north through Groton, and Routes 2A, 110 and 111 connect to Route 2 and I-495.",
    ],
    highlights: [
      { icon: "store", title: "Ayer Main Street Historic District", text: "The town's historic downtown." },
      { icon: "trail", title: "Nashua River Rail Trail", text: "The trail's southern end is in Ayer, heading north through Groton." },
      { icon: "history", title: "Fort Devens Historic District", text: "Part of the former Army post, listed on the National Register of Historic Places." },
    ],
    events: [],
    gettingAround: [
      "MBTA Fitchburg Line at Ayer",
      "Routes 2A, 110 and 111",
      "Route 2 and I-495 one town away",
    ],
    photos: [],
    sources: [wiki("Ayer", "census, area, history, historic places, transportation"), DOR_TAX],
  },
};
