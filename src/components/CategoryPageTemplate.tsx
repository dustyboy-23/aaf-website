import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/content";
import { Metadata } from "next";

interface CategoryPageTemplateProps {
  category: string;
  title: string;
  description: string;
}

export function CategoryPageTemplate({
  category,
  title,
  description,
}: CategoryPageTemplateProps) {
  const articles = getArticlesByCategory(category);

  return (
    <>
      {/* Category Header */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-[var(--canvas)]">
        <div className="container-main">
          <div className="max-w-2xl hero-title">
            <span className="hero-label inline-block font-mono text-[0.6875rem] font-medium text-[var(--accent)] uppercase tracking-[0.12em] mb-3">
              Category
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
              {title}
            </h1>
            <p className="hero-subtitle mt-5 font-body text-[1.125rem] text-[var(--text-secondary)] leading-relaxed">
              {description}
            </p>
            <p className="hero-cta mt-4 font-mono text-[0.75rem] text-[var(--text-muted)]">
              {articles.length} article{articles.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 md:py-20 bg-[var(--canvas)]">
        <div className="container-main">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} {...article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-body text-[var(--text-secondary)] text-lg">
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
