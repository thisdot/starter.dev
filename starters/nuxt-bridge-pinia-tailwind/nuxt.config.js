import { defineNuxtConfig } from '@nuxt/bridge'
import { fromNodeMiddleware } from 'h3';

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-bridge-pinia-tailwind starter kit',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://pinia.vuejs.org/ssr/nuxt.html#installation
    '@pinia/nuxt',
    // https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Storybook module configuration: https://storybook.nuxtjs.org/api/options
  storybook: {
    // Options
  },

  hooks: {
    ready(nuxt) {
      // https://github.com/nuxt/bridge/issues/607
      // translate nuxt 2 hook from @nuxt/webpack-edge to nuxt bridge hook
      nuxt.hook('server:devMiddleware', async (devMiddleware) => {
        await nuxt.callHook('server:devHandler', fromNodeMiddleware(devMiddleware));
      });
    },
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },



  devServerHandlers: [],
})
