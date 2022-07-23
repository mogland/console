import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCommonjs()
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // https://github.com/vitejs/vite/issues/5308#issuecomment-1010652389
        esbuildCommonjs(["react-photo-view", "brilliant-editor"])
      ]
    }
  }
})
