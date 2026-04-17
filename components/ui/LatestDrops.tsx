import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors, colors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";

/**
 * Latest Drops — dense editorial feed sitting below the Deep Analysis feature.
 *
 * Three-column grid (responsive), 12 cards with category-colored tags, dates,
 * reading time, and a bottom-line "View all →" link to the full archive.
 *
 * Design intent: this is the "velocity proof" — a wall of recent work that
 * signals AAF ships daily, not quarterly. Kept denser than the verticals
 * cards above so the information density contrast reads like a real hub.
 */

function DropCard({ post, index }: { post: GhostPost; index: number }) {
  const tagSlug = post.primary_tag?.slug ?? "news";
  const tagName = post.primary_tag?.name ?? "Dispatch";
  const accent = categoryColors[tagSlug] ?? colors.ultraviolet;
  const image = post.feature_image || getArticleImage(post.slug);
  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // First card in each row of 3 gets a mild size boost on large screens to
  // break the uniform-card feeling without requiring a full masonry layout.
  const isLead = index % 6 === 0;

  return (
    <Link
      href={`/${post.slug}`}
      className={`group relative glass-panel overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isLead ? "md:row-span-2" : ""
      }`}
      style={{ borderColor: `${accent}20` }}
    >
      {/* Image / gradient */}
      <div
        className={`relative overflow-hidden ${
          isLead ? "aspect-[4/3]" : "aspect-[16/9]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${accent}30, transparent 65%), linear-gradient(135deg, #09101B, #140B21)`,
            }}
          />
        )}
        {/* Image → card fade so the tag pill reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent" />

        {/* Tag pill */}
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

      {/* Copy */}
      <div className="flex-1 flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>{date}</span>
          <span>{post.reading_time || 5} min</span>
        </div>

        <h3
          className={`font-bold tracking-tight text-white leading-snug transition-colors line-clamp-3 ${
            isLead ? "text-xl sm:text-2xl" : "text-base"
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

        {/* Hover affordance */}
        <div className="mt-auto pt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: accent }}
        >
          Read
          <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6h8M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function LatestDrops({ posts }: { posts: GhostPost[] }) {
  if (!posts.length) return null;

  // Take the first 12 — enough density to feel "alive" without drowning the
  // page. Users who want more hit the /news archive or per-vertical pages.
  const items = posts.slice(0, 12);

  return (
    <section className="relative py-24 sm:py-28" aria-label="Latest drops">
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: colors.signalLime,
                  boxShadow: `0 0 10px ${colors.signalLime}`,
                }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-[color:var(--color-signal-lime)]">
                Live Feed
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.035em] leading-[1.05] text-white">
              The latest drops.
            </h2>
            <p className="mt-3 text-white/55 max-w-lg">
              Every headline from the last {items.length * 8} hours of the AI
              agent frontier. Filter by vertical above or ride the full stream.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] font-semibold text-white/70 hover:text-white transition-colors"
          >
            All articles
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 6h8M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {items.map((post, i) => (
            <DropCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
