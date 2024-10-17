/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // rewrites 설정 제거 (Next.js의 기본 라우팅 사용)
}

module.exports = nextConfig
