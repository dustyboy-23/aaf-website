"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { glassVertexShader, glassFragmentShader } from "./shaders";

function GlassMaterial({
  color,
  opacity = 0.4,
  fresnelPower = 3.0,
  refractionStrength = 0.05,
}: {
  color: string;
  opacity?: number;
  fresnelPower?: number;
  refractionStrength?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const colorVec = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={glassVertexShader}
      fragmentShader={glassFragmentShader}
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: colorVec },
        uOpacity: { value: opacity },
        uFresnelPower: { value: fresnelPower },
        uRefractionStrength: { value: refractionStrength },
      }}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  );
}

function OrbitalRing({
  radius,
  color,
  rotationSpeed,
  tiltX,
  tiltZ,
}: {
  radius: number;
  color: string;
  rotationSpeed: number;
  tiltX: number;
  tiltZ: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <GlassMaterial color={color} opacity={0.5} fresnelPower={2.5} />
    </mesh>
  );
}

function OrbitingShard({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = (index / 12) * Math.PI * 2;
  const radius = 2.0 + Math.random() * 1.0;
  const speed = 0.15 + Math.random() * 0.2;
  const tiltY = Math.random() * Math.PI;
  const scale = 0.08 + Math.random() * 0.06;

  const config = useMemo(
    () => ({ angle, radius, speed, tiltY, scale }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  );

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * config.speed + config.angle;
      ref.current.position.x = Math.cos(t) * config.radius;
      ref.current.position.z = Math.sin(t) * config.radius;
      ref.current.position.y =
        Math.sin(t * 1.3 + config.tiltY) * 0.8;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <mesh ref={ref} scale={config.scale}>
      <tetrahedronGeometry args={[1, 0]} />
      <GlassMaterial color="#06b6d4" opacity={0.35} fresnelPower={3.5} />
    </mesh>
  );
}

export function NeuralCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!coreRef.current) return;

    const t = state.clock.elapsedTime;

    // Breathing scale
    const breathe = 1.0 + Math.sin(t * 0.8) * 0.03;
    coreRef.current.scale.setScalar(breathe);

    // Slow rotation
    coreRef.current.rotation.y = t * 0.05;

    // Cursor tilt
    coreRef.current.rotation.x =
      THREE.MathUtils.lerp(coreRef.current.rotation.x, pointer.y * 0.15, 0.05);
    coreRef.current.rotation.z =
      THREE.MathUtils.lerp(coreRef.current.rotation.z, -pointer.x * 0.1, 0.05);
  });

  const shardIndices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <group ref={coreRef}>
      {/* Center point light for inner glow */}
      <pointLight color="#06b6d4" intensity={2} distance={8} decay={2} />

      {/* Main icosahedron core */}
      <mesh>
        <icosahedronGeometry args={[1.2, 3]} />
        <GlassMaterial
          color="#06b6d4"
          opacity={0.3}
          fresnelPower={3.0}
          refractionStrength={0.08}
        />
      </mesh>

      {/* Concentric orbital rings */}
      <OrbitalRing
        radius={1.8}
        color="#06b6d4"
        rotationSpeed={0.3}
        tiltX={0.4}
        tiltZ={0.1}
      />
      <OrbitalRing
        radius={2.2}
        color="#ec4899"
        rotationSpeed={-0.2}
        tiltX={-0.3}
        tiltZ={0.5}
      />
      <OrbitalRing
        radius={2.6}
        color="#06b6d4"
        rotationSpeed={0.15}
        tiltX={0.6}
        tiltZ={-0.2}
      />

      {/* Orbiting glass tetrahedron shards */}
      {shardIndices.map((i) => (
        <OrbitingShard key={i} index={i} />
      ))}
    </group>
  );
}
