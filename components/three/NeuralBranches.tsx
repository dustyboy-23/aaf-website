"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { branchEndpoints } from "@/lib/constants";
import { NeuralBranch } from "./NeuralBranch";

interface NeuralBranchesProps {
  hoveredIndex: number | null;
}

/** Generate organic control points from center to endpoint */
function makeBranchPoints(
  endX: number,
  endY: number,
  index: number
): THREE.Vector3[] {
  const start = new THREE.Vector3(0, 0, 0);
  const end = new THREE.Vector3(endX, endY, 0);

  // Organic intermediate control points with some z-depth variation
  const mid1 = new THREE.Vector3(
    endX * 0.3,
    endY * 0.2 + Math.sin(index * 1.5) * 0.4,
    Math.cos(index * 2.1) * 0.5
  );
  const mid2 = new THREE.Vector3(
    endX * 0.65,
    endY * 0.7 + Math.cos(index * 1.8) * 0.3,
    Math.sin(index * 1.3) * 0.3
  );

  return [start, mid1, mid2, end];
}

// Keep these in lock-step with BranchPanels panelPositions — they drive the
// start/end of each pulse path, so drift between the two will look broken.
const endpointPositions = [
  { x: -4.2, y: 1.8 },
  { x: -4.2, y: 0 },
  { x: -4.2, y: -1.8 },
  { x: 4.2, y: 1.8 },
  { x: 4.2, y: 0 },
  { x: 4.2, y: -1.8 },
];

export function NeuralBranches({ hoveredIndex }: NeuralBranchesProps) {
  const branches = useMemo(
    () =>
      endpointPositions.map((pos, i) => ({
        points: makeBranchPoints(pos.x, pos.y, i),
        color: branchEndpoints[i].color,
      })),
    []
  );

  return (
    <group>
      {branches.map((branch, i) => (
        <NeuralBranch
          key={i}
          points={branch.points}
          color={branch.color}
          brightness={hoveredIndex === i ? 2.5 : 1}
        />
      ))}
    </group>
  );
}
