import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/', // Ensure this is correct for your hosting environment
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allows access from network
  },
  build: {
    outDir: 'dist', // Ensure correct build directory
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensures React is injected in every file
  },
});
