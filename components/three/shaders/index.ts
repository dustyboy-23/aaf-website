/* ------------------------------------------------------------------
   All GLSL shaders as inline template literals.
   This avoids Turbopack/webpack GLSL loader compatibility issues
   while working reliably in both dev and production builds.
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

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  // View direction for fresnel
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);

  // Subtle time-based pulse
  float pulse = 0.95 + 0.05 * sin(uTime * 1.5);

  // Refraction offset for inner color shift
  vec2 refractedUv = vUv + vNormal.xy * uRefractionStrength;
  float colorShift = sin(refractedUv.x * 6.28 + uTime) * 0.15;

  // Base translucent color with fresnel edge glow
  vec3 baseColor = uColor * (0.3 + colorShift);
  vec3 edgeGlow = uColor * fresnel * 2.0;
  vec3 finalColor = mix(baseColor, edgeGlow, fresnel) * pulse;

  float alpha = mix(uOpacity * 0.3, uOpacity, fresnel) * pulse;

  gl_FragColor = vec4(finalColor, alpha);
}
`;

// ===== PARTICLE FIELD =====

export const particleVertexShader = /* glsl */ `
attribute float aLife;
attribute float aSize;

uniform float uPixelRatio;
uniform float uTime;

varying float vLife;

void main() {
  vLife = aLife;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float distanceFade = 1.0 / (-mvPosition.z * 0.1 + 1.0);

  // Size based on life cycle and distance
  float lifeSize = smoothstep(0.0, 0.2, aLife) * smoothstep(1.0, 0.8, aLife);
  gl_PointSize = aSize * lifeSize * distanceFade * uPixelRatio;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = /* glsl */ `
uniform vec3 uColor;

varying float vLife;

void main() {
  // Soft circular glow on point sprite
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  float falloff = 1.0 - smoothstep(0.0, 0.5, dist);
  falloff *= falloff; // Squared for softer glow

  // Life-based alpha
  float lifeAlpha = smoothstep(0.0, 0.15, vLife) * smoothstep(1.0, 0.7, vLife);
  float alpha = falloff * lifeAlpha * 0.6;

  gl_FragColor = vec4(uColor, alpha);
}
`;

// ===== NEURAL BRANCH =====

export const branchVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSurgeSpeed;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vSurge;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;

  // Surge phase: travels from core (uv.x=0) to endpoint (uv.x=1)
  float surgePhase = fract(uTime * uSurgeSpeed - uv.x * 2.0);
  vSurge = smoothstep(0.0, 0.1, surgePhase) * smoothstep(0.35, 0.15, surgePhase);

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const branchFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uSurgeColor;
uniform float uTime;
uniform float uBrightness;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vSurge;

void main() {
  // Fresnel for translucent fiber-optic look
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);

  // Base fiber color with fresnel glow at edges
  vec3 fiberColor = uColor * (0.2 + fresnel * 1.5);

  // Energy surge overlay
  vec3 surgeGlow = uSurgeColor * vSurge * 3.0;

  vec3 finalColor = (fiberColor + surgeGlow) * uBrightness;

  // Alpha: translucent core, brighter at edges and during surge
  float alpha = mix(0.15, 0.8, fresnel) + vSurge * 0.5;
  alpha = clamp(alpha * uBrightness, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
`;
