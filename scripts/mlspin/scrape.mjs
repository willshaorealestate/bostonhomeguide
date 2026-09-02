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

    // Sign out before closing
    await signOut(page);

    return { area, towns };

  } finally {
    await browser.close();
  }
}

async function signOut(page) {
  try {
    await page.goto(`${BASE_URL}/tools/mshare/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const signOutLink = page.getByRole('link', { name: /sign\s*out/i })
      .or(page.locator('a[href*="signout" i], a[href*="logout" i], a[href*="sign-out" i]'))
      .first();
    if (await signOutLink.count() > 0) {
      await signOutLink.click();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
      console.log('  Signed out.');
    }
  } catch {
    // Non-fatal — browser closes anyway
  }
}

async function dismissCookieConsent(page) {
  const modal = page.locator('#cookieConsentBootstrapModal');
  if (await modal.count() === 0) return;

  // Must click the accept button — MLSPIN sets a consent cookie server-side
  // that is required for login. JS-only removal skips this and breaks auth.
  const btn = modal.getByRole('button').first();
  if (await btn.count() > 0) {
    await btn.click();
    await modal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  // Force-clear any remaining backdrop so it can't intercept the Sign In click
  await page.evaluate(() => {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  });
  console.log('  Cookie consent dismissed.');
}

async function login(page, username, password) {
  console.log('  Logging into MLSPIN...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
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
  await page.goto(MSHARE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await shot(page, `${tag}-01-mshare`);

  // Click the Edit button in the row containing the saved search name —
  // the Edit button opens the form with date fields and run button
  const row = page.locator('tr, li').filter({ hasText: searchName }).first();
  const editBtn = row.getByText('Edit', { exact: true });
  if (await editBtn.count() > 0) {
    await editBtn.click();
  } else {
    // Fallback: click the report name link directly
    await page.getByText(searchName, { exact: false }).first().click();
  }
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

  // Click Search Now — it appears as a link/button in the Pinergy toolbar.
  // Try the broadest selectors first, then fall back to form.submit().
  const searchBtn = page
    .getByRole('link', { name: /search\s*now/i })
    .or(page.getByRole('button', { name: /search\s*now/i }))
    .or(page.locator('a, button').filter({ hasText: /search\s*now/i })
    .or(page.locator('input[type="image"][alt*="Search" i]'))
    .or(page.locator('input[type="submit"]')))
    .first();

  const foundBtn = await searchBtn.count() > 0;
  if (foundBtn) {
    await searchBtn.click();
  } else {
    // Last resort: submit the form directly via JS
    console.log('    Search Now button not found via locator — submitting form via JS');
    await page.evaluate(() => { document.querySelector('form')?.submit(); });
  }
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await shot(page, `${tag}-05-results`);

  return page.innerText('body');
}

async function fillDates(page, startDate, endDate) {
  // Try filling the visible labeled inputs first ("Start Date:" / "End Date:" labels).
  // getByLabel matches <label for="..."> elements and implicit label wrapping.
  const startByLabel = page.getByLabel(/start date/i);
  const endByLabel   = page.getByLabel(/end date/i);

  if (await startByLabel.count() > 0) {
    await startByLabel.first().fill(startDate);
    await endByLabel.first().fill(endDate);
    // Fire change so MLSPIN's JS syncs any hidden fields
    await startByLabel.first().dispatchEvent('change');
    await endByLabel.first().dispatchEvent('change');
    return;
  }

  // Fallback: set hidden argStartDate / argEndDate fields via JS
  const set = await page.evaluate(({ start, end }) => {
    const startEl = document.querySelector('input[name="argStartDate"]')
      || document.querySelector('input[name*="StartDate"]')
      || document.querySelector('input[name*="startDate"]');
    const endEl = document.querySelector('input[name="argEndDate"]')
      || document.querySelector('input[name*="EndDate"]')
      || document.querySelector('input[name*="endDate"]');
    if (!startEl) return 'start field not found';
    if (!endEl)   return 'end field not found';
    startEl.value = start;
    endEl.value   = end;
    startEl.dispatchEvent(new Event('change', { bubbles: true }));
    endEl.dispatchEvent(new Event('change', { bubbles: true }));
    // Also update any visible text inputs nearby
    document.querySelectorAll('input[type="text"]').forEach(el => {
      const ctx = el.id + el.name + el.placeholder;
      if (/start/i.test(ctx)) { el.value = start; el.dispatchEvent(new Event('change', { bubbles: true })); }
      if (/end/i.test(ctx))   { el.value = end;   el.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    return 'ok';
  }, { start: startDate, end: endDate });

  if (set !== 'ok') throw new Error(`Date fill failed: ${set}. Run with DEBUG=1.`);
}

async function selectOnlyTown(page, targetTown) {
  // MLSPIN uses a dual-listbox: Available towns (left <select>) and Selected towns
  // (right <select>). Towns appear as "Boston, MA" with state suffix.
  // We use JS to directly clear the right list and add only the target town.
  const targetWithState = `${targetTown}, MA`;

  const result = await page.evaluate((target) => {
    // Find all <select> elements that contain town-like options ("City, MA")
    const townSelects = Array.from(document.querySelectorAll('select')).filter(s =>
      Array.from(s.options).some(o => /,\s*MA$/i.test(o.text))
    );

    if (townSelects.length === 0) return 'no town select elements found';

    if (townSelects.length === 1) {
      // Single select: just select only the target option
      const sel = townSelects[0];
      let found = false;
      Array.from(sel.options).forEach(o => {
        o.selected = o.text === target;
        if (o.text === target) found = true;
      });
      return found ? 'ok-single' : `"${target}" not in single select`;
    }

    // Dual listbox: first select = available (left), last select = selected (right)
    const available = townSelects[0];
    const selected  = townSelects[townSelects.length - 1];

    // Move everything from "selected" back to "available"
    const toReturn = Array.from(selected.options).map(o => [o.text, o.value]);
    while (selected.options.length > 0) selected.options[0].remove();
    toReturn.forEach(([text, value]) => available.add(new Option(text, value)));

    // Find target in available and move to selected
    const idx = Array.from(available.options).findIndex(o => o.text === target);
    if (idx === -1) {
      // Try prefix match (e.g. "Boston" matches "Boston, MA")
      const fuzzyIdx = Array.from(available.options).findIndex(o =>
        o.text.startsWith(target.replace(', MA', ''))
      );
      if (fuzzyIdx === -1) return `"${target}" not found in available list`;
      const opt = available.options[fuzzyIdx];
      selected.add(new Option(opt.text, opt.value));
      available.options[fuzzyIdx].remove();
      return 'ok-fuzzy';
    }

    const opt = available.options[idx];
    selected.add(new Option(opt.text, opt.value));
    available.options[idx].remove();
    return 'ok';
  }, targetWithState);

  console.log(`    Town select (${targetTown}): ${result}`);
  if (!result.startsWith('ok')) throw new Error(`Town selection failed: ${result}`);
}

async function findFirst(page, selectors) {
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.count() > 0) return el;
  }
  return null;
}
