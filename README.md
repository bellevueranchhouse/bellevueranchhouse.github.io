# Bellevue Ranch House

Static student housing website for GitHub Pages. Pages are authored directly in the repository root; shared styles and interactions live in `css/site.css` and `js/site.js`.

## Preview and validate

- `npm run dev` starts a local preview at http://127.0.0.1:4173 (Python 3 required).
- `npm test` checks JavaScript syntax, public assets and links, page structure, pricing, and application fields.
- `npm run images` regenerates responsive WebP copies of the photos in `img/opt/` (requires `cwebp`, e.g. `brew install webp`). Run it after adding or replacing a photo in `img/house/`, then reference the `img/opt/` files with `srcset`.
- `npm run build` validates and copies only referenced public files into `dist/` for static hosting. Node 20+ is sufficient; no dependency installation or CSS compilation is required.

GitHub Pages can continue serving from the repository root. The same site is also available as the generated `dist/` output. Keep the hosting configuration aligned with the chosen publishing source.

## Content

Regular bedroom: **$500/month**. Master bedroom: **$750/month**. Utilities and tenant-arranged internet are separate. Update price references in the home, pricing, FAQ, contact, application, and resources pages together. Room selection links prefill the application through `?room=regular` or `?room=master`.

Pages serve the WebP copies in `img/opt/`; the originals in `img/house/` and `img/bvr-hero.jpg` stay as the source files. The phone walkthrough on the photos page is `img/bellevue-ranch-house-tour.mp4` (it shows a bedroom, closet, and bathrooms only). `img/social-card.jpg` is the link-preview image used by the Open Graph tags on every page.

## SEO and hosting

Each page has a canonical URL on `https://www.bellevueranchhouse.com/` plus Open Graph tags; `apply-success.html` and `404.html` are `noindex`. `robots.txt` and `sitemap.xml` live at the root — add new pages to both `sitemap.xml` and the `pages` list in `scripts/site-files.mjs`. `404.html` uses root-relative URLs because GitHub Pages serves it for any missing path.

Use the original property photos in `img/house/` and `img/bvr-hero.jpg` for rental details. The illustration in `img/student-essentials.jpg` is decorative; its generation prompt is in `output/imagegen/student-essentials.md`.

## Applications

The existing form uses FormSubmit and sends to `bellevueranchhouse@gmail.com`, with the existing `apply-success.html` redirect. It uses native browser validation and does not store applicant details in browser storage. Live delivery depends on FormSubmit activation and service availability. Local checks must intercept submission requests; do not send fabricated applications to the landlord.

Current availability, move-in amounts, and lease terms require landlord confirmation. The site does not invent vacancy counts or make bookings.
