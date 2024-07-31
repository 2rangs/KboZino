import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // 라우터 설정 가져오기

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router); // VueRouter가 아니라 router를 사용합니다.
app.mount('#app');
