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
  // 라우팅 설정 명시적 추가
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  },
  // 빌드 출력 경로 설정
  outputFileTracing: true,
  generateBuildId: async () => {
    return 'build-' + Date.now();
  }
}

module.exports = nextConfig
