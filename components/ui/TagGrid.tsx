"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GhostPost } from "@/lib/ghost.types";

/**
 * Server component resolves the image URL (fs lookup happens there) plus
 * any bucket-slug tags for chip filtering, so the client receives only
 * serializable data.
 */
export type ResolvedPost = GhostPost & {
  resolvedImage: string;
  /** Bucket slugs this post matches (for filter chips). Empty if no filters. */
  buckets: string[];
};

/**
 * Client-side grid with optional filter chips.
 *
 * Split out from TagPageLayout so the hero band stays server-rendered while
 * the grid can do instant filter toggles. Chips are defined as slug-match
 * rules so we don't have to bulk re-tag MDX frontmatter in Ghost.
 */

/**
 * Filter chip definition. Pure data (no functions) so it serializes
 * cleanly from server to client components. First chip in a group is
 * treated as the "show all" fallback (no bucket filtering applied).
 */
export type FilterChip = {
  slug: string;
  label: string;
};

type Props = {
  posts: ResolvedPost[];
  accent: string;
  filters?: FilterChip[];
};

function ArticleCard({
  post,
  accent,
  size = "regular",
}: {
  post: ResolvedPost;
  accent: string;
  size?: "lead" | "regular";
}) {
  const tagName = post.primary_tag?.name ?? "Dispatch";
  const image = post.feature_image || post.resolvedImage;
  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const isLead = size === "lead";

  return (
    <Link
      href={`/${post.slug}`}
      className={`group relative glass-panel overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isLead ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
      style={{ borderColor: `${accent}20` }}
    >
      <div
        className={`relative overflow-hidden ${
          isLead ? "aspect-[16/9] lg:aspect-[21/10]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={image}
          alt={post.title}
          fill
          sizes={
            isLead
              ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/85 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] font-bold backdrop-blur"
            style={{
              color: accent,
              backgroundColor: "rgba(4,5,10,0.65)",
              border: `1px solid ${accent}55`,
            }}
          >
            {tagName}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>{date}</span>
          <span>{post.reading_time || 5} min</span>
        </div>
        <h3
          className={`font-bold tracking-tight text-white leading-snug line-clamp-3 ${
            isLead ? "text-2xl sm:text-3xl" : "text-base"
          }`}
        >
          <span className="group-hover:text-[color:var(--color-neon-cyan)] transition-colors">
            {post.title}
          </span>
        </h3>
        {post.excerpt && (
          <p
            className={`text-sm text-white/55 leading-relaxed ${
              isLead ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export function TagGrid({ posts, accent, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>(filters?.[0]?.slug ?? "all");

  // Precompute counts per chip using the pre-tagged buckets on each post.
  // First chip is the "all" fallback and always gets the full count.
  const chipCounts = useMemo(() => {
    if (!filters) return {};
    const counts: Record<string, number> = {};
    const allSlug = filters[0]?.slug;
    for (const f of filters) {
      counts[f.slug] =
        f.slug === allSlug
          ? posts.length
          : posts.filter((p) => p.buckets.includes(f.slug)).length;
    }
    return counts;
  }, [filters, posts]);

  const filtered = useMemo(() => {
    if (!filters) return posts;
    const allSlug = filters[0]?.slug;
    if (activeFilter === allSlug) return posts;
    return posts.filter((p) => p.buckets.includes(activeFilter));
  }, [filters, posts, activeFilter]);

  return (
    <>
      {filters && filters.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const isActive = activeFilter === f.slug;
            const count = chipCounts[f.slug] ?? 0;
            return (
              <button
                key={f.slug}
                type="button"
                onClick={() => setActiveFilter(f.slug)}
                disabled={count === 0 && f.slug !== "all"}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-tight transition-all ${
                  isActive
                    ? "text-[#04050A] shadow-[0_0_14px_rgba(69,240,255,0.35)]"
                    : "text-white/60 border border-white/10 hover:border-white/25 hover:text-white/90 disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
                      }
                    : undefined
                }
              >
                {f.label}
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? "text-[#04050A]/70" : "text-white/40"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            Nothing in this bucket yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {filtered.map((post, i) => (
            <ArticleCard
              key={post.id}
              post={post}
              accent={accent}
              size={i === 0 && activeFilter === (filters?.[0]?.slug ?? "all") ? "lead" : "regular"}
            />
          ))}
        </div>
      )}
    </>
  );
}
