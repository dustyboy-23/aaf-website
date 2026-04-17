"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildVeinGeometry, veinRadiusProfile } from "./veinGeometry";

interface NeuralBranchProps {
  points: THREE.Vector3[];
  color: string;
  brightness?: number;
  /** Deterministic per-branch index — seeds the organic thickness bumps */
  index?: number;
  /** Fatten or slim the whole vein — used to differentiate branches */
  radiusScale?: number;
}

/**
 * Step 1 + 2 of the vein rebuild.
 *
 * Material: plain `meshPhysicalMaterial` with partial transmission. Not
 * drei's MeshTransmissionMaterial — that one samples a back-buffer and
 * rendered black against our near-void scene. Plain physical with
 * emissive carries the glow without the extra render pass.
 *
 * Shape: custom `buildVeinGeometry` with a radius profile that tapers
 * from thick (core) to thin (tip) with organic sine-wave swells. Ends
 * the "perfect tube" look from step 1.
 */
export function NeuralBranch({
  points,
  color,
  brightness = 1,
  index = 0,
  radiusScale = 1,
}: NeuralBranchProps) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
    const radiusFn = veinRadiusProfile(
      0.13 * radiusScale, // core end
      0.045 * radiusScale, // tip end
      index,
    );
    return buildVeinGeometry(curve, 160, 20, radiusFn);
  }, [points, index, radiusScale]);

  // Smoothly ease emissive intensity on hover transitions
  useFrame(() => {
    if (!matRef.current) return;
    const target = 0.8 * brightness;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      target,
      0.08,
    );
  });

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        ref={matRef}
        color={colorObj}
        emissive={colorObj}
        emissiveIntensity={0.8}
        transmission={0.65}
        thickness={0.4}
        ior={1.42}
        roughness={0.12}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.12}
        attenuationColor={colorObj}
        attenuationDistance={0.8}
        transparent
        opacity={0.9}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
