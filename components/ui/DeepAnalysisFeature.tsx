import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { colors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";
import { VERTICAL_TAG_MAP } from "./VerticalsGrid";

/**
 * Deep Analysis feature — full-bleed authority showcase.
 *
 * This section is the "premium pillar" flex. Long-form deep dive articles
 * signal to senior builders that AAF isn't a listicle farm. We pick the
 * most recent deep-dive OR, if none, the longest available post by
 * reading_time, so the section always has something to show.
 */

function pickDeepDive(posts: GhostPost[]): GhostPost | null {
  const deepTags = new Set(VERTICAL_TAG_MAP["/deep-dives"] ?? []);
  const tagged = posts.find((p) => {
    if (p.primary_tag && deepTags.has(p.primary_tag.slug)) return true;
    return p.tags.some((t) => deepTags.has(t.slug));
  });
  if (tagged) return tagged;
  // Fallback — longest post that isn't today's signal (index 0).
  const fallback = posts
    .slice(1)
    .sort((a, b) => (b.reading_time || 0) - (a.reading_time || 0))[0];
  return fallback || null;
}

export function DeepAnalysisFeature({ posts }: { posts: GhostPost[] }) {
  const post = pickDeepDive(posts);
  if (!post) return null;

  const accent = colors.electricBlue;

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Featured deep analysis"
    >
      {/* Atmospheric background — radial glow tinted electric blue so the
          section reads as a distinct "depth" strata below the verticals grid. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 900px 500px at 80% 50%, ${accent}15 0%, transparent 60%),
            radial-gradient(ellipse 700px 400px at 10% 0%, #8A63FF10 0%, transparent 50%)
          `,
        }}
      />
      {/* Top divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-28 sm:py-32">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: accent }}
          >
            Deep Analysis
          </span>
        </div>

        {/* Section framing headline */}
        <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-white/70 tracking-tight mb-12 max-w-2xl leading-snug">
          For when the news cycle isn&apos;t enough —{" "}
          <span className="text-white">architecture, not anecdotes.</span>
        </h2>

        <Link
          href={`/${post.slug}`}
          className="group grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Visual — always resolves (dedicated or slug-hashed cosmic fallback) */}
          <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl glass-panel">
            <Image
              src={post.feature_image || getArticleImage(post.slug)}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* Accent-tinted vignette on top so the image still feels
                on-brand even when using a generic cosmic fallback. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${accent}18, transparent 60%), linear-gradient(to top, rgba(4,5,10,0.7), transparent 55%)`,
              }}
            />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
              <span
                className="px-2.5 py-1 rounded-full font-semibold"
                style={{
                  color: accent,
                  backgroundColor: `${accent}12`,
                  border: `1px solid ${accent}40`,
                }}
              >
                The Deep Dive
              </span>
              <span className="text-white/40">
                {post.reading_time || 12} min read
              </span>
            </div>

            <h3 className="text-[clamp(2rem,3.5vw,2.75rem)] font-black tracking-[-0.035em] leading-[1.05] text-white group-hover:text-[color:var(--color-neon-cyan)] transition-colors">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] font-bold mt-2"
              style={{ color: accent }}
            >
              Descend into the analysis
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 6h8M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
