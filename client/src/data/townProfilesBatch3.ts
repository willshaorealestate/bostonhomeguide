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
      { label: "Incorporated", value: "1683", note: "formerly Pompositticut Plantation" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$17.87"),
    ],
    feel: [
      "Stow was farm and orchard land for most of its history, and pick-your-own orchards and farm stands are still part of the town. Over the centuries it gave up land to form newer towns around it, including Harvard, Boxborough, Hudson and Maynard.",
      "Water shapes the town: the Assabet River flows through it from west to east, and Lake Boon, named for early settler Matthew Boon, sits on the town's southern edge. Part of the Assabet River National Wildlife Refuge is in Stow.",
    ],
    highlights: [
      { icon: "farm", title: "Orchards and farm stands", text: "Stow's farmland includes pick-your-own orchards that open each summer and fall." },
      { icon: "river", title: "Lake Boon", text: "A lake on the town's southern edge, named for one of Stow's first colonial settlers." },
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
      { label: "Incorporated", value: "1783", note: "from parts of Stow, Harvard and Littleton" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.39"),
    ],
    feel: [
      "Boxborough was formed in 1783 from parts of Stow, Harvard and Littleton, and was long one of the most productive farming areas in the county. The town name is often written \"Boxboro\" on highway signs.",
      "Open land is the town's defining feature: fourteen state, nonprofit, conservation and town tracts have trails for walking and other non-motorized use. Steele Farm is a local spot for sledding and hikes, and the Beaver Valley Preserve has a glacial esker more than a mile long.",
    ],
    highlights: [
      { icon: "farm", title: "Steele Farm", text: "Town land with fields and trails, used for hiking and winter sledding." },
      { icon: "tree", title: "Beaver Valley Preserve", text: "Conservation land with a glacial esker more than a mile long." },
      { icon: "museum", title: "Boxborough Museum", text: "Run by the Boxborough Historical Society and open on several Sundays a year." },
      { icon: "history", title: "Path of the Patriots", text: "Revolutionary-era sites, including the Silas Taylor Farm on Flagg Hill." },
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
      { label: "Incorporated", value: "1738", note: "formerly part of Lancaster" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$18.07"),
    ],
    feel: [
      "Bolton was settled by English farmers in the 1600s and incorporated in 1738, and it is still a town of farms and apple orchards. Nashoba Valley Winery and The International Golf Club, which has hosted several major tournaments, are both in Bolton.",
      "The Bolton Center Historic District runs along Route 117, and the Bolton Flats Wildlife Management Area sits near the Nashua and Still rivers. Wattaquadock Hill and the North Peak of Vaughn Hill are the town's high points.",
    ],
    highlights: [
      { icon: "farm", title: "Orchards and Nashoba Valley Winery", text: "Apple orchards and a winery are among the town's farms." },
      { icon: "tree", title: "Bolton Flats Wildlife Management Area", text: "Open fields and wetlands near the Still and Nashua rivers." },
      { icon: "history", title: "Bolton Center Historic District", text: "Historic civic, church and commercial buildings along Route 117." },
      { icon: "history", title: "Whitcomb Inn and Farm", text: "A house from about 1708, possibly the oldest surviving house in Bolton." },
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
      "Harvard is a wooded town of rolling hills, fields and orchards, settled in 1658 and incorporated in 1732. Its town center is built around the Common, and its public library opened in 1856.",
      "Bare Hill Pond, a 320-acre lake with a town beach, dock and small islands, sits at the center of town. Harvard has a history of unusual communities: the Harvard Shaker Village and Fruitlands, the 1840s transcendentalist farm, are both here.",
    ],
    highlights: [
      { icon: "river", title: "Bare Hill Pond", text: "A 320-acre lake with a town beach and dock." },
      { icon: "museum", title: "Fruitlands Museum", text: "Site of the 1843 transcendentalist farm community, now a museum with trails." },
      { icon: "history", title: "Harvard Shaker Village", text: "The historic settlement of a Shaker community, on Shaker Road." },
      { icon: "tree", title: "Oak Ridge", text: "A ridge 609 feet up that was home to Harvard University's Oak Ridge Observatory for more than 70 years." },
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
      { label: "Incorporated", value: "1871", note: "from parts of Stow and Sudbury" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$16.62"),
    ],
    feel: [
      "Maynard grew up around the Assabet Woolen Mill, which made wool fabrics from 1846 to 1950, including cloth for Union Army uniforms. The mill complex was later the headquarters of Digital Equipment Corporation from 1957 to 1998, and its buildings now hold offices and businesses.",
      "Downtown Maynard has shops, restaurants, galleries and the Fine Arts Theatre, a movie house that opened in 1949. The Assabet River flows through the center of town, and the Assabet River Rail Trail connects downtown with the South Acton commuter rail station and with the Assabet River National Wildlife Refuge.",
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
      { label: "Incorporated", value: "1715", note: "formerly Nashoba" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$14.02"),
    ],
    feel: [
      "Littleton was known as Nashoba before it was incorporated in 1715. In the 1600s it was the site of the Nashoba Praying Town, on the land between Lake Nagog and Fort Pond. Littleton Common is the town's main village center.",
      "The town sits where I-495 meets Route 2, and it has its own commuter rail station on the Fitchburg Line. Lakes and ponds cover about 5 percent of the town, and the Littleton Conservation Trust looks after open land across town.",
    ],
    highlights: [
      { icon: "history", title: "Littleton Common", text: "The town's main village center." },
      { icon: "river", title: "Fort Pond and Lake Nagog", text: "Two of the town's ponds, at the site of the 1600s Nashoba settlement." },
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
      "Groton is one of the oldest towns in the region, incorporated in 1655. William Prescott, the American commander at the Battle of Bunker Hill, was from Groton. Gibbet Hill, topped by the ruins of a stone castle, rises over the center of town.",
      "More than 30 percent of the town is protected open space, much of it open to the public, with more than 100 miles of trails. The Nashua and Squannacook rivers run through town, and the Nashua River Rail Trail passes through on its way to the New Hampshire line.",
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
    tagline: "A railroad town with a commuter rail station and the start of the Nashua River Rail Trail",
    glance: [
      pop("8,479"),
      { label: "Size", value: "9.6 sq mi" },
      from(30, "west-northwest"),
      { label: "Incorporated", value: "1871", note: "formerly part of Groton" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.59"),
    ],
    feel: [
      "Ayer was set off from Groton in 1871 and grew as a major railroad junction. The Ayer Main Street Historic District keeps the town's 19th-century downtown, and the commuter rail still stops in the center of town.",
      "The town's history is tied to Fort Devens, established for World War I training. Much of the former fort has been redeveloped since it closed in the 1990s, and the Fort Devens Historic District is on the National Register. The Nashua River Rail Trail starts in Ayer.",
    ],
    highlights: [
      { icon: "store", title: "Ayer Main Street Historic District", text: "The town's historic downtown." },
      { icon: "trail", title: "Nashua River Rail Trail", text: "The trail's southern end is in Ayer, heading north through Groton." },
      { icon: "history", title: "Fort Devens Historic District", text: "Part of the former Army post, listed on the National Register of Historic Places." },
      { icon: "history", title: "St. Andrew's Church", text: "An 1892 church on Faulkner Street, on the National Register." },
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
