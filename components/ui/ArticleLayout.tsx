import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { TagPill } from "./TagPill";

interface ArticleLayoutProps {
  post: GhostPost;
}

export function ArticleLayout({ post }: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <div className="mb-8">
        <Link href="/" className="font-mono text-[10px] uppercase tracking-widest text-silver/40 hover:text-neon-cyan-light transition-colors">Home</Link>
        {post.primary_tag && (
          <>
            <span className="mx-2 text-silver/20">/</span>
            <Link href={`/tag/${post.primary_tag.slug}`} className="font-mono text-[10px] uppercase tracking-widest text-silver/40 hover:text-neon-cyan-light transition-colors">{post.primary_tag.name}</Link>
          </>
        )}
      </div>
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
          <span className="font-mono text-[10px] uppercase tracking-widest text-silver/30">
            {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-silver/30">{post.reading_time} min read</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-tight">{post.title}</h1>
      </header>
      {post.feature_image && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <Image src={post.feature_image} alt={post.title} width={800} height={450} className="w-full object-cover" priority />
        </div>
      )}
      <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.slug}`}><TagPill tag={tag.name} /></Link>
          ))}
        </div>
      )}
    </article>
  );
}
