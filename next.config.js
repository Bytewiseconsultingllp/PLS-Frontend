/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "v0.blob.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "picsum.photos",
      "placehold.co",
      "placekitten.com",
      "via.placeholder.com",
      "loremflickr.com",
      "res.cloudinary.com",
      "images.pexels.com",
      "cdn.pixabay.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  // Add webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Only run in production builds
    if (!dev) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
      }

      // Add terser for minification
      config.optimization.minimize = true
    }

    return config
  },
  // Enable HTTP/2 server push
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
