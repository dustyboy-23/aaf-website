import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors } from "@/lib/constants";

export function IntelFeedEntry({ post }: { post: GhostPost }) {
  const tagSlug = post.primary_tag?.slug ?? "news";
  const dotColor = categoryColors[tagSlug] ?? "#6b7280";

  return (
    <Link href={`/${post.slug}`} className="group flex items-start gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-silver/30 pt-1 w-20">
        {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>
      <span className="shrink-0 mt-2 w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white group-hover:text-neon-cyan-light transition-colors truncate">{post.title}</h3>
        <p className="text-xs text-silver/40 truncate mt-0.5">{post.excerpt}</p>
      </div>
      {post.primary_tag && (
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border mt-0.5"
          style={{ color: dotColor, borderColor: `${dotColor}33`, backgroundColor: `${dotColor}11` }}>
          {post.primary_tag.name}
        </span>
      )}
    </Link>
  );
}
