import { mkdir, copyFile, rm, access } from "node:fs/promises";
import path from "node:path";
import { validateSite } from "./site-files.mjs";

const files = await validateSite();
// dist is generated output; source pages continue to work directly on GitHub Pages.
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of files) {
  const destination = path.join("dist", file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(file, destination);
}
for (const file of ["CNAME", ".nojekyll"]) {
  if (
    await access(file)
      .then(() => true)
      .catch(() => false)
  )
    await copyFile(file, path.join("dist", file));
}
console.log("Static site ready in dist/. No server-side runtime required.");
