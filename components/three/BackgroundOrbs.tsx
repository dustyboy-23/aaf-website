"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const orbConfigs = [
  { color: "#7c3aed", position: [-4, 2, -8] as const, radius: 2.5, speed: 0.15 },
  { color: "#06b6d4", position: [5, -1, -10] as const, radius: 3.0, speed: 0.1 },
  { color: "#ec4899", position: [-2, -3, -12] as const, radius: 2.8, speed: 0.12 },
  { color: "#7c3aed", position: [3, 3, -9] as const, radius: 2.2, speed: 0.08 },
];

function BackgroundOrb({
  color,
  position,
  radius,
  speed,
  index,
}: {
  color: string;
  position: readonly [number, number, number];
  radius: number;
  speed: number;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t + index) * 0.5;
    ref.current.position.y = position[1] + Math.cos(t * 1.3 + index * 2) * 0.4;
    ref.current.position.z = position[2] + Math.sin(t * 0.7 + index * 3) * 0.3;
  });

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color={colorObj}
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </mesh>
  );
}

export function BackgroundOrbs() {
  return (
    <group>
      {orbConfigs.map((config, i) => (
        <BackgroundOrb key={i} {...config} index={i} />
      ))}
    </group>
  );
}
