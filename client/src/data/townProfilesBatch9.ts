/*
 * townProfilesBatch9.ts — Boston, Allston-Brighton, Cambridge, Somerville and Brookline (city-level
 * profiles; neighborhood-by-neighborhood pages can come later), plus Burlington and Watertown, which
 * are ready for when those towns get pages. Same rules and sources as townProfilesBatch3.ts.
 */
import type { TownProfile } from "./townProfiles";

const DOR_TAX = { label: "Massachusetts Department of Revenue, Division of Local Services: tax rates by class", url: "https://dls-gw.dor.state.ma.us/reports/rdPage.aspx?rdReport=PropertyTaxInformation.taxratesbyclass.taxratesbyclass_main" };
const wiki = (town: string, what: string) => ({ label: `${town}, Massachusetts (Wikipedia): ${what}`, url: `https://en.wikipedia.org/wiki/${town.replace(/ /g, "_")},_Massachusetts` });
const tax = (rate: string, fy = "FY2026") => ({ label: "Property tax rate", value: rate, note: `per $1,000, residential, ${fy}` });
const from = (miles: number, dir: string) => ({ label: "From Boston", value: `~${miles} miles`, note: `${dir}, straight-line` });
const pop = (n: string) => ({ label: "Population", value: n, note: "2020 Census" });

