import Link from "next/link";
import Image from "next/image";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";
import { TagPill } from "./TagPill";

function CardWithImage({
  post,
  large = false,
}: {
  post: GhostPost;
  large?: boolean;
}) {
  const image = post.feature_image || getArticleImage(post.slug);

  if (!image) return <CardNoImage post={post} large={large} />;

  return (
    <Link href={`/${post.slug}`} className="article-card group relative block">
      <div className={`relative ${large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]" : "aspect-[16/10]"}`}>
        <Image
          src={image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <TagPill tag={post.primary_tag?.name ?? "Article"} className="mb-2" />
          <h3
            className={`font-bold text-white leading-tight ${
              large ? "text-xl sm:text-2xl lg:text-3xl" : "text-sm sm:text-base"
            }`}
          >
            {post.title}
          </h3>
          {large && (
            <p className="mt-2 text-sm text-gray-300 line-clamp-2 max-w-lg">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <time className="font-mono text-[11px] text-gray-400">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
            <span className="text-gray-500">·</span>
            <span className="font-mono text-[11px] text-gray-400">
              {post.reading_time} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CardNoImage({ post, large = false }: { post: GhostPost; large?: boolean }) {
  const tag = post.primary_tag?.slug ?? "news";
  const color = categoryColors[tag] ?? "#06b6d4";

  return (
    <Link href={`/${post.slug}`} className="article-card group flex flex-col justify-end p-5 lg:p-6" style={{ borderTop: `3px solid ${color}` }}>
      <TagPill tag={post.primary_tag?.name ?? "Article"} className="mb-2" />
      <h3
        className={`font-bold text-text-primary group-hover:text-accent transition-colors leading-tight ${
          large ? "text-xl sm:text-2xl" : "text-sm sm:text-base"
        }`}
      >
        {post.title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-text-secondary line-clamp-2">
        {post.excerpt}
      </p>
      <time className="font-mono text-[11px] text-text-tertiary mt-3">
        {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </time>
    </Link>
  );
}

interface BentoGridProps {
  featured: GhostPost;
  posts: GhostPost[];
}

export function BentoGrid({ featured, posts }: BentoGridProps) {
  const topRight = posts.slice(0, 2);
  const bottom = posts.slice(2, 5);

  return (
    <section id="featured" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-6">
          Featured
        </p>
        <div className="space-y-4">
          {/* Top row: large feature + 2 stacked */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-[64%]">
              <CardWithImage post={featured} large />
            </div>
            <div className="lg:w-[36%] flex flex-col gap-4">
              {topRight.map((post) => (
                <div key={post.id} className="flex-1">
                  <CardWithImage post={post} />
                </div>
              ))}
            </div>
          </div>
          {/* Bottom row: 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bottom.map((post) => (
              <CardWithImage key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
