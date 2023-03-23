import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';

// Auto import APIs on-demand for Vite
// Useage:https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite';
// On-demand components auto importing for Vue.
// Useage:https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      DefineOptions(),
      vue(),
      AutoImport({
        /* options */
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: ['vue'],
        dts: 'src/types/auto-imports.d.ts',
        // 兼容eslint
        eslintrc: {
          enabled: true // Default `false`
        }
      }),
      Components({
        /* options */
        dts: 'src/types/components.d.ts',
        dirs: ['src']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'lib',
      minify: true,
      lib: {
        entry: resolve(__dirname, './index.ts'), //指定组件编译入口文件
        name: 'vue3DragUtils',
        fileName: 'vue3-drag-utils'
      }, //库编译模式配置
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: [
          {
            format: 'es',
            entryFileNames: '[name].js',
            exports: 'named',
            dir: resolve(__dirname, './es')
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            exports: 'named',
            //配置打包根目录
            dir: resolve(__dirname, './lib')
          }
        ]
      } // rollup打包配置
    }
  };
});
