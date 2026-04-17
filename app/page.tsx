import { getPosts, getFeaturedPosts } from "@/lib/ghost";
import { IntelFeed } from "@/components/ui/IntelFeed";
import { FeaturedCards } from "@/components/ui/FeaturedCards";
import { AboutSection } from "@/components/ui/AboutSection";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { HeroSection } from "./HeroSection";

export default async function Home() {
  const [{ posts: latestPosts }, featuredPosts] = await Promise.all([
    getPosts({ limit: 15 }),
    getFeaturedPosts(3),
  ]);

  return (
    <>
      <HeroSection />
      <div className="relative z-10 bg-void/80 backdrop-blur-sm">
        <div id="feed"><IntelFeed posts={latestPosts} /></div>
        <FeaturedCards posts={featuredPosts} />
        <AboutSection />
        <FinalCTA />
      </div>
    </>
  );
}
