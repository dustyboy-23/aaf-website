"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildVeinGeometry, veinRadiusProfile } from "./veinGeometry";

interface NeuralBranchProps {
  points: THREE.Vector3[];
  color: string;
  brightness?: number;
  /** Deterministic per-fiber index — seeds the organic thickness bumps */
  index?: number;
  /** Fatten or slim the whole vein — used to differentiate fibers in a bundle */
  radiusScale?: number;
}

/**
 * Single fiber in a vein bundle.
 *
 * Step 3: emissive was dominating the look, drowning out the specular
 * highlights that make the reference read as real glass fiber. Flipped the
 * ratio — emissive is now a whisper, specular (via envMap) + anisotropy does
 * the visual work.
 *
 * Anisotropy gives the streaky hair/silk sheen you see running along each
 * fiber in the reference; without it, thin glass tubes look like wet spaghetti.
 * envMapIntensity is boosted so the HDR environment lights actually show up
 * against the pitch-black scene.
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
    // Fewer segments per fiber — we have 8x the fiber count now, so budget
    // each one leaner. 100×8 per fiber × 8 fibers × 6 branches ≈ 38k verts
    // vs the old 160×20 single tube × 6 branches ≈ 19k. Doubles the vert
    // count but the perceptual payoff (multi-strand look) is huge.
    return buildVeinGeometry(curve, 100, 8, radiusFn);
  }, [points, index, radiusScale]);

  // Smoothly ease emissive intensity on hover transitions. Target stays low
  // so specular highlights from the HDR environment read cleanly.
  useFrame(() => {
    if (!matRef.current) return;
    const target = 0.25 * brightness;
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
        emissiveIntensity={0.25}
        transmission={0.85}
        thickness={0.12}
        ior={1.45}
        roughness={0.05}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.08}
        attenuationColor={colorObj}
        attenuationDistance={0.6}
        anisotropy={0.9}
        anisotropyRotation={0}
        envMapIntensity={1.8}
        transparent
        opacity={0.88}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
