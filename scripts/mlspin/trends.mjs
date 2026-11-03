/**
 * trends.mjs — Pull quarterly and annual MLS PIN figures for the town pages
 * and write them to client/src/data/townTrends.ts.
 *
 * Usage:
 *   MLSPIN_USER=x MLSPIN_PASS=y node scripts/mlspin/trends.mjs [--towns "Lexington, Bedford"] [--years 5] [--quarters 8]
 *
 * For each town:
 *   - the last N complete calendar quarters (days on market, sale-to-list, homes sold)
 *   - the number of homes for sale today (months of supply): MLS PIN's report counts listings
 *     from its date range that are still active now, so a range covering the last 5 years gives
 *     the current inventory. Past dates can't be reconstructed, so each run records its own.
 *   - the last Y complete calendar years plus the current year to date (true annual medians)

 *
 * Without --towns, every town in towns.mjs is pulled.
 * Set DEBUG=1 to save screenshots at each step into debug-screenshots/.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { scrapeTownPeriods } from './scrape.mjs';
import { TOWNS } from './towns.mjs';

const TRENDS_TS = resolve(import.meta.dirname, '../../client/src/data/townTrends.ts');
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const mmddyyyy = (y, m, d) => `${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}/${y}`;
const lastDay = (y, m) => new Date(y, m, 0).getDate();

/** Plan the report date ranges relative to `today`. Exported for testing. */
export function planPeriods(today, years = 5, quarters = 8) {
  // MLS PIN closings for a month are settled by about the 5th of the next month.
  const settledThrough = new Date(today.getFullYear(), today.getMonth() - (today.getDate() >= 5 ? 0 : 1), 0); // last day of a settled month
  const sy = settledThrough.getFullYear(), sm = settledThrough.getMonth() + 1;

  // Latest complete quarter ends on or before the settled month
  const qEndMonth = Math.floor(sm / 3) * 3;
  let qy = qEndMonth === 0 ? sy - 1 : sy;
  let qq = qEndMonth === 0 ? 4 : qEndMonth / 3;

  const qs = [];
  for (let i = 0; i < quarters; i++) {
    const startM = (qq - 1) * 3 + 1, endM = qq * 3;
    qs.unshift({ label: `Q${qq} '${String(qy).slice(2)}`, y: qy, q: qq, start: mmddyyyy(qy, startM, 1), end: mmddyyyy(qy, endM, lastDay(qy, endM)) });
    if (--qq === 0) { qq = 4; qy--; }
  }

  // Once December is settled, the year that just ended is a full year
  const lastFullYear = sm === 12 ? sy : sy - 1;
  const ys = [];
  for (let y = lastFullYear - years + 1; y <= lastFullYear; y++) ys.push({ year: y, start: mmddyyyy(y, 1, 1), end: mmddyyyy(y, 12, 31) });
  // Current year to date, through the last settled month (skip if that month is December — then it's a full year)
  const ytd = sm === 12 ? null : { year: sy, through: SHORT[sm - 1], start: mmddyyyy(sy, 1, 1), end: mmddyyyy(sy, sm, lastDay(sy, sm)) };

  // Current inventory: listings from the last 5 years that are still active today
  // Dates in Boston time (the runner is on UTC, which is already "tomorrow" in the evening)
  const asOf = today.toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); // YYYY-MM-DD
  const [ay, am, ad] = asOf.split('-').map(Number);
  const inventory = { asOf, start: mmddyyyy(ay - 5, 1, 1), end: mmddyyyy(ay, am, ad) };

  return { quarters: qs, years: ys, ytd, inventory };
}

/** Replace or insert one town's entry inside an `export const <name> ... = { ... };` block. */
export function upsertTown(source, exportName, town, rows) {
  const blockRe = new RegExp(`(export const ${exportName}[^=]*=\\s*\\{\\n)([\\s\\S]*?)(\\n?\\};)`);
  const m = source.match(blockRe);
  if (!m) throw new Error(`${exportName} not found in townTrends.ts`);
  let body = m[2];
  const entry = `  ${JSON.stringify(town)}: [\n${rows.map((r) => `    ${r},`).join('\n')}\n  ],`;
  const townRe = new RegExp(`  ${JSON.stringify(town).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: \\[\\n[\\s\\S]*?\\n  \\],`);
  body = townRe.test(body) ? body.replace(townRe, entry) : (body.trim() ? `${body.replace(/\n$/, '')}\n${entry}` : entry);
  return source.replace(blockRe, `${m[1]}${body}\n};`);
}

