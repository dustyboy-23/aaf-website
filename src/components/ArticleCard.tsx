import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  index?: number;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  date,
  readingTime,
  image,
  index = 0,
}: ArticleCardProps) {
  return (
    <article
      className="article-card-enter group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link
        href={`/articles/${slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded-xl"
      >
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-[var(--border-light)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-300" />
        </div>

        {/* Content */}
        <div>
          {/* Category + meta row */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="font-mono text-[0.6875rem] font-medium text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded">
              {category}
            </span>
            <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-body text-[1.0625rem] font-medium text-[var(--text-primary)] leading-snug line-clamp-2 mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="font-body text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-2.5">
            {excerpt}
          </p>

          {/* Reading time */}
          <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
            {readingTime}
          </span>
        </div>
      </Link>
    </article>
  );
}
