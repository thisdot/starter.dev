/// <reference types="vitest" />
/// <reference types="vite/client" />

import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
        inline: [/solid-start/, /solid-testing-library/],
      },
    },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
