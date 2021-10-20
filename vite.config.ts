import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // resolve: {
  //   alias: {
  //     '@/': `${path.resolve(__dirname, 'src')}/`
  //   }
  // }
  // server: {
  //   proxy: {
  //     "/alumni": {
  //       target: 'http://172.16.1.19:9091/alumni/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/alumni/, '')
  //     }
  //   }
  // }
})
