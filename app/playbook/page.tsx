import type { Metadata } from "next";
import Image from "next/image";
import { LeadMagnetForm } from "@/components/ui/LeadMagnetForm";
import { colors } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Build Your First AI Agent — The AAF Executive Playbook",
  description:
    "The free 11-page playbook for designing, building, and deploying your first working AI agent. Role, stack, system prompt, tools, memory, triggers, guardrails.",
  openGraph: {
    title: "Build Your First AI Agent — The AAF Executive Playbook",
    description:
      "The free 11-page playbook for designing, building, and deploying your first working AI agent.",
    images: ["/lead-magnet/cover.png"],
  },
};

const VALUE_PROPS = [
  {
    tag: "Role",
    copy: "Define the role, not the task. Tasks are brittle; roles scale.",
  },
  {
    tag: "Stack",
    copy: "Claude Desktop + MCP, Custom GPTs, n8n, Agents SDK. When to use each.",
  },
  {
    tag: "Prompt",
    copy: "The system prompt template used by teams shipping AI in production.",
  },
  {
    tag: "Tools",
    copy: "Connect the three tools that turn a chatbot into an actual agent.",
  },
  {
    tag: "Memory",
    copy: "Three context layers that compound so the agent sharpens every week.",
  },
  {
    tag: "Deploy",
    copy: "Manual, scheduled, and event triggers with the guardrails you need first.",
  },
];

export default function PlaybookPage() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: colors.void }}
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 50% 0%, ${colors.ultraviolet}18 0%, transparent 60%),
            radial-gradient(ellipse 700px 400px at 80% 30%, ${colors.signalLime}0a 0%, transparent 70%),
            radial-gradient(ellipse 600px 400px at 20% 60%, ${colors.neonCyan}0c 0%, transparent 70%)
          `,
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-24 pb-32">
        {/* Hero — two-column split */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy + form */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: colors.signalLime,
                  boxShadow: `0 0 12px ${colors.signalLime}`,
                }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: colors.signalLime }}
              >
                Free Executive Playbook
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-black tracking-[-0.035em] leading-[1] text-white">
              The playbook for your{" "}
              <span
                className="inline-block"
                style={{
                  background: `linear-gradient(135deg, ${colors.neonCyan} 0%, ${colors.ultraviolet} 60%, ${colors.hotMagenta} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                first real agent
              </span>
              .
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/65 max-w-xl leading-relaxed">
              Eleven pages. Seven decisions. The exact framework teams use to
              ship agents that do real work. Not chatbots. Not prompts. Not
              demos.
            </p>

            <LeadMagnetForm />
          </div>

          {/* Right — single cover mockup */}
          <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[360px] lg:max-w-none">
            {/* Atmospheric glow behind the cover */}
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[2rem] pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, ${colors.neonCyan}30 0%, transparent 55%),
                  radial-gradient(ellipse at 70% 80%, ${colors.ultraviolet}35 0%, transparent 55%)
                `,
                filter: "blur(24px)",
              }}
            />
            <div
              className="relative aspect-[8.5/11] rounded-2xl overflow-hidden border"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: `0 30px 90px ${colors.ultraviolet}40, 0 10px 40px rgba(0,0,0,0.6)`,
                transform: "perspective(1400px) rotateY(-6deg) rotateX(2deg)",
              }}
            >
              <Image
                src="/lead-magnet/cover.png"
                alt="Cover of Build Your First AI Agent — the AAF Executive Playbook"
                fill
                sizes="(max-width: 1024px) 360px, 500px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: colors.neonCyan }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: colors.neonCyan }}
              >
                What&apos;s inside
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Seven decisions.{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${colors.neonCyan} 0%, ${colors.ultraviolet} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One working agent.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.tag}
                className="glass-panel rounded-xl p-6"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                  style={{ color: colors.signalLime }}
                >
                  {vp.tag}
                </div>
                <p className="text-sm text-white/75 leading-relaxed">
                  {vp.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="mt-28 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-6">
            Written for operators, not hobbyists.
          </h3>
          <p className="text-base sm:text-lg text-white/65 leading-relaxed">
            Founders putting an AI hire on their team. Creators offloading the
            repetitive half of their stack. Operators running pipelines that
            should have been automated last quarter. The playbook skips the
            hype, names the tradeoffs, and hands you the exact patterns that
            work in production.
          </p>
        </section>

        {/* Second CTA */}
        <section className="mt-28 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">
            Get the playbook.
          </h3>
          <p className="text-sm text-white/60 mb-2">
            Free. No upsell. The daily signal newsletter comes with it.
          </p>
          <LeadMagnetForm />
        </section>
      </main>
    </div>
  );
}
