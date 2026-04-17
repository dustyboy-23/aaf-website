import { getPosts } from "@/lib/content";
import { NexusHero } from "./NexusHero";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { CategoryShowcase } from "@/components/ui/CategoryShowcase";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { LatestFeed } from "@/components/ui/LatestFeed";
import { FinalCTA } from "@/components/ui/FinalCTA";

export default async function Home() {
  const { posts } = await getPosts({ limit: 20 });

  const featured = posts[0] ?? null;
  const bentoPosts = posts.slice(1, 6);
  const feedPosts = posts.slice(6);

  return (
    <>
      <NexusHero />
      <div className="relative z-10 bg-void">
        {featured && <BentoGrid featured={featured} posts={bentoPosts} />}
        <CategoryShowcase />
        <NewsletterCTA />
        <LatestFeed posts={feedPosts} />
        <FinalCTA />
      </div>
    </>
  );
}
