import type {
  GhostPost,
  GhostPostsResponse,
  GhostPostResponse,
  GhostTag,
  GhostTagsResponse,
} from "./ghost.types";

const GHOST_URL = process.env.GHOST_URL;
const GHOST_KEY = process.env.GHOST_CONTENT_KEY;

function apiUrl(resource: string, params: Record<string, string> = {}): string {
  const base = `${GHOST_URL}/ghost/api/content/${resource}/?key=${GHOST_KEY}`;
  const search = new URLSearchParams(params);
  return `${base}&${search.toString()}`;
}

async function ghostFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Ghost API error: ${res.status}`);
  }
  return res.json();
}

export async function getPosts(
  options: {
    limit?: number;
    page?: number;
  } = {}
): Promise<GhostPostsResponse> {
  const { limit = 15, page = 1 } = options;
  const url = apiUrl("posts", {
    include: "tags",
    limit: String(limit),
    page: String(page),
    order: "published_at desc",
  });
  return ghostFetch<GhostPostsResponse>(url);
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  const url = apiUrl(`posts/slug/${slug}`, { include: "tags" });
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  const data: GhostPostResponse = await res.json();
  return data.posts[0] ?? null;
}

export async function getPostsByTag(
  tagSlug: string,
  options: { limit?: number; page?: number } = {}
): Promise<GhostPostsResponse> {
  const { limit = 15, page = 1 } = options;
  const url = apiUrl("posts", {
    include: "tags",
    filter: `tag:${tagSlug}`,
    limit: String(limit),
    page: String(page),
    order: "published_at desc",
  });
  return ghostFetch<GhostPostsResponse>(url);
}

export async function getFeaturedPosts(limit = 3): Promise<GhostPost[]> {
  const url = apiUrl("posts", {
    include: "tags",
    filter: "featured:true",
    limit: String(limit),
    order: "published_at desc",
  });
  const data = await ghostFetch<GhostPostsResponse>(url);
  return data.posts;
}

export async function getAllSlugs(): Promise<string[]> {
  const url = apiUrl("posts", {
    fields: "slug",
    limit: "all",
  });
  const data = await ghostFetch<GhostPostsResponse>(url);
  return data.posts.map((p) => p.slug);
}

export async function getTags(): Promise<GhostTag[]> {
  const url = apiUrl("tags", { limit: "all" });
  const data = await ghostFetch<GhostTagsResponse>(url);
  return data.tags;
}
