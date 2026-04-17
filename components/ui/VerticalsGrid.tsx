import Link from "next/link";
import type { ReactNode } from "react";
import type { GhostPost } from "@/lib/ghost.types";
import { branchEndpoints, colors } from "@/lib/constants";

/**
 * The 6 Verticals grid — the "map of the site" directly mirroring the 6
 * neural branch endpoints in the hero. Each card is color-keyed to its
 * matching endpoint so the user's eye can trace hero branch → content card.
 *
 * Each card surfaces the 2 latest posts from that vertical so the page
 * proves the verticals are populated, not empty rooms.
 */

// Map each endpoint slug → the set of frontmatter tag slugs that belong
// to that vertical. Posts are sorted newest-first by the loader; we take
// the first 2 matches per vertical.
const VERTICAL_TAG_MAP: Record<string, string[]> = {
  "/news": ["news", "dispatch", "update"],
  "/learn": ["learn", "tutorial", "tutorials", "guide", "guides"],
  "/network": ["network", "community", "interview"],
  "/deep-dives": ["analysis", "deep-dive", "deep-dives", "essay"],
  "/tools": ["tool", "tools", "stack"],
  "/signal": ["signal", "signals", "daily"],
};

function latestForVertical(posts: GhostPost[], slug: string, limit = 2) {
  const allowed = new Set(VERTICAL_TAG_MAP[slug] ?? []);
  return posts
    .filter((p) => {
      const tagSlug = p.primary_tag?.slug;
      if (tagSlug && allowed.has(tagSlug)) return true;
      return p.tags.some((t) => allowed.has(t.slug));
    })
    .slice(0, limit);
}

const icons: Record<string, ReactNode> = {
  "/news": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
    </svg>
  ),
  "/learn": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  "/network": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M12 10v4M10 15l-4 1M14 15l4 1" />
    </svg>
  ),
  "/deep-dives": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      <path d="M8 11h6M11 8v6" />
    </svg>
  ),
  "/tools": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "/signal": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" strokeLinecap="round" />
    </svg>
  ),
};

export function VerticalsGrid({ posts }: { posts: GhostPost[] }) {
  return (
    <section className="relative py-24 sm:py-28" aria-label="Site verticals">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: colors.ultraviolet, boxShadow: `0 0 10px ${colors.ultraviolet}` }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-[color:var(--color-ultraviolet)]">
                The Network
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black tracking-[-0.035em] leading-[1.05] text-white">
              Six frontiers of the agent era.
            </h2>
            <p className="mt-4 text-white/60 max-w-xl">
              Each vertical is a live stream of intelligence — pick your lane or ride the full feed.
            </p>
          </div>
        </div>

        {/* 2×3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {branchEndpoints.map((vertical) => {
            const latest = latestForVertical(posts, vertical.slug);
            const color = vertical.color;
            return (
              <Link
                key={vertical.slug}
                href={vertical.slug}
                className="group relative glass-panel p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
                style={
                  {
                    borderColor: `${color}28`,
                    // CSS custom property read by the color-shift on hover
                    ["--card-accent" as string]: color,
                  } as React.CSSProperties
                }
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 60%)`,
                  }}
                />

                {/* Icon + label row */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-lg transition-all"
                    style={{
                      backgroundColor: `${color}12`,
                      color: color,
                      boxShadow: `inset 0 0 0 1px ${color}25, 0 0 16px ${color}15`,
                    }}
                  >
                    <div className="w-5 h-5">{icons[vertical.slug]}</div>
                  </div>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold pt-2"
                    style={{ color: `${color}`, opacity: 0.7 }}
                  >
                    /{vertical.slug.slice(1)}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3
                    className="text-xl font-bold tracking-tight text-white transition-colors"
                    style={{
                      // Use CSS custom property so hover can shift to the card accent
                    }}
                  >
                    <span className="group-hover:text-[var(--card-accent)] transition-colors">
                      {vertical.label}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">
                    {vertical.desc}
                  </p>
                </div>

                {/* Latest headlines preview */}
                {latest.length > 0 ? (
                  <ul className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/5">
                    {latest.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-start gap-2 text-[13px] text-white/70 leading-snug"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="line-clamp-2">{p.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[12px] text-white/35 italic mt-auto pt-4 border-t border-white/5">
                    New drops incoming.
                  </p>
                )}

                {/* Enter CTA */}
                <div
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold pt-1"
                  style={{ color }}
                >
                  Enter
                  <svg
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 6h8M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Re-export the tag map so downstream code (feed filters, vertical pages)
// can share the same taxonomy without re-defining it.
export { VERTICAL_TAG_MAP };
