import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Next 16: `next build` does not run linting; run ESLint separately via npm scripts.

  // Vercel/serverless: include repo-root content indexes in the output bundle.
  outputFileTracingRoot: path.join(__dirname, "../../.."),
  outputFileTracingIncludes: {
    // Keep this broad so new governed indexes don’t “disappear” at runtime.
    "**/*": ["content/**"],
  },
};

export default nextConfig;
