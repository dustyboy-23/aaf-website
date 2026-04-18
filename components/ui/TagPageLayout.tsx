import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors, colors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";

/**
 * Editorial tag / archive page layout.
 *
 * Replaces the anemic vertical list with a hero band + 3-column card grid
 * that matches the Latest Drops density on the homepage. Tag-specific
 * accent color + editorial description give every tag page its own feel
 * instead of being rubber-stamped "blog index."
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
}

function ArticleCard({
  post,
  accent,
  size = "regular",
}: {
  post: GhostPost;
  accent: string;
  size?: "lead" | "regular";
}) {
  const tagName = post.primary_tag?.name ?? "Dispatch";
  const image = post.feature_image || getArticleImage(post.slug);
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

export function TagPageLayout({
  posts,
  tagSlug,
  title,
  eyebrow,
  description,
  countLabel,
}: TagPageLayoutProps) {
  const accent = categoryColors[tagSlug] ?? colors.neonCyan;
  const count = countLabel ?? `${posts.length} article${posts.length === 1 ? "" : "s"}`;

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
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
                Nothing here yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {posts.map((post, i) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  accent={accent}
                  size={i === 0 ? "lead" : "regular"}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
