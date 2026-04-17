import * as THREE from "three";

/**
 * Custom tube geometry for the neural veins.
 *
 * Differences from THREE.TubeGeometry:
 *   - Radius varies along the curve via the `radiusFn` parameter. The
 *     reference footage shows veins that are thick near the core/plexus
 *     and taper toward the tips with organic swells; uniform tubes
 *     read as pipes.
 *   - Uses a per-segment Frenet frame just like TubeGeometry, so normals
 *     are correct for PBR lighting.
 *
 * Pattern mirrors THREE.TubeGeometry; only the radius scaling is new.
 */
export function buildVeinGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  tubularSegments: number,
  radialSegments: number,
  radiusFn: (t: number) => number,
  closed = false,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const frames = curve.computeFrenetFrames(tubularSegments, closed);

  const P = new THREE.Vector3();
  const N = new THREE.Vector3();
  const B = new THREE.Vector3();

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    curve.getPointAt(t, P);
    N.copy(frames.normals[i]);
    B.copy(frames.binormals[i]);
    const radius = radiusFn(t);

    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);

      const nx = cos * N.x + sin * B.x;
      const ny = cos * N.y + sin * B.y;
      const nz = cos * N.z + sin * B.z;
      const nLen = Math.hypot(nx, ny, nz) || 1;
      const nnx = nx / nLen;
      const nny = ny / nLen;
      const nnz = nz / nLen;

      positions.push(P.x + radius * nnx, P.y + radius * nny, P.z + radius * nnz);
      normals.push(nnx, nny, nnz);
      uvs.push(t, j / radialSegments);
    }
  }

  // Quad strip between each ring
  for (let j = 1; j <= tubularSegments; j++) {
    for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1);
      const b = (radialSegments + 1) * j + (i - 1);
      const c = (radialSegments + 1) * j + i;
      const d = (radialSegments + 1) * (j - 1) + i;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  return geometry;
}

/**
 * Vein-taper radius profile. t=0 is core end, t=1 is tip end.
 *
 * Visual rules:
 *   - Fattest at the core (matches the reference plexus where fibers
 *     converge into a thick trunk)
 *   - Taper to ~35% at the tip so tips don't look stub-cut
 *   - Two overlaid sine waves give organic swells without ringing
 *
 * Index seeds the phase so no two branches have identical bumps.
 */
export function veinRadiusProfile(
  baseMax: number,
  baseMin: number,
  index: number,
): (t: number) => number {
  const phaseA = index * 1.37;
  const phaseB = index * 2.71;
  return (t: number) => {
    const taper = baseMax * (1 - t) + baseMin * t;
    const bumps =
      Math.sin(t * Math.PI * 3.5 + phaseA) * 0.012 +
      Math.sin(t * Math.PI * 7.2 + phaseB) * 0.008;
    // Core joint swell — an extra bulge at t < 0.12 to sell the plexus
    const joint = Math.max(0, 1 - t / 0.12) * 0.02;
    return Math.max(0.01, taper + bumps + joint);
  };
}
