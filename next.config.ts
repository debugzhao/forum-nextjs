import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 图片域名
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
};

export default nextConfig;
