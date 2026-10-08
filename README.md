# BostonHomeGuide.com — Will Shao Real Estate

## Local Setup

1. Clone the repo
2. Copy `client/public/js/fub-config.EXAMPLE.js` → `client/public/js/fub-config.js`
3. Fill in your real FUB Pixel ID, API key, Fello URL, and RealScout Agent ID
4. Install dependencies: `pnpm install`
5. Start dev server: `pnpm dev` → http://localhost:5173
6. Run tests: `pnpm test`

## Deploy

Pushing to `main` deploys automatically through `.github/workflows/deploy.yml`: it builds the site, prerenders every page listed in `client/public/sitemap.xml` (so search engines and AI crawlers get real HTML), and publishes to GitHub Pages.

## Custom Domain (bostonhomeguide.com)

1. The `CNAME` file at repo root is already set to `bostonhomeguide.com`
2. In your DNS provider, add:
   - **A records** pointing to GitHub Pages IPs:
     `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
   - **CNAME record:** `www` → `YOUR_USERNAME.github.io`
3. In GitHub Pages settings, enable **"Enforce HTTPS"**

## Key Config Values (`client/public/js/fub-config.js` — never committed)

- **FUB Pixel ID:** FUB dashboard → Admin → Pixel
- **FUB API Key:** FUB dashboard → Admin → API (base64 encode as `apikey:YOUR_KEY`)
- **Fello URL:** Your Fello dashboard → landing page URL
- **RealScout Agent ID:** RealScout embed code → `agent-encoded-id` attribute

## Contact

- **Phone:** (781) 456-3541
- **Email:** will@willshao.com
- **Calendar:** https://calendar.app.google/rp3dJPWTjzaV9W1W7
- **Zillow:** https://zillow.com/profile/willshao
