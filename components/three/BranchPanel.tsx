"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface BranchPanelProps {
  position: [number, number, number];
  label: string;
  description: string;
  color: string;
  href: string;
  onHover: (hovered: boolean) => void;
}

export function BranchPanel({
  position,
  label,
  description,
  color,
  href,
  onHover,
}: BranchPanelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;
    // Lift slightly when hovered
    const targetY = hovered ? position[1] + 0.1 : position[1];
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );
  });

  const handlePointerEnter = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerLeave = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = () => {
    window.location.href = href;
  };

  const opacity = hovered ? 0.25 : 0.12;
  const edgeOpacity = hovered ? 0.6 : 0.3;

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* Glass panel */}
      <mesh>
        <planeGeometry args={[2.2, 0.9]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Edge outline */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(2.2, 0.9)]}
        />
        <lineBasicMaterial color={color} transparent opacity={edgeOpacity} />
      </lineSegments>

      {/* HTML overlay for crisp text */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          width: "180px",
        }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-widest font-bold"
              style={{ color }}
            >
              {label}
            </span>
          </div>
          <p className="text-[8px] text-silver/60 leading-tight font-mono">
            {description}
          </p>
        </div>
      </Html>
    </group>
  );
}
