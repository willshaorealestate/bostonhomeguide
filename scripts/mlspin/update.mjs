/**
 * update.mjs — Rewrite Market.tsx, Home.tsx, and neighborhoods.ts with new market data.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '../..');
const MARKET_TSX      = resolve(ROOT, 'client/src/pages/Market.tsx');
const HOME_TSX        = resolve(ROOT, 'client/src/pages/Home.tsx');
const NEIGHBORHOODS_TS = resolve(ROOT, 'client/src/data/neighborhoods.ts');

const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parseMonthLabel(label) {
  const m = label.match(/^(\w{3}) '(\d{2})$/);
  return m ? (2000 + Number(m[2])) * 12 + SHORT.indexOf(m[1]) : 0;
}
function sortByMonth(entries) { return entries.slice().sort((a, b) => parseMonthLabel(a.month) - parseMonthLabel(b.month)); }

// Rolling window kept for every chart and town history (months).
const WINDOW = 12;
// Sort chronologically and keep the most recent WINDOW months, so backfilling older months never drops newer ones.
function keepWindow(entries) { return sortByMonth(entries).slice(-WINDOW); }

function shortLabel(year, month) { return `${SHORT[month - 1]} '${String(year).slice(2)}`; }
function longLabel(year, month)  { return `${LONG[month - 1]} ${year}`; }

function nextLongLabel(year, month) {
  return month === 12 ? longLabel(year + 1, 1) : longLabel(year, month + 1);
}

// "$1.55M", "$943K" — for Home.tsx neighborhood cards
function formatPriceShort(price) {
  if (price >= 1_000_000) {
    const rounded = Math.round(price / 10_000) / 100;
    return `$${rounded.toFixed(2).replace(/\.?0+$/, '')}M`;
  }
  return `$${Math.round(price / 1000)}K`;
}

function askingLabel(spLp) {
  return spLp > 100 ? 'Above asking' : spLp === 100 ? 'At asking' : 'Just under asking';
}

// "$850,000" — for full-price fields
function formatPriceFull(price) {
  return `$${price.toLocaleString('en-US')}`;
}

// ─── Market.tsx ────────────────────────────────────────────────────────────────

export function updateMarketTsx(area, townRows, year, month) {
  let c = readFileSync(MARKET_TSX, 'utf8').replace(/\r\n/g, '\n');

  const long     = longLabel(year, month);
  const short    = shortLabel(year, month);
  const nextLong = nextLongLabel(year, month);
  const abbr     = `${SHORT[month - 1]} ${year}`;  // "Jul 2026"

  // Determine if this month is the latest in the rolling window — only update
  // "current display" fields (townData, labels, key metrics) for the most recent month.
  // Backfilling older months should only update the rolling chart data.
  const existingPriceEntries = parsePriceArray(
    (c.match(/const priceData = \[([\s\S]*?)\n\];/) || ['', ''])[1]
  );
  const latestExisting = existingPriceEntries.length
    ? Math.max(...existingPriceEntries.map(e => parseMonthLabel(e.month)))
    : 0;
  const thisMonthVal = parseMonthLabel(short);
  const isLatestMonth = thisMonthVal >= latestExisting;

  // 1. Source comment (only when this is the latest month)
  if (isLatestMonth) c = c.replace(
    /\/\/ Last updated: .+? — Source: MLSPIN Area Market Survey/,
    `// Last updated: ${long} — Source: MLSPIN Area Market Survey`
  );

  // 2. priceData — upsert: replace existing entry for this month, or roll window forward
  const priceMatch = c.match(/const priceData = \[([\s\S]*?)\n\];/);
  if (!priceMatch) throw new Error('priceData not found in Market.tsx');
  const priceEntries = parsePriceArray(priceMatch[1]);
  const priceIdx = priceEntries.findIndex(e => e.month === short);
  if (priceIdx !== -1) {
    priceEntries[priceIdx] = { month: short, median: area.medianPrice, sales: area.soldCount };
  } else {
    priceEntries.push({ month: short, median: area.medianPrice, sales: area.soldCount });
  }
  const sortedPriceEntries = keepWindow(priceEntries);
  const firstMonth = sortedPriceEntries[0].month;  // used for chart label below
  const newPriceRows = sortedPriceEntries
    .map(e => `  { month: "${e.month}", median: ${e.median}, sales: ${e.sales} }`)
    .join(',\n');
  c = c.replace(/const priceData = \[[\s\S]*?\n\];/, `const priceData = [\n${newPriceRows},\n];`);

  // 3. domData — upsert same as priceData
  const domMatch = c.match(/const domData = \[([\s\S]*?)\n\];/);
  if (!domMatch) throw new Error('domData not found in Market.tsx');
  const domEntries = parseDomArray(domMatch[1]);
  const domIdx = domEntries.findIndex(e => e.month === short);
  if (domIdx !== -1) {
    domEntries[domIdx] = { month: short, dom: area.dom };
  } else {
    domEntries.push({ month: short, dom: area.dom });
  }
  const newDomRows = keepWindow(domEntries)
    .map(e => `  { month: "${e.month}", dom: ${e.dom} }`)
    .join(',\n');
  c = c.replace(/const domData = \[[\s\S]*?\n\];/, `const domData = [\n${newDomRows},\n];`);

  if (isLatestMonth) {
    // 4. townData — replace entirely
    const newTownRows = townRows.map(t => {
      const namePad = ' '.repeat(Math.max(1, 10 - t.town.length));
      const pricePad = String(t.medianPrice).padStart(7);
      return `  { town: "${t.town}",${namePad}medianPrice: ${pricePad}, dom: ${t.dom}, listToSale: ${t.listToSale.toFixed(1)} }`;
    }).join(',\n');
    c = c.replace(/const townData = \[[\s\S]*?\n\];/, `const townData = [\n${newTownRows},\n];`);

    // 5. SEO title
    c = c.replace(
      /title: "Greater Boston Market Report: .+? \| Will Shao"/,
      `title: "Greater Boston Market Report: ${long} | Will Shao"`
    );

    // 6. Hero span
    c = c.replace(
      /<span>Updated .+? · Next report: .+?<\/span>/,
      `<span>Updated ${long} · Next report: ${nextLong}</span>`
    );

    // 7. Key metrics strip (value first, then label)
    c = c.replace(
      /\{ value: "\$[\d,]+", label: "Median Sale Price", change: "MLSPIN, .+?" \}/,
      `{ value: "${formatPriceFull(area.medianPrice)}", label: "Median Sale Price", change: "MLSPIN, ${abbr}" }`
    );
    c = c.replace(
      /\{ value: "\d+ days", label: "Avg\. Days on Market", change: "SF \+ Condo, Greater Boston" \}/,
      `{ value: "${area.dom} days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" }`
    );
    c = c.replace(
      /\{ value: "\d+%", label: "List-to-Sale Ratio", change: "[^"]*" \}/,
      `{ value: "${area.spLp}%", label: "List-to-Sale Ratio", change: "${askingLabel(area.spLp)}, on average" }`
    );
    c = c.replace(
      /\{ value: "[\d,]+", label: "Closed Sales", change: "MLSPIN, .+?" \}/,
      `{ value: "${area.soldCount.toLocaleString('en-US')}", label: "Closed Sales", change: "MLSPIN, ${abbr}" }`
    );

    // 8. Price chart date range label
    c = c.replace(
      /[A-Z][a-z]{2} '\d{2} through [A-Z][a-z]{2} '\d{2}/g,
      `${firstMonth} through ${short}`
    );

    // 9. Towns table label
    c = c.replace(
      /.+ market data by town — Source: MLSPIN/,
      `${long} market data by town — Source: MLSPIN`
    );

    // 10. Commentary heading + body are written by commentary.mjs (run from index.mjs)
  } else {
    console.log(`  (skipping display labels — ${short} is not the latest month)`);
  }

  writeFileSync(MARKET_TSX, c, 'utf8');
  console.log(`  ✓ Market.tsx → ${long}`);
  return isLatestMonth;
}

// ─── Home.tsx ──────────────────────────────────────────────────────────────────


export function updateHomeTsx(area, townMap, year, month) {
  let c = readFileSync(HOME_TSX, 'utf8').replace(/\r\n/g, '\n');

  const long  = longLabel(year, month);
  const abbr  = `${SHORT[month - 1]} ${year}`;  // "Jul 2026"

  // Neighborhood card prices — every card whose town has data this month
  c = c.replace(/(\{ name: "([^"]+)", medianPrice: )"[^"]+"/g, (whole, prefix, town) =>
    townMap[town] ? `${prefix}"${formatPriceShort(townMap[town].medianPrice)}"` : whole
  );

  // Market stats strip (label first, then value)
  c = c.replace(
    /\{ label: "Median Sale Price", value: "\$[\d,]+", change: ".+?", up: true \}/,
    `{ label: "Median Sale Price", value: "${formatPriceFull(area.medianPrice)}", change: "${abbr}", up: true }`
  );
  c = c.replace(
    /\{ label: "Days on Market", value: "\d+ days", change: "Greater Boston", up: false \}/,
    `{ label: "Days on Market", value: "${area.dom} days", change: "Greater Boston", up: false }`
  );
  c = c.replace(
    /\{ label: "List-to-Sale Ratio", value: "\d+%", change: "[^"]*", up: (?:true|false) \}/,
    `{ label: "List-to-Sale Ratio", value: "${area.spLp}%", change: "${askingLabel(area.spLp)}", up: ${area.spLp >= 100} }`
  );
  c = c.replace(
    /\{ label: "Active Inventory", value: "[\d,]+", change: ".+?", up: false \}/,
    `{ label: "Active Inventory", value: "${area.activeListings.toLocaleString('en-US')}", change: "${abbr}", up: false }`
  );

  // "Updated June 2026" stamp
  c = c.replace(/Updated \w+ \d{4}/, `Updated ${long}`);

  writeFileSync(HOME_TSX, c, 'utf8');
  console.log(`  ✓ Home.tsx → ${long}`);
}

// ─── neighborhoods.ts ──────────────────────────────────────────────────────────


export function updateTownHistory(townMap, year, month) {
  let c = readFileSync(MARKET_TSX, 'utf8').replace(/\r\n/g, '\n');
  const short = shortLabel(year, month);

  for (const [town, data] of Object.entries(townMap)) {
    // New town: add an empty array at the end of townHistoryData so the upsert below fills it
    if (!c.includes(`  "${town}": [\n`)) {
      c = c.replace(
        /(const townHistoryData[^=]*=\s*\{[\s\S]*?\n)(\};)/,
        (_, body, end) => `${body}  "${town}": [\n  ],\n${end}`
      );
    }
    // Find this town's array in townHistoryData and roll it forward
    const entryRe = new RegExp(
      `("${town}":\\s*\\[\\n)([\\s\\S]*?)(\\s*\\],)`,
    );
    c = c.replace(entryRe, (_, open, body, close) => {
      // Parse existing entries (sold/pending optional for backward compat)
      const lineRe = /\{ month: "([^"]+)", median:\s*(\d+), dom:\s*(\d+), listToSale:\s*(\d+)(?:, sold:\s*(\d+))?(?:, pending:\s*(\d+))? \}/g;
      const entries = [];
      let m;
      while ((m = lineRe.exec(body)) !== null) {
        entries.push({ month: m[1], median: Number(m[2]), dom: Number(m[3]), listToSale: Number(m[4]), sold: m[5] ? Number(m[5]) : 0, pending: m[6] ? Number(m[6]) : 0 });
      }
      // Upsert: replace existing entry for this month, or add it and keep the latest WINDOW months
      const existingIdx = entries.findIndex(e => e.month === short);
      if (existingIdx !== -1) {
        entries[existingIdx] = { month: short, median: data.medianPrice, dom: data.dom, listToSale: Math.round(data.spOp), sold: data.soldCount, pending: data.pending };
      } else {
        entries.push({ month: short, median: data.medianPrice, dom: data.dom, listToSale: Math.round(data.spOp), sold: data.soldCount, pending: data.pending });
      }
      const newBody = keepWindow(entries)
        .map(e => `    { month: "${e.month}", median: ${String(e.median).padStart(7)}, dom: ${e.dom}, listToSale: ${e.listToSale}, sold: ${e.sold}, pending: ${e.pending} }`)
        .join(',\n');
      return `${open}${newBody},\n  ],`;
    });
  }

  writeFileSync(MARKET_TSX, c, 'utf8');
  console.log(`  ✓ townHistoryData → ${short}`);
}

export function updateNeighborhoodTs(townMap, year, month) {
  let c = readFileSync(NEIGHBORHOODS_TS, 'utf8').replace(/\r\n/g, '\n');
  const source = `MLS PIN, ${SHORT[month - 1]} ${year}`;
  let updated = 0;

  // Each town object: find it by name, then set medianPrice and priceSource inside the same object
  c = c.replace(/\n  \{\n[\s\S]*?\n  \},/g, (obj) => {
    const name = (obj.match(/\n    name: "([^"]+)",/) || [])[1];
    if (!name || !townMap[name]) return obj;
    updated++;
    // Function replacers: a price like "$1,050,000" would otherwise be read as a $1 back-reference
    const price = formatPriceFull(townMap[name].medianPrice);
    let o = obj.replace(/(\n    medianPrice: )"[^"]+"/, (_, p) => `${p}"${price}"`);
    if (/\n    priceSource: "/.test(o)) o = o.replace(/(\n    priceSource: )"[^"]+"/, (_, p) => `${p}"${source}"`);
    else o = o.replace(/(\n    medianPrice: "[^"]+",)/, (_, p) => `${p}\n    priceSource: "${source}",`);
    return o;
  });

  writeFileSync(NEIGHBORHOODS_TS, c, 'utf8');
  console.log(`  ✓ neighborhoods.ts (${updated} towns, ${source})`);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function parsePriceArray(str) {
  const entries = [];
  const re = /\{\s*month:\s*"([^"]+)",\s*median:\s*(\d+),\s*sales:\s*(\d+)\s*\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    entries.push({ month: m[1], median: Number(m[2]), sales: Number(m[3]) });
  }
  return entries;
}

function parseDomArray(str) {
  const entries = [];
  const re = /\{\s*month:\s*"([^"]+)",\s*dom:\s*(\d+)\s*\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    entries.push({ month: m[1], dom: Number(m[2]) });
  }
  return entries;
}
