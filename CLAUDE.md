# BostonHomeGuide — Claude Code Context

## What This Project Is
Personal real estate website for **Will Shao**, a bilingual (English/Mandarin) RE/MAX agent serving Greater Boston and MetroWest. The site generates organic leads and captures buyer/seller inquiries. It is a **static SPA deployed to GitHub Pages** — there is no live server in production.

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

server/           # Express server — used in dev only, not deployed
shared/           # Shared types/constants

sitemap.xml       # 80 URLs — root + 8 pages + 71 neighborhood slugs
robots.txt        # At project root, copied to build output
CNAME             # bostonhomeguide.com
```

## Key Constraints
- **Static site only** — no server-side code runs in production. All API calls (FUB) happen from the browser using `VITE_FUB_API_KEY`
- **No `npm install`** — use `pnpm`. Do NOT add packages via npm; it breaks the lockfile
- **Avoid new dependencies** — the bundle is already large. Prefer custom implementations (e.g., `useSEO` hook instead of react-helmet-async)
- **pnpm version**: Only one version should be specified — either in the action config OR in `packageManager` in `package.json`, not both

## SEO Setup
- Custom `useSEO` hook at `client/src/lib/seo.ts` — handles title, meta tags, OG tags, canonical, and JSON-LD schema via DOM manipulation
- Every page calls `useSEO()` — do not remove or bypass this
- Home + About: RealEstateAgent/Person JSON-LD schema with aggregateRating (5.0★, 212 reviews)
- Buyer + Seller: FAQPage JSON-LD schema
- Neighborhoods: dynamic per-town title/description/canonical
- Sitemap submitted to Google Search Console

## FUB Integration
- All contact forms POST to Follow Up Boss API
- Lead notifications go to `will.shao@followupboss.me`
- The FUB Widget Tracker pixel (`WT-RUJPYHXU`) is in `index.html`
- Form messages should appear in FUB contact notes

## GitHub Actions / Deployment
- Push to `main` triggers deploy
- Build step uses `VITE_FUB_API_KEY` secret
- `CNAME`, `404.html` (for SPA routing), and `robots.txt` are copied to build output
- Do not add a `version:` key to `pnpm/action-setup@v4` — version is already in `package.json` `packageManager` field

## Style / Design
- Color palette: navy (#1e3a5f) primary, gold (#c9a84c) accent, white backgrounds
- Professional real estate tone — not flashy, trust-focused
- Mobile-first; most visitors are on phones
- Chinese-language audience is secondary — Will is bilingual and serves Mandarin-speaking buyers

## Common Tasks
- **Add a new neighborhood**: edit `client/src/data/neighborhoods.ts`, add a `.jpeg` to `client/public/images/towns/`, update `sitemap.xml`
- **Edit a page**: pages are in `client/src/pages/` — each is a single TSX file
- **Add a form field**: use react-hook-form + zod schema validation, then map to FUB API payload
- **Update market data**: `client/src/pages/Market.tsx` contains hardcoded chart data — update monthly
