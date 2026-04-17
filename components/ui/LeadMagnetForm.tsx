"use client";

import { useState } from "react";
import { colors } from "@/lib/constants";

const PDF_URL = "/downloads/build-your-first-ai-agent.pdf";

/**
 * Email-gated lead magnet form. Captures email via /api/subscribe,
 * then triggers the PDF download on success and locks into a thank-you state.
 *
 * Source tag: "lead_magnet_playbook" so we can segment these subs from
 * homepage CTA signups when we wire the real provider.
 */
export function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "pending" || status === "ok") return;
    setStatus("pending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead_magnet_playbook" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage("Sent. Your download is starting.");

      // Auto-trigger the PDF download
      const a = document.createElement("a");
      a.href = PDF_URL;
      a.download = "Build-Your-First-AI-Agent.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Try again in a sec");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-10 max-w-md mx-auto text-center">
        <div
          className="glass-panel p-8 rounded-2xl"
          style={{ borderColor: `${colors.signalLime}40` }}
        >
          <div
            className="inline-flex items-center justify-center h-12 w-12 rounded-full mb-4"
            style={{
              background: `${colors.signalLime}18`,
              boxShadow: `0 0 24px ${colors.signalLime}30`,
            }}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.signalLime}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-white mb-2">
            Your download is on the way.
          </h3>
          <p className="text-sm text-white/65 leading-relaxed">
            If it didn&apos;t start automatically,{" "}
            <a
              href={PDF_URL}
              className="underline font-semibold"
              style={{ color: colors.signalLime }}
            >
              click here
            </a>
            . Watch your inbox tomorrow for the daily signal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto" noValidate>
      <div
        className="flex items-center gap-2 glass-panel p-1.5"
        style={{ borderColor: `${colors.signalLime}40` }}
      >
        <input
          type="email"
          required
          placeholder="you@your-domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "pending"}
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="px-6 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${colors.signalLime} 0%, ${colors.neonCyan} 100%)`,
            boxShadow: `0 0 20px ${colors.signalLime}35`,
          }}
        >
          {status === "pending" ? "Sending…" : "Send me the PDF"}
        </button>
      </div>

      {message && status === "err" && (
        <p className="mt-4 text-sm font-mono text-[color:var(--color-hot-magenta)]">
          {message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
        <span>Instant download</span>
        <span className="text-white/20">·</span>
        <span>Daily signal included</span>
        <span className="text-white/20">·</span>
        <span>Unsubscribe anytime</span>
      </div>
    </form>
  );
}
