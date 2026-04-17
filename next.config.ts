import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/claudecode2",
  images: { unoptimized: true },
};

export default nextConfig;
