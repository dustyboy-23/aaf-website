import { getPosts, getFeaturedPosts } from "@/lib/ghost";
import { IntelFeed } from "@/components/ui/IntelFeed";
import { FeaturedCards } from "@/components/ui/FeaturedCards";
import { AboutSection } from "@/components/ui/AboutSection";
import { FinalCTA } from "@/components/ui/FinalCTA";

export default async function Home() {
  const [{ posts: latestPosts }, featuredPosts] = await Promise.all([
    getPosts({ limit: 15 }),
    getFeaturedPosts(3),
  ]);

  return (
    <>
      {/* Hero placeholder -- will be replaced with 3D nexus */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter text-white">AI Agents First</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-silver/50">news / learn / build / connect</p>
        <div className="flex gap-4 mt-8">
          <a href="#feed" className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-mono text-xs uppercase tracking-widest hover:bg-neon-cyan/20 transition-colors">Enter the nexus</a>
          <a href="/signal" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-silver font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Latest drops</a>
        </div>
      </section>
      <div id="feed"><IntelFeed posts={latestPosts} /></div>
      <FeaturedCards posts={featuredPosts} />
      <AboutSection />
      <FinalCTA />
    </>
  );
}
