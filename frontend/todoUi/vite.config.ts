import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   define: {
    __API_ORIGIN__: JSON.stringify(process.env.VITE_API_BASE_SERVER || "https://todoapp-cd8m.onrender.com"),
  },
  plugins: [react()],
})
