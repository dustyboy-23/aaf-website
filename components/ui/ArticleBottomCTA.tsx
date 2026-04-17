import Link from "next/link";

/**
 * Full-bleed newsletter CTA that sits between the article body and the
 * related-posts grid. This is the last big swing at conversion before the
 * reader leaves the page.
 */
export function ArticleBottomCTA() {
  return (
    <section className="relative border-t border-white/10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(138,99,255,0.25), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(69,240,255,0.2), transparent 60%), linear-gradient(180deg, rgba(9,16,27,0.6), rgba(4,5,10,0.95))",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-8 py-20 lg:py-28 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: "#45F0FF",
              boxShadow: "0 0 10px #45F0FF",
            }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] font-bold text-[color:var(--color-neon-cyan)]">
            AI Agents First
          </span>
        </div>
        <h2
          className="text-[clamp(2rem,4.5vw,3.75rem)] font-black tracking-[-0.03em] leading-[1.02] text-white max-w-3xl mx-auto mb-5"
          style={{
            textShadow:
              "0 2px 24px rgba(0,0,0,0.6), 0 0 60px rgba(138,99,255,0.3)",
          }}
        >
          The daily signal from the frontier of AI agents.
        </h2>
        <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">
          Join builders, founders, and researchers getting the sharpest one-email
          read on what&apos;s actually shipping in AI — every morning.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
              boxShadow:
                "0 0 24px rgba(69,240,255,0.45), 0 0 56px rgba(138,99,255,0.3)",
            }}
          >
            Subscribe free
          </Link>
          <a
            href="https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors"
          >
            Join the community
          </a>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          No spam — unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