/** Replace or insert one town's single-object entry, e.g. "Bedford": { asOf: ..., active: 21 }, */
export function upsertObject(source, exportName, town, value) {
  const blockRe = new RegExp(`(export const ${exportName}[^=]*=\\s*\\{\\n)([\\s\\S]*?)(\\n?\\};)`);
  const m = source.match(blockRe);
  if (!m) throw new Error(`${exportName} not found in townTrends.ts`);
  const line = `  ${JSON.stringify(town)}: ${value},`;
  const lineRe = new RegExp(`  ${JSON.stringify(town).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: \\{[^\\n]*\\},`);
  let body = m[2];
  body = lineRe.test(body) ? body.replace(lineRe, line) : (body.trim() ? `${body.replace(/\n$/, '')}\n${line}` : line);
  return source.replace(blockRe, `${m[1]}${body}\n};`);
}

async function main() {
  const username = process.env.MLSPIN_USER;
  const password = process.env.MLSPIN_PASS;
  if (!username || !password) {
    console.error('Error: MLSPIN_USER and MLSPIN_PASS must be set.');
    process.exit(1);
  }

  const towns = arg('towns', '').split(',').map((t) => t.trim()).filter(Boolean);
  const list = towns.length ? towns : TOWNS;
  const unknown = list.filter((t) => !TOWNS.includes(t));
  if (unknown.length) console.warn(`  ⚠ Not in towns.mjs (will still try): ${unknown.join(', ')}`);

  const plan = planPeriods(new Date(), Number(arg('years', 5)), Number(arg('quarters', 8)));
  console.log(`Quarters: ${plan.quarters.map((q) => q.label).join(', ')}`);
  console.log(`Years: ${plan.years.map((y) => y.year).join(', ')}${plan.ytd ? `, ${plan.ytd.year} through ${plan.ytd.through}` : ''}`);
  console.log(`Inventory: listings ${plan.inventory.start}–${plan.inventory.end} still active (as of ${plan.inventory.asOf})`);
  console.log(`Towns (${list.length}): ${list.join(', ')}\n`);

  const periods = [
    ...plan.quarters.map((q) => ({ key: `q:${q.label}`, start: q.start, end: q.end, kind: 'sales' })),
    { key: 'now', start: plan.inventory.start, end: plan.inventory.end, kind: 'active' },
    ...plan.years.map((y) => ({ key: `y:${y.year}`, start: y.start, end: y.end, kind: 'sales' })),
    ...(plan.ytd ? [{ key: `y:${plan.ytd.year}`, start: plan.ytd.start, end: plan.ytd.end, kind: 'sales' }] : []),
  ];

  const results = await scrapeTownPeriods(username, password, list, periods);

  let src = readFileSync(TRENDS_TS, 'utf8').replace(/\r\n/g, '\n');
  for (const town of list) {
    const r = results[town] ?? {};
    const qRows = plan.quarters
      .filter((q) => r[`q:${q.label}`])
      .map((q) => {
        const s = r[`q:${q.label}`];
        return `{ quarter: "${q.label}", dom: ${s.dom}, listToSale: ${Math.round(s.spOp)}, sold: ${s.soldCount} }`;
      });
    const yRows = [...plan.years, ...(plan.ytd ? [plan.ytd] : [])]
      .filter((y) => r[`y:${y.year}`])
      .map((y) => {
        const s = r[`y:${y.year}`];
        return `{ year: ${y.year}, median: ${s.medianPrice}, sold: ${s.soldCount}${y.through ? `, through: "${y.through}"` : ''} }`;
      });

    // Only write a town whose pull is complete, so a page never shows a half-filled chart
    if (qRows.length === plan.quarters.length) src = upsertTown(src, 'townQuarterly', town, qRows);
    else console.warn(`  ⚠ ${town}: ${qRows.length}/${plan.quarters.length} quarters — quarterly data not written`);
    if (yRows.length === plan.years.length + (plan.ytd ? 1 : 0)) src = upsertTown(src, 'townAnnual', town, yRows);
    else console.warn(`  ⚠ ${town}: ${yRows.length} years — annual data not written`);
    if (r.now) src = upsertObject(src, 'townInventory', town, `{ asOf: "${plan.inventory.asOf}", active: ${r.now.active} }`);
    else console.warn(`  ⚠ ${town}: no current inventory — months of supply not written`);
  }
  writeFileSync(TRENDS_TS, src, 'utf8');
  console.log('\n  ✓ townTrends.ts updated');
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, 'trends.mjs')) {
  main().catch((err) => {
    console.error('\nFATAL:', err.message);
    if (process.env.DEBUG === '1') console.error(err.stack);
    process.exit(1);
  });
}
