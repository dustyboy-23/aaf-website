import Image from "next/image";
import Link from "next/link";
import type { GhostPost } from "@/lib/ghost.types";
import { getArticleImage } from "@/lib/article-images";
import { StickyRail } from "./StickyRail";

interface ArticleSideRailProps {
  related: GhostPost[];
  latest: GhostPost[];
}

/**
 * Promo + content rail alongside the article body on desktop.
 *
 * Five real slots — only AAF-owned surfaces, no third-party ads, no filler:
 *   1. Newsletter (hero slot — highest-yield conversion)
 *   2. Lead magnet (free PDF — Build Your First AI Agent)
 *   3. Related/Latest posts (velocity signal, next click)
 *   4. Skool community
 *   5. Venti Scale (B2B services — if you need this built for your business)
 *
 * Wrapped in <StickyRail> (client) which handles the sticky math so the rail
 * scrolls with the article, then pins its bottom to the viewport bottom once
 * it reaches it — keeping the bottom blocks in view as the reader continues.
 */
export function ArticleSideRail({ related, latest }: ArticleSideRailProps) {
  const railPosts = (related.length ? related : latest).slice(0, 4);

  return (
    <StickyRail>
      {/* Slot 1 — Newsletter (hero) */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(138,99,255,0.22) 0%, rgba(69,240,255,0.14) 100%), rgba(9,16,27,0.9)",
          borderColor: "rgba(138,99,255,0.4)",
        }}
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-16 h-40 w-40 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(69,240,255,0.35), transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <div className="relative">
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
          <h3 className="text-xl font-black tracking-tight text-white leading-[1.1] mb-3">
            The daily AI agent signal.
          </h3>
          <p className="text-sm text-white/75 leading-relaxed mb-5">
            One email, every morning. The builds, tools, and frontier research
            that actually matter — nothing that doesn&apos;t.
          </p>
          <Link
            href="/#newsletter"
            className="block w-full text-center px-4 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
              boxShadow:
                "0 0 18px rgba(69,240,255,0.35), 0 0 36px rgba(138,99,255,0.25)",
            }}
          >
            Subscribe free
          </Link>
        </div>
      </div>

      {/* Slot 2 — Lead magnet (free PDF) */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(183,255,60,0.14) 0%, rgba(69,240,255,0.08) 100%), rgba(9,16,27,0.9)",
          borderColor: "rgba(183,255,60,0.32)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: "#B7FF3C",
              boxShadow: "0 0 10px #B7FF3C",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-signal-lime)]">
            Free PDF
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight text-white leading-snug mb-2">
          Build Your First AI Agent.
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          Free 11-page playbook. Role, stack, system prompt, tools, memory,
          triggers, guardrails. The full blueprint.
        </p>
        <Link
          href="/playbook"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white hover:text-[color:var(--color-signal-lime)] transition-colors"
        >
          Get the PDF
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

      {/* Slot 3 — Related / Latest posts */}
      {railPosts.length > 0 && (
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#45F0FF",
                boxShadow: "0 0 8px #45F0FF",
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-neon-cyan)]">
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

      {/* Slot 4 — Skool community */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,79,209,0.16) 0%, rgba(138,99,255,0.12) 100%), rgba(9,16,27,0.9)",
          borderColor: "rgba(255,79,209,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-hot-magenta)]">
            Community
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight text-white leading-snug mb-2">
          Build with other builders.
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          Join the Skool community. Ask questions, share builds, learn from
          people shipping real agents.
        </p>
        <a
          href="https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white hover:text-[color:var(--color-hot-magenta)] transition-colors"
        >
          Join Skool
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
        </a>
      </div>

      {/* Slot 5 — Venti Scale (B2B services) */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,140,55,0.14) 0%, rgba(255,79,209,0.08) 100%), rgba(9,16,27,0.92)",
          borderColor: "rgba(255,140,55,0.28)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-signal-orange)]">
            For Businesses
          </span>
        </div>
        <h3 className="text-lg font-black tracking-tight text-white leading-snug mb-2">
          Need this built for your company?
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          We design and ship custom AI automations, social media systems, email
          flows, and agent stacks for businesses that want to move fast.
        </p>
        <a
          href="https://ventiscale.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-white hover:text-[color:var(--color-signal-orange)] transition-colors"
        >
          Venti Scale →
        </a>
      </div>
    </StickyRail>
  );
}
