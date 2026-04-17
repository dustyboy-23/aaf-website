"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GPU_TIER } from "@/lib/constants";
import { useGpuTier } from "@/components/ui/GpuTierProvider";
import { MobileHero } from "@/components/ui/MobileHero";

const NexusScene = dynamic(
  () => import("@/components/three/NexusScene").then((m) => m.NexusScene),
  { ssr: false }
);

export function HeroSection() {
  const gpuTier = useGpuTier();
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const progressRef = useRef(0);
  const setProgress = useCallback((val: number) => {
    progressRef.current = val;
    setScrollProgress(val);
  }, []);

  useEffect(() => {
    if (gpuTier === GPU_TIER.LOW || !heroRef.current) return;

    let cleanup: (() => void) | undefined;

    // Dynamically import GSAP ScrollTrigger to keep it tree-shakeable
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const trigger = ScrollTrigger.create({
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        });

        cleanup = () => {
          trigger.kill();
        };
      });
    });

    return () => {
      cleanup?.();
    };
  }, [gpuTier, setProgress]);

  // Mobile / low GPU fallback
  if (gpuTier === GPU_TIER.LOW) {
    return <MobileHero />;
  }

  return (
    <section ref={heroRef} className="relative min-h-screen">
      {/* 3D scene behind everything */}
      <NexusScene scrollProgress={scrollProgress} />

      {/* Text overlay on top of 3D */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]">
          AI Agents First
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-silver/50">
          news / learn / build / connect
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8 pointer-events-auto">
          <Link
            href="#feed"
            className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-mono text-xs uppercase tracking-widest hover:bg-neon-cyan/20 transition-colors backdrop-blur-sm"
          >
            Enter the nexus
          </Link>
          <Link
            href="/signal"
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-silver font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Latest drops
          </Link>
        </div>
      </div>
    </section>
  );
}
