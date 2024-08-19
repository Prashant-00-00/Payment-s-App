import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173 // optional, specify if different from default
  },
  base: '/', // Add this line to specify the base path
  plugins: [react()]
});
