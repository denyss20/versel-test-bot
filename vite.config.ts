import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

dotenvConfig();

export default defineConfig({
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@routes": resolve(__dirname, "src/routes"),
      "@ui": resolve(__dirname, "src/ui"),
      "@constants": resolve(__dirname, "src/constants"),
      "@context": resolve(__dirname, "src/context"),
      "@providers": resolve(__dirname, "src/providers"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@utility": resolve(__dirname, "src/utility"),
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
    ,
  ],
  // server: {
  //   port: 3000,
  //   proxy: {
  //     "/api": {
  //       target: process.env.VITE_PROXY_URL,
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
