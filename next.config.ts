import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://aiagentsfirst.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://aiagentsfirst.com https://cms.aiagentsfirst.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://aiagentsfirst.com https://cms.aiagentsfirst.com",
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
      {
        protocol: "https",
        hostname: "cms.aiagentsfirst.com",
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
  turbopack: {
    rules: {
      "*.glsl": { loaders: ["raw-loader"], as: "*.js" },
      "*.vert": { loaders: ["raw-loader"], as: "*.js" },
      "*.frag": { loaders: ["raw-loader"], as: "*.js" },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
