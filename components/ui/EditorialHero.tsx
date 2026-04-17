import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { categoryColors } from "@/lib/constants";

interface EditorialHeroProps {
  lead: GhostPost | null;
  sidebar: GhostPost[];
}

export function EditorialHero({ lead, sidebar }: EditorialHeroProps) {
  if (!lead) return null;

  const leadTag = lead.primary_tag?.slug ?? "news";
  const leadColor = categoryColors[leadTag] ?? "#06b6d4";

  return (
    <section id="feed" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-8 pb-4 border-b border-border">
          Top Stories
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Lead article -- 3 of 5 columns */}
          <Link
            href={`/${lead.slug}`}
            className="lg:col-span-3 lg:pr-10 lg:border-r lg:border-border group"
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: leadColor }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                {lead.primary_tag?.name ?? "Article"}
              </span>
              <span className="text-text-tertiary">·</span>
              <time className="font-mono text-[11px] text-text-tertiary">
                {new Date(lead.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-text-primary group-hover:text-accent transition-colors leading-[1.1] mb-5">
              {lead.title}
            </h2>
            <p className="text-text-secondary text-base leading-relaxed line-clamp-3 max-w-xl">
              {lead.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 mt-6 text-accent text-sm font-medium">
              Read article
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          {/* Sidebar stack -- 2 of 5 columns */}
          <div className="lg:col-span-2 lg:pl-10 flex flex-col border-t border-border lg:border-t-0 mt-8 pt-8 lg:mt-0 lg:pt-0">
            {sidebar.map((post, i) => {
              const tag = post.primary_tag?.slug ?? "news";
              const color = categoryColors[tag] ?? "#6b7280";
              return (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className={`group py-4 first:pt-0 ${
                    i < sidebar.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                      {post.primary_tag?.name ?? "Article"}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
