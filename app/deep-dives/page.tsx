import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/ghost";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = { title: "Deep Analysis", description: "Architecture breakdowns and strategic AI intelligence." };

export default async function DeepDivesPage() {
  const { posts } = await getPostsByTag("analysis", { limit: 30 });
  return <ContentList posts={posts} title="Deep Analysis" description="architecture breakdowns, strategic intelligence" />;
}
