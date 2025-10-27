import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Frontend-only; no special plugins required.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
