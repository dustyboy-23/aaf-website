"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { colors, motion } from "@/lib/constants";
import { glassVertexShader, glassFragmentShader } from "./shaders";

/**
 * Shader-driven glass material.
 *
 * uBreath is a 0..1 uniform driven from the parent group's useFrame so every
 * piece of the core (icosahedron + rings + shards) inhales/exhales in sync.
 * uEmissiveBoost lets us push individual elements (core, active shard) past
 * the bloom threshold without touching the others.
 */
function GlassMaterial({
  color,
  opacity = 0.4,
  fresnelPower = 3.0,
  refractionStrength = 0.05,
  emissiveBoost = 0,
  breathRef,
}: {
  color: string;
  opacity?: number;
  fresnelPower?: number;
  refractionStrength?: number;
  emissiveBoost?: number;
  breathRef: React.MutableRefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const colorVec = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uBreath.value = breathRef.current;
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
        uBreath: { value: 0 },
        uEmissiveBoost: { value: emissiveBoost },
      }}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      toneMapped={false}
    />
  );
}

function OrbitalRing({
  radius,
  color,
  rotationSpeed,
  tiltX,
  tiltZ,
  breathRef,
}: {
  radius: number;
  color: string;
  rotationSpeed: number;
  tiltX: number;
  tiltZ: number;
  breathRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.018, 16, 120]} />
      <GlassMaterial
        color={color}
        opacity={0.6}
        fresnelPower={2.2}
        emissiveBoost={0.8}
        breathRef={breathRef}
      />
    </mesh>
  );
}

function OrbitingShard({
  index,
  breathRef,
}: {
  index: number;
  breathRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const colorChoices = [colors.neonCyan, colors.ultraviolet, colors.hotMagenta];

  const config = useMemo(() => {
    // Deterministic pseudo-random so shards don't resettle each rerender
    const rand = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      angle: (index / 12) * Math.PI * 2,
      radius: 2.0 + rand(1) * 1.0,
      speed: 0.15 + rand(2) * 0.2,
      tiltY: rand(3) * Math.PI,
      scale: 0.09 + rand(4) * 0.07,
      color: colorChoices[index % 3],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
      <GlassMaterial
        color={config.color}
        opacity={0.45}
        fresnelPower={3.0}
        emissiveBoost={0.6}
        breathRef={breathRef}
      />
    </mesh>
  );
}

export function NeuralCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const innerLightRef = useRef<THREE.PointLight>(null!);
  const { pointer } = useThree();

  // Shared breath uniform — written once per frame, consumed by every
  // GlassMaterial. Sine on motion.BREATH_CYCLE cadence, remapped to 0..1.
  const breathRef = useRef(0);

  useFrame((state) => {
    if (!coreRef.current) return;

    const t = state.clock.elapsedTime;
    // Breath cadence from the motion spec (default 8s)
    const phase = (t / motion.BREATH_CYCLE) * Math.PI * 2;
    const breath = (Math.sin(phase) * 0.5 + 0.5); // 0..1
    breathRef.current = breath;

    // Subtle physical scale breath — small so it reads as "alive" not "wobbly"
    const s = 1.0 + (breath - 0.5) * 0.05;
    coreRef.current.scale.setScalar(s);

    // Slow, deliberate rotation
    coreRef.current.rotation.y = t * 0.05;

    // Cursor tilt — cap so the core doesn't flip when user flings
    coreRef.current.rotation.x = THREE.MathUtils.lerp(
      coreRef.current.rotation.x,
      pointer.y * 0.12,
      0.04,
    );
    coreRef.current.rotation.z = THREE.MathUtils.lerp(
      coreRef.current.rotation.z,
      -pointer.x * 0.08,
      0.04,
    );

    // Inner light pulses with breath
    if (innerLightRef.current) {
      innerLightRef.current.intensity = 1.8 + breath * 2.2;
    }
  });

  const shardIndices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <group ref={coreRef}>
      {/* Core inner glow — breathes with the icosahedron */}
      <pointLight
        ref={innerLightRef}
        color={colors.neonCyan}
        intensity={2}
        distance={9}
        decay={2}
      />

      {/* Secondary cool rim light for directional modelling on the shards */}
      <pointLight
        color={colors.ultraviolet}
        intensity={0.8}
        position={[-3, 2, 3]}
        distance={10}
        decay={2}
      />

      {/* Main icosahedron core */}
      <mesh>
        <icosahedronGeometry args={[1.25, 4]} />
        <GlassMaterial
          color={colors.neonCyan}
          opacity={0.42}
          fresnelPower={2.8}
          refractionStrength={0.08}
          emissiveBoost={1.2}
          breathRef={breathRef}
        />
      </mesh>

      {/* Inner dense core — smaller, hotter, pushes bloom at peak breath */}
      <mesh>
        <icosahedronGeometry args={[0.55, 3]} />
        <GlassMaterial
          color={colors.neonCyan}
          opacity={0.28}
          fresnelPower={1.8}
          refractionStrength={0.02}
          emissiveBoost={2.4}
          breathRef={breathRef}
        />
      </mesh>

      {/* Concentric orbital rings — palette spread across the 3 signal hues */}
      <OrbitalRing
        radius={1.8}
        color={colors.neonCyan}
        rotationSpeed={0.3}
        tiltX={0.4}
        tiltZ={0.1}
        breathRef={breathRef}
      />
      <OrbitalRing
        radius={2.2}
        color={colors.hotMagenta}
        rotationSpeed={-0.2}
        tiltX={-0.3}
        tiltZ={0.5}
        breathRef={breathRef}
      />
      <OrbitalRing
        radius={2.6}
        color={colors.ultraviolet}
        rotationSpeed={0.15}
        tiltX={0.6}
        tiltZ={-0.2}
        breathRef={breathRef}
      />

      {/* Orbiting glass tetrahedron shards, cycled through the palette */}
      {shardIndices.map((i) => (
        <OrbitingShard key={i} index={i} breathRef={breathRef} />
      ))}
    </group>
  );
}
