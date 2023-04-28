import Layout from './Theme.vue';
import 'vitepress/dist/client/theme-default/styles/fonts.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';
import './styles/style.scss';
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue';
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';
import vue3dragutils from 'vue3-drag-utils';
import 'vue3-drag-utils/es/style.css';
import 'ant-design-vue/dist/antd.css';

// 从Antd中自定义导入组件
import { Table, Row, Col, Button, Form, Radio,Switch } from 'ant-design-vue';

// 定义一个theme对象
const theme = {
  Layout, // Layout组件
  NotFound, // NotFound组件
  enhanceApp: async ({ app }) => {
    // app是Vue 3应用程序实例，router是VitePress的自定义路由，siteData是当前站点级别的元数据的ref。
    app.component('Badge', VPBadge); // 注册Badge组件
    [Table, Row, Col, Button, Form, Radio,Switch].forEach((AntdComponent) =>
      app.use(AntdComponent) // 注册Antd组件
    );
    app.use(vue3dragutils); // 注册vue3dragutils插件
  }
};

export default theme; // 导出theme对象
