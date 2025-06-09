// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/icon'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  }
})