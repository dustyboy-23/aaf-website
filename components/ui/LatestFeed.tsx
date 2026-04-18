import Link from "next/link";
import Image from "next/image";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors } from "@/lib/constants";
import { getArticleImage } from "@/lib/article-images";
import { TagPill } from "./TagPill";

function FeedEntry({ post }: { post: GhostPost }) {
  const tagSlug = post.primary_tag?.slug ?? "news";
  const dotColor = categoryColors[tagSlug] ?? "#6b7280";
  const image = post.feature_image || getArticleImage(post.slug);

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex items-start gap-4 py-5 border-b border-border last:border-0"
    >
      {image ? (
        <div className="shrink-0 w-20 h-14 sm:w-24 sm:h-16 relative rounded-md overflow-hidden">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="96px"
          />
        </div>
      ) : (
        <span
          className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <TagPill tag={post.primary_tag?.name ?? "Article"} />
          <span className="font-mono text-[11px] text-text-tertiary">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-text-secondary line-clamp-1 mt-1">
          {post.excerpt}
        </p>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-text-tertiary pt-0.5 hidden sm:block">
        {post.reading_time} min
      </span>
    </Link>
  );
}

export function LatestFeed({ posts }: { posts: GhostPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main feed */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-6 pb-4 border-b border-border">
              Latest
            </p>
            <div>
              {posts.map((post) => (
                <FeedEntry key={post.id} post={post} />
              ))}
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 mt-6 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
            >
              View all articles
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 lg:border-l lg:border-border lg:pl-8">
            <div className="article-card p-6">
              <p className="text-sm font-semibold text-text-primary mb-2">
                Daily intelligence brief
              </p>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                The sharpest signal from the AI frontier. One read per day.
              </p>
              <Link
                href="/#newsletter"
                className="block text-center px-5 py-2.5 rounded-md bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                Get the signal
              </Link>
            </div>

            <div className="mt-6 article-card p-6">
              <p className="text-sm font-semibold text-text-primary mb-3">
                Popular topics
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Agents", "LLMs", "Automation", "Tools", "Tutorials", "Strategy"].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 text-xs text-text-secondary bg-surface-overlay rounded-full border border-border"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
