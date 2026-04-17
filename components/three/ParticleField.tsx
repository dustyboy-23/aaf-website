"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/constants";
import { particleVertexShader, particleFragmentShader } from "./shaders";

/**
 * Atmospheric particle field — "data dust" around the neural core.
 *
 * Each particle gets a deterministic color index (0/1/2) mapped to one of
 * three palette hues in the fragment shader, so the field reads as three
 * overlapping constellations instead of a single uniform cyan fog.
 *
 * Cursor repulsion stays — it's the one piece of "you moved something"
 * feedback before the user reaches the hover affordances on the branches.
 */
export function ParticleField({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { pointer } = useThree();

  const { positions, lifes, sizes, velocities, colorIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const life = new Float32Array(count);
    const size = new Float32Array(count);
    const vel = new Float32Array(count * 3);
    const cidx = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Positions in a sphere, slightly flattened along z so the field
      // reads as a disc that wraps the core rather than a ball of fog.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 6.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.6;

      life[i] = Math.random();
      // Bimodal size distribution — mostly small dust, rare bright specks
      size[i] = Math.random() < 0.12 ? 3.5 + Math.random() * 3 : 1.2 + Math.random() * 1.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      cidx[i] = Math.random(); // 0..1, shader splits on 0.333/0.666
    }

    return { positions: pos, lifes: life, sizes: size, velocities: vel, colorIndices: cidx };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: typeof window !== "undefined" ? window.devicePixelRatio : 1 },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colors.neonCyan) },
      uColorB: { value: new THREE.Color(colors.ultraviolet) },
      uColorC: { value: new THREE.Color(colors.hotMagenta) },
    }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = t;

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const lifeAttr = pointsRef.current.geometry.getAttribute("aLife") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const lifeArray = lifeAttr.array as Float32Array;

    const mouseX = pointer.x * 5;
    const mouseY = pointer.y * 5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      lifeArray[i] += 0.001 + Math.random() * 0.001;

      if (lifeArray[i] > 1.0) {
        lifeArray[i] = 0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.random() * 6.5;
        posArray[i3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = r * Math.cos(phi) * 0.6;
        continue;
      }

      // Drift
      posArray[i3] += Math.sin(t * 0.3 + i * 0.1) * 0.001 + velocities[i3];
      posArray[i3 + 1] += Math.cos(t * 0.2 + i * 0.07) * 0.001 + velocities[i3 + 1];
      posArray[i3 + 2] += Math.sin(t * 0.25 + i * 0.13) * 0.001 + velocities[i3 + 2];

      // Cursor repulsion
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const distSq = dx * dx + dy * dy;
      if (distSq < 4) {
        const force = (1 - distSq / 4) * 0.02;
        const dist = Math.sqrt(distSq) || 0.001;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }
    }

    posAttr.needsUpdate = true;
    lifeAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aLife" args={[lifes, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aColorIndex" args={[colorIndices, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
