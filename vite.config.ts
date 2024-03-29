import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BUILD_MODE === "BUILT_IN" ? "/console" : "/",
  plugins: [react()],
  // alias
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@type": path.resolve(__dirname, "src/types"),
      "@states": path.resolve(__dirname, "src/states"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@libs": path.resolve(__dirname, "src/libs"),
    },
  },
});
