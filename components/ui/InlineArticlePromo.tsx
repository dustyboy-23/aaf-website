import Link from "next/link";

type PromoKind = "newsletter" | "venti" | "skool";

interface InlineArticlePromoProps {
  kind: PromoKind;
}

/**
 * Mid-article promo block. Inserted into the article HTML after the 2nd <h2>
 * so it lives inside the reader's scroll path — not skimmable like the side
 * rail was. Category-matched per post:
 *   - coding tools / business-ops posts → Venti Scale
 *   - beginner / how-to / community posts → Skool
 *   - frontier / news / signal posts → Newsletter
 */
export function InlineArticlePromo({ kind }: InlineArticlePromoProps) {
  if (kind === "venti") {
    return (
      <div
        className="not-prose my-10 rounded-2xl p-6 sm:p-7 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,140,55,0.14) 0%, rgba(255,79,209,0.1) 100%), rgba(9,16,27,0.92)",
          borderColor: "rgba(255,140,55,0.3)",
        }}
      >
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-signal-orange)] mb-2">
              For Businesses
            </span>
            <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug mb-2">
              Want this built for your company — not just to read about?
            </h4>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Venti Scale designs and ships custom AI automations, social media
              systems, and agent stacks for businesses. No DIY guides, no
              templates — real infrastructure, shipped.
            </p>
          </div>
          <a
            href="https://ventiscale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FF8C37 0%, #FF4FD1 100%)",
              boxShadow:
                "0 0 18px rgba(255,140,55,0.35), 0 0 36px rgba(255,79,209,0.2)",
            }}
          >
            See Venti Scale →
          </a>
        </div>
      </div>
    );
  }

  if (kind === "skool") {
    return (
      <div
        className="not-prose my-10 rounded-2xl p-6 sm:p-7 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,79,209,0.16) 0%, rgba(138,99,255,0.12) 100%), rgba(9,16,27,0.9)",
          borderColor: "rgba(255,79,209,0.32)",
        }}
      >
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[color:var(--color-hot-magenta)] mb-2">
              Community
            </span>
            <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug mb-2">
              Stop building alone.
            </h4>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Join the Skool community. Ask questions, share what you&apos;re
              building, and learn from other people actually shipping AI
              agents.
            </p>
          </div>
          <a
            href="/go/site"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FF4FD1 0%, #8A63FF 100%)",
              boxShadow:
                "0 0 18px rgba(255,79,209,0.35), 0 0 36px rgba(138,99,255,0.2)",
            }}
          >
            Join Skool →
          </a>
        </div>
      </div>
    );
  }

  // newsletter (default)
  return (
    <div
      className="not-prose my-10 rounded-2xl p-6 sm:p-7 border"
      style={{
        background:
          "linear-gradient(135deg, rgba(138,99,255,0.2) 0%, rgba(69,240,255,0.14) 100%), rgba(9,16,27,0.9)",
        borderColor: "rgba(138,99,255,0.4)",
      }}
    >
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
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
          <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug mb-2">
            Get the daily AI agent signal in your inbox.
          </h4>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            One email, every morning. The builds, tools, and frontier research
            that matter — no fluff, no AI hype cycle noise.
          </p>
        </div>
        <Link
          href="/#newsletter"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
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
  );
}

/**
 * Picks the best inline promo for a post based on its primary tag slug.
 * Ops/coding/business → Venti. Beginner/community → Skool. Default → Newsletter.
 */
export function pickPromoKind(primaryTagSlug?: string | null): PromoKind {
  if (!primaryTagSlug) return "newsletter";
  const slug = primaryTagSlug.toLowerCase();

  // Business/ops/coding/money lanes → Venti Scale
  if (
    /(tool|review|compar|coding|code|dev|ops|automation|workflow|business|money|enterprise|infra|stack|saas|build|client|agenc)/.test(
      slug,
    )
  ) {
    return "venti";
  }

  // Community/beginner/how-to lanes → Skool
  if (
    /(beginner|intro|guide|tutorial|learn|communit|how-to|basic)/.test(slug)
  ) {
    return "skool";
  }

  return "newsletter";
}
