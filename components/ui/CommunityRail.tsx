import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/constants";

/**
 * Community rail — replaces FinalCTA with a "join the network" section.
 *
 * Four off-site distribution nodes (X / LinkedIn / YouTube / Discord) +
 * an author block. Reads as the human node at the end of the conscious
 * network: the nexus has a person behind it.
 *
 * Follower counts are hard-coded for now because we're not wiring live
 * social APIs on the homepage. Update these when milestones are hit —
 * honesty > vanity, so keep the numbers truthful or omit them.
 */

type Channel = {
  key: string;
  label: string;
  handle: string;
  description: string;
  href: string;
  color: string;
  icon: React.ReactNode;
};

const CHANNELS: Channel[] = [
  {
    key: "x",
    label: "X",
    handle: "@aiagentsfirst",
    description: "Live commentary + dispatches",
    href: "https://x.com/aiagentsfirst",
    color: colors.neonCyan,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2H21l-6.52 7.449L22 22h-6.715l-5.26-6.873L3.878 22H1.12l6.978-7.98L1 2h6.875l4.755 6.289L18.244 2Zm-1.173 18h1.832L7.03 4h-1.95l11.99 16Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "/company/aiagentsfirst",
    description: "Long-form, builder network",
    href: "https://linkedin.com/company/aiagentsfirst",
    color: colors.electricBlue,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.45C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "@aiagentsfirst",
    description: "Build walkthroughs, architecture decodes",
    href: "https://youtube.com/@aiagentsfirst",
    color: colors.hotMagenta,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.8 2.6 12 2.6 12 2.6s-4.8 0-8.2.3c-.5 0-1.5.1-2.4 1C.7 4.6.5 6.2.5 6.2S.3 8.1.3 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.7 1 1.9.2 8.1.3 8.1.3s4.8 0 8.2-.3c.5 0 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8ZM9.7 14V7.4l6.2 3.3-6.2 3.3Z" />
      </svg>
    ),
  },
  {
    key: "discord",
    label: "Discord",
    handle: "/aiagentsfirst",
    description: "Builder community, live Q&A",
    href: "https://discord.gg/aiagentsfirst",
    color: colors.ultraviolet,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.683 12.683 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.736 19.736 0 0 0-4.885 1.515a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.197.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.771 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.84 19.84 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
];

export function CommunityRail() {
  return (
    <section className="relative py-24 sm:py-28" aria-label="Community">
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: colors.hotMagenta,
              boxShadow: `0 0 10px ${colors.hotMagenta}`,
            }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: colors.hotMagenta }}
          >
            The Builder Network
          </span>
        </div>

        <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.035em] leading-[1.05] text-white max-w-3xl">
          Find us where the builders are.
        </h2>
        <p className="mt-4 text-white/55 max-w-xl">
          Four nodes. One network. Pick your channel or get all of them in the
          daily signal above.
        </p>

        {/* Channel grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((ch) => (
            <Link
              key={ch.key}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-panel p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${ch.color}25` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: `${ch.color}15`,
                    color: ch.color,
                    boxShadow: `inset 0 0 0 1px ${ch.color}30`,
                  }}
                >
                  <div className="w-5 h-5">{ch.icon}</div>
                </span>
                <div>
                  <div className="text-sm font-bold text-white">{ch.label}</div>
                  <div className="font-mono text-[10px] text-white/40">
                    {ch.handle}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">
                {ch.description}
              </p>
              <div
                className="mt-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] font-semibold opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color: ch.color }}
              >
                Follow
                <svg
                  className="h-2.5 w-2.5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 6h8M7 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Author block */}
        <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          <Image
            src="/dusty.jpg"
            alt="Dustin Gilmour"
            width={80}
            height={80}
            className="rounded-full"
            style={{
              border: `1px solid ${colors.neonCyan}30`,
              boxShadow: `0 0 20px ${colors.neonCyan}15`,
            }}
          />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
              Built by
            </div>
            <h3 className="text-xl font-bold text-white">
              Dustin Gilmour
            </h3>
            <p className="mt-3 text-white/60 leading-relaxed max-w-2xl">
              Building AI Agents First from the BC coast. Operator, builder,
              occasional trader. Running this whole stack myself — agents,
              content, code — so everything you see here ships from the same
              brain it came from.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
