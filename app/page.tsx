import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllArticles, getFeaturedArticles } from "@/lib/hub";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PillarIndex } from "@/components/ui/PillarIndex";
import { CommunityCTA } from "@/components/ui/CommunityCTA";
import { CORE_PROMISE } from "@/lib/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = { alternates: { canonical: siteUrl } };

export default async function Home() {
  const all = getAllArticles();
  const [cornerstone] = getFeaturedArticles(1);
  const latest = all.filter((a) => a.slug !== cornerstone?.slug).slice(0, 6);

  return (
    <>
      {/* Hook / promise — primary action is READ, not join */}
      <section className="mx-auto max-w-[1180px] px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <p className="eyebrow">The practical side of AI</p>
        <h1 className="mt-6 font-display text-[2.6rem] leading-[1.03] tracking-[-0.03em] text-ink font-medium sm:text-[4.4rem] max-w-[16ch]">
          {CORE_PROMISE}
        </h1>
        <p className="mt-7 font-serif text-[1.25rem] leading-relaxed text-ink-soft max-w-2xl">
          A plain-language library for people who want to actually do something with AI and
          see a result. No agent-dev jargon, no guru pitch. Just the useful part.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.95rem] font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Read the latest
            <ArrowRight size={17} strokeWidth={2} />
          </Link>
          <Link
            href="/start-here"
            className="text-[0.95rem] text-ink-soft underline decoration-hairline-strong underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
          >
            New to this? Start here
          </Link>
        </div>
      </section>

      {/* Signature: the numbered pillar index */}
      <section className="mx-auto max-w-[1180px] px-5 sm:px-8 py-4">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="eyebrow">Four ways in</h2>
          <span className="index-num text-[0.78rem] text-ink-mute">01 &ndash; 04</span>
        </div>
        <PillarIndex />
      </section>

      {/* Latest / featured — prove the writing is good */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-display text-[1.9rem] tracking-[-0.02em] text-ink font-medium">Latest</h2>
            <Link href="/articles" className="text-[0.9rem] text-ink-mute hover:text-ink transition-colors">
              All articles &rarr;
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* What this is — voice strip */}
      <section className="border-y border-hairline bg-paper-2">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="font-display text-[1.6rem] sm:text-[2.1rem] leading-[1.25] tracking-[-0.015em] text-ink font-normal max-w-3xl">
            Most AI content is either hype with no path, or built for engineers. This is neither.
            Every piece here is written for a normal person who wants a real result, and it ends
            where the result actually starts.
          </p>
        </div>
      </section>

      {/* One cornerstone piece */}
      {cornerstone && (
        <section className="mx-auto max-w-[1180px] px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="eyebrow mb-8">Start with this one</h2>
          <ArticleCard article={cornerstone} featured />
        </section>
      )}

      {/* The single community block — bottom, earned */}
      <section className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-8">
        <CommunityCTA source="site" />
      </section>
    </>
  );
}
