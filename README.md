# BostonHomeGuide.com — Will Shao Real Estate

## Local Setup

1. Clone the repo
2. Copy `client/public/js/fub-config.EXAMPLE.js` → `client/public/js/fub-config.js`
3. Fill in your real FUB Pixel ID, API key, Fello URL, and RealScout Agent ID
4. Install dependencies: `pnpm install`
5. Start dev server: `pnpm dev` → http://localhost:3000

## Deploy to GitHub Pages

1. Push repo to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)` — or use the `dist/` folder after `pnpm build`
4. Save — site goes live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

> **Note:** This is a Vite/React SPA. For GitHub Pages, run `pnpm build` and deploy the `dist/` folder, or use a GitHub Action to build and deploy automatically.

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
