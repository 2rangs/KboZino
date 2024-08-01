import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api-gw.sports.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/player': {
        target: 'https://sports.news.naver.com/kbaseball/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/player/, '')
      },
      '/image': {
        target: 'https://lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/person/middle/2024/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image/, '')
      }
    }
  }
});
