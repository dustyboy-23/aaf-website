import { GPU_TIER, type GpuTier } from "./constants";

export function detectGpuTier(): GpuTier {
  if (typeof window === "undefined") return GPU_TIER.LOW;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) return GPU_TIER.LOW;

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return GPU_TIER.LOW;

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = gl
      .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      .toLowerCase();
    if (/nvidia|geforce|radeon rx|apple m[1-9]|apple gpu/i.test(renderer))
      return GPU_TIER.HIGH;
    if (/intel.*hd|intel.*uhd|mali-4|adreno [1-3]/i.test(renderer))
      return GPU_TIER.LOW;
  }

  return GPU_TIER.MEDIUM;
}
