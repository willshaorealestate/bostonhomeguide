/**
 * index.mjs — MLSPIN market data update orchestrator.
 *
 * Usage:
 *   MLSPIN_USER=x MLSPIN_PASS=y node scripts/mlspin/index.mjs YEAR MONTH [YEAR MONTH ...]
 *
 * Examples:
 *   node scripts/mlspin/index.mjs 2026 7
 *   node scripts/mlspin/index.mjs 2026 7 2026 8
 *
 * Set DEBUG=1 to save screenshots at each Playwright step into debug-screenshots/.
 */
import { scrapeMonth } from './scrape.mjs';
import { updateMarketTsx, updateHomeTsx, updateNeighborhoodTs, updateTownHistory } from './update.mjs';

// Must contain every town in scrape.mjs TOWNS — order determines townData row order in Market.tsx
const TOWN_ORDER = [
  'Boston', 'Cambridge', 'Somerville', 'Brookline', 'Newton', 'Needham', 'Waltham', 'Watertown',
  'Medford', 'Arlington', 'Belmont', 'Lexington', 'Winchester', 'Bedford', 'Concord', 'Burlington', 'Woburn', 'Acton', 'Westford', 'Chelmsford',
  'Natick', 'Framingham', 'Hopkinton',
  'Milton', 'Dedham', 'Westwood', 'Canton', 'Quincy',
  'Wellesley',
];

async function main() {
  const username = process.env.MLSPIN_USER;
  const password = process.env.MLSPIN_PASS;

  if (!username || !password) {
    console.error('Error: MLSPIN_USER and MLSPIN_PASS must be set.');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  if (args.length < 2 || args.length % 2 !== 0) {
    console.error('Usage: node scripts/mlspin/index.mjs YEAR MONTH [YEAR MONTH ...]');
    process.exit(1);
  }

  const months = [];
  for (let i = 0; i < args.length; i += 2) {
    months.push({ year: Number(args[i]), month: Number(args[i + 1]) });
  }

  for (const { year, month } of months) {
    console.log(`\n=== ${year}-${String(month).padStart(2, '0')} ===`);

    const { area, towns } = await scrapeMonth(username, password, year, month);

    const missing = TOWN_ORDER.filter(name => !towns[name]);
    if (missing.length) console.warn(`  ⚠ Missing town data: ${missing.join(', ')} — skipped`);

    const townRows = TOWN_ORDER.filter(name => towns[name]).map(name => ({
      town:        name,
      medianPrice: towns[name].medianPrice,
      soldCount:   towns[name].soldCount,
      pending:     towns[name].pending,
      dom:         towns[name].dom,
      listToSale:  towns[name].spOp,
    }));

    console.log('\n  Updating source files...');
    updateMarketTsx(area, townRows, year, month);
    updateTownHistory(towns, year, month);
    updateHomeTsx(area, towns, year, month);
    updateNeighborhoodTs(towns);

    console.log(`  Done: ${year}-${String(month).padStart(2, '0')}`);
  }

  console.log('\nAll months processed. Review diffs before committing.\n');
}

main().catch(err => {
  console.error('\nFATAL:', err.message);
  if (process.env.DEBUG === '1') console.error(err.stack);
  process.exit(1);
});
