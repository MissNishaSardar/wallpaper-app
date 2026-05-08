import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "placehold.co",
      //   pathname: "/**",
      // },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
