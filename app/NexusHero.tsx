"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Lazy-load the heavy 3D scene so the hero copy paints first and the canvas
// streams in after. Keeps initial route shell small and matches the brief's
// "one immersive hero, not a 3D everything-site" principle.
const NexusScene = lazy(() =>
  import("@/components/three/NexusScene").then((m) => ({ default: m.NexusScene })),
);

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

  // Overlay fades out slightly faster than the canvas so the 3D scene becomes
  // the star as the user scrolls toward the feed.
  const copyOpacity = Math.max(0, 1 - scrollProgress * 1.8);

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] min-h-[640px] overflow-hidden"
      aria-label="AI Agents First — living neural nexus"
    >
      {/* Layered void backdrop — multiple radial washes create atmospheric
          depth even before the 3D canvas paints. Order matters: deepest
          purple wash first, then cooler cyan halo off-center, then an
          off-axis violet rim so the frame feels lit from above. Without
          these layers the scene clips against a flat black and kills the
          sense of infinite space the nexus needs. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 80% at 50% 55%, rgba(20,11,33,0.95) 0%, rgba(9,16,27,0.98) 45%, #04050A 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(69,240,255,0.10) 0%, rgba(138,99,255,0.06) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 45% 35% at 18% 18%, rgba(138,99,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 85% 85%, rgba(255,79,209,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Sub-pixel star field — tiny white dots at low opacity for depth parallax */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.7), transparent 60%)," +
              "radial-gradient(1px 1px at 27% 68%, rgba(255,255,255,0.55), transparent 60%)," +
              "radial-gradient(1px 1px at 41% 14%, rgba(255,255,255,0.65), transparent 60%)," +
              "radial-gradient(1px 1px at 58% 55%, rgba(255,255,255,0.4), transparent 60%)," +
              "radial-gradient(1px 1px at 72% 82%, rgba(255,255,255,0.6), transparent 60%)," +
              "radial-gradient(1px 1px at 83% 33%, rgba(255,255,255,0.75), transparent 60%)," +
              "radial-gradient(1px 1px at 91% 71%, rgba(255,255,255,0.5), transparent 60%)," +
              "radial-gradient(1px 1px at 7% 81%, rgba(255,255,255,0.55), transparent 60%)",
          }}
        />
        {/* Top / bottom edge falloff so the hero bleeds into the sections below */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #04050A)",
          }}
        />
      </div>

      {/* 3D scene, streamed in after hydration */}
      <Suspense fallback={null}>
        <NexusScene scrollProgress={scrollProgress} />
      </Suspense>

      {/* DOM overlay — pointer-events off by default so the canvas catches hover,
          re-enabled on the CTA buttons. Keeps the copy legible over the nexus. */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
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
                "0 0 40px rgba(69,240,255,0.35), 0 0 80px rgba(138,99,255,0.25)",
            }}
          >
            AI Agents First
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[color:var(--color-text-secondary)] max-w-xl leading-relaxed">
          A living network of news, builds, tools, and deep analysis from the
          AI agent frontier.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-10 pointer-events-auto">
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
