import Link from "next/link";
import Image from "next/image";
import type { GhostPost } from "@/lib/ghost.types";
import { TagPill } from "./TagPill";

interface ContentListProps {
  posts: GhostPost[];
  title: string;
  description?: string;
}

export function ContentList({ posts, title, description }: ContentListProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-text-secondary">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="group rounded-xl bg-surface-raised border border-border hover:border-border-hover p-5 transition-all"
          >
            <div className="flex gap-5">
              {post.feature_image && (
                <div className="hidden sm:block shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    width={160}
                    height={96}
                    className="w-full h-full object-cover"
                    sizes="160px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {post.reading_time} min
                  </span>
                </div>
                <h2 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-text-tertiary text-sm py-12">
            No content yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
