import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the site works on GitHub Pages
  // (https://<user>.github.io/<repo>/) and any static host.
  base: './',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
