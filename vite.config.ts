import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

dotenvConfig();

export default defineConfig({
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@constants": resolve(__dirname, "src/constants"),
      "@routes": resolve(__dirname, "src/routes"),
      "@context": resolve(__dirname, "src/context"),
      "@providers": resolve(__dirname, "src/providers"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@utility": resolve(__dirname, "src/utility"),
    },
  },
  plugins: [
    react(),
    // eslint()
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_PROXY_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
