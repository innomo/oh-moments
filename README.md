# OH Moments — Something your home needs

One integrated luxury Astro static site for 5 brands. Shop catalogue + lead generation (no checkout in V1).

Brands: Pretty Plate_Co (glassware & tableware) · Moments Touch (our bleach cleaner) · Legae (home renovations and solar) · Shaded (curtains / blinds) · Blooms and Occasions (intimate occasions and flowers).

## Setup

```bash
npm install
npm run dev
npm run build   # must be green before deploy
```

Cloudflare Pages: build `npm run build`, output `dist`, env `NODE_VERSION=22`. Custom `.co.za`: Pages → Custom domains → Add, then update `site` in `astro.config.mjs` + sitemap line in `public/robots.txt`.

Fonts: Roboto body + Cormorant Garamond display (self-hosted via Fontsource).

## Edit first

- `src/data/brands.ts`: WhatsApp (`27837046206`), Web3Forms key, domain placeholder, socials (blank = hidden), all names/tags. Brand routes: `/brands/<slug>`; old root slugs redirect.

## Shop products

Add `src/content/products/my-item.json` (see `scripts/seed-products.cjs`): `name, brand (slug), category, shortDescription, description, price? (omit = Enquire for price), sku?, images[] (local paths, e.g. /img/real/tableware.jpg), featured, inStock, tags`.

## Photos (free, local, luxury)

Real free Unsplash photos stored in `public/img/real/` (hero, tableware, dining, cleaning, curtains, renovation, solar, flowers) — see `ATTRIBUTION.md`. No hotlinks, no illustrations. Replace any file with your own photo (same filename) anytime.

## Logo

The client logo lives at `src/assets/logo.png`, rendered via Astro `<Image>` (WebP output) in the header and the home brand-mark band, which CSS-crops the cut tagline. To swap: overwrite the file, rebuild.

## Legae / solar

Renovations + “Solar solutions and installation enquiries — subject to client confirmation”. No specs/certs/warranties implied.

## V2 shop path

Schema shop-ready (`price, sku, inStock`). Add Snipcart / Shopify Buy Button / PayFast later; keep WhatsApp fallback.
