import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "/alumni": {
        target: 'http://yapi.dufe.tech/mock/73/alumni/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alumni/, '')
      }
    }
  }
})
