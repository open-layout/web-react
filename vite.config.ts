import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': new URL('src/components', import.meta.url).pathname,
      '@/pages': new URL('src/pages', import.meta.url).pathname,
      '@': new URL('src', import.meta.url).pathname,
      // Añade más alias según la estructura de tu proyecto
    },
  },
});
