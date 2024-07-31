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
      '/image': {
        target: 'https://sports-phinf.pstatic.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image/, '')
      }
    }
  }
});
