import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Memastikan aset path relatif aman untuk GitHub Pages dan hosting statis
  plugins: [
    react(),
    tailwindcss(),
  ],
})
