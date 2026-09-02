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
  // Remove the cookie consent modal from the DOM entirely so it can't
  // intercept clicks intended for the Sign In button
  await page.evaluate(() => {
    const m = document.getElementById('cookieConsentBootstrapModal');
    if (m) m.remove();
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  });
  console.log('  Cookie consent dismissed.');
}

async function login(page, username, password) {
  console.log('  Logging into MLSPIN...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await shot(page, '01-login-page');

  await dismissCookieConsent(page);

  await page.locator('input[type="text"], input[name*="user" i], input[id*="user" i]').first().fill(username);
  await page.locator('input[type="password"]').first().fill(password);
  await shot(page, '02-credentials-entered');

  // Target Sign In button by text to avoid clicking hidden modal buttons
  await page.getByRole('button', { name: /sign\s*in/i })
    .or(page.locator('.mls-js-submit-btn'))
    .first()
    .click();
  await page.waitForLoadState('networkidle', { timeout: 20000 });
  await shot(page, '03-post-login');

  // Detect login failure: still has a password field visible (login form still showing)
  const stillHasPassword = await page.locator('input[type="password"]:visible').count() > 0;
  if (stillHasPassword) {
    const pageUrl = page.url();
    throw new Error(`Login failed — still on login page (${pageUrl}). Check MLSPIN_USER / MLSPIN_PASS secrets.`);
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
  // MLSPIN uses hidden inputs (argStartDate / argEndDate) as the actual form values.
  // Set them via JS to bypass visibility checks, then fire change events so any
  // visible date picker widgets stay in sync.
  const set = await page.evaluate(({ start, end }) => {
    const startEl = document.querySelector('input[name="argStartDate"], input[name*="StartDate"], input[name*="startDate"]');
    const endEl   = document.querySelector('input[name="argEndDate"],   input[name*="EndDate"],   input[name*="endDate"]');
    if (!startEl) return 'start field not found';
    if (!endEl)   return 'end field not found';
    startEl.value = start;
    endEl.value   = end;
    startEl.dispatchEvent(new Event('change', { bubbles: true }));
    endEl.dispatchEvent(new Event('change', { bubbles: true }));
    return 'ok';
  }, { start: startDate, end: endDate });

  if (set !== 'ok') throw new Error(`Date fill failed: ${set}. Run with DEBUG=1.`);

  // Also try to update any visible text inputs that mirror the hidden fields
  await page.evaluate(({ start, end }) => {
    document.querySelectorAll('input[type="text"]').forEach(el => {
      if (/start/i.test(el.id + el.name + el.placeholder)) {
        el.value = start;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (/end/i.test(el.id + el.name + el.placeholder)) {
        el.value = end;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }, { start: startDate, end: endDate });
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
