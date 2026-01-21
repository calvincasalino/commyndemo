import type { NextConfig } from "next";

const repoName = '/dwelloodemo'; 

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? repoName : undefined,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;