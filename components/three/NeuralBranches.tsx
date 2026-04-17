"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { branchEndpoints } from "@/lib/constants";
import { NeuralBranch } from "./NeuralBranch";

interface NeuralBranchesProps {
  hoveredIndex: number | null;
}

// Step 3 of the vein rebuild.
//
// Each "branch" is now a BUNDLE of thin fibers wrapped around a shared spine,
// not a single fat tube. The reference footage shows multi-strand
// bioluminescent tissue — fibers converge at endpoints, splay in the middle.
// Single-tube branches read as plastic pipes regardless of material tuning.
const FIBERS_PER_BRANCH = 8;

/** Central branch path. Same shape as before; acts as the spine each fiber
 *  wraps around. Keeps visual continuity with the panel endpoints. */
function makeBranchSpine(
  endX: number,
  endY: number,
  index: number,
): THREE.Vector3[] {
  const start = new THREE.Vector3(0, 0, 0);
  const end = new THREE.Vector3(endX, endY, 0);

  const dirX = endX / Math.hypot(endX, endY);
  const dirY = endY / Math.hypot(endX, endY);
  const perpX = -dirY;
  const perpY = dirX;

  const swingA = Math.sin(index * 1.37 + 0.7);
  const swingB = Math.cos(index * 2.11 + 1.3);
  const swingC = Math.sin(index * 0.83 + 2.0);
  const swingD = Math.cos(index * 1.91 + 0.4);

  const p1 = new THREE.Vector3(
    endX * 0.18 + perpX * swingA * 0.35,
    endY * 0.18 + perpY * swingA * 0.35,
    swingB * 0.9,
  );
  const p2 = new THREE.Vector3(
    endX * 0.38 + perpX * swingB * 0.6,
    endY * 0.38 + perpY * swingB * 0.6,
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

/**
 * Wrap a fiber around the spine.
 *
 * Fibers share the general branch path but offset from the spine on a small
 * circle that bulges in the middle — converge at both endpoints so the bundle
 * meets cleanly at the core and panel, splays in the middle so the bundle
 * reads as a rope of strands, not a solid pipe.
 */
function makeFiberPoints(
  spine: THREE.Vector3[],
  branchIndex: number,
  fiberIndex: number,
  fiberCount: number,
): THREE.Vector3[] {
  // Perpendicular basis from the endpoint-to-endpoint axis
  const axis = spine[spine.length - 1].clone().sub(spine[0]).normalize();
  const up = Math.abs(axis.y) < 0.9
    ? new THREE.Vector3(0, 1, 0)
    : new THREE.Vector3(1, 0, 0);
  const perp1 = new THREE.Vector3().crossVectors(axis, up).normalize();
  const perp2 = new THREE.Vector3().crossVectors(axis, perp1).normalize();

  // Distribute fibers around the spine axis
  const fiberAngle =
    (fiberIndex / fiberCount) * Math.PI * 2 + branchIndex * 0.37;
  const fiberRadius = 0.07 + (fiberIndex % 4) * 0.02;

  return spine.map((p, i) => {
    const t = i / (spine.length - 1);
    // Bulge: 0 at endpoints, 1 at middle. Fibers meet at both ends.
    const bulge = Math.sin(t * Math.PI);
    // Micro-ripple so no two fibers trace the same offset curve
    const ripple =
      Math.sin(fiberIndex * 1.7 + t * Math.PI * 2.3) * 0.02 * bulge;

    const r = fiberRadius * bulge + ripple;
    // Slight twist along length so fibers braid rather than run parallel
    const angle = fiberAngle + t * 0.6;

    return p
      .clone()
      .addScaledVector(perp1, r * Math.cos(angle))
      .addScaledVector(perp2, r * Math.sin(angle));
  });
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
  const bundles = useMemo(
    () =>
      endpointPositions.map((pos, branchIndex) => {
        const spine = makeBranchSpine(pos.x, pos.y, branchIndex);
        const fibers = Array.from(
          { length: FIBERS_PER_BRANCH },
          (_, fiberIndex) => ({
            fiberIndex,
            points: makeFiberPoints(
              spine,
              branchIndex,
              fiberIndex,
              FIBERS_PER_BRANCH,
            ),
            // Vary thickness per fiber in the bundle so some read as primary
            // strands, others as finer filler — matches the reference where
            // strand thickness is non-uniform.
            radiusScale: 0.13 + (fiberIndex % 3) * 0.04,
          }),
        );
        return {
          branchIndex,
          color: branchEndpoints[branchIndex].color,
          fibers,
        };
      }),
    [],
  );

  return (
    <group>
      {bundles.map((bundle) =>
        bundle.fibers.map((fiber) => (
          <NeuralBranch
            key={`${bundle.branchIndex}-${fiber.fiberIndex}`}
            points={fiber.points}
            color={bundle.color}
            brightness={hoveredIndex === bundle.branchIndex ? 2.2 : 1}
            index={bundle.branchIndex * 10 + fiber.fiberIndex}
            radiusScale={fiber.radiusScale}
          />
        )),
      )}
    </group>
  );
}
