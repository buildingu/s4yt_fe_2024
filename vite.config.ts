import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "https://localhost:4000",
          changeOrigin: true,
          secure: true
        },
        "/socket.io/": {
          target: "https://localhost:4000",
          changeOrigin: true,
          ws: true
        }
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
        generateScopedName:
          mode === "production"
            ? "[hash:base64:8]"
            : "[local]_[hash:base64:5]"
      }
    },
    plugins: [react(), tsconfigPaths()],
    build: { outDir: "build" }
  }
});
