import Image from "next/image";
import { getArticleImage } from "@/lib/article-images";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors, colors } from "@/lib/constants";

// Fixed section accent — "Today's Signal" always reads in neon cyan so it
// reads as a persistent site landmark, regardless of what category the
// underlying article belongs to.
const SECTION_ACCENT = colors.neonCyan;

/**
 * Today's Signal — full-width strip sitting directly below the 3D hero.
 *
 * Purpose: prove the site is alive TODAY. Single drop, massive headline,
 * image, metadata row. Replaces the old BentoGrid "featured" treatment
 * because a single focal point converts harder than a 5-card mosaic.
 */
export function TodaysSignal({ post }: { post: GhostPost }) {
  const tagSlug = post.primary_tag?.slug || "news";
  const tagName = post.primary_tag?.name || "Dispatch";
  const color = categoryColors[tagSlug] ?? categoryColors.news;
  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      id="featured"
      className="relative isolate py-24 sm:py-28"
      aria-label="Today's signal"
    >
      {/* Top edge glow — marks the boundary between the 3D void and the content rail */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(69,240,255,0.35) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Eyebrow row — section identity (always cyan), date on the right */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: SECTION_ACCENT, boxShadow: `0 0 12px ${SECTION_ACCENT}` }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: SECTION_ACCENT }}
          >
            Today&apos;s Signal
          </span>
          <span className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            {date}
          </span>
        </div>

        <Link
          href={`/${post.slug}`}
          className="group block glass-panel overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor: `${color}30`,
          }}
        >
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
            {/* Image — always resolves (dedicated or slug-hashed cosmic fallback) */}
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden">
              <Image
                src={post.feature_image || getArticleImage(post.slug)}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {/* Image → panel fade for clean transition on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09101B] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#09101B]/40" />
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{
                    color,
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  {tagName}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {post.reading_time || 5} min read
                </span>
              </div>

              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black tracking-[-0.035em] leading-[1.05] text-white group-hover:text-[color:var(--color-neon-cyan)] transition-colors">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-base text-white/65 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2 font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[color:var(--color-neon-cyan)]">
                Read the drop
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
          </div>
        </Link>
      </div>
    </section>
  );
}
