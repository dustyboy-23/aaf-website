/* ------------------------------------------------------------------
   All GLSL shaders as inline template literals.
   This avoids Turbopack/webpack GLSL loader compatibility issues
   while working reliably in both dev and production builds.

   HDR note: emissive values are deliberately pushed > 1 so the
   selective bloom pass (luminanceThreshold ≈ 0.9 in PostProcessing)
   can separate true light sources from flat surface color. Do not
   clamp these values to [0,1] — the bloom pipeline depends on HDR.
   ------------------------------------------------------------------ */

// ===== GLASS MATERIAL =====

export const glassVertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const glassFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uFresnelPower;
uniform float uRefractionStrength;
uniform float uBreath;
uniform float uEmissiveBoost;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  // View direction for fresnel
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);

  // Breath-driven inner light (6-10s cycle driven from CPU)
  float breath = 0.85 + uBreath * 0.4;

  // Refraction offset for inner color shift
  vec2 refractedUv = vUv + vNormal.xy * uRefractionStrength;
  float colorShift = sin(refractedUv.x * 6.28 + uTime * 0.4) * 0.12;

  // Base translucent interior
  vec3 baseColor = uColor * (0.35 + colorShift) * breath;

  // HDR edge glow — pushed past 1 so bloom can find it
  vec3 edgeGlow = uColor * fresnel * (2.2 + uEmissiveBoost * 1.5) * breath;

  vec3 finalColor = mix(baseColor, edgeGlow, fresnel);

  float alpha = mix(uOpacity * 0.35, uOpacity, fresnel) * (0.9 + uBreath * 0.1);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

// ===== PARTICLE FIELD =====

export const particleVertexShader = /* glsl */ `
attribute float aLife;
attribute float aSize;
attribute float aColorIndex;

uniform float uPixelRatio;
uniform float uTime;

varying float vLife;
varying float vColorIndex;

void main() {
  vLife = aLife;
  vColorIndex = aColorIndex;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float distanceFade = 1.0 / (-mvPosition.z * 0.1 + 1.0);

  // Size based on life cycle and distance
  float lifeSize = smoothstep(0.0, 0.2, aLife) * smoothstep(1.0, 0.8, aLife);
  gl_PointSize = aSize * lifeSize * distanceFade * uPixelRatio;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying float vLife;
varying float vColorIndex;

void main() {
  // Soft circular glow on point sprite
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  float falloff = 1.0 - smoothstep(0.0, 0.5, dist);
  // Sharp hot core with soft halo — feels like data dust, not a blur
  float core = 1.0 - smoothstep(0.0, 0.08, dist);
  falloff = falloff * falloff + core * 0.6;

  // Life-based alpha
  float lifeAlpha = smoothstep(0.0, 0.15, vLife) * smoothstep(1.0, 0.7, vLife);
  float alpha = falloff * lifeAlpha * 0.75;

  // Pick one of three palette colors by per-particle index
  vec3 color = mix(
    mix(uColorA, uColorB, step(0.333, vColorIndex)),
    uColorC,
    step(0.666, vColorIndex)
  );

  // HDR kick on the hot core so bloom picks up the brightest particles
  vec3 hdr = color * (1.0 + core * 1.8);

  gl_FragColor = vec4(hdr, alpha);
}
`;

// ===== NEURAL BRANCH =====
// Neural-tissue fiber: thick translucent tube with internal flowing motes,
// fake subsurface scattering via fresnel layering, and amber spark highlights
// mixed against the primary cyan/violet branch color. Targets the
// "bioluminescent neuron" look (see docs/plans/aaf-cosmic-nexus-execution for
// the reference video frames this shader was authored against).

export const branchVertexShader = /* glsl */ `
uniform float uTime;
uniform float uPulseSpeed;
uniform float uPulsePhase;
uniform float uPulseDuty;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalPos;
varying float vSurge;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vLocalPos = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;

  // Sparse traveling pulse head — fires once per cycle, dark in between.
  float cycle = fract(uTime * uPulseSpeed + uPulsePhase);
  float headPos = cycle / uPulseDuty;
  float head = step(cycle, uPulseDuty) *
               smoothstep(0.0, 0.05, headPos - uv.x) *
               smoothstep(0.18, 0.06, headPos - uv.x);
  vSurge = head;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const branchFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uSurgeColor;
uniform vec3 uSparkColor;
uniform float uTime;
uniform float uBrightness;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalPos;
varying float vSurge;

// Cheap 1D hash for per-mote randomness
float h1(float n) { return fract(sin(n * 43.1) * 4378.5453); }

// 2D hash
float h2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float nDotV = abs(dot(viewDir, vNormal));

  // Layered fresnel — soft outer rim + sharp inner ridge for the
  // "translucent tissue" double-edge look from the reference.
  float rimSoft  = pow(1.0 - nDotV, 1.5);
  float rimSharp = pow(1.0 - nDotV, 6.0);

  // Internal mote pattern — traveling amber sparks visible "inside" the
  // tube. vUv.x = length along branch, vUv.y = around the tube. Multiple
  // noise octaves drifting at different speeds give the living-fluid feel.
  float moteFlow1 = vUv.x * 40.0 - uTime * 0.8;
  float moteFlow2 = vUv.x * 22.0 - uTime * 0.5 + vUv.y * 6.28;
  float mote1 = smoothstep(0.88, 1.0, h2(vec2(floor(moteFlow1), floor(vUv.y * 8.0))));
  float mote2 = smoothstep(0.92, 1.0, h2(vec2(floor(moteFlow2 * 0.5), floor(vUv.x * 60.0))));
  // Pin motes toward the center of the tube (vUv.y around 0.5) so they
  // read as interior specks, not surface dots. Also dim at the very
  // ends of the branch so specks don't clip at the tube cap.
  float interiorMask = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.65, vUv.y);
  float endFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
  float sparkField = (mote1 * 0.8 + mote2 * 0.6) * interiorMask * endFade;

  // Subsurface body — dim color deep inside, tinted more toward white
  // at the rim. This fakes the "light entering the fiber" read.
  vec3 deepBody = uColor * 0.22;
  vec3 rimTint  = mix(uColor, vec3(1.0), 0.25);
  vec3 body     = mix(deepBody, rimTint, rimSoft);

  // Sharp specular ridge — bright white-cyan highlight at grazing angle
  vec3 specular = mix(uColor, vec3(1.0), 0.6) * rimSharp * 2.2;

  // Amber embedded sparks — HDR, pushed through bloom
  vec3 sparks = uSparkColor * sparkField * 3.2;

  // Traveling pulse head — rare surge that overwrites everything briefly
  vec3 pulseGlow = uSurgeColor * vSurge * 4.5;

  vec3 finalColor = (body + specular + sparks + pulseGlow) * uBrightness;

  // Alpha: translucent body, opaque rim and pulse. Never quite fully
  // opaque so you see branches crossing behind each other.
  float alpha = mix(0.12, 0.78, rimSoft) + sparkField * 0.35 + vSurge * 0.5;
  alpha = clamp(alpha * uBrightness, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
`;
