// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  imports: {
    dirs: ['composables/**']
  },

  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
    public: {}
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '~/modules/extend-routes.ts',
    '@nuxt/image'
  ],

  nitro: {
    storage: {
      data: {
        driver: 'memory'
      }
    },
    devStorage: {
      data: {
        driver: 'fs-lite',
        base: './.data/kv'
      }
    }
  },

  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: [
        'html',
        'markdown',
        'vue',
        'typescript',
        'javascript'
      ]
    }
  },

  routeRules: {
    '/': {
      prerender: true
    }
  }
})
