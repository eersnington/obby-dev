import type { NextConfig } from 'next';
import './env';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
};

export default nextConfig;
