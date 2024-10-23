/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tier-model-calculator',
  assetPrefix: '/tier-model-calculator',
}

module.exports = nextConfig