import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/prompt-nh.github.io/',
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}) 