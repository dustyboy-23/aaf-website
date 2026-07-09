import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ArticleCard } from "@/components/ArticleCard";
import { CodeBlock } from "@/components/CodeBlock";
import { PromptBlock } from "@/components/PromptBlock";
import { Figure } from "@/components/Figure";
import { SoftCommunityInvite } from "@/components/SoftCommunityInvite";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/content";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  return {
    title: article.meta.title,
    description: article.meta.excerpt,
    openGraph: {
      type: "article",
      title: article.meta.title,
      description: article.meta.excerpt,
      images: [article.meta.image],
      publishedTime: article.meta.date,
      authors: [article.meta.author],
    },
  };
}

const mdxComponents = {
  CodeBlock,
  PromptBlock,
  Figure,
  SoftCommunityInvite,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-tight text-[var(--text-primary)] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-body text-xl font-medium leading-snug text-[var(--text-primary)] mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-base leading-relaxed text-[var(--text-primary)] mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-body text-base leading-relaxed text-[var(--text-primary)]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-[var(--text-primary)]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors duration-150" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[var(--border-light)]" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="font-body font-medium text-[var(--text-primary)] text-left px-4 py-3 border border-[var(--border)]" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="font-body text-[var(--text-primary)] px-4 py-3 border border-[var(--border)]" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--border-light)] transition-colors" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-light)] pl-5 py-4 pr-4 my-8 rounded-r-lg" {...props} />
  ),
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, article.meta.category, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.meta.title,
    description: article.meta.excerpt,
    author: {
      "@type": "Person",
      name: article.meta.author,
    },
    datePublished: article.meta.date,
    dateModified: article.meta.date,
    publisher: {
      "@type": "Organization",
      name: "AI Agents First",
      logo: {
        "@type": "ImageObject",
        url: "https://aiagentsfirst.com/og-default.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aiagentsfirst.com/articles/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover Image */}
      <section className="pt-32 pb-8 bg-[var(--canvas)]">
        <div className="container-main">
          <div className="max-w-[1200px] mx-auto">
            {article.meta.image ? (
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src={article.meta.image}
                  alt={article.meta.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ) : (
              <div className="aspect-video bg-[var(--accent-light)] rounded-xl flex items-center justify-center">
                <h1 className="font-display text-2xl text-[var(--accent)] text-center px-8">
                  {article.meta.title}
                </h1>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Header */}
      <header className="py-8 bg-[var(--canvas)]">
        <div className="reading-column px-4">
          <CategoryBadge category={article.meta.category} />
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-tight text-[var(--text-primary)] mt-4">
            {article.meta.title}
          </h1>
          <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
            By {article.meta.author} &middot; {article.meta.date} &middot; {article.meta.readingTime}
          </p>
          <p className="mt-6 font-body text-lg text-[var(--text-secondary)] leading-relaxed">
            {article.meta.excerpt}
          </p>
        </div>
      </header>

      {/* Article Body */}
      <article className="pb-16 bg-[var(--canvas)]">
        <div className="reading-column px-4 article-body">
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="container-main">
            <h2 className="font-display text-2xl text-[var(--text-primary)] mb-8">
              More in {article.meta.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((article, i) => (
                <ArticleCard key={article.slug} {...article} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
