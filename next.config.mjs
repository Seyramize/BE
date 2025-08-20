/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const isAnalyze = process.env.ANALYZE === 'true';


export default nextConfig
