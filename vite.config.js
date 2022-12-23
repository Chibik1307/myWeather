import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/myWeather/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/variables.scss";`,
      },
    },
  },
  plugins: [react(), svgr()],
  server: {
    open: true,
  },
});
