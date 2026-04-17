import { getPosts } from "@/lib/ghost";
import { HeroSection } from "./HeroSection";
import { EditorialHero } from "@/components/ui/EditorialHero";
import { LatestFeed } from "@/components/ui/LatestFeed";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { FinalCTA } from "@/components/ui/FinalCTA";

export default async function Home() {
  const { posts } = await getPosts({ limit: 20 });

  const leadPost = posts[0] ?? null;
  const sidebarPosts = posts.slice(1, 6);
  const feedPosts = posts.slice(6);

  return (
    <>
      <HeroSection />
      <div className="relative z-10 bg-surface">
        <EditorialHero lead={leadPost} sidebar={sidebarPosts} />
        <CategoryGrid />
        <LatestFeed posts={feedPosts} />
        <FinalCTA />
      </div>
    </>
  );
}
