import type { GhostPost } from "@/lib/ghost.types";
import { FeaturedCard } from "./FeaturedCard";

export function FeaturedCards({ posts }: { posts: GhostPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-silver/50">Featured</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (<FeaturedCard key={post.id} post={post} />))}
        </div>
      </div>
    </section>
  );
}
