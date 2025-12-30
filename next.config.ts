import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // يسمح بأي دومين
        port: "",
        pathname: "/**", // يسمح بأي مسار
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // زيادة الحد الأقصى لحجم البودي
    },
  },
};

export default nextConfig;
