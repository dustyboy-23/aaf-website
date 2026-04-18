import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors, colors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";
import { TagGrid, type FilterChip, type ResolvedPost } from "./TagGrid";

/**
 * Editorial tag / archive page layout.
 *
 * Replaces the anemic vertical list with a hero band + 3-column card grid
 * that matches the Latest Drops density on the homepage. Tag-specific
 * accent color + editorial description give every tag page its own feel
 * instead of being rubber-stamped "blog index."
 *
 * Optional `filters` prop renders filter chips above the grid (client-side
 * instant filtering). Use this for tag pages like /tag/tutorials where
 * sub-topic browsing helps — e.g. Agents / Automation / Tools / Models.
 */

export interface TagPageLayoutProps {
  posts: GhostPost[];
  /** Slug used to pick the accent color (e.g. "tutorials", "comparisons") */
  tagSlug: string;
  /** Display name shown in the hero (e.g. "Tutorials", "The Feed") */
  title: string;
  /** Short editorial eyebrow above the title (e.g. "Build it. Ship it.") */
  eyebrow: string;
  /** Paragraph description under the title */
  description: string;
  /** Override count label — defaults to posts.length + " articles" */
  countLabel?: string;
  /** Optional filter chips rendered above the grid */
  filters?: FilterChip[];
  /**
   * Server-side bucket tagger — takes a post, returns an array of chip
   * slugs it matches. Runs in the server component (never sent to client).
   */
  bucketFor?: (post: GhostPost) => string[];
}

export function TagPageLayout({
  posts,
  tagSlug,
  title,
  eyebrow,
  description,
  countLabel,
  filters,
  bucketFor,
}: TagPageLayoutProps) {
  const accent = categoryColors[tagSlug] ?? colors.neonCyan;
  const count = countLabel ?? `${posts.length} article${posts.length === 1 ? "" : "s"}`;

  // Resolve hero images + bucket slugs server-side so TagGrid (client)
  // doesn't import fs and doesn't receive functions as props.
  const resolved: ResolvedPost[] = posts.map((p) => ({
    ...p,
    resolvedImage: getArticleImage(p.slug),
    buckets: bucketFor ? bucketFor(p) : [],
  }));

  return (
    <div className="relative">
      {/* ——— Hero band ——— */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Ambient glow — tag-colored bloom behind the title */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 55% at 30% 40%, ${accent}22 0%, transparent 60%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          </div>
          <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] font-black tracking-[-0.035em] leading-[0.95] text-white max-w-4xl">
            {title}
          </h1>
          <div className="mt-6 flex items-center flex-wrap gap-x-5 gap-y-2 text-white/70">
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-white/75">
              {description}
            </p>
          </div>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            {count}
          </div>
        </div>
      </section>

      {/* ——— Article grid ——— */}
      <section className="relative bg-void pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <TagGrid posts={resolved} accent={accent} filters={filters} />
        </div>
      </section>
    </div>
  );
}
