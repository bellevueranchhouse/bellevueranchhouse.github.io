// Generates responsive WebP copies of the site photos in img/opt/.
// Requires `cwebp` (brew install webp). Originals are left untouched.
import { execFileSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const OUT = "img/opt";
const WIDTHS = [640, 1280];
const sources = [
  "img/bvr-hero.jpg",
  "img/campus-connection.png",
  ...(await readdir("img/house"))
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .map((file) => `img/house/${file}`),
];

const imageWidth = (file) =>
  Number(
    execFileSync("sips", ["-g", "pixelWidth", file], { encoding: "utf8" }).match(
      /pixelWidth: (\d+)/,
    )[1],
  );

await mkdir(OUT, { recursive: true });
let written = 0;
for (const source of sources) {
  const native = imageWidth(source);
  const name = path.basename(source).replace(/\.[^.]+$/, "");
  for (const width of [...new Set([...WIDTHS.filter((w) => w < native), Math.min(native, 1600)])]) {
    const target = `${OUT}/${name}-${width}.webp`;
    const fresh = await stat(target)
      .then(async (t) => t.mtimeMs > (await stat(source)).mtimeMs)
      .catch(() => false);
    if (fresh) continue;
    execFileSync("cwebp", ["-quiet", "-q", "78", "-m", "6", "-resize", String(width), "0", source, "-o", target]);
    written++;
  }
}
console.log(`Optimized ${sources.length} images (${written} files written to ${OUT}/).`);
