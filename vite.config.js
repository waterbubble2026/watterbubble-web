import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'express-plugin',
      async configureServer(server) {
        const { default: expressApp } = await import('./api/index.js')
        server.middlewares.use(expressApp)
      }
    }
  ],
})