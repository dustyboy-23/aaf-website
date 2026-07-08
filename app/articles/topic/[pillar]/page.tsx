import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByPillar } from "@/lib/hub";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PILLARS, pillarOf, type PillarSlug } from "@/lib/site";

interface Props { params: Promise<{ pillar: string }> }

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar } = await params;
  const p = pillarOf(pillar);
  if (!p) return {};
  return {
    title: p.label,
    description: p.blurb,
    alternates: { canonical: `${siteUrl}/articles/topic/${p.slug}` },
  };
}

export default async function PillarPage({ params }: Props) {
  const { pillar } = await params;
  const p = pillarOf(pillar);
  if (!p) notFound();
  const articles = getArticlesByPillar(pillar as PillarSlug);

  return (
    <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pt-16 pb-8">
      <header className="max-w-2xl">
        <p className="eyebrow index-num">{String(p.order).padStart(2, "0")}</p>
        <h1 className="mt-3 font-display text-[2.6rem] sm:text-[3.4rem] leading-[1.04] tracking-[-0.025em] text-ink font-medium">
          {p.label}
        </h1>
        <p className="mt-5 font-serif text-[1.2rem] leading-relaxed text-ink-soft">{p.blurb}</p>
      </header>

      <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-hairline py-4">
        <Link href="/articles" className="text-[0.9rem] text-ink-mute hover:text-ink transition-colors">
          All
        </Link>
        {PILLARS.map((other) => (
          <Link
            key={other.slug}
            href={`/articles/topic/${other.slug}`}
            className={`text-[0.9rem] transition-colors ${
              other.slug === p.slug ? "text-ink font-medium" : "text-ink-mute hover:text-ink"
            }`}
          >
            {other.label}
          </Link>
        ))}
      </nav>

      {articles.length === 0 ? (
        <p className="mt-16 font-serif text-[1.1rem] text-ink-soft">
          First pieces for this topic are on the way. In the meantime,{" "}
          <Link href="/articles" className="text-accent-ink underline decoration-accent/30 underline-offset-4">
            browse everything
          </Link>
          .
        </p>
      ) : (
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
