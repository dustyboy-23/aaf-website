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
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white">{title}</h1>
        {description && <p className="mt-2 font-mono text-xs uppercase tracking-widest text-silver/50">{description}</p>}
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`} className="group glass rounded-lg p-5 hover:border-neon-cyan/30 transition-all">
            <div className="flex gap-5">
              {post.feature_image && (
                <div className="hidden sm:block shrink-0 w-40 h-24 rounded overflow-hidden">
                  <Image src={post.feature_image} alt={post.title} width={160} height={96} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-silver/30">
                    {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-silver/30">{post.reading_time} min</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-neon-cyan-light transition-colors truncate">{post.title}</h2>
                <p className="mt-1 text-sm text-silver/60 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-silver/40 font-mono text-sm uppercase tracking-widest py-12">No content yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
