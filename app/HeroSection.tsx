"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { GPU_TIER } from "@/lib/constants";
import { useGpuTier } from "@/components/ui/GpuTierProvider";

const GlassOrbCanvas = dynamic(
  () => import("@/components/three/GlassOrbCanvas").then((m) => m.GlassOrbCanvas),
  { ssr: false }
);

export function HeroSection() {
  const gpuTier = useGpuTier();
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const setProgress = useCallback((val: number) => {
    setScrollProgress(val);
  }, []);

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
  }, [setProgress]);

  const fadeOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const show3D = gpuTier !== GPU_TIER.LOW;

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Layer 1: Midjourney hero image */}
      <div className="absolute inset-0 z-0" style={{ opacity: fadeOpacity }}>
        <Image
          src="/hero/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Darken everywhere for text legibility */}
        <div className="absolute inset-0 bg-surface/40" />
        {/* Strong bottom gradient into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
      </div>

      {/* Layer 2: 3D glass orb overlay (desktop GPU only) */}
      {show3D && (
        <div className="absolute inset-0 z-[1]" style={{ opacity: fadeOpacity }}>
          <GlassOrbCanvas />
        </div>
      )}

      {/* Layer 3: Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
          AI Agents First
        </h1>
        <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-md">
          The intelligence hub for the agent era.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8 pointer-events-auto">
          <Link
            href="#feed"
            className="px-7 py-3 rounded-lg bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Read the feed
          </Link>
          <Link
            href="/signal"
            className="px-7 py-3 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-border-hover hover:bg-surface-overlay transition-colors"
          >
            Daily signal
          </Link>
        </div>
      </div>
    </section>
  );
}
