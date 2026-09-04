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

// "$850,000" — for full-price fields
function formatPriceFull(price) {
  return `$${price.toLocaleString('en-US')}`;
}

// ─── Market.tsx ────────────────────────────────────────────────────────────────

export function updateMarketTsx(area, townRows, year, month) {
  let c = readFileSync(MARKET_TSX, 'utf8');

  const long     = longLabel(year, month);
  const short    = shortLabel(year, month);
  const nextLong = nextLongLabel(year, month);
  const abbr     = `${SHORT[month - 1]} ${year}`;  // "Jul 2026"

  // 1. Source comment
  c = c.replace(
    /\/\/ Last updated: .+? — Source: MLSPIN Area Market Survey/,
    `// Last updated: ${long} — Source: MLSPIN Area Market Survey`
  );

  // 2. priceData — parse current, drop oldest, append new month
  const priceMatch = c.match(/const priceData = \[([\s\S]*?)\n\];/);
  if (!priceMatch) throw new Error('priceData not found in Market.tsx');
  const priceEntries = parsePriceArray(priceMatch[1]);
  priceEntries.shift();
  priceEntries.push({ month: short, median: area.medianPrice, sales: area.soldCount });
  const firstMonth = priceEntries[0].month;  // used for chart label below
  const newPriceRows = priceEntries
    .map(e => `  { month: "${e.month}", median: ${e.median}, sales: ${e.sales} }`)
    .join(',\n');
  c = c.replace(/const priceData = \[[\s\S]*?\n\];/, `const priceData = [\n${newPriceRows},\n];`);

  // 3. domData — same rolling-window treatment
  const domMatch = c.match(/const domData = \[([\s\S]*?)\n\];/);
  if (!domMatch) throw new Error('domData not found in Market.tsx');
  const domEntries = parseDomArray(domMatch[1]);
  domEntries.shift();
  domEntries.push({ month: short, dom: area.dom });
  const newDomRows = domEntries
    .map(e => `  { month: "${e.month}", dom: ${e.dom} }`)
    .join(',\n');
  c = c.replace(/const domData = \[[\s\S]*?\n\];/, `const domData = [\n${newDomRows},\n];`);

  // 4. townData — replace entirely
  const newTownRows = townRows.map(t => {
    const namePad = ' '.repeat(Math.max(1, 10 - t.town.length));
    const pricePad = String(t.medianPrice).padStart(7);
    return `  { town: "${t.town}",${namePad}medianPrice: ${pricePad}, dom: ${t.dom}, listToSale: ${t.listToSale.toFixed(1)} }`;
  }).join(',\n');
  c = c.replace(/const townData = \[[\s\S]*?\n\];/, `const townData = [\n${newTownRows},\n];`);

  // 5. SEO title
  c = c.replace(
    /title: "Greater Boston Real Estate Market Report \| .+?"/,
    `title: "Greater Boston Real Estate Market Report | ${long}"`
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
    /\{ value: "\d+%", label: "List-to-Sale Ratio", change: "Above asking, on average" \}/,
    `{ value: "${area.spLp}%", label: "List-to-Sale Ratio", change: "Above asking, on average" }`
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

  // 10. Commentary heading (body text left for manual update)
  c = c.replace(
    /.+ — What This Means for You/,
    `${long} — What This Means for You`
  );

  writeFileSync(MARKET_TSX, c, 'utf8');
  console.log(`  ✓ Market.tsx → ${long}`);
}

// ─── Home.tsx ──────────────────────────────────────────────────────────────────

// Towns that appear in Home.tsx neighborhood cards (Concord and Waltham excluded)
const HOME_TOWNS = ['Newton', 'Wellesley', 'Brookline', 'Natick', 'Lexington', 'Needham', 'Framingham'];

export function updateHomeTsx(area, townMap, year, month) {
  let c = readFileSync(HOME_TSX, 'utf8');

  const long  = longLabel(year, month);
  const abbr  = `${SHORT[month - 1]} ${year}`;  // "Jul 2026"

  // Neighborhood card prices
  for (const town of HOME_TOWNS) {
    if (!townMap[town]) continue;
    const price = formatPriceShort(townMap[town].medianPrice);
    c = c.replace(
      new RegExp(`(\\{ name: "${town}", type: "[^"]+", medianPrice: )"[^"]+"`),
      (_, prefix) => `${prefix}"${price}"`
    );
  }

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
    /\{ label: "List-to-Sale Ratio", value: "\d+%", change: "Above asking", up: true \}/,
    `{ label: "List-to-Sale Ratio", value: "${area.spLp}%", change: "Above asking", up: true }`
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

const SLUG_MAP = {
  boston: 'Boston', newton: 'Newton', wellesley: 'Wellesley',
  brookline: 'Brookline', natick: 'Natick', lexington: 'Lexington',
  needham: 'Needham', framingham: 'Framingham', waltham: 'Waltham',
};

export function updateNeighborhoodTs(townMap) {
  let c = readFileSync(NEIGHBORHOODS_TS, 'utf8');

  for (const [slug, town] of Object.entries(SLUG_MAP)) {
    if (!townMap[town]) continue;
    const price = formatPriceFull(townMap[town].medianPrice);
    // Match slug field, then find medianPrice within the same object (within 300 chars)
    c = c.replace(
      new RegExp(`(slug:\\s*"${slug}"[\\s\\S]{0,300}?medianPrice:\\s*)"[^"]+"`),
      (_, prefix) => `${prefix}"${price}"`
    );
  }

  writeFileSync(NEIGHBORHOODS_TS, c, 'utf8');
  console.log(`  ✓ neighborhoods.ts`);
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
