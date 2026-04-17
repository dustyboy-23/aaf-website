"use client";

import { useState } from "react";
import { colors } from "@/lib/constants";

/**
 * Daily Signal CTA — full-bleed newsletter capture.
 *
 * Email form posts to /api/subscribe which persists to a local JSON file
 * until a real provider is wired (Brevo is banned; ConvertKit / Buttondown /
 * Loops are the shortlist — decision pending).
 *
 * The design intent is "one decision": no privacy disclaimers, no feature
 * lists, no testimonials. Email field + button. The line above promises
 * what they get; the line below promises how often.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "pending") return;
    setStatus("pending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage_cta" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage("You're in. Check your inbox tomorrow morning.");
      setEmail("");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Try again in a sec");
    }
  }

  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      aria-label="Subscribe to the daily signal"
    >
      {/* Ambient glow — cyan/violet bloom behind the CTA to mirror the hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 700px 400px at 50% 50%, ${colors.neonCyan}12 0%, transparent 65%),
            radial-gradient(ellipse 500px 300px at 30% 100%, ${colors.ultraviolet}15 0%, transparent 70%),
            radial-gradient(ellipse 500px 300px at 70% 0%, ${colors.hotMagenta}08 0%, transparent 70%)
          `,
        }}
      />
      {/* Top/bottom dividers */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(69,240,255,0.3), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(138,99,255,0.2), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{
              backgroundColor: colors.neonCyan,
              boxShadow: `0 0 12px ${colors.neonCyan}`,
            }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: colors.neonCyan }}
          >
            The Daily Signal
          </span>
        </div>

        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-0.045em] leading-[0.95] text-white">
          <span
            className="inline-block"
            style={{
              textShadow:
                "0 0 40px rgba(69,240,255,0.25), 0 0 80px rgba(138,99,255,0.15)",
            }}
          >
            One email.
            <br />
            Every morning.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          The sharpest signal from the AI agent frontier, distilled into a
          three-minute read. No recycled hot takes, no listicle farms.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-md mx-auto"
          noValidate
        >
          <div
            className="flex items-center gap-2 glass-panel p-1.5"
            style={{ borderColor: `${colors.neonCyan}30` }}
          >
            <input
              type="email"
              required
              placeholder="you@your-domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "pending" || status === "ok"}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "pending" || status === "ok"}
              className="px-6 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${colors.neonCyan} 0%, ${colors.ultraviolet} 100%)`,
                boxShadow: `0 0 20px ${colors.neonCyan}30`,
              }}
            >
              {status === "pending" ? "Locking in…" : status === "ok" ? "In ✓" : "Subscribe"}
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-sm font-mono ${
                status === "ok" ? "text-[color:var(--color-acid-teal)]" : "text-[color:var(--color-hot-magenta)]"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span>Ships daily</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>Unsubscribe anytime</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>Built for builders</span>
        </div>
      </div>
    </section>
  );
}
