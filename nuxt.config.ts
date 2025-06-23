// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/icon',
    'nuxt-auth-sanctum'
  ],
  sanctum: {
    baseUrl: 'http://localhost:8000',
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/user'
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN'
    },
    redirect: {
      keepRequestedRoute: true,
      onLogin: '/dashboard',
      onLogout: '/',
      onAuthOnly: '/',
      onGuestOnly: '/dashboard'
    },
    globalMiddleware: {
      enabled: true,
    },
  },
})