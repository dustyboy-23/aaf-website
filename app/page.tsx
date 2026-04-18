import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { NexusHero } from "./NexusHero";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};
import { TodaysSignal } from "@/components/ui/TodaysSignal";
import { VerticalsGrid } from "@/components/ui/VerticalsGrid";
import { DeepAnalysisFeature } from "@/components/ui/DeepAnalysisFeature";
import { LatestDrops } from "@/components/ui/LatestDrops";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export default async function Home() {
  const { posts } = await getPosts({ limit: 40 });

  const todaysSignal = posts[0] ?? null;
  const feedPosts = posts.slice(1);

  return (
    <>
      <NexusHero />
      <div className="relative z-10 bg-void">
        {todaysSignal && <TodaysSignal post={todaysSignal} />}
        <VerticalsGrid posts={posts} />
        <DeepAnalysisFeature posts={posts} />
        <LatestDrops posts={feedPosts} />
        <NewsletterCTA />
      </div>
    </>
  );
}
