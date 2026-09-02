/**
 * scrape.mjs — Playwright automation for MLSPIN h3b market reports.
 * Run with DEBUG=1 to save screenshots at each step into debug-screenshots/.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseAreaReport, parseTownReport } from './parse.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEBUG = process.env.DEBUG === '1';
const SCREENSHOT_DIR = resolve(__dirname, '../../debug-screenshots');

const BASE_URL = 'https://h3b.mlspin.com';
const MSHARE_URL = `${BASE_URL}/tools/mshare/`;

const TOWNS = [
  'Boston', 'Brookline', 'Framingham', 'Lexington',
  'Natick', 'Needham', 'Newton', 'Waltham', 'Wellesley',
];

async function shot(page, name) {
  if (!DEBUG) return;
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const p = resolve(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: p, fullPage: true });
  console.log(`    [debug] → ${p}`);
}

export async function scrapeMonth(username, password, year, month) {
  const mm = String(month).padStart(2, '0');
  const lastDay = new Date(year, month, 0).getDate();
  const startDate = `${mm}/01/${year}`;
  const endDate   = `${mm}/${lastDay}/${year}`;

  console.log(`  Date range: ${startDate} – ${endDate}`);

  const browser = await chromium.launch({ headless: true });
  const ctx  = await browser.newContext();
  const page = await ctx.newPage();

  try {
    await login(page, username, password);

    // Area report
    console.log('  Scraping area report...');
    const areaText = await runReport(page, 'BostonHomeGuide - Monthly Market', startDate, endDate, null, 'area');
    const area = parseAreaReport(areaText);
    console.log(`    median=$${area.medianPrice.toLocaleString()}, sold=${area.soldCount}, DOM=${area.dom}, SP:LP=${area.spLp}%, active=${area.activeListings}`);

    // Town reports (one at a time)
    const towns = {};
    for (const town of TOWNS) {
      console.log(`  Scraping ${town}...`);
      const text = await runReport(page, 'BostonHomeGuide - Towns monthly', startDate, endDate, town, `town-${town.toLowerCase()}`);
      towns[town] = parseTownReport(text);
      const t = towns[town];
      console.log(`    median=$${t.medianPrice.toLocaleString()}, DOM=${t.dom}, SP:LP=${t.spLp}%, inv=${t.inventory}`);
    }

    return { area, towns };

  } finally {
    await browser.close();
  }
}

async function dismissCookieConsent(page) {
  // MLSPIN shows a cookie consent modal that blocks clicks — dismiss it first
  const modal = page.locator('#cookieConsentBootstrapModal');
  if (await modal.count() > 0) {
    // Try clicking any accept/OK button inside the modal
    const btn = modal.getByRole('button').first();
    if (await btn.count() > 0) {
      await btn.click().catch(() => {});
    }
    // Force-hide the modal via JS in case the button click didn't work
    await page.evaluate(() => {
      const m = document.getElementById('cookieConsentBootstrapModal');
      if (m) m.style.display = 'none';
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
    });
    console.log('  Cookie consent dismissed.');
  }
}

async function login(page, username, password) {
  console.log('  Logging into MLSPIN...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await shot(page, '01-login-page');

  await dismissCookieConsent(page);

  await page.locator('input[type="text"], input[name*="user" i], input[id*="user" i]').first().fill(username);
  await page.locator('input[type="password"]').first().fill(password);
  await shot(page, '02-credentials-entered');

  await page.locator('input[type="submit"], button[type="submit"]').first().click();
  await page.waitForLoadState('networkidle', { timeout: 20000 });
  await shot(page, '03-post-login');

  if (page.url().toLowerCase().includes('login') || page.url().toLowerCase().includes('signin')) {
    throw new Error('Login failed — still on login page. Check MLSPIN_USER / MLSPIN_PASS.');
  }
  console.log('  Logged in.');
}

async function runReport(page, searchName, startDate, endDate, townFilter, tag) {
  await page.goto(MSHARE_URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await shot(page, `${tag}-01-mshare`);

  // Click the saved search by name
  await page.getByText(searchName, { exact: false }).first().click();
  await page.waitForLoadState('networkidle', { timeout: 15000 });
  await shot(page, `${tag}-02-search-loaded`);

  // Set dates
  await fillDates(page, startDate, endDate);
  await shot(page, `${tag}-03-dates-set`);

  // For town reports: select only the target town
  if (townFilter) {
    await selectOnlyTown(page, townFilter);
    await shot(page, `${tag}-04-town-selected`);
  }

  // Click Search Now
  const btn = page
    .getByRole('button', { name: /search\s*now/i })
    .or(page.locator('input[type="submit"]').filter({ hasText: /search/i }))
    .or(page.getByText('Search Now', { exact: false }))
    .first();
  await btn.click();
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await shot(page, `${tag}-05-results`);

  return page.innerText('body');
}

async function fillDates(page, startDate, endDate) {
  const startField = await findFirst(page, [
    'input[name*="start" i]',
    'input[id*="start" i]',
    'input[placeholder*="start" i]',
  ]);
  const endField = await findFirst(page, [
    'input[name*="end" i]',
    'input[id*="end" i]',
    'input[placeholder*="end" i]',
  ]);

  if (!startField) throw new Error('Start date input not found. Run with DEBUG=1.');
  if (!endField)   throw new Error('End date input not found. Run with DEBUG=1.');

  await startField.fill(startDate);
  await endField.fill(endDate);
}

async function selectOnlyTown(page, targetTown) {
  // First try Playwright's smart label matching
  let matched = false;
  for (const town of TOWNS) {
    const cb = page.getByLabel(town, { exact: true });
    if (await cb.count() > 0) {
      matched = true;
      const checked = await cb.first().isChecked();
      if (town === targetTown && !checked) await cb.first().check();
      if (town !== targetTown && checked)  await cb.first().uncheck();
    }
  }
  if (matched) return;

  // Fallback: iterate all checkboxes and match by associated label element
  const allCheckboxes = await page.locator('input[type="checkbox"]').all();
  for (const cb of allCheckboxes) {
    const id = await cb.getAttribute('id').catch(() => '');
    let labelText = '';
    if (id) {
      labelText = (await page.locator(`label[for="${id}"]`).textContent().catch(() => '') ?? '').trim();
    }
    if (!labelText) {
      labelText = (await cb.getAttribute('value') ?? '').trim();
    }
    if (!TOWNS.includes(labelText)) continue;

    const checked = await cb.isChecked();
    if (labelText === targetTown && !checked) await cb.check();
    if (labelText !== targetTown && checked)  await cb.uncheck();
  }
}

async function findFirst(page, selectors) {
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.count() > 0) return el;
  }
  return null;
}
