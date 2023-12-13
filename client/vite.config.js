import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), env()],
  define: {
    'process.env.VITE_KEY_ID': JSON.stringify(process.env.VITE_KEY_ID),
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