export const batch9Profiles: Record<string, TownProfile> = {
  boston: {
    tagline: "Twenty-three neighborhoods, the Freedom Trail, the Emerald Necklace and every line of the T",
    glance: [
      pop("675,647"),
      { label: "Size", value: "89.6 sq mi", note: "48.3 sq mi of land" },
      { label: "Neighborhoods", value: "23" },
      { label: "Incorporated", value: "1630", note: "as a town; a city since 1822" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$12.40"),
    ],
    feel: [
      "Boston was founded in 1630 and became a city in 1822. It is made up of 23 neighborhoods, from the historic North End, Beacon Hill and Back Bay to Jamaica Plain, Roslindale and West Roxbury, each with its own main streets and character. Boston Common, set aside in 1634, is the oldest public park in the country, and the Freedom Trail links 16 Revolutionary-era sites.",
      "Green space runs through the city: the Emerald Necklace, a chain of parks designed by Frederick Law Olmsted, stretches from the Common to Franklin Park, and the Charles River Esplanade follows the river along Back Bay. Every MBTA subway line runs through Boston, along with commuter rail from North and South stations and Logan Airport in East Boston.",
    ],
    highlights: [
      { icon: "history", title: "Freedom Trail", text: "A walking route linking 16 Revolutionary-era sites, starting at Boston Common." },
      { icon: "tree", title: "Emerald Necklace", text: "Olmsted's chain of parks, from the Common to Franklin Park." },
      { icon: "river", title: "Charles River Esplanade", text: "Paths and parkland along the river in Back Bay." },
      { icon: "plane", title: "Logan International Airport", text: "In East Boston, reached by the Blue Line and Silver Line." },
    ],
    events: [
      { name: "Boston Marathon", when: "April (Patriots' Day)", text: "The race finishes on Boylston Street in Back Bay." },
      { name: "Fourth of July", when: "July 4", text: "The Boston Pops concert and fireworks on the Esplanade." },
    ],
    gettingAround: [
      "MBTA Red, Orange, Green, Blue and Silver lines",
      "Commuter rail and Amtrak from North Station and South Station",
      "I-93, the Mass Pike and Logan Airport",
    ],
    photos: [],
    sources: [{ label: "Boston (Wikipedia): census, area, history, neighborhoods, parks, transportation", url: "https://en.wikipedia.org/wiki/Boston" }, DOR_TAX],
  },

  "allston-brighton": {
    tagline: "Boston's northwest corner, from Brighton Center and Oak Square to Allston Village and the Charles",
    glance: [
      { label: "Part of", value: "City of Boston", note: "two neighborhoods, Allston and Brighton" },
      from(5, "west"),
      { label: "Incorporated", value: "1807", note: "as the town of Brighton; part of Boston since 1874" },
      { label: "Government", value: "Boston Mayor and City Council" },
      tax("$12.40"),
    ],
    feel: [
      "Brighton was its own town from 1807 until Boston annexed it in 1874. Allston, its eastern section, took its name in 1868 from the painter Washington Allston, when the railroad depot there opened. Today the two Boston neighborhoods are still known together as Allston-Brighton.",
      "Allston Village, along Harvard Avenue and Brighton Avenue, is packed with restaurants and shops. Brighton has the Brighton Center Historic District, Oak Square and Cleveland Circle, part of Boston College's campus, and the path around the Chestnut Hill Reservoir. Boston Landing, home to the commuter rail stop and New Balance's headquarters, sits beside the Mass Pike.",
    ],
    highlights: [
      { icon: "store", title: "Allston Village", text: "Restaurants and shops along Harvard and Brighton avenues." },
      { icon: "history", title: "Brighton Center Historic District", text: "The historic center of the former town of Brighton." },
      { icon: "river", title: "Chestnut Hill Reservoir", text: "A popular walking and running loop near Cleveland Circle." },
      { icon: "river", title: "Charles River", text: "Separates Allston-Brighton from Cambridge and Watertown." },
    ],
    events: [],
    gettingAround: [
      "MBTA Green Line B branch along Commonwealth Avenue; C and D branches at Cleveland Circle and Reservoir",
      "MBTA Framingham/Worcester Line at Boston Landing",
      "Mass Pike and MBTA bus routes",
    ],
    photos: [],
    sources: [
      { label: "Allston (Wikipedia): history, culture, transportation", url: "https://en.wikipedia.org/wiki/Allston,_Boston" },
      { label: "Brighton (Wikipedia): history, geography, transportation", url: "https://en.wikipedia.org/wiki/Brighton,_Boston" },
      DOR_TAX,
    ],
  },

  cambridge: {
    tagline: "Harvard, MIT and Kendall Square, with a string of squares on the Red Line",
    glance: [
      pop("118,403"),
      { label: "Size", value: "7.1 sq mi" },
      from(4, "west-northwest"),
      { label: "Incorporated", value: "1636", note: "founded 1630; a city since 1846" },
      { label: "Government", value: "City Manager and City Council", note: "the council elects the mayor" },
      tax("$6.95", "FY2027"),
    ],
    feel: [
      "Cambridge was founded in 1630, and George Washington took command of the Continental Army on Cambridge Common in July 1775. Harvard, founded here in 1636, is the oldest university in the country, and MIT's campus runs along the Charles River. Kendall Square, next to MIT, is one of the world's densest clusters of biotech and technology companies.",
      "The city is organized around its squares, among them Harvard, Central, Kendall, Porter and Inman, and it officially has 13 neighborhoods. Fresh Pond Reservation, with 162 acres of land around a kettle-hole lake, is its largest green space, and Mount Auburn Cemetery, the country's first garden cemetery, sits on the western edge.",
    ],
    highlights: [
      { icon: "school", title: "Harvard and MIT", text: "Harvard, founded in 1636, and MIT, along the Charles River." },
      { icon: "museum", title: "University museums", text: "Including the Harvard Art Museums, the Harvard Museum of Natural History and the MIT Museum." },
      { icon: "river", title: "Fresh Pond Reservation", text: "A path around a 155-acre lake, the city's largest open space." },
      { icon: "tree", title: "Mount Auburn Cemetery", text: "The country's first garden cemetery and an arboretum, on the Watertown line." },
    ],
    events: [],
    gettingAround: [
      "MBTA Red Line: Kendall/MIT, Central, Harvard, Porter and Alewife",
      "MBTA Green Line at Lechmere; Fitchburg Line commuter rail at Porter",
      "Memorial Drive and Route 2",
    ],
    photos: [],
    sources: [wiki("Cambridge", "census, area, history, neighborhoods, museums, parks"), DOR_TAX],
  },

  somerville: {
    tagline: "Davis, Union and Assembly squares, Porchfest and the new Green Line stations",
    glance: [
      pop("81,045"),
      { label: "Size", value: "4.2 sq mi" },
      from(2, "northwest"),
      { label: "Incorporated", value: "1842", note: "formerly part of Charlestown; a city since 1872" },
      { label: "Government", value: "Mayor and City Council" },
      tax("$10.98"),
    ],
    feel: [
      "Somerville separated from Charlestown in 1842 and became a city in 1872. It is the most densely populated municipality in New England, built as a streetcar suburb on a series of drumlins known as the \"Seven Hills.\" Life in the city centers on its squares, including Davis, Union, Ball and Assembly.",
      "Davis Square is home to the Somerville Theatre, and Assembly Row on the Mystic River has shops, restaurants and an Orange Line station. Every May, Porchfest brings around 200 bands to front porches across the city, and the Community Path links Davis Square toward the Minuteman Bikeway and the new Green Line stations.",
    ],
    highlights: [
      { icon: "store", title: "Davis Square", text: "Shops, restaurants and the Somerville Theatre, on the Red Line." },
      { icon: "store", title: "Union Square", text: "A neighborhood square with its own Green Line station." },
      { icon: "river", title: "Assembly Row", text: "Shops and dining on the Mystic River, with an Orange Line stop." },
      { icon: "trail", title: "Somerville Community Path", text: "A walking and biking path across the city." },
    ],
    events: [
      { name: "Porchfest", when: "May", text: "Around 200 bands play on porches across the city, held since 2011." },
      { name: "Somerville Open Studios", when: "Spring", text: "Artists open their studios to the public." },
    ],
    gettingAround: [
      "MBTA Green Line: Union Square, East Somerville, Gilman Square, Magoun Square and Ball Square",
      "MBTA Red Line at Davis; Orange Line at Assembly",
      "I-93 and Route 28",
    ],
    photos: [],
    sources: [wiki("Somerville", "census, area, history, geography, arts and culture, transportation"), DOR_TAX],
  },

  brookline: {
    tagline: "Coolidge Corner, Brookline Village, three Green Line branches and the JFK birthplace",
    glance: [
      pop("63,191"),
      { label: "Size", value: "6.8 sq mi" },
      from(5, "southwest"),
      { label: "Incorporated", value: "1705", note: "formerly the Boston hamlet of Muddy River" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$10.24"),
    ],
    feel: [
      "Brookline was the Boston hamlet of Muddy River until it became its own town in 1705. North of Route 9 (Boylston Street), it is urban and walkable, with business districts at Coolidge Corner and Brookline Village; the south of town is more open, with large parks and estates.",
      "Three branches of the Green Line serve the town. The birthplace of John F. Kennedy and Fairsted, the home office of landscape architect Frederick Law Olmsted, are both national historic sites in Brookline, and Larz Anderson Park has wide lawns and the country's oldest automobile collection.",
    ],
    highlights: [
      { icon: "store", title: "Coolidge Corner", text: "A business district around the Coolidge Corner Theatre on Beacon Street." },
      { icon: "history", title: "John F. Kennedy birthplace", text: "A national historic site, open May through September." },
      { icon: "museum", title: "Frederick Law Olmsted National Historic Site", text: "Fairsted, Olmsted's home and design office." },
      { icon: "tree", title: "Larz Anderson Park", text: "Hilltop lawns and the Larz Anderson Auto Museum." },
    ],
    events: [],
    gettingAround: [
      "MBTA Green Line C and D branches, with the B branch along the northern edge",
      "Route 9 (Boylston Street)",
      "MBTA bus routes",
    ],
    photos: [],
    sources: [wiki("Brookline", "census, area, history, geography, points of interest, transportation"), DOR_TAX],
  },

  burlington: {
    tagline: "A town common with a sculpture park, the Mill Pond conservation area and Route 128",
    glance: [
      pop("26,377"),
      { label: "Size", value: "11.9 sq mi" },
      from(12, "northwest"),
      { label: "Incorporated", value: "1799", note: "formerly part of Woburn" },
      { label: "Government", value: "Representative Town Meeting", note: "with a Select Board and Town Administrator" },
      tax("$8.69"),
    ],
    feel: [
      "Burlington was settled in 1641 and set off from Woburn in 1799. Several early homesteads still stand, including the Francis Wyman House from 1666. The Town Common and Simonds Park are in the center of town, with the public library and the 18th-century meeting house nearby.",
      "Route 128 (I-95) and Route 3 meet in Burlington. The Burlington Sculpture Park sits across from the Common, and the Mill Pond Conservation Area, the town's largest, has trails for hiking and biking on the east side of town.",
    ],
    highlights: [
      { icon: "history", title: "Town Common and Simonds Park", text: "The center of town, with fields, courts and the library nearby." },
      { icon: "museum", title: "Burlington Sculpture Park", text: "Sculptures from around the world, with a picnic area, across from the Common." },
      { icon: "tree", title: "Mill Pond Conservation Area", text: "The town's largest conservation area, with hiking and biking trails." },
      { icon: "history", title: "Francis Wyman House", text: "A homestead from 1666." },
    ],
    events: [],
    gettingAround: [
      "I-95/Route 128, Route 3 and Routes 3A and 62",
      "MBTA and B-Line buses",
      "Commuter rail at the Anderson Regional Transportation Center in Woburn, nearby",
    ],
    photos: [],
    sources: [wiki("Burlington", "census, area, history, points of interest, transportation"), DOR_TAX],
  },

  watertown: {
    tagline: "Watertown Square on the Charles River, the Arsenal and the Mosesian Center for the Arts",
    glance: [
      pop("35,329"),
      { label: "Size", value: "4.1 sq mi" },
      from(6, "west"),
      { label: "Incorporated", value: "1630" },
      { label: "Government", value: "City Manager and City Council", note: "officially the City known as the Town of Watertown" },
      tax("$12.20"),
    ],
    feel: [
      "Watertown was one of the first Massachusetts Bay Colony settlements, organized in 1630. Watertown Square, where the town grew up beside the Charles River, is still its center, and its neighborhoods include Bemis, Coolidge Square, East Watertown and the West End.",
      "The Watertown Arsenal produced armaments from 1816 through World War II. Its riverside grounds now include Arsenal Park and the Mosesian Center for the Arts, home of the New Repertory Theatre. The Armenian Library and Museum of America and the Perkins School for the Blind are also in Watertown.",
    ],
    highlights: [
      { icon: "store", title: "Watertown Square", text: "The city's center on the Charles River." },
      { icon: "museum", title: "Mosesian Center for the Arts", text: "A regional arts center in the former Arsenal." },
      { icon: "tree", title: "Arsenal Park", text: "A public park on the old Arsenal grounds, renovated in 2025." },
      { icon: "museum", title: "Armenian Library and Museum of America", text: "On Main Street, in the former Coolidge Bank building." },
    ],
    events: [],
    gettingAround: [
      "MBTA bus routes through Watertown Square and Watertown Yard",
      "Mass Pike and Soldiers Field Road at the city's edge",
      "Charles River paths",
    ],
    photos: [],
    sources: [wiki("Watertown", "census, area, history, culture, parks, transportation"), DOR_TAX],
  },
};
