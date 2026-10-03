import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ieeecsbangalore.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cs.ieeebangalore.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/register',
        destination: 'https://www.explara.com/e/b880283e49a227f5c867eb6f9a7489c8',
        permanent: false, // Use false in case we want to change it later
      },
    ];
  },
};

export default nextConfig;
