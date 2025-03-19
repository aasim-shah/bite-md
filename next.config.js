/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bjorn66.com", "bite.md"],
  },
  webpack: (config) => {
    config.infrastructureLogging = { level: "error" }; // Reduce logging noise
    config.resolve.fallback = { fs: false }; // Prevent unnecessary file system access
    return config;
  },
  experimental: {
    workerThreads: false,
    cpus: 1, // Reduce CPU usage in case of file system overload
  },
};

module.exports = nextConfig;
