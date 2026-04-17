import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/content";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = { title: "Agent Academy", description: "Zero to deployed build guides for AI agents." };

export default async function LearnPage() {
  const { posts } = await getPostsByTag("learn", { limit: 30 });
  return <ContentList posts={posts} title="Agent Academy" description="zero to deployed build guides" />;
}
