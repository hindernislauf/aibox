/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next',
  experimental: {
    appDir: false
  },
  // 정적 내보내기 설정 추가
  output: 'standalone',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
