"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero — static cinematic AI nexus image + gradient washes + copy overlay.
 *
 * The earlier 3D R3F scene was broken (hydration + blank screen) and time to
 * iterate it to production quality was outpacing the yield. Switched to a
 * hand-picked Midjourney reference as a static background — same vibe, zero
 * fragility, ships instantly. Subtle scroll-driven scale-up (ken-burns) keeps
 * it from reading as a flat image.
 */
export function NexusHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!heroRef.current) return;
    let cleanup: (() => void) | undefined;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const trigger = ScrollTrigger.create({
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => setScrollProgress(self.progress),
        });
        cleanup = () => trigger.kill();
      });
    });
    return () => cleanup?.();
  }, []);

  // Copy fades as user scrolls, image drifts slightly for parallax depth
  const copyOpacity = Math.max(0, 1 - scrollProgress * 1.8);
  const imageScale = 1 + scrollProgress * 0.08;
  const imageY = scrollProgress * 40;

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] min-h-[640px] overflow-hidden bg-[#04050A]"
      aria-label="AI Agents First"
    >
      {/* Hero image — the AI nexus core. Slight scale + translate for parallax
          so it feels alive on scroll without demanding a 3D canvas. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `scale(${imageScale}) translateY(${imageY}px)`,
          transformOrigin: "center 40%",
          willChange: "transform",
        }}
        aria-hidden
      >
        <Image
          src="/hero-nexus.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.88 }}
        />
      </div>

      {/* Darkening + tint washes so the white headline stays legible against
          the bright core, and so the section edges blend into the void below. */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(4,5,10,0) 0%, rgba(4,5,10,0.55) 65%, rgba(4,5,10,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-color opacity-35"
          style={{
            background:
              "linear-gradient(135deg, rgba(69,240,255,0.18) 0%, rgba(138,99,255,0.25) 60%, rgba(255,79,209,0.15) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent, #04050A)",
          }}
        />
      </div>

      {/* Copy overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
        style={{ opacity: copyOpacity }}
      >
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[color:var(--color-neon-cyan)] mb-5">
          The Intelligence Hub
        </p>
        <h1 className="text-[clamp(2.75rem,8vw,6rem)] font-black tracking-[-0.045em] leading-[0.92] text-white">
          <span
            className="inline-block"
            style={{
              textShadow:
                "0 0 40px rgba(69,240,255,0.45), 0 0 90px rgba(138,99,255,0.35)",
            }}
          >
            AI Agents First
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[color:var(--color-text-secondary)] max-w-xl leading-relaxed">
          A living network of news, builds, tools, and deep analysis from the
          AI agent frontier.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Link
            href="#featured"
            className="px-7 py-3 rounded-full font-semibold text-sm text-[#04050A] transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #45F0FF 0%, #8A63FF 100%)",
              boxShadow:
                "0 0 24px rgba(69,240,255,0.35), 0 0 48px rgba(138,99,255,0.25)",
            }}
          >
            Explore the network
          </Link>
          <Link
            href="/signal"
            className="px-7 py-3 rounded-full text-sm font-medium text-white glass-panel transition-colors hover:text-[color:var(--color-neon-cyan)]"
            style={{ borderRadius: 9999 }}
          >
            Daily signal
          </Link>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-text-secondary)]"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
        >
          Scroll to descend
        </div>
      </div>
    </section>
  );
}
