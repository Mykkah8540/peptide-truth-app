import fs from "fs";
import path from "path";

const here = process.cwd(); // should be .../app/web during Vercel build
const repoRoot = path.resolve(here, "../..");

const srcDir = path.join(repoRoot, "content", "_index");
const dstDir = path.join(here, "content", "_index");

fs.mkdirSync(dstDir, { recursive: true });

const files = [
  "search_routes_v1.json",
  "entities_v1.json",
  "blends_v1.json",
  "topics_v1.json",
];

const copied = [];

for (const f of files) {
  const src = path.join(srcDir, f);
  const dst = path.join(dstDir, f);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    copied.push(f);
  }
}

console.log("[copy_content_indexes] repoRoot:", repoRoot);
console.log("[copy_content_indexes] srcDir:", srcDir, "exists:", fs.existsSync(srcDir));
console.log("[copy_content_indexes] dstDir:", dstDir);
console.log("[copy_content_indexes] copied:", copied.length ? copied.join(", ") : "(none)");
