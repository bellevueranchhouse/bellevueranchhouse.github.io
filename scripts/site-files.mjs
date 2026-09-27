import { readFile, access } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

export const pages = [
  "index.html",
  "about.html",
  "pricing.html",
  "photos.html",
  "faqs.html",
  "contact.html",
  "apply.html",
  "apply-success.html",
  "404.html",
  "docs/index.html",
];

// Every URL an element can load: plain attributes plus each srcset candidate.
const references = (html) => [
  ...[...html.matchAll(/\b(href|src|poster|data-gallery-src)="([^"]+)"/g)].map(
    ([, attribute, raw]) => [attribute, raw],
  ),
  ...[...html.matchAll(/\bsrcset="([^"]+)"/g)].flatMap(([, list]) =>
    list.split(",").map((candidate) => ["srcset", candidate.trim().split(/\s+/)[0]]),
  ),
];

// Follow only public page references so dependencies, source files, and unused
// media cannot accidentally end up in the deployable output.
export async function validateSite() {
  const files = new Set(pages);
  for (const page of pages) {
    const html = await readFile(page, "utf8");
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      `${page}: expected one primary heading`,
    );
    assert.match(html, /<html lang="en">/, `${page}: missing page language`);
    assert.match(html, /name="viewport"/, `${page}: missing mobile viewport`);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
    assert.match(html, /property="og:image"/, `${page}: missing social image`);
    assert.match(
      html,
      /rel="canonical"|name="robots" content="noindex"/,
      `${page}: needs a canonical URL or noindex`,
    );
    for (const [attribute, raw] of references(html)) {
      if (/^(?:https?:|mailto:|tel:|data:)/.test(raw)) continue;
      const [pathname, fragment] = raw.split("#");
      if (!pathname && fragment) {
        assert.ok(
          ids.includes(fragment),
          `${page}: missing fragment ${fragment}`,
        );
        continue;
      }
      let asset = path.normalize(
        path.join(
          pathname.startsWith("/") ? "" : path.dirname(page),
          decodeURIComponent(pathname.split("?")[0]),
        ),
      );
      if (asset.startsWith("/")) asset = asset.slice(1);
      if (asset === "" || asset.endsWith("/")) asset = path.join(asset, "index.html");
      assert.ok(
        !asset.startsWith(".."),
        `${page}: reference outside public root`,
      );
      await access(asset).catch(() => {
        throw new Error(`${page}: missing ${attribute}="${raw}"`);
      });
      files.add(asset);
    }
    assert.doesNotMatch(html, /\$(?:550|800)\b/, `${page}: stale room price`);
  }
  const application = await readFile("apply.html", "utf8");
  assert.match(
    application,
    /action="https:\/\/formsubmit\.co\/bellevueranchhouse@gmail\.com"/,
  );
  assert.match(application, /method="POST"/);
  for (const name of [
    "_subject",
    "_template",
    "_next",
    "_honey",
    "room_preference",
    "move_in_date",
    "first_name",
    "last_name",
    "email",
    "phone",
    "cosigner_name",
    "certify",
  ]) {
    assert.ok(
      application.includes(`name="${name}"`),
      `Application missing ${name}`,
    );
  }
  for (const [, id] of application.matchAll(
    /<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"/g,
  )) {
    assert.ok(
      application.includes(`for="${id}"`),
      `Application field ${id} needs a label`,
    );
  }
  assert.match(application, /Regular Bedroom \(\$500/);
  assert.match(application, /Master Bedroom \(\$750/);
  for (const file of [
    "css/site.css",
    "js/site.js",
    "robots.txt",
    "sitemap.xml",
    "img/social-card.jpg",
  ])
    files.add(file);
  console.log(
    `Validated ${pages.length} pages, application fields, prices, and ${files.size} public files.`,
  );
  return files;
}
