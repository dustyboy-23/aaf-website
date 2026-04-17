"use client";

import { branchEndpoints } from "@/lib/constants";
import { BranchPanel } from "./BranchPanel";

interface BranchPanelsProps {
  onHover: (index: number | null) => void;
}

// Panel positions match branch endpoints.
// With camera z=8 fov=50 the visible x-range at z=0 is ±~5.97, so we keep
// panels at ±4.2 (edges land at ±5.3) — comfortably inside the 16:10 viewport
// and leaving breathing room around the central core.
const panelPositions: [number, number, number][] = [
  [-4.2, 1.8, 0],
  [-4.2, 0, 0],
  [-4.2, -1.8, 0],
  [4.2, 1.8, 0],
  [4.2, 0, 0],
  [4.2, -1.8, 0],
];

export function BranchPanels({ onHover }: BranchPanelsProps) {
  return (
    <group>
      {branchEndpoints.map((endpoint, i) => (
        <BranchPanel
          key={endpoint.slug}
          position={panelPositions[i]}
          label={endpoint.label}
          description={endpoint.desc}
          color={endpoint.color}
          href={endpoint.slug}
          onHover={(hovered) => onHover(hovered ? i : null)}
        />
      ))}
    </group>
  );
}
