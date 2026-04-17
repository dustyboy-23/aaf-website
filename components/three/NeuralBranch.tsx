"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { branchVertexShader, branchFragmentShader } from "./shaders";

interface NeuralBranchProps {
  points: THREE.Vector3[];
  color: string;
  brightness?: number;
}

export function NeuralBranch({
  points,
  color,
  brightness = 1,
}: NeuralBranchProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { geometry, colorVec, surgeColor } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.035, 8, false);
    const col = new THREE.Color(color);
    // Surge color is a brighter, whiter version of the base
    const surge = new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.6);
    return { geometry: tubeGeo, colorVec: col, surgeColor: surge };
  }, [points, color]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uBrightness.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uBrightness.value,
      brightness,
      0.1
    );
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={branchVertexShader}
        fragmentShader={branchFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uSurgeSpeed: { value: 0.4 },
          uColor: { value: colorVec },
          uSurgeColor: { value: surgeColor },
          uBrightness: { value: brightness },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
