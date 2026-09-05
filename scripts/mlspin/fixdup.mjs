/**
 * fixdup.mjs — One-time fix for duplicate month entries in Market.tsx.
 * The GA workflow ran against estimated data that already contained Jul/Aug entries,
 * causing duplicate months in priceData, domData, and townHistoryData.
 * This deduplicates each array, keeping the last (real) occurrence of any repeated month.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const MARKET_TSX = resolve(import.meta.dirname, '../../client/src/pages/Market.tsx');
let c = readFileSync(MARKET_TSX, 'utf8').replace(/\r\n/g, '\n');

// Dedup any JS array of objects by a key field, keeping last occurrence of duplicates.
function dedupByMonth(entries) {
  const seen = new Map();
  for (const e of entries) seen.set(e.month, e);
  return [...seen.values()];
}

// ── priceData ──────────────────────────────────────────────────────────────────
{
  const m = c.match(/const priceData = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error('priceData not found');
  const re = /\{\s*month:\s*"([^"]+)",\s*median:\s*(\d+),\s*sales:\s*(\d+)\s*\}/g;
  const entries = [];
  let hit;
  while ((hit = re.exec(m[1])) !== null)
    entries.push({ month: hit[1], median: Number(hit[2]), sales: Number(hit[3]) });
  const fixed = dedupByMonth(entries);
  const rows = fixed.map(e => `  { month: "${e.month}", median: ${e.median}, sales: ${e.sales} }`).join(',\n');
  c = c.replace(/const priceData = \[[\s\S]*?\n\];/, `const priceData = [\n${rows},\n];`);
  console.log(`priceData: ${entries.length} → ${fixed.length} entries`);
}

// ── domData ────────────────────────────────────────────────────────────────────
{
  const m = c.match(/const domData = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error('domData not found');
  const re = /\{\s*month:\s*"([^"]+)",\s*dom:\s*(\d+)\s*\}/g;
  const entries = [];
  let hit;
  while ((hit = re.exec(m[1])) !== null)
    entries.push({ month: hit[1], dom: Number(hit[2]) });
  const fixed = dedupByMonth(entries);
  const rows = fixed.map(e => `  { month: "${e.month}", dom: ${e.dom} }`).join(',\n');
  c = c.replace(/const domData = \[[\s\S]*?\n\];/, `const domData = [\n${rows},\n];`);
  console.log(`domData: ${entries.length} → ${fixed.length} entries`);
}

// ── townHistoryData ────────────────────────────────────────────────────────────
{
  const entryRe = new RegExp(`("\\w[^"]*":\\s*\\[\\n)([\\s\\S]*?)(\\s*\\],)`, 'g');
  const lineRe = /\{ month: "([^"]+)", median:\s*(\d+), dom:\s*(\d+), listToSale:\s*(\d+)(?:, sold:\s*(\d+))?(?:, pending:\s*(\d+))? \}/g;
  let townCount = 0;
  let dupCount = 0;
  c = c.replace(entryRe, (_, open, body, close) => {
    const entries = [];
    let m;
    lineRe.lastIndex = 0;
    while ((m = lineRe.exec(body)) !== null)
      entries.push({ month: m[1], median: Number(m[2]), dom: Number(m[3]), listToSale: Number(m[4]), sold: m[5] ? Number(m[5]) : 0, pending: m[6] ? Number(m[6]) : 0 });
    const fixed = dedupByMonth(entries);
    dupCount += entries.length - fixed.length;
    townCount++;
    const newBody = fixed.map(e =>
      `    { month: "${e.month}", median: ${String(e.median).padStart(7)}, dom: ${e.dom}, listToSale: ${e.listToSale}, sold: ${e.sold}, pending: ${e.pending} }`
    ).join(',\n');
    return `${open}${newBody},\n  ${close}`;
  });
  console.log(`townHistoryData: fixed ${dupCount} duplicate entries across ${townCount} towns`);
}

writeFileSync(MARKET_TSX, c, 'utf8');
console.log('Done. Review with: git diff client/src/pages/Market.tsx');
