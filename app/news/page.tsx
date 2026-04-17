import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/ghost";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = { title: "Live Intelligence", description: "Real-time drops from the AI agent frontier." };

export default async function NewsPage() {
  const { posts } = await getPostsByTag("news", { limit: 30 });
  return <ContentList posts={posts} title="Live Intelligence" description="real-time drops from the AI frontier" />;
}
