import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/multi-sites/', // correspond à ton nom de repo GitHub
  plugins: [react()],
})
