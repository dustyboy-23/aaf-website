/**
 * Content loader for the new consumer hub.
 *
 * Reads content/articles/*.mdx (HTML body + frontmatter), separate from the
 * legacy content/posts/ set so the two never collide on a URL. Every hub
 * article carries exactly one pillar tag (see lib/site.ts).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { pillarOf, type Pillar, type PillarSlug } from "./site";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type HubArticle = {
  slug: string;
  title: string;
  dek: string;
  pillar: Pillar;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  /** Processed HTML body, ready for the article template. */
  html: string;
};

type HubFrontmatter = {
  slug: string;
  title: string;
  dek?: string;
  excerpt?: string;
  pillar: PillarSlug;
  author?: string;
  published_at: string;
  updated_at?: string;
  reading_time?: number;
  featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
};

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function readArticle(slug: string): HubArticle | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const parsed = matter(fs.readFileSync(filePath, "utf-8"));
  const fm = parsed.data as HubFrontmatter;
  const pillar = pillarOf(fm.pillar);
  if (!pillar) return null; // an article with no valid pillar is not hub content

  const html = parsed.content.trim();
  return {
    slug: fm.slug,
    title: fm.title,
    dek: fm.dek || fm.excerpt || "",
    pillar,
    author: fm.author || "Dusty",
    publishedAt: fm.published_at,
    updatedAt: fm.updated_at || fm.published_at,
    readingTime: fm.reading_time || estimateReadingTime(html),
    featured: !!fm.featured,
    metaTitle: fm.meta_title || null,
    metaDescription: fm.meta_description || null,
    html,
  };
}

let _cache: HubArticle[] | null = null;

function readAll(): HubArticle[] {
  if (_cache) return _cache;
  if (!fs.existsSync(ARTICLES_DIR)) {
    _cache = [];
    return _cache;
  }
  const articles = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readArticle(f.replace(/\.mdx$/, "")))
    .filter((a): a is HubArticle => a !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  _cache = articles;
  return _cache;
}

export function getAllArticles(): HubArticle[] {
  return readAll();
}

export function getArticle(slug: string): HubArticle | null {
  return readArticle(slug);
}

export function getArticlesByPillar(pillar: PillarSlug): HubArticle[] {
  return readAll().filter((a) => a.pillar.slug === pillar);
}

export function getFeaturedArticles(limit = 3): HubArticle[] {
  const all = readAll();
  const featured = all.filter((a) => a.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getRelatedArticles(slug: string, limit = 3): HubArticle[] {
  const all = readAll();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.filter((a) => a.slug !== slug).slice(0, limit);
  const sameP = all.filter((a) => a.slug !== slug && a.pillar.slug === current.pillar.slug);
  const rest = all.filter((a) => a.slug !== slug && a.pillar.slug !== current.pillar.slug);
  return [...sameP, ...rest].slice(0, limit);
}

export function getArticleSlugs(): string[] {
  return readAll().map((a) => a.slug);
}
