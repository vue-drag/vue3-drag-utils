import navParser from '@vitepress-custom/vitepress-plugin-nav';
import sidebar from '@vitepress-custom/vitepress-plugin-sidebar';
import docsData from '@vitepress-custom/vitepress-plugin-fetch-docs';

export default async () => {
  let pages = await docsData();
  return {
    title: 'vitepres-custom',
    description: 'vitepres-custom.',
    head: [
      ['link', { rel: 'icon', href: 'favicon.ico' }] //浏览器标签icon
    ],
    themeConfig: {
      pages, // 所有页面
      siteTitle: 'vue3-drag-utils', //导航栏左侧名称
      logo: '/static/nav-logo.svg', //导航栏左侧头像
      lastUpdated: true, //最后更新时间
      outlineTitle: 'Catalog', //右侧 侧边栏标题
      // 导航栏
      nav: [
        ...navParser(pages, 'contents'),
        {
          text: 'Example',
          link: 'https://huyikai.xyz'
        }
      ],
      // 侧边栏
      sidebar: sidebar(pages, 'docs', true),
      // 社交链接
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vitepress-custom' }
      ],
      // 网站页脚
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022'
      },
      // 文档页脚-上下页显示文字
      docFooter: {
        prev: 'Pervious',
        next: 'Next'
      },
      markdown: {
        lineNumbers: true
      }
    }
  };
};
