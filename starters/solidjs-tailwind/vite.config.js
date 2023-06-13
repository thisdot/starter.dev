/* eslint-env node */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupVitest.js',
    deps: {
      inline: [/solid-js/, /solid-testing-library/],
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
