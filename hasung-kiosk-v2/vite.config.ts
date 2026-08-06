import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 루트 정적 앱과 같은 방식으로 하위 경로 배포가 가능하도록 상대 경로 사용
  base: './',
  build: {
    outDir: 'dist'
  }
})
