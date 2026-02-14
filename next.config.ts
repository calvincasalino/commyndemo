import type { NextConfig } from "next";

const repoName = '/commyndemo'; 

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? repoName : undefined,
  assetPrefix: process.env.NODE_ENV === 'production' ? repoName : undefined,
  trailingSlash: true,
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
      {
        protocol: 'https',
        hostname: 'images.myrazz.com',
      },
    ],
  },
};

export default nextConfig;