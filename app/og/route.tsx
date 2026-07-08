import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || SITE_NAME;
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
          padding: "64px 80px",
          background: "#FAF7F0",
          fontFamily: "serif",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ color: "#2F5D4B", fontSize: "26px", fontWeight: 600 }}>/</span>
          <span style={{ color: "#1B1A16", fontSize: "26px", fontWeight: 600, letterSpacing: "-0.01em" }}>
            {SITE_NAME}
          </span>
        </div>

        {tag && (
          <div style={{ display: "flex", marginBottom: "22px" }}>
            <span
              style={{
                color: "#244A3C",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              {tag}
            </span>
          </div>
        )}

        <div
          style={{
            fontSize: title.length > 60 ? "48px" : "60px",
            fontWeight: 500,
            color: "#1B1A16",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "28px",
            fontSize: "18px",
            color: "#77736A",
            letterSpacing: "0.02em",
            fontFamily: "sans-serif",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
