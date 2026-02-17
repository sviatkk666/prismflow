/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@prismflow/shared-types'],
  async rewrites() {
    return [
      {
        source: '/api/proxy/:service/:path*',
        destination: '/api/proxy/:service/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
