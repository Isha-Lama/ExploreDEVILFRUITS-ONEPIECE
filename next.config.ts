import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.api-onepiece.com",
        pathname: "/**",
      },
    ],
  },



};

export default nextConfig;
