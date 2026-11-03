/*
 * townProfilesBatch1.ts — profiles for Concord, Acton, Carlisle, Lincoln, Billerica, Winchester,
 * Arlington and Belmont. Same rules as townProfiles.ts: facts from the listed sources, in our own
 * words; describe places, amenities, history and getting around, never the people who live there.
 *
 * Tax rates are FY2026 residential rates per $1,000 (Massachusetts Department of Revenue data).
 * Photos list the planned photo spots; a photo with no `src` is left off the live page.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue: FY2026 tax rates", url: "https://www.mass.gov/info-details/fy2026-tax-levies-assessed-values-and-tax-rates" };

export const batch1Profiles: Record<string, TownProfile> = {
  concord: {
    tagline: "The Old North Bridge, Walden Pond and two village centers on the commuter rail",
    glance: [
      { label: "Population", value: "18,491", note: "2020 Census" },
      { label: "Size", value: "26 sq mi" },
      { label: "From Boston", value: "~19 miles", note: "west" },
      { label: "Incorporated", value: "1635" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$13.05", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Concord's history is both Revolutionary and literary. The Old North Bridge, where the colonial militia fired the \"shot heard round the world\" on April 19, 1775, is part of Minute Man National Historical Park, and the homes of Ralph Waldo Emerson and Louisa May Alcott's family are open to visitors.",
      "The town has two village centers, Concord Center and West Concord, and each has its own stop on the MBTA Fitchburg Line. Open land is a big part of the town, from Walden Pond to the Great Meadows National Wildlife Refuge along the Concord River.",
    ],
    highlights: [
      { icon: "history", title: "Old North Bridge", text: "Part of Minute Man National Historical Park, the site of the fighting at Concord on April 19, 1775." },
      { icon: "river", title: "Walden Pond", text: "The pond where Henry David Thoreau lived and wrote, now a state reservation." },
      { icon: "museum", title: "Orchard House and the Emerson House", text: "The Alcott family home, where Little Women was written, and Ralph Waldo Emerson's house, both open to visitors." },
      { icon: "tree", title: "Great Meadows National Wildlife Refuge", text: "Wetlands and trails along the Concord River." },
    ],
    events: [
      { name: "Patriots' Day", when: "April", text: "Commemorations at the Old North Bridge, including the march from Acton along the Isaac Davis Trail." },
    ],
    gettingAround: [
      "Route 2 through town",
      "MBTA Fitchburg Line at Concord and West Concord",
      "Yankee Line commuter buses to Boston",
    ],
    photos: [
      { caption: "Old North Bridge" },
      { caption: "Walden Pond" },
    ],
    sources: [
      { label: "Concord, Massachusetts (Wikipedia): census, area, government, landmarks, transit", url: "https://en.wikipedia.org/wiki/Concord,_Massachusetts" },
      { label: "Acton, Massachusetts (Wikipedia): Patriots' Day march to the Old North Bridge", url: "https://en.wikipedia.org/wiki/Acton,_Massachusetts" },
      DOR_TAX,
    ],
  },

  acton: {
    tagline: "Five villages, two rail trails and more than 1,650 acres of town conservation land",
    glance: [
      { label: "Population", value: "24,021", note: "2020 Census" },
      { label: "Size", value: "20 sq mi" },
      { label: "From Boston", value: "~21 miles", note: "west-northwest" },
      { label: "Incorporated", value: "1735" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$16.23", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Acton is made up of five villages: Acton Center, the town's civic center, plus West, South, East and North Acton, most of them named for their old railroad stations. West Acton has a small commercial area along Route 111, and South Acton has the town's commuter rail station.",
      "The town owns more than 1,650 acres of conservation land, including the 185-acre Great Hill in South Acton. Two rail trails run through town: the Assabet River Rail Trail starts at South Acton station, and the Bruce Freeman Rail Trail heads north toward Westford and Lowell.",
    ],
    highlights: [
      { icon: "history", title: "Acton Monument", text: "In Acton Center, the resting place of Captain Isaac Davis, who led Acton's minutemen to the Old North Bridge in 1775." },
      { icon: "tree", title: "NARA Park", text: "The Nathaniel Allen Recreation Area in North Acton, with a swimming pond, playing fields and an amphitheater." },
      { icon: "trail", title: "Two rail trails", text: "The Assabet River Rail Trail from South Acton through Maynard, and the Bruce Freeman Rail Trail north toward Lowell." },
      { icon: "tree", title: "Great Hill", text: "A 185-acre conservation area in South Acton." },
    ],
    events: [
      { name: "Patriots' Day", when: "April", text: "A march from Acton Center to the Old North Bridge in Concord along the Isaac Davis Trail." },
      { name: "Fourth of July", when: "July", text: "Fireworks at NARA Park." },
    ],
    gettingAround: [
      "Routes 2, 2A, 27, 62, 111 and 119",
      "MBTA Fitchburg Line at South Acton",
      "Assabet River and Bruce Freeman rail trails",
    ],
    photos: [
      { caption: "Acton Monument in Acton Center" },
      { caption: "NARA Park" },
    ],
    sources: [
      { label: "Acton, Massachusetts (Wikipedia): census, area, government, villages, parks, events, transit", url: "https://en.wikipedia.org/wiki/Acton,_Massachusetts" },
      DOR_TAX,
    ],
  },

  carlisle: {
    tagline: "Two-acre lots, a quarter of the town in conservation land, and a farm that became a state park",
    glance: [
      { label: "Population", value: "5,237", note: "2020 Census" },
      { label: "Size", value: "15.5 sq mi" },
      { label: "From Boston", value: "~19 miles", note: "northwest" },
      { label: "Incorporated", value: "1805", note: "a district of Concord from 1780" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      { label: "Property tax rate", value: "$12.82", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Carlisle has a rural character that's unusual this close to Boston. New homes require a lot of at least two acres, and conservation land covers about a quarter of the town.",
      "The town center is small, with the Old Burying Ground at its heart. Great Brook Farm State Park, a working dairy farm with trails and a cross-country ski touring center, is in the north of town, and the Concord River and Great Meadows National Wildlife Refuge run along its edge.",
    ],
    highlights: [
      { icon: "farm", title: "Great Brook Farm State Park", text: "Trails, a working dairy farm and a cross-country ski touring center." },
      { icon: "tree", title: "Conservation land", text: "About a quarter of the town is protected conservation land." },
      { icon: "river", title: "Great Meadows National Wildlife Refuge", text: "Part of the refuge borders the Concord River along the town's edge." },
      { icon: "museum", title: "Gleason Public Library", text: "The town's public library." },
    ],
    events: [
      { name: "Carlisle Old Home Day", when: "Weekend before July 4", text: "A free town celebration with games and activities, held for more than 100 years." },
    ],
    gettingAround: [
      "Route 225 through the town center",
      "No commuter rail station in town",
    ],
    photos: [
      { caption: "Great Brook Farm State Park" },
      { caption: "Carlisle town center" },
    ],
    sources: [
      { label: "Carlisle, Massachusetts (Wikipedia): census, area, zoning, parks, Old Home Day", url: "https://en.wikipedia.org/wiki/Carlisle,_Massachusetts" },
      { label: "Massachusetts Municipal Association: Carlisle", url: "https://www.mma.org/?p=34886" },
      DOR_TAX,
    ],
  },

  lincoln: {
    tagline: "Conservation land, modern architecture and a sculpture park, with a commuter rail stop",
    glance: [
      { label: "Population", value: "7,014", note: "2020 Census" },
      { label: "Size", value: "15 sq mi" },
      { label: "From Boston", value: "~20 miles", note: "west, by road" },
      { label: "Incorporated", value: "1754" },
      { label: "Government", value: "Open Town Meeting", note: "with a Select Board" },
      { label: "Property tax rate", value: "$12.31", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Green space takes up a large share of Lincoln, much of it public conservation land, and many homes sit on an acre or more. Trails wind around Farrar Pond and across the 227-acre Mount Misery conservation area.",
      "The town is also known for culture and design: the deCordova Sculpture Park and Museum, the Gropius House (a landmark of modern architecture) and Mass Audubon's Drumlin Farm are all in Lincoln. Part of Minute Man National Historical Park is here too, including the spot where Paul Revere was captured in 1775.",
    ],
    highlights: [
      { icon: "museum", title: "deCordova Sculpture Park and Museum", text: "Outdoor sculpture across a large wooded park, plus a contemporary art museum." },
      { icon: "history", title: "Gropius House", text: "The modernist home architect Walter Gropius designed for his family, open for tours." },
      { icon: "farm", title: "Drumlin Farm", text: "A working farm and wildlife sanctuary run by Mass Audubon, whose headquarters is also in Lincoln." },
      { icon: "tree", title: "Mount Misery", text: "A 227-acre conservation area with walking trails." },
      { icon: "history", title: "Minute Man National Historical Park", text: "Includes the site where Paul Revere was captured on April 19, 1775." },
    ],
    events: [],
    gettingAround: [
      "Route 2 and Route 117",
      "MBTA Fitchburg Line at Lincoln",
      "Hanscom Field, partly in Lincoln",
    ],
    photos: [
      { caption: "deCordova Sculpture Park" },
      { caption: "Drumlin Farm" },
    ],
    sources: [
      { label: "Lincoln, Massachusetts (Wikipedia): census, area, government, landmarks, transit", url: "https://en.wikipedia.org/wiki/Lincoln,_Massachusetts" },
      { label: "Boston Magazine: So, You Want to Live in Lincoln?", url: "https://www.bostonmagazine.com/?p=2795726" },
      { label: "Massachusetts Municipal Association: Lincoln", url: "https://mma.org/?p=34991" },
      DOR_TAX,
    ],
  },

  billerica: {
    tagline: "Two rivers, a lake with a public beach, and Route 3 running right through town",
    glance: [
      { label: "Population", value: "42,119", note: "2020 Census" },
      { label: "Size", value: "26.4 sq mi" },
      { label: "From Boston", value: "~18 miles", note: "northwest" },
      { label: "Incorporated", value: "1655" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$11.61", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Billerica is one of the larger towns in the area, made up of villages including Billerica Center, North Billerica and Pinehurst. The Concord and Shawsheen rivers both run through town, and Nutting's Lake has a public beach with canoeing and sailing.",
      "It's also an employment hub, home to companies such as E Ink, EMD Serono, Bruker and Entegris. US Route 3 runs through town, Route 128 is less than three miles south, and North Billerica has a stop on the commuter rail's Lowell Line.",
    ],
    highlights: [
      { icon: "river", title: "Nutting's Lake", text: "A public beach with canoeing and sailing." },
      { icon: "river", title: "Concord and Shawsheen rivers", text: "The town's two major waterways." },
      { icon: "history", title: "Middlesex Canal", text: "The historic canal ran through Billerica from 1795 to 1852." },
      { icon: "store", title: "Major employers", text: "Companies including E Ink, EMD Serono, Bruker, Entegris and Raytheon have operations in town." },
    ],
    events: [
      { name: "Yankee Doodle Weekend", when: "September", text: "The town's annual celebration." },
    ],
    gettingAround: [
      "US Route 3 and Route 3A",
      "Route 128 (I-95) less than 3 miles south",
      "MBTA Lowell Line at North Billerica",
    ],
    photos: [
      { caption: "Nutting's Lake" },
      { caption: "Concord River in Billerica" },
    ],
    sources: [
      { label: "Billerica, Massachusetts (Wikipedia): census, area, government, rivers, employers, transit", url: "https://en.wikipedia.org/wiki/Billerica,_Massachusetts" },
      DOR_TAX,
    ],
  },

  winchester: {
    tagline: "Two commuter rail stops, the Mystic Lakes and the Middlesex Fells, eight miles from Boston",
    glance: [
      { label: "Population", value: "22,970", note: "2020 Census" },
      { label: "Size", value: "6.3 sq mi" },
      { label: "From Boston", value: "~8 miles", note: "north" },
      { label: "Incorporated", value: "1850" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$11.08", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Winchester sits about eight miles north of downtown Boston, with two commuter rail stations, Winchester Center and Wedgemere, within walking distance of each other on the Lowell Line.",
      "Water and woods shape the town. The Middlesex Fells Reservation covers its eastern third, the Mystic Lakes form its southern border, and the Aberjona River feeds a string of ponds through the middle of town, including Wedge Pond with its beach and splash park.",
    ],
    highlights: [
      { icon: "tree", title: "Middlesex Fells Reservation", text: "Covers the eastern third of town, with the North, Middle and South Reservoirs." },
      { icon: "river", title: "Mystic Lakes", text: "Along the town's southern border." },
      { icon: "river", title: "Wedge Pond", text: "Home to Borggaard Beach and a splash park." },
      { icon: "history", title: "Sanborn House", text: "One of the town's historic sites." },
    ],
    events: [
      { name: "Thanksgiving football", when: "Thanksgiving Day", text: "Winchester High School plays Woburn, a rivalry game held for more than a century." },
    ],
    gettingAround: [
      "MBTA Lowell Line at Winchester Center and Wedgemere",
      "I-93 nearby, with Amtrak's Downeaster at the Anderson Regional Transportation Center",
    ],
    photos: [
      { caption: "Mystic Lakes" },
      { caption: "Winchester Center" },
    ],
    sources: [
      { label: "Winchester, Massachusetts (Wikipedia): census, area, government, parks, transit, events", url: "https://en.wikipedia.org/wiki/Winchester,_Massachusetts" },
      DOR_TAX,
    ],
  },

  arlington: {
    tagline: "Spy Pond, the Minuteman Bikeway and three neighborhood centers, six miles from Boston",
    glance: [
      { label: "Population", value: "46,308", note: "2020 Census" },
      { label: "Size", value: "5.5 sq mi" },
      { label: "From Boston", value: "~6 miles", note: "northwest" },
      { label: "Incorporated", value: "1807", note: "as West Cambridge; renamed Arlington in 1867" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Manager" },
      { label: "Property tax rate", value: "$10.67", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Arlington sits about six miles northwest of Boston, between Cambridge and Lexington. Its main neighborhoods are Arlington Center, East Arlington and Arlington Heights, each with its own shops and restaurants along Massachusetts Avenue.",
      "Spy Pond and the Mystic Lakes border the town, and the Minuteman Bikeway runs through it, connecting to the Red Line at Alewife. The history goes back to 1635, when the area was settled as Menotomy.",
    ],
    highlights: [
      { icon: "river", title: "Spy Pond", text: "A large pond near Arlington Center, next to the Minuteman Bikeway." },
      { icon: "trail", title: "Minuteman Bikeway", text: "Runs through town and connects riders to the Red Line at Alewife." },
      { icon: "museum", title: "Robbins Library", text: "Home to the oldest continuously operating free children's library in the country." },
      { icon: "history", title: "Jason Russell House", text: "A historic house museum." },
      { icon: "tree", title: "Menotomy Rocks Park and Robbins Farm Park", text: "Two of the town's parks; Menotomy Rocks surrounds Hills Pond." },
    ],
    events: [],
    gettingAround: [
      "Route 2 along the southern border",
      "MBTA buses, including the 77 and 350",
      "Minuteman Bikeway to the Red Line at Alewife",
      "No commuter rail station in town",
    ],
    photos: [
      { caption: "Spy Pond" },
      { caption: "Arlington Center" },
    ],
    sources: [
      { label: "Arlington, Massachusetts (Wikipedia): census, area, government, neighborhoods, parks, transit", url: "https://en.wikipedia.org/wiki/Arlington,_Massachusetts" },
      DOR_TAX,
    ],
  },

  belmont: {
    tagline: "Three village centers and two commuter rail stops, about 16 minutes from North Station",
    glance: [
      { label: "Population", value: "27,295", note: "2020 Census" },
      { label: "Size", value: "4.7 sq mi" },
      { label: "From Boston", value: "~16 min", note: "by train to North Station" },
      { label: "Incorporated", value: "1859" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      { label: "Property tax rate", value: "$11.51", note: "per $1,000, residential, FY2026" },
    ],
    feel: [
      "Belmont is a compact town just west of Cambridge with three village centers: Belmont Center, Cushing Square to the south and Waverley Square to the west. Belmont Center and Waverley each have a stop on the commuter rail's Fitchburg Line, about 16 minutes from North Station.",
      "For a town of under five square miles, it has a good amount of open space, including Rock Meadow, the Habitat wildlife sanctuary and Clay Pit Pond near Belmont Center.",
    ],
    highlights: [
      { icon: "store", title: "Three village centers", text: "Belmont Center, Cushing Square and Waverley Square." },
      { icon: "tree", title: "Rock Meadow", text: "Conservation land with walking paths." },
      { icon: "tree", title: "Habitat", text: "A wildlife sanctuary with trails." },
      { icon: "river", title: "Clay Pit Pond", text: "A pond near the center of town." },
    ],
    events: [],
    gettingAround: [
      "MBTA Fitchburg Line at Belmont Center and Waverley",
      "MBTA buses and trackless trolleys",
      "Route 2 along the northern border, Route 60 through town",
    ],
    photos: [
      { caption: "Belmont Center" },
      { caption: "Rock Meadow" },
    ],
    sources: [
      { label: "Belmont, Massachusetts (Wikipedia): census, area, government, centers, open space, transit", url: "https://en.wikipedia.org/wiki/Belmont,_Massachusetts" },
      DOR_TAX,
    ],
  },
};
