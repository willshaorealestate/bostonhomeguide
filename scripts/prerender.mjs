/**
 * prerender.mjs — Save fully rendered HTML for every sitemap page after `vite build`.
 *
 * GitHub Pages has no real file for SPA routes like /buy, so it serves 404.html
 * with an HTTP 404 status: Google won't index those pages, and AI crawlers that
 * don't run JavaScript see an empty shell. This loads each sitemap URL in headless
 * Chromium and writes the rendered page to dist/public/<path>.html, which GitHub
 * Pages serves for the extensionless URL with a 200. The app still boots normally
 * on top of the saved HTML.
 *
 * Run after the build and after 404.html has been copied from the plain shell:
 *   node scripts/prerender.mjs
 * Set CHROMIUM_PATH to use a specific Chromium binary.
 */
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist/public');
const SITE = 'https://bostonhomeguide.com';
const PORT = 4321;
const CONCURRENCY = 4;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

// Scripts present in the built shell. Anything else found in the rendered DOM was
// injected at runtime (analytics/widget loaders) and would run twice if saved.
const shellScriptSrcs = [...shell.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
const shellInlineScripts = [...shell.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1].trim());

const sitemap = readFileSync(resolve(ROOT, 'client/public/sitemap.xml'), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/bostonhomeguide\.com([^<]*)<\/loc>/g)]
  .map((m) => m[1] || '/')
  // Pages that already ship a hand-maintained static copy (FUB compliance pages).
  .filter((p) => p === '/' || !existsSync(resolve(ROOT, 'client/public', `${p.slice(1)}.html`)));

// Serves the build like GitHub Pages would before prerendering: real files first,
// missing files 404, and page URLs get the app shell so client-side routing renders them.
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = join(DIST, urlPath);
  if (file.startsWith(DIST) && existsSync(file) && extname(file)) {
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
    return;
  }
  if (extname(urlPath)) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME['.html'] });
  res.end(shell);
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
// Keep third-party scripts (analytics, widgets, fonts, embeds) out of the snapshot.
await context.route((url) => url.hostname !== 'localhost', (route) => route.abort());

async function render(path) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
  // useSEO sets the canonical in an effect, so its value confirms the page has rendered.
  await page.waitForFunction(
    (expected) =>
      document.getElementById('root')?.childElementCount > 0 &&
      document.querySelector('link[rel="canonical"]')?.href.replace(/\/$/, '') === expected,
    `${SITE}${path}`.replace(/\/$/, ''),
    { timeout: 15000 }
  );
  await page.waitForTimeout(300);
  const html = await page.evaluate(({ srcs, inline, shellHtml }) => {
    for (const s of document.querySelectorAll('script')) {
      if (s.type === 'application/ld+json') continue;
      const src = s.getAttribute('src');
      const keep = src ? srcs.includes(src) : inline.includes(s.textContent.trim());
      if (!keep) s.remove();
    }
    // Code-split page chunks add modulepreload hints as they load (including the
    // background preload of every page); saving them would make visitors download all pages.
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) {
      if (!shellHtml.includes(`href="${l.getAttribute('href')}"`)) l.remove();
    }
    return '<!doctype html>\n' + document.documentElement.outerHTML;
  }, { srcs: shellScriptSrcs, inline: shellInlineScripts, shellHtml: shell });
  await page.close();
  if (errors.length) throw new Error(`${path}: ${errors[0]}`);
  return html;
}

const results = new Map();
const queue = [...paths];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const path = queue.shift();
      results.set(path, await render(path));
    }
  })
);

await browser.close();
server.close();

for (const [path, html] of results) {
  const out = path === '/' ? join(DIST, 'index.html') : join(DIST, `${path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}
console.log(`Prerendered ${results.size} pages into dist/public`);
