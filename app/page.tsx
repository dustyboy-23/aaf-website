import { getPosts } from "@/lib/content";
import { NexusHero } from "./NexusHero";
import { TodaysSignal } from "@/components/ui/TodaysSignal";
import { VerticalsGrid } from "@/components/ui/VerticalsGrid";
import { DeepAnalysisFeature } from "@/components/ui/DeepAnalysisFeature";
import { LatestDrops } from "@/components/ui/LatestDrops";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { CommunityRail } from "@/components/ui/CommunityRail";

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
        <CommunityRail />
      </div>
    </>
  );
}
