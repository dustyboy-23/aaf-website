import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors } from "@/lib/constants";

export function IntelFeedEntry({ post }: { post: GhostPost }) {
  const tagSlug = post.primary_tag?.slug ?? "news";
  const dotColor = categoryColors[tagSlug] ?? "#6b7280";

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex items-start gap-4 py-4 hover:bg-surface-overlay/50 transition-colors px-4 -mx-4 rounded-lg"
    >
      <span className="shrink-0 font-mono text-[11px] text-text-tertiary pt-0.5 w-16">
        {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>
      <span
        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
          {post.title}
        </h3>
        <p className="text-xs text-text-secondary truncate mt-0.5">
          {post.excerpt}
        </p>
      </div>
      {post.primary_tag && (
        <span
          className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded mt-0.5"
          style={{
            color: dotColor,
            backgroundColor: `${dotColor}14`,
          }}
        >
          {post.primary_tag.name}
        </span>
      )}
    </Link>
  );
}
