"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { branchEndpoints } from "@/lib/constants";
import { NeuralBranch } from "./NeuralBranch";

interface NeuralBranchesProps {
  hoveredIndex: number | null;
}

/**
 * Build 6 curvy control points between core and endpoint.
 *
 * Extra intermediates (5 points vs previous 4) + bigger z-depth variation
 * lets the catmull-rom spline bend in 3D instead of arcing on a flat plane.
 * Perpendicular drift phases are seeded off `index` so no two veins swing
 * the same way — matches the ref footage where each fiber takes a slightly
 * different route to its endpoint.
 */
function makeBranchPoints(
  endX: number,
  endY: number,
  index: number,
): THREE.Vector3[] {
  const start = new THREE.Vector3(0, 0, 0);
  const end = new THREE.Vector3(endX, endY, 0);

  // Perpendicular (radial) drift vector — pushes the middle of the curve
  // off the straight core→endpoint line so it reads as a swerving fiber
  // instead of a tensioned wire.
  const dirX = endX / Math.hypot(endX, endY);
  const dirY = endY / Math.hypot(endX, endY);
  const perpX = -dirY;
  const perpY = dirX;

  // Per-branch swing phase
  const swingA = Math.sin(index * 1.37 + 0.7);
  const swingB = Math.cos(index * 2.11 + 1.3);
  const swingC = Math.sin(index * 0.83 + 2.0);
  const swingD = Math.cos(index * 1.91 + 0.4);

  const p1 = new THREE.Vector3(
    endX * 0.18 + perpX * swingA * 0.35,
    endY * 0.12 + perpY * swingA * 0.35,
    swingB * 0.9,
  );
  const p2 = new THREE.Vector3(
    endX * 0.38 + perpX * swingB * 0.6,
    endY * 0.32 + perpY * swingB * 0.6,
    swingA * 1.1,
  );
  const p3 = new THREE.Vector3(
    endX * 0.6 + perpX * swingC * 0.45,
    endY * 0.6 + perpY * swingC * 0.45,
    swingD * 0.7,
  );
  const p4 = new THREE.Vector3(
    endX * 0.82 + perpX * swingD * 0.2,
    endY * 0.82 + perpY * swingD * 0.2,
    swingC * 0.3,
  );

  return [start, p1, p2, p3, p4, end];
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
        // Alternate fatter/slimmer veins so the frame has thickness variety
        radiusScale: 0.9 + ((i % 3) * 0.12),
      })),
    [],
  );

  return (
    <group>
      {branches.map((branch, i) => (
        <NeuralBranch
          key={i}
          points={branch.points}
          color={branch.color}
          brightness={hoveredIndex === i ? 2.2 : 1}
          index={i}
          radiusScale={branch.radiusScale}
        />
      ))}
    </group>
  );
}
