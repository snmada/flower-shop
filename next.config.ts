import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [`${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`],
  },
};

export default nextConfig;
