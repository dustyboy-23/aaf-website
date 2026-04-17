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

// Cosmic AI-vibe images used when a post has no dedicated hero. Picked from
// the Midjourney brand-reference set so fallbacks feel intentional, not
// placeholder-y. Slug hash keeps the assignment stable across renders so the
// same post always gets the same fallback.
const FALLBACK_COUNT = 6;

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getArticleImage(slug: string): string {
  const available = getAvailableImages();
  if (available.has(slug)) return `/articles/${slug}.png`;
  const idx = (slugHash(slug) % FALLBACK_COUNT) + 1;
  return `/fallbacks/fallback-${idx}.jpg`;
}
