import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // tree shake @icon-park/react
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "icon-park": ["@icon-park/react"],
          "vditor": ["vditor"],
        },
      },
    },
  },
});
