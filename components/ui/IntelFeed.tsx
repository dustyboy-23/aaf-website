import type { GhostPost } from "@/lib/ghost.types";
import { IntelFeedEntry } from "./IntelFeedEntry";

export function IntelFeed({ posts }: { posts: GhostPost[] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-secondary mb-6">
          Latest
        </p>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <IntelFeedEntry key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="text-center text-text-tertiary text-sm py-12">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
