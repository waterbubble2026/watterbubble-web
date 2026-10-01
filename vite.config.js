import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import expressApp from './api/index.js'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'express-plugin',
      configureServer(server) {
        server.middlewares.use(expressApp)
      }
    }
  ],
})