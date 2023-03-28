import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Auto import APIs on-demand for Vite
// Useage:https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      open: '/contents/Example/simple.html'
    },
    plugins: [
      AutoImport({
        /* options */
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue'
        ],
        // Generate automatically imported TS claim file
        dts: './.vitepress/auto-imports.d.ts'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./../docs', import.meta.url))
      }
    }
  };
});
