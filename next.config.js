/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: 'https://app-insight-production.up.railway.app/api/v1',
    ENV: 'production',
    ACCESS_TOKEN_EXPIRATION_TIME: '3600000',
    TIME_BUFFER: '300000',
    EMAIL: 'test@gmail.com',
    PASSWORD: 'Test@123',
  },
};

module.exports = nextConfig;
