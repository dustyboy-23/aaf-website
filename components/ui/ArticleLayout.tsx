import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { TagPill } from "./TagPill";
import { getArticleImage } from "@/lib/article-images";
import { ArticleSideRail } from "./ArticleSideRail";
import { InlineArticlePromo, pickPromoKind } from "./InlineArticlePromo";
import { ArticleBottomCTA } from "./ArticleBottomCTA";
import { processArticleHtml, splitAtSecondH2 } from "@/lib/article-html";

interface ArticleLayoutProps {
  post: GhostPost;
  related?: GhostPost[];
  latest?: GhostPost[];
}

/**
 * Editorial article layout.
 *
 * - Full-bleed hero with title + meta overlaid
 * - 2-col desktop grid: article body + sticky promo rail
 * - Mid-article inline promo injected after the 2nd <h2>
 * - FAQ sections auto-transformed to <details> accordions
 * - Full-bleed newsletter CTA before related posts
 */
export function ArticleLayout({
  post,
  related = [],
  latest = [],
}: ArticleLayoutProps) {
  const heroImage = post.feature_image || getArticleImage(post.slug);
  const dateLong = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Prefer meta_description as the hero deck — it's hand-written for length
  // and reads clean. Fall back to the first sentence of excerpt; final fallback
  // is a trimmed excerpt. Prevents the mid-word truncation from Ghost exports.
  const heroDeck = (() => {
    if (post.meta_description && post.meta_description.trim()) {
      return post.meta_description.trim();
    }
    const ex = (post.excerpt || "").trim();
    if (!ex) return "";
    // First sentence — cap at ~220 chars for visual balance
    const firstSentence = ex.split(/(?<=[.!?])\s+/)[0] || ex;
    return firstSentence.length > 220
      ? firstSentence.slice(0, 217).trimEnd() + "…"
      : firstSentence;
  })();

  // Run server-side HTML transforms (FAQ → accordion) then split for inline promo
  const processed = processArticleHtml(post.html);
  const [bodyBefore, bodyAfter] = splitAtSecondH2(processed);
  const promoKind = pickPromoKind(post.primary_tag?.slug);

  return (
    <article className="relative">
      {/* ——— Full-bleed hero ——— */}
      <section className="relative h-[54vh] min-h-[440px] max-h-[640px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Darker overlay at the bottom where text sits, with a left-weighted
            wash to protect the title block from busy feature images */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,5,10,0.55) 0%, rgba(4,5,10,0.35) 30%, rgba(4,5,10,0.85) 75%, rgba(4,5,10,0.96) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,5,10,0.55) 0%, rgba(4,5,10,0.2) 45%, transparent 70%)",
          }}
        />

        {/* Title block — bottom-left of hero */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                {dateLong}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                {post.reading_time} min read
              </span>
            </div>
            <h1
              className="text-[clamp(2rem,5.5vw,4.25rem)] font-black tracking-[-0.03em] leading-[1.02] text-white max-w-4xl"
              style={{
                textShadow:
                  "0 2px 24px rgba(0,0,0,0.6), 0 0 60px rgba(138,99,255,0.25)",
              }}
            >
              {post.title}
            </h1>
            {heroDeck && (
              <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl line-clamp-3">
                {heroDeck}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ——— Body grid: article + sticky right rail ——— */}
      <div className="relative bg-void">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
            {/* Article body */}
            <div>
              {bodyAfter ? (
                <>
                  <div
                    className="prose prose-invert prose-lg max-w-none article-body"
                    dangerouslySetInnerHTML={{ __html: bodyBefore }}
                  />
                  <InlineArticlePromo kind={promoKind} />
                  <div
                    className="prose prose-invert prose-lg max-w-none article-body"
                    dangerouslySetInnerHTML={{ __html: bodyAfter }}
                  />
                </>
              ) : (
                <>
                  <div
                    className="prose prose-invert prose-lg max-w-none article-body"
                    dangerouslySetInnerHTML={{ __html: bodyBefore }}
                  />
                  <InlineArticlePromo kind={promoKind} />
                </>
              )}

              {/* Share + tags */}
              <div className="mt-14 pt-8 border-t border-white/10">
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                      <Link key={tag.id} href={`/tag/${tag.slug}`}>
                        <TagPill tag={tag.name} />
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                    Published {dateLong}
                  </p>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white/70 hover:text-white transition-colors"
                  >
                    All articles
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M2 6h8M7 2l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sticky side rail with promo slots */}
            <ArticleSideRail related={related} latest={latest} />
          </div>
        </div>

        {/* ——— Bottom-of-article full-bleed CTA ——— */}
        <ArticleBottomCTA />

        {/* ——— Related posts grid ——— */}
        {related.length > 0 && (
          <section className="border-t border-white/10 py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
              <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.03em] leading-tight text-white">
                  Keep reading.
                </h2>
                {post.primary_tag && (
                  <Link
                    href={`/tag/${post.primary_tag.slug}`}
                    className="font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white/70 hover:text-white transition-colors"
                  >
                    More in {post.primary_tag.name} →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.slice(0, 4).map((p) => (
                  <Link
                    key={p.id}
                    href={`/${p.slug}`}
                    className="group glass-panel overflow-hidden flex flex-col transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.feature_image || getArticleImage(p.slug)}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      {p.primary_tag && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                          {p.primary_tag.name}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white leading-snug line-clamp-3 group-hover:text-[color:var(--color-neon-cyan)] transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
