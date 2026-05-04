import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://aiagentsfirst.com https://va.vercel-scripts.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://aiagentsfirst.com https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://aiagentsfirst.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.114.183.19"],
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aiagentsfirst.com",
        pathname: "/content/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Legacy nav slugs that never got real content. Route them to the closest
  // real destination so external bookmarks and homepage tiles keep working.
  async redirects() {
    return [
      { source: "/learn", destination: "/tag/tutorials", permanent: true },
      { source: "/deep-dives", destination: "/tag/opinion", permanent: true },
      { source: "/tools", destination: "/tag/reviews", permanent: true },
      { source: "/signal", destination: "/#newsletter", permanent: true },
      {
        source: "/network",
        destination:
          "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
