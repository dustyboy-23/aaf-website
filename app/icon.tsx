import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser tab favicon — concentric rings nexus glyph on near-black ground.
 * Mirrors the NexusMark in components/ui/Header.tsx so brand reads
 * consistently from header to tab to home-screen.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#8A63FF" strokeOpacity="0.45" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="9" stroke="#45F0FF" strokeOpacity="0.85" strokeWidth="1.4" />
          <circle cx="16" cy="16" r="4" fill="#45F0FF" />
          <circle cx="16" cy="16" r="2" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
