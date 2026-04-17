"use client";

import { Canvas } from "@react-three/fiber";
import { GlassOrb } from "./GlassOrb";

export function GlassOrbCanvas() {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
    >
      <GlassOrb />
    </Canvas>
  );
}
