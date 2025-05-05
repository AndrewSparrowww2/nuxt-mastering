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
    openaiProjectId: process.env.NUXT_OPENAI_PROJECT_ID,
    public: {}
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/mdc', '~/modules/extend-routes.ts'],

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
  }
})
