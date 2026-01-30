/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/admin/:path*',
          destination: '/api/auth-proxy?path=/admin/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
