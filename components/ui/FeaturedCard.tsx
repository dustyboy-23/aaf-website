import Link from "next/link";
import Image from "next/image";
import type { GhostPost } from "@/lib/ghost.types";
import { TagPill } from "./TagPill";

export function FeaturedCard({ post }: { post: GhostPost }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group rounded-xl overflow-hidden bg-surface-raised border border-border hover:border-border-hover transition-all duration-200 hover:-translate-y-0.5"
    >
      {post.feature_image && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            width={600}
            height={340}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {post.primary_tag && <TagPill tag={post.primary_tag.name} />}
          <span className="font-mono text-[11px] text-text-tertiary">
            {post.reading_time} min
          </span>
        </div>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
