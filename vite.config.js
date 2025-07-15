import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from 'vite-plugin-purgecss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
      safelist: [],
    }),
  ],
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
});
