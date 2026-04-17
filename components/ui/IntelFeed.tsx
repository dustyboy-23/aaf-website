import type { GhostPost } from "@/lib/ghost.types";
import { IntelFeedEntry } from "./IntelFeedEntry";

export function IntelFeed({ posts }: { posts: GhostPost[] }) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-silver/50">Intelligence Feed</h2>
        </div>
        <div className="glass rounded-lg py-4 px-4">
          {posts.map((post) => (<IntelFeedEntry key={post.id} post={post} />))}
          {posts.length === 0 && <p className="text-center text-silver/30 font-mono text-xs uppercase tracking-widest py-8">Feed initializing...</p>}
        </div>
      </div>
    </section>
  );
}
