import fs from "fs";
import path from "path";

let _cache: Set<string> | null = null;

function getAvailableImages(): Set<string> {
  if (_cache) return _cache;
  try {
    const dir = path.join(process.cwd(), "public", "articles");
    const files = fs.readdirSync(dir);
    _cache = new Set(files.map((f) => f.replace(/\.(png|webp|jpg|jpeg)$/, "")));
  } catch {
    _cache = new Set();
  }
  return _cache;
}

export function getArticleImage(slug: string): string | null {
  const available = getAvailableImages();
  if (available.has(slug)) return `/articles/${slug}.png`;
  return null;
}
