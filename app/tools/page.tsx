import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/content";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = { title: "Tool Vault", description: "Curated AI agent frameworks, stacks, and tested resources." };

export default async function ToolsPage() {
  const { posts } = await getPostsByTag("tool", { limit: 30 });
  return <ContentList posts={posts} title="Tool Vault" description="frameworks, stacks, tested resources" />;
}
