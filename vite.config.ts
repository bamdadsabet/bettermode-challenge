import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as dotenv from "dotenv";



// load dotenv
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

// https://vitejs.dev/config/
export default defineConfig({
  // FIXME
  plugins: [react()],
  server: {
    port: process.env.PORT as string ?? 8080,
  },
  define: {
    "process.env": {
      PORT: process.env.PORT,
      APP_API_URL: process.env.APP_API_URL,
      APP_TITLE: process.env.APP_TITLE,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@post': path.resolve(__dirname, './src/post'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@routs': path.resolve(__dirname, './src/routs'),
      '@asset': path.resolve(__dirname, './src/asset'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
