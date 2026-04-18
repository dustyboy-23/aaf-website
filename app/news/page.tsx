import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Every piece of analysis, build, and dispatch from the AI agent frontier.",
};

export default async function NewsPage() {
  const { posts } = await getPosts({ limit: 100 });
  return (
    <ContentList
      posts={posts}
      title="All Articles"
      description="every piece of analysis, build, and dispatch"
    />
  );
}
