"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function PostProcessingEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.2}
        mipmapBlur
        luminanceSmoothing={0.9}
      />
      <ChromaticAberration
        offset={new Vector2(0.0006, 0.0006)}
        radialModulation
        modulationOffset={0.15}
      />
      <Noise
        opacity={0.03}
        blendFunction={BlendFunction.ADD}
      />
    </EffectComposer>
  );
}
