import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { getArticleImage } from "@/lib/article-images";

interface ArticleSideRailProps {
  related: GhostPost[];
  latest: GhostPost[];
}

/**
 * Sticky promo + content rail that sits alongside the article body on
 * desktop. On mobile it stacks below the article so the prose reads first.
 *
 * Slot order is intentional:
 *   1. Newsletter pitch — highest-yield conversion, top of fold
 *   2. Latest drops — signals velocity, gives readers a next click
 *   3. Daily Signal promo — pushes the daily habit loop
 *   4. Follow block — social proof / follow-through
 *
 * Every slot is "our own promo" — no third-party ads, just AAF surfaces we
 * want to drive traffic or signups toward.
 */
export function ArticleSideRail({ related, latest }: ArticleSideRailProps) {
  // Use related if we have them, else latest as filler
  const railPosts = (related.length ? related : latest).slice(0, 4);

  return (
    <aside className="lg:sticky lg:top-24 self-start space-y-6">
      {/* Slot 1 — Newsletter */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(138,99,255,0.18) 0%, rgba(69,240,255,0.12) 100%), rgba(9,16,27,0.85)",
          borderColor: "rgba(138,99,255,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: "#45F0FF",
              boxShadow: "0 0 10px #45F0FF",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-neon-cyan)]">
            Free Newsletter
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight text-white leading-snug mb-2">
          The daily AI agent signal.
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          One email. Every morning. The builds, tools, and frontier research
          that matter — nothing that doesn&apos;t.
        </p>
        <Link
          href="/#newsletter"
          className="block w-full text-center px-4 py-2.5 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
            boxShadow:
              "0 0 18px rgba(69,240,255,0.35), 0 0 36px rgba(138,99,255,0.25)",
          }}
        >
          Subscribe free
        </Link>
      </div>

      {/* Slot 2 — Latest / Related posts list */}
      {railPosts.length > 0 && (
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#B4F542",
                boxShadow: "0 0 10px #B4F542",
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-signal-lime)]">
              {related.length ? "Related" : "Latest"}
            </span>
          </div>
          <ul className="space-y-4">
            {railPosts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/${p.slug}`}
                  className="group grid grid-cols-[72px_1fr] gap-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={p.feature_image || getArticleImage(p.slug)}
                      alt={p.title}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                  </div>
                  <div className="min-w-0">
                    {p.primary_tag && (
                      <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-white/45 mb-1">
                        {p.primary_tag.name}
                      </span>
                    )}
                    <h4 className="text-[13px] font-semibold text-white leading-snug line-clamp-3 group-hover:text-[color:var(--color-neon-cyan)] transition-colors">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Slot 3 — Deep Dives pillar promo */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,79,209,0.14) 0%, rgba(138,99,255,0.12) 100%), rgba(9,16,27,0.85)",
          borderColor: "rgba(255,79,209,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-hot-magenta)]">
            Deep Analysis
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight text-white leading-snug mb-2">
          The long reads.
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          Full-length frontier breakdowns. The stories you won&apos;t get in a
          ten-tweet thread.
        </p>
        <Link
          href="/deep-dives"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white hover:text-[color:var(--color-hot-magenta)] transition-colors"
        >
          Browse deep dives
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M2 6h8M7 2l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Slot 4 — Follow block */}
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
            Follow the feed
          </span>
        </div>
        <p className="text-sm text-white/65 leading-relaxed mb-4">
          New signals, builds, and breakdowns every day across the network.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/news"
            className="flex-1 min-w-[80px] text-center px-3 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80 hover:text-white transition-colors glass-panel"
          >
            News
          </Link>
          <Link
            href="/signal"
            className="flex-1 min-w-[80px] text-center px-3 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80 hover:text-white transition-colors glass-panel"
          >
            Signal
          </Link>
          <Link
            href="/tools"
            className="flex-1 min-w-[80px] text-center px-3 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80 hover:text-white transition-colors glass-panel"
          >
            Tools
          </Link>
        </div>
      </div>
    </aside>
  );
}
