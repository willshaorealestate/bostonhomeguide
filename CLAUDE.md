# BostonHomeGuide — Claude Code Context

## What This Project Is
Personal real estate website for **Will Shao**, a bilingual (English/Mandarin) REMAX agent serving Greater Boston and MetroWest. The site generates organic leads and captures buyer/seller inquiries. It is a **static SPA deployed to GitHub Pages** — there is no live server in production.

## Tech Stack
- **Framework**: React 19 + TypeScript, Vite 7
- **Routing**: `wouter` (not React Router)
- **Styling**: Tailwind CSS v4 + Radix UI components
- **Forms**: react-hook-form + zod
- **Package manager**: `pnpm` (v10.4.1 pinned in packageManager field)
- **CRM**: Follow Up Boss (FUB) — API key in `VITE_FUB_API_KEY` env/secret
- **Analytics**: Google Analytics `G-C2MS8WPP3W` + FUB Widget Tracker `WT-RUJPYHXU`
- **Deployment**: GitHub Actions → GitHub Pages, custom domain `bostonhomeguide.com` via Cloudflare

## Project Structure
```
client/src/
  pages/          # Route-level pages (Home, Buyer, Seller, Market, About, Contact, Mortgage, Blog, Neighborhoods)
  components/     # Shared components (Navigation, Footer, BeforeAfterSlider, PhotoComparisonCarousel, etc.)
  lib/            # Utilities — seo.ts (custom useSEO hook), fub.ts (FUB API), etc.
  data/           # neighborhoods.ts — 67 town entries with slugs, descriptions, images

client/public/images/
  towns/          # 67 town .jpeg files
  staging/        # staging-before.jpg, staging-after.jpg
  marketing/      # marketing-before-1..5.jpg + afters (photo comparison pairs)


client/public/sitemap.xml  # The only sitemap — Vite copies client/public/ into the build
client/public/robots.txt   # Same — the only robots.txt
CNAME             # bostonhomeguide.com
```

## Key Constraints
- **Static site only** — there is no server, in production or in dev (`pnpm dev` is plain Vite). Don't add a backend, database, or login system. All API calls (FUB) happen from the browser using `VITE_FUB_API_KEY`
- **No `npm install`** — use `pnpm`. Do NOT add packages via npm; it breaks the lockfile
- **Avoid new dependencies** — the bundle is already large. Prefer custom implementations (e.g., `useSEO` hook instead of react-helmet-async)
- **pnpm version**: Only one version should be specified — either in the action config OR in `packageManager` in `package.json`, not both

## SEO Setup
- Custom `useSEO` hook at `client/src/lib/seo.ts` — handles title, meta tags, OG tags, canonical, and JSON-LD schema via DOM manipulation
- Every page calls `useSEO()` — do not remove or bypass this
- Home: RealEstateAgent JSON-LD with aggregateRating (5.0★, 48 reviews). About: Person JSON-LD with no rating — Google rejects aggregateRating on a Person and flags it as an invalid Review snippets item
- Buyer + Seller: FAQPage JSON-LD schema
- Neighborhoods: dynamic per-town title/description/canonical
- Sitemap submitted to Google Search Console

## FUB Integration
- All contact forms POST to Follow Up Boss API
- Lead notifications go to `will.shao@followupboss.me`
- The FUB Widget Tracker pixel (`WT-RUJPYHXU`) is in `index.html`
- Legal pages needed for FUB's SMS carrier registration (Privacy Policy, Terms) exist in two forms: a React route (`client/src/pages/PrivacyPolicy.tsx` / `Terms.tsx`, for in-app `wouter` navigation) and a flat static HTML file (`client/public/privacy-policy.html` / `terms.html`). The static copy predates prerendering (see Deployment) and is still what ships for these two routes — direct/bot requests to `/privacy-policy` or `/terms` would otherwise hit GitHub Pages' 404-based SPA-routing fallback and return a real HTTP 404, which compliance crawlers (like FUB's) reject even though a browser renders the React version fine. Keep both copies in sync when editing this content.
- Form messages should appear in FUB contact notes

## GitHub Actions / Deployment
- Push to `main` triggers deploy
- Build step uses `VITE_FUB_API_KEY` secret
- `CNAME` and `404.html` (for SPA routing) are copied to build output by the deploy workflow; everything in `client/public/` (sitemap, robots.txt, llms.txt, images) is copied by Vite
- After the build, `scripts/prerender.mjs` renders every sitemap URL in headless Chromium and saves it as `dist/public/<path>.html`, so GitHub Pages serves real HTML with a 200 (instead of the 404 SPA fallback) to Google and to AI crawlers that don't run JavaScript. **A page only gets prerendered if it's in `client/public/sitemap.xml`** — add new pages there. Routes with a hand-maintained static `.html` in `client/public/` (privacy-policy, terms) are skipped. Local run: `pnpm exec vite build && cp dist/public/index.html dist/public/404.html && node scripts/prerender.mjs`
- Do not add a `version:` key to `pnpm/action-setup@v4` — version is already in `package.json` `packageManager` field

## Style / Design
- Color palette: navy (#1e3a5f) primary, gold (#c9a84c) accent, white backgrounds
- Professional real estate tone — not flashy, trust-focused
- Mobile-first; most visitors are on phones
- Chinese-language audience is secondary — Will is bilingual and serves Mandarin-speaking buyers

## Common Tasks
- **Add a new neighborhood**: edit `client/src/data/neighborhoods.ts`, add a `.jpeg` to `client/public/images/towns/`, update `client/public/sitemap.xml`
- **Run tests**: `pnpm test` (Vitest + jsdom, runs `client/src/**/*.test.tsx`)
- **Edit a page**: pages are in `client/src/pages/` — each is a single TSX file
- **Add a page/route**: pages are code-split. In `client/src/App.tsx`, wrap the import in `lazyPage(() => import("./pages/X"))` and add it to both `ROUTES` and `PAGES` — don't import pages directly. `main.tsx` loads the current page's chunk before the first render so React doesn't blank out the prerendered HTML, then preloads the other pages in the background. Also add the URL to `client/public/sitemap.xml` so it gets prerendered
- **Add a form field**: use react-hook-form + zod schema validation, then map to FUB API payload
- **Update market data**: `client/src/pages/Market.tsx` contains hardcoded chart data — update monthly
