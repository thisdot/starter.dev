import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: '.',
  plugins: [
    Vue()
  ],
  test: {
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '~~': path.resolve(__dirname, './'),
      '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/index.mjs'),
      '#head': path.resolve(__dirname, './node_modules/nuxt/dist/head/runtime/index.mjs'),
      '#build': path.resolve(__dirname, './.nuxt')
    },
  }
});
