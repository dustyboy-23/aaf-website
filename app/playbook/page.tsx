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

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-32">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
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

        {/* Hero headline */}
        <h1 className="text-center text-[clamp(2.75rem,6.5vw,5.25rem)] font-black tracking-[-0.045em] leading-[0.95] text-white max-w-4xl mx-auto">
          Build your first{" "}
          <span
            className="inline-block"
            style={{
              background: `linear-gradient(135deg, ${colors.neonCyan} 0%, ${colors.ultraviolet} 60%, ${colors.hotMagenta} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI agent
          </span>
          .
        </h1>

        <p className="mt-8 text-center text-base sm:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
          The 11-page executive playbook for designing, building, and deploying
          your first working AI agent. Not a chatbot. Not a prompt. A system
          that does real work on your behalf.
        </p>

        {/* Email form */}
        <LeadMagnetForm />

        {/* Hero mockups */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            className="relative aspect-[8.5/11] rounded-2xl overflow-hidden border"
            style={{
              borderColor: `${colors.signalLime}25`,
              boxShadow: `0 20px 80px ${colors.ultraviolet}35, 0 0 40px ${colors.neonCyan}15`,
            }}
          >
            <Image
              src="/lead-magnet/cover.png"
              alt="Cover of Build Your First AI Agent playbook"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>
          <div
            className="relative aspect-[8.5/11] rounded-2xl overflow-hidden border hidden md:block"
            style={{
              borderColor: `${colors.neonCyan}25`,
              boxShadow: `0 20px 80px ${colors.hotMagenta}25, 0 0 40px ${colors.ultraviolet}20`,
            }}
          >
            <Image
              src="/lead-magnet/step.png"
              alt="Interior step page from the playbook"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

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
