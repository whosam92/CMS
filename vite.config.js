import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/CMS/', // here GitHub repo name
  plugins: [react()],
})
