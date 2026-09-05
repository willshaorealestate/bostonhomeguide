/**
 * stripestimated.mjs — Remove all estimated historical months from Market.tsx.
 * Keeps only real MLSPIN-scraped data (Jul '26 and Aug '26).
 * Run once, then delete this file.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const MARKET_TSX = resolve(import.meta.dirname, '../../client/src/pages/Market.tsx');
let c = readFileSync(MARKET_TSX, 'utf8').replace(/\r\n/g, '\n');

// Months that are real (scraped). Everything else is estimated and will be removed.
const REAL_MONTHS = new Set(["Jul '26", "Aug '26"]);

// ── priceData ──────────────────────────────────────────────────────────────────
{
  const m = c.match(/const priceData = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error('priceData not found');
  const re = /\{\s*month:\s*"([^"]+)",\s*median:\s*(\d+),\s*sales:\s*(\d+)\s*\}/g;
  const entries = [];
  let hit;
  while ((hit = re.exec(m[1])) !== null)
    if (REAL_MONTHS.has(hit[1])) entries.push({ month: hit[1], median: Number(hit[2]), sales: Number(hit[3]) });
  const rows = entries.map(e => `  { month: "${e.month}", median: ${e.median}, sales: ${e.sales} }`).join(',\n');
  c = c.replace(/const priceData = \[[\s\S]*?\n\];/, `const priceData = [\n${rows},\n];`);
  console.log(`priceData: kept ${entries.length} real entries`);
}

// ── domData ────────────────────────────────────────────────────────────────────
{
  const m = c.match(/const domData = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error('domData not found');
  const re = /\{\s*month:\s*"([^"]+)",\s*dom:\s*(\d+)\s*\}/g;
  const entries = [];
  let hit;
  while ((hit = re.exec(m[1])) !== null)
    if (REAL_MONTHS.has(hit[1])) entries.push({ month: hit[1], dom: Number(hit[2]) });
  const rows = entries.map(e => `  { month: "${e.month}", dom: ${e.dom} }`).join(',\n');
  c = c.replace(/const domData = \[[\s\S]*?\n\];/, `const domData = [\n${rows},\n];`);
  console.log(`domData: kept ${entries.length} real entries`);
}

// ── townHistoryData ────────────────────────────────────────────────────────────
{
  const entryRe = new RegExp(`("\\w[^"]*":\\s*\\[\\n)([\\s\\S]*?)(\\s*\\],)`, 'g');
  const lineRe = /\{ month: "([^"]+)", median:\s*(\d+), dom:\s*(\d+), listToSale:\s*(\d+)(?:, sold:\s*(\d+))?(?:, pending:\s*(\d+))? \}/g;
  let townCount = 0;
  let keptTotal = 0;
  c = c.replace(entryRe, (_, open, body, close) => {
    const entries = [];
    let m;
    lineRe.lastIndex = 0;
    while ((m = lineRe.exec(body)) !== null)
      if (REAL_MONTHS.has(m[1]))
        entries.push({ month: m[1], median: Number(m[2]), dom: Number(m[3]), listToSale: Number(m[4]), sold: m[5] ? Number(m[5]) : 0, pending: m[6] ? Number(m[6]) : 0 });
    keptTotal += entries.length;
    townCount++;
    const newBody = entries.map(e =>
      `    { month: "${e.month}", median: ${String(e.median).padStart(7)}, dom: ${e.dom}, listToSale: ${e.listToSale}, sold: ${e.sold}, pending: ${e.pending} }`
    ).join(',\n');
    return `${open}${newBody ? newBody + ',\n' : ''}  ${close}`;
  });
  console.log(`townHistoryData: kept ${keptTotal} real entries across ${townCount} towns`);
}

// ── footnote ───────────────────────────────────────────────────────────────────
c = c.replace(
  /Source: MLSPIN\. Jan–Jul data estimated; Aug '26 onward from live monthly reports\./,
  "Source: MLSPIN. Data from live monthly reports."
);

writeFileSync(MARKET_TSX, c, 'utf8');
console.log('Done.');
