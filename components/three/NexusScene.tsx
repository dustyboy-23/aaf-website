"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { GPU_TIER } from "@/lib/constants";
import { useGpuTier } from "@/components/ui/GpuTierProvider";
import { NeuralCore } from "./NeuralCore";
import { ParticleField } from "./ParticleField";
import { BackgroundOrbs } from "./BackgroundOrbs";
import { PostProcessingEffects } from "./PostProcessing";

/** Drives camera position based on scroll progress */
function SceneController({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state) => {
    // Pull camera back as user scrolls
    state.camera.position.z = 8 + scrollProgress * 6;
    // Slight downward tilt
    state.camera.position.y = -scrollProgress * 1.5;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function NexusScene({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const gpuTier = useGpuTier();

  if (gpuTier === GPU_TIER.LOW) return null;

  const particleCount = gpuTier === GPU_TIER.HIGH ? 5000 : 2000;
  const enablePostProcessing = gpuTier === GPU_TIER.HIGH;

  // Fade canvas as user scrolls past hero
  const canvasOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ opacity: canvasOpacity }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        <SceneController scrollProgress={scrollProgress} />
        <ambientLight intensity={0.15} />
        <NeuralCore />
        <ParticleField count={particleCount} />
        <BackgroundOrbs />
        {enablePostProcessing && <PostProcessingEffects />}
      </Canvas>
    </div>
  );
}
