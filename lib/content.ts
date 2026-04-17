/**
 * Local MDX content loader.
 *
 * Drop-in replacement for lib/ghost.ts that reads from content/posts/*.mdx
 * instead of hitting the Ghost Content API.
 *
 * Every function mirrors the Ghost API contract so the rest of the app
 * doesn't have to change.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  GhostPost,
  GhostPostsResponse,
  GhostTag,
  GhostTagsResponse,
  GhostPagination,
} from "./ghost.types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

type Frontmatter = {
  id: string;
  uuid?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  feature_image?: string | null;
  featured?: boolean;
  published_at: string;
  updated_at?: string;
  reading_time?: number;
  tags?: string[];
  tag_names?: string[];
  primary_tag?: string | null;
  primary_tag_name?: string | null;
  author?: string;
  author_slug?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  canonical_url?: string | null;
  visibility?: string;
};

/**
 * Excerpts from the Ghost export frequently lead with the post title followed
 * by a blank line, then the real excerpt. Strip that prefix so the hero
 * doesn't double up the title.
 */
function cleanExcerpt(raw: string, title: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!title) return trimmed;
  if (trimmed.toLowerCase().startsWith(title.trim().toLowerCase())) {
    return trimmed.slice(title.trim().length).replace(/^[\s\n:—-]+/, "").trim();
  }
  return trimmed;
}

// Build a minimal GhostTag from a slug. We reconstruct tags from frontmatter.
function makeTag(slug: string, name?: string): GhostTag {
  return {
    id: `tag-${slug}`,
    slug,
    name: name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: null,
    feature_image: null,
    visibility: "public",
    url: `/tag/${slug}/`,
  };
}

function readPostFile(slug: string): GhostPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data as Frontmatter;
  const html = parsed.content.trim();

  const tagSlugs = fm.tags || [];
  const tagNames = fm.tag_names || [];
  const tags: GhostTag[] = tagSlugs.map((s, i) => makeTag(s, tagNames[i]));
  const primaryTag = fm.primary_tag
    ? makeTag(fm.primary_tag, fm.primary_tag_name || undefined)
    : tags[0] || null;

  return {
    id: fm.id,
    uuid: fm.uuid || fm.id,
    slug: fm.slug,
    title: fm.title,
    html,
    excerpt: cleanExcerpt(fm.excerpt || "", fm.title || ""),
    feature_image: fm.feature_image || null,
    featured: !!fm.featured,
    published_at: fm.published_at,
    updated_at: fm.updated_at || fm.published_at,
    reading_time: fm.reading_time || 1,
    tags,
    primary_tag: primaryTag,
    url: `/${fm.slug}/`,
    meta_title: fm.meta_title || null,
    meta_description: fm.meta_description || null,
    og_image: fm.og_image || null,
    og_title: fm.og_title || null,
    og_description: fm.og_description || null,
  };
}

// Read all posts once and cache for the lifetime of the server process.
// This is fine because at build time or ISR, Next.js re-runs this fresh.
let _cachedPosts: GhostPost[] | null = null;

function readAllPosts(): GhostPost[] {
  if (_cachedPosts) return _cachedPosts;
  if (!fs.existsSync(POSTS_DIR)) {
    _cachedPosts = [];
    return _cachedPosts;
  }
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"));
  const posts: GhostPost[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const post = readPostFile(slug);
    if (post) posts.push(post);
  }
  // Sort by published_at desc (newest first)
  posts.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  _cachedPosts = posts;
  return posts;
}

function paginate(posts: GhostPost[], limit: number, page: number): GhostPostsResponse {
  const total = posts.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageItems = posts.slice(start, start + limit);
  const pagination: GhostPagination = {
    page,
    limit,
    pages,
    total,
    next: page < pages ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
  };
  return { posts: pageItems, meta: { pagination } };
}

export async function getPosts(
  options: { limit?: number; page?: number } = {}
): Promise<GhostPostsResponse> {
  const { limit = 15, page = 1 } = options;
  const all = readAllPosts();
  return paginate(all, limit, page);
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  return readPostFile(slug);
}

export async function getPostsByTag(
  tagSlug: string,
  options: { limit?: number; page?: number } = {}
): Promise<GhostPostsResponse> {
  const { limit = 15, page = 1 } = options;
  const all = readAllPosts();
  const filtered = all.filter((p) =>
    p.tags.some((t) => t.slug === tagSlug)
  );
  return paginate(filtered, limit, page);
}

export async function getFeaturedPosts(limit = 3): Promise<GhostPost[]> {
  const all = readAllPosts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getAllSlugs(): Promise<string[]> {
  return readAllPosts().map((p) => p.slug);
}

export async function getTags(): Promise<GhostTag[]> {
  const seen = new Map<string, GhostTag>();
  for (const post of readAllPosts()) {
    for (const tag of post.tags) {
      if (!seen.has(tag.slug)) seen.set(tag.slug, tag);
    }
  }
  return Array.from(seen.values());
}
