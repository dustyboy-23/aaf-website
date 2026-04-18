import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";

/**
 * Lightweight search index — title + excerpt + tags + slug only.
 * Client downloads once on first search-modal open, then filters in memory.
 *
 * Cached at build time. Re-fetched per request only if content changes
 * trigger a re-deploy.
 */
export const dynamic = "force-static";

export type SearchIndexEntry = {
  slug: string;
  title: string;
  excerpt: string;
  primaryTag: string | null;
  publishedAt: string;
};

export async function GET() {
  const { posts } = await getPosts({ limit: 500 });
  const index: SearchIndexEntry[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: (p.excerpt ?? "").slice(0, 160),
    primaryTag: p.primary_tag?.name ?? p.tags?.[0]?.name ?? null,
    publishedAt: p.published_at,
  }));
  return NextResponse.json(index, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
