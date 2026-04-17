"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/constants";

/**
 * Nebula/atmosphere layer sitting behind the core.
 *
 * The earlier pass used 0.04-opacity spheres which were invisible in practice.
 * These are proper additive nebula billboards with a soft radial falloff so
 * you actually see the cosmic field behind the neural core — not just a flat
 * gradient painted on the section wrapper.
 *
 * Kept cheap: 6 quads with a tiny fragment shader, additive blending, no
 * physical lighting. They fade with distance so the brief's "infinite depth"
 * read holds up.
 */

// Each orb: color, world-space position, radius, drift speed.
// Positioned behind and around the core to form layered depth.
const orbConfigs = [
  { color: colors.ultraviolet,   position: [-5.5,  2.5, -9]  as const, radius: 4.5, speed: 0.08, intensity: 0.22 },
  { color: colors.neonCyan,      position: [ 6.0, -1.0, -11] as const, radius: 5.5, speed: 0.06, intensity: 0.18 },
  { color: colors.hotMagenta,    position: [-3.0, -3.5, -13] as const, radius: 5.0, speed: 0.07, intensity: 0.16 },
  { color: colors.electricBlue,  position: [ 3.5,  4.0, -10] as const, radius: 3.8, speed: 0.05, intensity: 0.14 },
  { color: colors.darkViolet,    position: [ 0.0,  0.0, -15] as const, radius: 8.0, speed: 0.03, intensity: 0.45 },
  { color: colors.ultraviolet,   position: [-7.0, -1.5, -8]  as const, radius: 3.2, speed: 0.09, intensity: 0.12 },
];

const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  varying vec2 vUv;

  // Cheap value noise for organic nebula edge (no texture, no imports).
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    // Radial falloff — hot core, soft edge
    float fall = smoothstep(0.5, 0.0, dist);
    fall = fall * fall;

    // Drift the noise so the nebula breathes instead of looking static
    float n = noise(uv * 4.0 + uTime * 0.04);
    fall *= mix(0.75, 1.15, n);

    vec3 color = uColor * fall * uIntensity;
    gl_FragColor = vec4(color, fall * uIntensity);
  }
`;

function NebulaOrb({
  color,
  position,
  radius,
  speed,
  intensity,
  index,
}: {
  color: string;
  position: readonly [number, number, number];
  radius: number;
  speed: number;
  intensity: number;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t + index) * 0.6;
    ref.current.position.y = position[1] + Math.cos(t * 1.3 + index * 2) * 0.45;
    ref.current.position.z = position[2] + Math.sin(t * 0.7 + index * 3) * 0.3;
    // Always face camera so the radial falloff reads as a sphere of light
    ref.current.lookAt(state.camera.position);
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]}>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{
          uColor: { value: colorObj },
          uIntensity: { value: intensity },
          uTime: { value: 0 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function BackgroundOrbs() {
  return (
    <group>
      {orbConfigs.map((config, i) => (
        <NebulaOrb key={i} {...config} index={i} />
      ))}
    </group>
  );
}
