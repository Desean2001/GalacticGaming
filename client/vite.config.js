import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    'process.env.VITE_KEY_ID': (process.env.VITE_KEY_ID),
  },
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true
      }
    }
  },
})
