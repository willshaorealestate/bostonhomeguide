/*
 * townProfilesBatch7.ts — MetroWest and I-495 south: Hudson, Marlborough, Shrewsbury, Milford, Medway,
 * Millis, Medfield and Dover. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch7Profiles: Record<string, TownProfile> = {
  hudson: {
    tagline: "A former shoe-mill town on the Assabet River, with a rail trail through downtown",
    glance: [
      pop("20,092"),
      { label: "Size", value: "11.8 sq mi" },
      from(25, "west"),
      { label: "Incorporated", value: "1866", note: "formerly Feltonville, a village of Marlborough" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$14.14"),
    ],
    feel: [
      "Hudson was the Marlborough village of Feltonville until it became its own town in 1866. From about 1850 until 1968 it was a shoe-making town, with as many as 17 factories, many powered by the Assabet River.",
      "The Assabet River still runs through most of town, and the paved Assabet River Rail Trail follows it into downtown Hudson, with a boat landing at Main Street. Part of Lake Boon and part of Fort Meadow Reservoir are in Hudson.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Hudson", text: "The town's Main Street business district." },
      { icon: "trail", title: "Assabet River Rail Trail", text: "A paved trail from Marlborough through downtown Hudson." },
      { icon: "river", title: "Assabet River", text: "With a boat landing at Main Street, downstream of the dam." },
      { icon: "river", title: "Lake Boon", text: "A lake on the Hudson and Stow line." },
    ],
    events: [],
    gettingAround: [
      "Routes 62 and 85",
      "I-495 and I-290 nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Hudson", "census, area, history, Assabet River, rail trails"), DOR_TAX],
  },

  marlborough: {
    tagline: "Three lakes, a historic downtown and the junction of I-495, I-290 and Route 20",
    glance: [
      pop("41,793"),
      { label: "Size", value: "22.1 sq mi" },
      from(26, "west"),
      { label: "Incorporated", value: "1660", note: "as a town; a city since 1890" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$10.54"),
    ],
    feel: [
      "Marlborough was founded in 1660 by families from Sudbury, where two Native American trails crossed. It grew into an industrial town in the 1800s and a center for technology companies after the Mass Pike was built. The Marlborough Center Historic District keeps the old downtown along Route 20.",
      "Three large bodies of water are inside the city: Lake Williams, Millham Reservoir and Fort Meadow Reservoir, where Memorial Beach is. The Assabet River Rail Trail starts in Marlborough, and part of Callahan State Park is here.",
    ],
    highlights: [
      { icon: "river", title: "Fort Meadow Reservoir and Memorial Beach", text: "The city's beach, on a reservoir shared with Hudson." },
      { icon: "trail", title: "Assabet River Rail Trail", text: "A paved trail from Marlborough north to Hudson." },
      { icon: "tree", title: "Callahan State Park", text: "Fields and trails on the Framingham line." },
      { icon: "history", title: "John Brown Bell", text: "A bell Marlborough soldiers took from Harpers Ferry during the Civil War, now back in the city." },
    ],
    events: [],
    gettingAround: [
      "I-495, I-290 and US Route 20",
      "Route 85; the Mass Pike nearby",
      "MetroWest Regional Transit Authority buses",
    ],
    photos: [],
    sources: [wiki("Marlborough", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },

  shrewsbury: {
    tagline: "Lake Quinsigamond, a ski hill and the General Artemas Ward House",
    glance: [
      pop("38,325"),
      { label: "Size", value: "21.7 sq mi" },
      from(34, "west"),
      { label: "Incorporated", value: "1727" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$11.38", "FY2027"),
    ],
    feel: [
      "Shrewsbury was incorporated in 1727 and grew with visitors to Lake Quinsigamond, which forms its western edge with Worcester. The Shrewsbury Historic District is in the town center, and two 1767 milestones from the Boston Post Road still stand.",
      "The town is hilly, and its parks reflect it: Ski Ward offers skiing and snow tubing, and Prospect Park, Dean Park and the trails around Jordan Pond are open for walking and biking.",
    ],
    highlights: [
      { icon: "river", title: "Lake Quinsigamond", text: "A long lake on the Worcester line." },
      { icon: "tree", title: "Ski Ward", text: "A year-round recreation area with skiing, snowboarding and snow tubing." },
      { icon: "museum", title: "General Artemas Ward House", text: "Home of the Revolutionary War general, on the National Register." },
      { icon: "trail", title: "Prospect Park and Dean Park", text: "Wooded parks with walking and biking trails." },
    ],
    events: [],
    gettingAround: [
      "Routes 9, 20 and 140",
      "I-290 nearby",
      "MBTA commuter rail in Worcester and Westborough, nearby",
    ],
    photos: [],
    sources: [wiki("Shrewsbury", "census, area, history, historic places, parks"), DOR_TAX],
  },

  milford: {
    tagline: "Milford pink granite, the upper Charles River and a rail trail, along I-495",
    glance: [
      pop("30,379"),
      { label: "Size", value: "14.9 sq mi" },
      from(27, "west-southwest"),
      { label: "Incorporated", value: "1780", note: "formerly part of Mendon" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$12.69"),
    ],
    feel: [
      "Milford was settled in 1662 as part of Mendon and incorporated in 1780. Its name likely comes from the fords on the Mill River. In the 1800s it became an industrial and quarrying town, known for Milford pink granite.",
      "The Charles River begins near Milford and flows through town. The Upper Charles Trail runs on an old rail line, and the woodland trails maintained by the New England Mountain Bike Association are popular for biking, running and hiking. St. Mary's Cemetery has the only Irish round tower in the United States, built of local granite.",
    ],
    highlights: [
      { icon: "trail", title: "Upper Charles Trail", text: "A rail trail through Milford toward Holliston." },
      { icon: "tree", title: "NEMBA trails", text: "A woodland trail network for mountain biking, running and hiking." },
      { icon: "museum", title: "Memorial Hall", text: "Home and museum of the Milford Historical Commission." },
      { icon: "history", title: "Irish round tower", text: "At St. Mary's Cemetery, built from Milford granite." },
    ],
    events: [
      { name: "Fourth of July", when: "July", text: "Fireworks at Plains Park and an annual parade." },
    ],
    gettingAround: [
      "I-495 through town",
      "Routes 16, 85, 109 and 140",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Milford", "census, area, history, geography, sites of interest, events"), DOR_TAX],
  },

  medway: {
    tagline: "Mill villages on the Charles River, halfway between Boston, Worcester and Providence",
    glance: [
      pop("13,115"),
      { label: "Size", value: "11.5 sq mi" },
      from(23, "southwest"),
      { label: "Incorporated", value: "1713" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$14.00"),
    ],
    feel: [
      "Medway was settled in 1657 and incorporated in 1713 as a farming town. The water power of the Charles River and Chicken Brook soon brought cotton and paper mills, and later straw and boot factories, to its villages.",
      "The Charles River runs along the town, and Medway sits roughly at the geographic center of Boston, Worcester and Providence. Routes 109 and 126 are the main roads, and I-495 crosses the southwest corner.",
    ],
    highlights: [
      { icon: "river", title: "Charles River", text: "The river that powered the town's early mills." },
      { icon: "history", title: "Mill villages", text: "Medway grew around cotton and paper mills along the Charles and Chicken Brook." },
    ],
    events: [],
    gettingAround: [
      "Routes 109 and 126",
      "I-495 nearby",
      "MBTA Franklin/Foxboro Line in Norfolk and Franklin, nearby",
    ],
    photos: [],
    sources: [wiki("Medway", "census, area, history, geography, transportation"), DOR_TAX],
  },

  millis: {
    tagline: "The Charles River, Bogastow Brook and a tavern where George Washington stopped in 1775",
    glance: [
      pop("8,460"),
      { label: "Size", value: "12.3 sq mi" },
      from(20, "southwest"),
      { label: "Incorporated", value: "1885", note: "formerly East Medway" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.31"),
    ],
    feel: [
      "Millis was the eastern part of Medway until it became its own town in 1885. Richardson's Tavern, one of its oldest buildings, served George Washington lunch on his way to Cambridge in 1775.",
      "The Charles River runs through Millis, and Bogastow Brook flows through town to South End Pond. Large farms and town-owned land cover much of Millis, and Routes 109 and 115 cross in the town center.",
    ],
    highlights: [
      { icon: "history", title: "Richardson's Tavern", text: "Where George Washington stopped for lunch in 1775." },
      { icon: "river", title: "Charles River and Bogastow Brook", text: "The river and the brook that runs through town to South End Pond." },
      { icon: "history", title: "Prospect Hill Cemetery", text: "On the National Register; resting place of Secretary of State Christian Herter." },
      { icon: "farm", title: "Farms and town land", text: "Large farms and town-owned open land across Millis." },
    ],
    events: [],
    gettingAround: [
      "Routes 109 and 115",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Millis", "census, area, history, geography, notable sites"), DOR_TAX],
  },

  medfield: {
    tagline: "Rocky Woods, Noon Hill and the 1680 Peak House, along the Charles River",
    glance: [
      pop("12,799"),
      { label: "Size", value: "14.6 sq mi" },
      from(17, "southwest"),
      { label: "Incorporated", value: "1651" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$13.52"),
    ],
    feel: [
      "Medfield was incorporated in 1651. Much of the town was burned in King Philip's War in 1676, and the Peak House, rebuilt in 1680, is now run by the Medfield Historical Society. Medfield Center is the town's small downtown.",
      "The Charles River forms almost a third of the town's border. Rocky Woods, a reservation in the northeast of town, has trails, ponds and Cedar Hill, and Noon Hill has a trail to its peak with views across the valley.",
    ],
    highlights: [
      { icon: "tree", title: "Rocky Woods", text: "A reservation with trails, fishing ponds and picnic areas." },
      { icon: "trail", title: "Noon Hill", text: "A hill with a trail to its peak and wide views." },
      { icon: "museum", title: "Peak House", text: "Rebuilt in 1680, open on Sundays in summer." },
      { icon: "river", title: "Charles River", text: "Forms almost a third of the town's border." },
    ],
    events: [
      { name: "Medfield Day", when: "Third Saturday in September", text: "A town celebration in Medfield Center." },
      { name: "Tree lighting and Winter Parade", when: "Early December", text: "In Baxter Park and the streets of Medfield Center." },
    ],
    gettingAround: [
      "Routes 27 and 109",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Medfield", "census, area, history, points of interest, events"), DOR_TAX],
  },

  dover: {
    tagline: "Woodland reservations, Elm Bank's gardens and the south bank of the Charles River",
    glance: [
      pop("5,923"),
      { label: "Size", value: "15.4 sq mi" },
      from(14, "southwest"),
      { label: "Incorporated", value: "1836", note: "formerly part of Dedham" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$11.29", "FY2027"),
    ],
    feel: [
      "Dover sits on the south bank of the Charles River. It was a parish of Dedham from 1748, a district from 1784, and a town from 1836. Its zoning sets large minimum lot sizes, and very few of its roads are state highways.",
      "Woodland reservations and the Charles River give the town much of its character. Elm Bank, an 1876 estate on the river, is home to the Massachusetts Horticultural Society's gardens. Dover shares a regional school system with Sherborn.",
    ],
    highlights: [
      { icon: "tree", title: "Elm Bank", text: "An 1876 estate on the Charles River, now public gardens." },
      { icon: "tree", title: "Noanet Woodlands", text: "Trails through woods and around ponds, with a lookout over the Boston skyline." },
      { icon: "history", title: "Benjamin Caryl House", text: "A house from about 1777, home of Dover's first minister." },
      { icon: "river", title: "Charles River", text: "The town's northern edge." },
    ],
    events: [],
    gettingAround: [
      "Mostly local roads; Routes 16 and 109 nearby",
      "MBTA Needham Line and Worcester Line nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Dover", "census, area, history, zoning, historic sites"), DOR_TAX],
  },
};
