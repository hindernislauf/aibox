/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next',
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['images.weserv.nl']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  }
}

module.exports = nextConfig
