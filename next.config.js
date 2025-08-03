/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-apexcharts', 'apexcharts'],
  experimental: {
    appDir: false // Using pages directory for now
  },
  output: 'standalone', // Enable for Docker
}

module.exports = nextConfig