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
    tagline: "A revived Main Street downtown with restaurants and breweries, on the Assabet River",
    glance: [
      pop("20,092"),
      { label: "Size", value: "11.8 sq mi" },
      from(25, "west"),
      { label: "Incorporated", value: "1866" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      tax("$14.14"),
    ],
    feel: [
      "Hudson is a former mill town with a lively downtown on Main Street along the Assabet River, surrounded by neighborhoods and wooded land. Part of Lake Boon and part of Fort Meadow Reservoir are in town.",
      "Since the mid-2010s, restaurants, breweries and shops have filled downtown's storefronts, and the Spirit of Hudson Food and Brewfest showcases local restaurants and brewers. The paved Assabet River Rail Trail runs into downtown, with a boat landing on the river at Main Street, and Routes 62 and 85 lead to I-495 and I-290.",
    ],
    highlights: [
      { icon: "store", title: "Downtown Hudson", text: "The town's Main Street business district." },
      { icon: "trail", title: "Assabet River Rail Trail", text: "A paved trail from Marlborough through downtown Hudson." },
      { icon: "river", title: "Assabet River", text: "With a boat landing at Main Street, downstream of the dam." },
      { icon: "river", title: "Lake Boon", text: "A lake on the Hudson and Stow line." },
    ],
    events: [
      { name: "Spirit of Hudson Food and Brewfest", when: "Yearly", text: "Local restaurants and breweries, organized by the Hudson Rotary Club and local businesses." },
    ],
    gettingAround: [
      "Routes 62 and 85",
      "I-495 and I-290 nearby",
      "No commuter rail station in town",
    ],
    photos: [],
    sources: [wiki("Hudson", "census, area, history, Assabet River, rail trails"), DOR_TAX],
  },

  marlborough: {
    tagline: "A Main Street downtown, three lakes and the junction of I-495, I-290 and Route 20",
    glance: [
      pop("41,793"),
      { label: "Size", value: "22.1 sq mi" },
      from(26, "west"),
      { label: "Incorporated", value: "1660", note: "a city since 1890" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$10.54"),
    ],
    feel: [
      "Marlborough is a small city where I-495, I-290 and Route 20 meet, with a historic downtown along Main Street, neighborhoods spreading out from it, and office parks and shopping near the highways. Three large bodies of water lie inside the city: Lake Williams, Millham Reservoir and Fort Meadow Reservoir.",
      "Downtown has restaurants and local businesses in the Marlborough Center Historic District. Memorial Beach on Fort Meadow Reservoir is the city's beach, the Assabet River Rail Trail starts in Marlborough, and part of Callahan State Park has trails on the Framingham line. The New England Sports Center and Solomon Pond Mall are also in the city.",
    ],
    highlights: [
      { icon: "river", title: "Fort Meadow Reservoir and Memorial Beach", text: "The city's beach, on a reservoir shared with Hudson." },
      { icon: "trail", title: "Assabet River Rail Trail", text: "A paved trail from Marlborough north to Hudson." },
      { icon: "tree", title: "Callahan State Park", text: "Fields and trails on the Framingham line." },
      { icon: "store", title: "Downtown Marlborough", text: "Restaurants and local businesses along Main Street." },
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
      "Shrewsbury is a hilly suburban town on the eastern shore of Lake Quinsigamond, with a historic town center and commercial corridors along Routes 9 and 20.",
      "The lake is known for rowing and boating, and Ski Ward offers skiing, snowboarding and snow tubing in winter. Prospect Park, Dean Park and the trails around Jordan Pond are open for walking and biking, and downtown Worcester and its commuter rail station are just across the lake.",
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
      { label: "Incorporated", value: "1780" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$12.69"),
    ],
    feel: [
      "Milford is a busy town along I-495 with a traditional downtown on Main Street, neighborhoods spreading out from it, and woods and old granite quarries on the edges. The Charles River begins nearby and flows through town.",
      "Downtown has shops and restaurants, and Plains Park hosts the Fourth of July fireworks, with a parade each year. The Upper Charles Trail runs on an old rail line toward Holliston, the New England Mountain Bike Association's woodland trails are popular for biking, running and hiking, and the Portuguese Club hosts a two-night summer festival.",
    ],
    highlights: [
      { icon: "trail", title: "Upper Charles Trail", text: "A rail trail through Milford toward Holliston." },
      { icon: "tree", title: "NEMBA trails", text: "A woodland trail network for mountain biking, running and hiking." },
      { icon: "museum", title: "Memorial Hall", text: "Home and museum of the Milford Historical Commission." },
      { icon: "tree", title: "Plains Park", text: "Home of the Fourth of July fireworks." },
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
      "Medway is a suburban town along the Charles River, with Main Street (Route 109) and Village Street as its main corridors and neighborhoods set among woods and fields. I-495 crosses the southwest corner of town.",
      "Village Street winds along the Charles past the old mill villages, and Choate Park, with its pond and playground, is a town gathering spot. Routes 109 and 126 lead to I-495, and the nearest commuter rail stations are on the Franklin/Foxboro Line in Norfolk and Franklin.",
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
    tagline: "Farms, open land and the Charles River, with a small center where Routes 109 and 115 cross",
    glance: [
      pop("8,460"),
      { label: "Size", value: "12.3 sq mi" },
      from(20, "southwest"),
      { label: "Incorporated", value: "1885" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$15.31"),
    ],
    feel: [
      "Millis is a small town of farms, woods and town-owned open land, with a compact center where Routes 109 and 115 cross. The Charles River runs through town, and Bogastow Brook flows to South End Pond.",
      "Large farms and conservation land shape much of the town, and the Charles is open for paddling. The center has the town's shops and services, and Richardson's Tavern still stands from the 1700s. With no commuter rail station, Routes 109 and 115 are the main roads to I-495 and neighboring towns.",
    ],
    highlights: [
      { icon: "history", title: "Richardson's Tavern", text: "Where George Washington stopped for lunch in 1775." },
      { icon: "river", title: "Charles River and Bogastow Brook", text: "The river and the brook that runs through town to South End Pond." },
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
      "Medfield is a suburban town with a small, walkable center along Main Street and wide stretches of woods and farmland, bordered on almost a third of its edge by the Charles River.",
      "Medfield Day fills the center on the third Saturday of September, and early December brings a tree lighting in Baxter Park and a Winter Parade. Hinkley Pond has public swimming, lessons and a playground, Rocky Woods and Noon Hill have trails with wide views, and the library is on Main Street.",
    ],
    highlights: [
      { icon: "tree", title: "Rocky Woods", text: "A reservation with trails, fishing ponds and picnic areas." },
      { icon: "trail", title: "Noon Hill", text: "A hill with a trail to its peak and wide views." },
      { icon: "museum", title: "Peak House", text: "Rebuilt in 1680, open on Sundays in summer." },
      { icon: "river", title: "Hinkley Pond", text: "Public swimming, lessons, a playground and winter skating." },
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
      { label: "Incorporated", value: "1836" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$11.29", "FY2027"),
    ],
    feel: [
      "Dover is a wooded town on the south bank of the Charles River, with homes on large lots, winding local roads and a small town center.",
      "Much of the town is woodland and reservation: Noanet Woodlands has trails and a lookout toward Boston, and Elm Bank's gardens sit on a bend of the Charles. The old Caryl School is now a community center. There is no commuter rail station in town; stations in Needham and Natick are nearby.",
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
