import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { TagPageLayout } from "@/components/ui/TagPageLayout";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "The Feed",
  description:
    "Every article from AI Agents First, newest first. Tutorials, comparisons, takes, and frontier dispatches.",
  alternates: { canonical: `${siteUrl}/news` },
  openGraph: {
    title: "The Feed — AI Agents First",
    description: "Every article from AI Agents First, newest first.",
    url: `${siteUrl}/news`,
  },
};

export default async function FeedPage() {
  const { posts } = await getPosts({ limit: 100 });
  return (
    <TagPageLayout
      posts={posts}
      tagSlug="news"
      title="The Feed"
      eyebrow="Live from the frontier"
      description="Every article from AI Agents First, newest first. Tutorials, comparisons, takes, and frontier dispatches. All in one stream."
      countLabel={`${posts.length} articles shipped`}
    />
  );
}
