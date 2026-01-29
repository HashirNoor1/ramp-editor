import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    define: { 'process.env': process.env },
    base: './',
    server: { open: '/' },
    build: {
        target: 'esnext',
        commonjsOptions: { transformMixedEsModules: true },
        rollupOptions: { external: ['ramp-pcar'] }
    }
});
