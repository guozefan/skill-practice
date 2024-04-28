import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/style/index.scss';
import router from '@/router/index'
import { createPinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'element-plus/dist/index.css';
import SvgIcon from '@/components/SvgIcon/index.vue'
import '@/assets/iconfont/index.js';

const app = createApp(App)
app.component('SvgIcon', SvgIcon);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount('#app')
