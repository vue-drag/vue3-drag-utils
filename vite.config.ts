import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

// Auto import APIs on-demand for Vite
// Useage:https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite';
// On-demand components auto importing for Vue.
// Useage:https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_URL, // Configure in ".env"
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve'
      }),
      AutoImport({
        /* options */
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          // custom
          {
            '@vueuse/core': ['useCloned'],
            axios: [
              // default imports
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          },
          // example type import
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true
          }
        ],
        // 生成自动导入的TS声明文件
        dts: 'src/types/auto-imports.d.ts',
        // 兼容eslint
        eslintrc: {
          enabled: true // Default `false`
        }
      }),
      Components({
        /* options */
        dts: 'src/types/components.d.ts',
        dirs: ['src/components', 'src/views'],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView']
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});
