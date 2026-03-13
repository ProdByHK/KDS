import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/KDS",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
