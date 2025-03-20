import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import naive from 'naive-ui';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);
app.mount('#app');
