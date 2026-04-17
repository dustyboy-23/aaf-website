import Link from "next/link";

export function NewsletterCTA() {
  return (
    <section className="newsletter-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
          Stay Sharp
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-white max-w-2xl mx-auto leading-tight">
          AI moves fast. We decode it daily.
        </h2>
        <p className="mt-4 text-text-secondary max-w-md mx-auto">
          Get the signal, not the noise. One read per day with the sharpest
          insights from the AI agent frontier.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signal"
            className="px-8 py-3 rounded-lg bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Get the daily signal
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            Free daily briefing
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            Tool recommendations
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            Unsubscribe anytime
          </span>
        </div>
      </div>
    </section>
  );
}
