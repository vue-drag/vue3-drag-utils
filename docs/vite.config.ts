import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      open: '/contents/Example/Simple.html'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./../docs', import.meta.url))
      }
    }
  };
});
