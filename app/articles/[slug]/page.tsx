import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, getArticleSlugs, getRelatedArticles } from "@/lib/hub";
import { processArticleHtml } from "@/lib/article-html";
import { CommunityCTA } from "@/components/ui/CommunityCTA";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { formatDate } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";

interface Props { params: Promise<{ slug: string }> }

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const ogUrl = `${siteUrl}/og?title=${encodeURIComponent(a.title)}&tag=${encodeURIComponent(a.pillar.label)}`;
  return {
    title: a.metaTitle || a.title,
    description: a.metaDescription || a.dek,
    alternates: { canonical: `${siteUrl}/articles/${slug}` },
    openGraph: {
      title: a.title,
      description: a.dek,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      url: `${siteUrl}/articles/${slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: a.title }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.dek, images: [ogUrl] },
  };
}

export default async function HubArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = getRelatedArticles(slug, 3);
  const body = processArticleHtml(a.html);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.dek,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    url: `${siteUrl}/articles/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/articles/${slug}` },
    author: { "@type": "Person", name: a.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-[720px] px-5 sm:px-8 pt-14 pb-10">
        <Link
          href={`/articles/topic/${a.pillar.slug}`}
          className="inline-flex items-center gap-2 eyebrow text-accent-ink hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          {a.pillar.label}
        </Link>

        <h1 className="mt-5 font-display text-[2.3rem] sm:text-[3.1rem] leading-[1.06] tracking-[-0.025em] text-ink font-medium">
          {a.title}
        </h1>
        {a.dek ? (
          <p className="mt-5 font-serif text-[1.28rem] leading-relaxed text-ink-soft">{a.dek}</p>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-3 text-[0.85rem] text-ink-mute border-y border-hairline py-3.5">
          <span className="text-ink">{a.author}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-hairline-strong" aria-hidden />
          <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
          <span className="h-[3px] w-[3px] rounded-full bg-hairline-strong" aria-hidden />
          <span className="index-num">{a.readingTime} min read</span>
        </div>

        <div
          className="article-body mt-10"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="mt-14">
          <CommunityCTA variant="article" source={`blog-${a.slug}`} />
        </div>

        <div className="mt-12 flex items-start gap-4 border-t border-hairline pt-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-2 font-display text-lg text-ink">
            {a.author.charAt(0)}
          </div>
          <div>
            <p className="font-display text-[1.05rem] text-ink font-medium">{a.author}</p>
            <p className="mt-1 font-serif text-[0.98rem] leading-relaxed text-ink-soft max-w-md">
              Writing about the practical side of AI, and figuring plenty of it out in the open.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 sm:px-8 py-14 border-t border-hairline">
          <h2 className="eyebrow mb-8">Keep reading</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
