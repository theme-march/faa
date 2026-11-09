import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = (env.VITE_API_TARGET || "https://cms.faa-dubd.org").replace(/\/+$/, "");

  return {
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
          target: `${target}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/images": {
          target: target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/images/, ""), // 🔥 FIX
        },
      },
    },
  };
});
