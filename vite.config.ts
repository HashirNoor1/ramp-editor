import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dsv from '@rollup/plugin-dsv';

export default defineConfig({
    plugins: [vue(), dsv()],
    define: { 'process.env': process.env },
    base: './',
    server: { open: '/' },
    build: {
        target: 'esnext',
        commonjsOptions: { transformMixedEsModules: true },
        rollupOptions: { external: ['ramp-pcar'] }
    }
});
