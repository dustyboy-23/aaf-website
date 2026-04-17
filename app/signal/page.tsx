import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/content";
import { ContentList } from "@/components/ui/ContentList";

export const metadata: Metadata = { title: "Signal Feed", description: "Daily curated AI picks. Zero noise." };

export default async function SignalPage() {
  const { posts } = await getPostsByTag("signal", { limit: 30 });
  return <ContentList posts={posts} title="Signal Feed" description="daily curated picks, zero noise" />;
}
