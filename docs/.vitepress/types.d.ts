declare module '@vitepress-custom/vitepress-plugin-nav';
declare module '@vitepress-custom/vitepress-plugin-fetch-docs';
declare module '@vitepress-custom/vitepress-plugin-sidebar';
declare module 'vitepress/dist/client/theme-default/composables/sidebar.js';
declare module '*.vue' {
  // 引入vue模块中ts的方法
  import type { DefineComponent } from 'vue';
  // 定义vue组件以及类型注解
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
