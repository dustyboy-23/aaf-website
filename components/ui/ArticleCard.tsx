import Link from "next/link";
import type { HubArticle } from "@/lib/hub";
import { formatDate } from "@/lib/format";

/**
 * Uniform tagged card for the article grid. All-caps pillar label + date, then
 * a serif title and dek. No thumbnails required — the type carries it.
 */
export function ArticleCard({ article, featured = false }: { article: HubArticle; featured?: boolean }) {
  return (
    <article className="group flex flex-col">
      <div className="flex items-center gap-3 text-ink-mute">
        <span className="eyebrow text-accent-ink">{article.pillar.label}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-hairline-strong" aria-hidden />
        <time className="text-[0.78rem]" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>
      <h3
        className={`mt-3 font-display tracking-[-0.02em] text-ink font-medium leading-[1.14] ${
          featured ? "text-[2rem] sm:text-[2.6rem]" : "text-[1.4rem]"
        }`}
      >
        <Link href={`/articles/${article.slug}`} className="transition-colors group-hover:text-accent-ink">
          {article.title}
        </Link>
      </h3>
      {article.dek ? (
        <p
          className={`mt-3 font-serif text-ink-soft leading-relaxed ${
            featured ? "text-[1.2rem] max-w-2xl" : "text-[1.02rem]"
          }`}
        >
          {article.dek}
        </p>
      ) : null}
      <div className="mt-3 text-[0.8rem] text-ink-mute index-num">
        {article.readingTime} min read
      </div>
    </article>
  );
}
