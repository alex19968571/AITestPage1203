import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // 載入環境變數
    const env = loadEnv(mode, '.', '');
    
    return {
      // [新增] 這行是解決 GitHub Pages 白畫面的關鍵！
      base: './', 

      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      
      // 這裡保留了你原本的 "轉接頭" 邏輯
      // 這樣你其實 "不需要" 去改 geminiService.ts 裡的 process.env 寫法也能跑
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
