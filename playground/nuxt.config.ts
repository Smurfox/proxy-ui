import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

// Importa los tipos de tu módulo
import type {} from '../src/module'

export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/icon', '@nuxt/fonts'],
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['motion-v', '@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  proxyUI: {
    colors: {
      primary: '#376fff',
    },
  },
})
