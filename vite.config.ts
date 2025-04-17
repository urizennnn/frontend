import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  let apiBase = env.VITE_API_BASE;
  if (!apiBase) {
    throw new Error("VITE_API_BASE is not defined in your .env");
  }
  if (!/^https?:\/\//.test(apiBase)) {
    apiBase = `https://pqqzywg2t3.us-east-1.awsapprunner.com/`;
  }

  return {
    server: {
      proxy: {
        "/api": {
          target: apiBase,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
