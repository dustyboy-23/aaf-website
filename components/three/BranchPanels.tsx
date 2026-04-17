"use client";

import { branchEndpoints } from "@/lib/constants";
import { BranchPanel } from "./BranchPanel";

interface BranchPanelsProps {
  onHover: (index: number | null) => void;
}

// Panel positions match branch endpoints
// Left side (indices 0-2): x=-5.5, y=[2, 0, -2]
// Right side (indices 3-5): x=5.5, y=[2, 0, -2]
const panelPositions: [number, number, number][] = [
  [-5.5, 2, 0],
  [-5.5, 0, 0],
  [-5.5, -2, 0],
  [5.5, 2, 0],
  [5.5, 0, 0],
  [5.5, -2, 0],
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
