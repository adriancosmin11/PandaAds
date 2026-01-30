/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite orice domeniu HTTPS (pentru development)
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Permite localhost pentru testing local
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Only proxy the exact `/admin` root path — leave nested admin routes
        // (like `/admin/panel` or `/admin/panel/editor`) to be handled normally
        // by the app. This avoids redirect/rewrite loops during development.
        {
          source: '/admin',
          destination: '/api/auth-proxy?path=/admin',
        },
      ],
    };
  },
};

export default nextConfig;
