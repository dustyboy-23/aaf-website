import type { GhostPost } from "@/lib/ghost.types";
import { FeaturedCard } from "./FeaturedCard";

export function FeaturedCards({ posts }: { posts: GhostPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-secondary mb-8">
          Featured
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <FeaturedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
