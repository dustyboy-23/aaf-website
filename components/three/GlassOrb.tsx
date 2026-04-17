"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/** Floating particles around the orb */
function OrbParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere shell around the orb
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 2.2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.5 + Math.random() * 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** The main glass orb with transmission material */
export function GlassOrb() {
  const orbRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[2, 3, 5]}
        intensity={1.5}
        color="#06b6d4"
      />
      <directionalLight
        position={[-3, -1, 2]}
        intensity={0.6}
        color="#ec4899"
      />
      <pointLight position={[0, 0, 3]} intensity={1} color="#7c3aed" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[1.4, 6]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.3}
            roughness={0.05}
            transmission={1}
            ior={1.25}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#88ccee"
            attenuationColor="#06b6d4"
            attenuationDistance={3}
            samples={8}
            resolution={256}
          />
        </mesh>
      </Float>

      <OrbParticles count={100} />
    </>
  );
}
