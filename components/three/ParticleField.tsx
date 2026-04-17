"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "./shaders";

export function ParticleField({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { pointer } = useThree();

  const { positions, lifes, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const life = new Float32Array(count);
    const size = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 6;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      life[i] = Math.random();
      size[i] = 2 + Math.random() * 4;

      // Small random velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions: pos, lifes: life, sizes: size, velocities: vel };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: typeof window !== "undefined" ? window.devicePixelRatio : 1 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#06b6d4") },
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

      // Advance life
      lifeArray[i] += 0.001 + Math.random() * 0.001;

      // Respawn if life exceeded
      if (lifeArray[i] > 1.0) {
        lifeArray[i] = 0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.random() * 6;
        posArray[i3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = r * Math.cos(phi);
        continue;
      }

      // Noise-like drift with sin/cos
      posArray[i3] += Math.sin(t * 0.3 + i * 0.1) * 0.001 + velocities[i3];
      posArray[i3 + 1] += Math.cos(t * 0.2 + i * 0.07) * 0.001 + velocities[i3 + 1];
      posArray[i3 + 2] += Math.sin(t * 0.25 + i * 0.13) * 0.001 + velocities[i3 + 2];

      // Mouse repulsion
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aLife"
          args={[lifes, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
