import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/autoservice-garage-khimki";

const nextConfig: NextConfig = {
  assetPrefix: isGitHubPages ? githubPagesBasePath : undefined,
  basePath: isGitHubPages ? githubPagesBasePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? githubPagesBasePath : "",
  },
  images: {
    unoptimized: isGitHubPages,
  },
  reactStrictMode: true,
};

export default nextConfig;
