import Link from "next/link";
import Image from "next/image";
import type { GhostPost } from "@/lib/ghost.types";
import { TagPill } from "./TagPill";

export function FeaturedCard({ post }: { post: GhostPost }) {
  return (
    <Link href={`/${post.slug}`} className="group glass rounded-lg overflow-hidden hover:border-neon-cyan/30 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
      {post.feature_image && (
        <div className="aspect-video overflow-hidden">
          <Image src={post.feature_image} alt={post.title} width={600} height={340} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
          <span className="font-mono text-[10px] uppercase tracking-widest text-silver/30">{post.reading_time} min</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan-light transition-colors">{post.title}</h3>
        <p className="mt-2 text-sm text-silver/50 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
