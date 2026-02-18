import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Next 16: `next build` does not run linting; run ESLint separately via npm scripts.

  // Ensure repo-root content is included in the serverless bundle when deploying from app/web.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingIncludes: {
    // Include governed content + indexes used by API routes at runtime.
    "**/*": ["content/**"],
  },
};

export default nextConfig;
