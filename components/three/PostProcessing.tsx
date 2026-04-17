"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Vector2 } from "three";

/**
 * Post-processing stack for the hero.
 *
 * Bloom uses luminanceThreshold 0.85 so only HDR-emissive materials
 * (cores, rings, pulse heads, mote sparks) bleed light — not every bright
 * DOM pixel visible on screen. Materials that should bloom MUST set
 * `toneMapped: false` so their HDR colors survive the bloom pass.
 */
export function PostProcessingEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
        mipmapBlur
        kernelSize={KernelSize.LARGE}
      />
      <ChromaticAberration
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation
        modulationOffset={0.25}
      />
      <Vignette
        offset={0.35}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
