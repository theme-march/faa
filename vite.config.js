import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api", "import"],
      },
    },
  },
  server: {
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://cms.faa-dubd.org/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/images": {
        target: "https://cms.faa-dubd.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ""), // 🔥 FIX
      },
    },
  },
});
