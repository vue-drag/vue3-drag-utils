import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import './assets/styles/main.scss';

import vue3DragUtils from 'vue3-drag-utils';
import 'vue3-drag-utils/es/style.css';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vue3DragUtils);
console.log(app._context.components);
app.mount('#app');
