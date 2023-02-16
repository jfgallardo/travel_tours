import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { resolve } from 'pathe';

const pathSrc = resolve(__dirname, './src');

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: `${pathSrc}/assets/locales/**`,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
