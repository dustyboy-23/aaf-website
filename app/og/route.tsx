import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "AI Agents First";
  const tag = searchParams.get("tag") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 80px",
          background: "linear-gradient(145deg, #04050A 0%, #140B21 40%, #09101B 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top bar - brand mark */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#8A63FF" strokeOpacity="0.45" strokeWidth="1.2" />
            <circle cx="16" cy="16" r="9" stroke="#45F0FF" strokeOpacity="0.85" strokeWidth="1.4" />
            <circle cx="16" cy="16" r="4" fill="#45F0FF" />
            <circle cx="16" cy="16" r="2" fill="#ffffff" />
          </svg>
          <span style={{ color: "#45F0FF", fontSize: "18px", fontWeight: 600, letterSpacing: "0.05em" }}>
            AI AGENTS FIRST
          </span>
        </div>

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(138,99,255,0.12) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Tag pill */}
        {tag && (
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "#45F0FF",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            marginTop: "30px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em",
          }}
        >
          aiagentsfirst.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
