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
          background: "radial-gradient(circle at 50% 50%, #1a1830 0%, #0A0A0F 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          {/* Outer UV halo */}
          <circle cx="90" cy="90" r="78" stroke="#8A63FF" strokeOpacity="0.35" strokeWidth="3" />
          {/* Mid UV ring */}
          <circle cx="90" cy="90" r="62" stroke="#8A63FF" strokeOpacity="0.55" strokeWidth="2" />
          {/* Cyan signal ring */}
          <circle cx="90" cy="90" r="46" stroke="#45F0FF" strokeOpacity="0.9" strokeWidth="3" />
          {/* Bright core */}
          <circle cx="90" cy="90" r="22" fill="#45F0FF" />
          <circle cx="90" cy="90" r="12" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
