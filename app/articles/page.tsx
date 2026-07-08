import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/lib/hub";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PILLARS, SITE_NAME } from "@/lib/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Plain-language guides for using AI to make money and make things. No hype, no tool overload, real results.",
  alternates: { canonical: `${siteUrl}/articles` },
};

export default function ArticlesIndexPage() {
  const all = getAllArticles();
  const [featured] = getFeaturedArticles(1);
  const rest = featured ? all.filter((a) => a.slug !== featured.slug) : all;

  return (
    <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pt-16 pb-8">
      <header className="max-w-2xl">
        <p className="eyebrow">The library</p>
        <h1 className="mt-3 font-display text-[2.6rem] sm:text-[3.4rem] leading-[1.04] tracking-[-0.025em] text-ink font-medium">
          Everything, in plain language.
        </h1>
        <p className="mt-5 font-serif text-[1.2rem] leading-relaxed text-ink-soft">
          Guides for using AI to make money and make things. Pick a topic, or just start reading.
        </p>
      </header>

      <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-hairline py-4">
        <span className="text-[0.9rem] text-ink font-medium">All</span>
        {PILLARS.map((p) => (
          <Link
            key={p.slug}
            href={`/articles/topic/${p.slug}`}
            className="text-[0.9rem] text-ink-mute hover:text-ink transition-colors"
          >
            {p.label}
          </Link>
        ))}
      </nav>

      {all.length === 0 ? (
        <p className="mt-16 font-serif text-[1.1rem] text-ink-soft">
          The first pieces are on their way. Check back shortly.
        </p>
      ) : (
        <>
          {featured && (
            <div className="mt-12 border-b border-hairline pb-12">
              <ArticleCard article={featured} featured />
            </div>
          )}
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
