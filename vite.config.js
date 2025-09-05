import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Quiz_App/",   // 👈 this line tells Vite the repo name for GitHub Pages
})
