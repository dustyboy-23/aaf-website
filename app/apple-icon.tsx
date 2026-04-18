import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon — bigger nexus glyph with subtle radial glow ring.
 * Same palette as the header NexusMark; sized for retina home screens.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="68" stroke="#45F0FF" strokeWidth="5" />
          <circle cx="90" cy="90" r="34" fill="#45F0FF" />
          <circle cx="90" cy="90" r="16" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
