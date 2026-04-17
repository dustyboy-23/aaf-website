"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { GPU_TIER, type GpuTier } from "@/lib/constants";
import { detectGpuTier } from "@/lib/gpu";

const GpuTierContext = createContext<GpuTier>(GPU_TIER.LOW);

export function useGpuTier() {
  return useContext(GpuTierContext);
}

export function GpuTierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<GpuTier>(GPU_TIER.LOW);

  useEffect(() => {
    setTier(detectGpuTier());
  }, []);

  return (
    <GpuTierContext.Provider value={tier}>{children}</GpuTierContext.Provider>
  );
}
