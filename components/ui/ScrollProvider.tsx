"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import { GPU_TIER } from "@/lib/constants";
import { useGpuTier } from "./GpuTierProvider";

const ScrollContext = createContext<Lenis | null>(null);

export function useScroll() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const gpuTier = useGpuTier();

  useEffect(() => {
    if (gpuTier === GPU_TIER.LOW) return;

    let cleanup: (() => void) | undefined;

    import("@/lib/scroll").then(({ initScroll, destroyScroll }) => {
      lenisRef.current = initScroll();
      cleanup = () => {
        destroyScroll();
        lenisRef.current = null;
      };
    });

    return () => {
      cleanup?.();
    };
  }, [gpuTier]);

  return (
    <ScrollContext.Provider value={lenisRef.current}>
      {children}
    </ScrollContext.Provider>
  );
}
