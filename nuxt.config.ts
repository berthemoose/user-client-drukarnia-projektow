export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/global.css'],
  modules: ['nuxt-marquee', '@pinia/nuxt', '@nuxt/ui', '@nuxt/image'],
  colorMode: {
    preference: 'light',
    fallback: 'light', 
  },
  appConfig: {
    ui: {
      theme: {
        colors: ['brand', 'neutral']
      },
      colors: {
        primary: 'brand',
        neutral: 'neutral'
      },
    }
  },
  runtimeConfig: {
    cmsUrl: process.env.CMS_URL,
    clientUrl: process.env.CLIENT_URL,
    orderUrl: process.env.ORDER_URL,
    orderApiSecret: process.env.ORDER_API_SECRET,
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    paymentIntentApiSecret: process.env.PAYMENT_INTENT_API_SECRET,
    public: {
      cmsUrl: process.env.CMS_URL,
      orderUrl: process.env.ORDER_URL,
      siteKey: process.env.RECAPTCHA_SITE_KEY,
    }
  },
  vite: {
    server: {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
      }
    }
  },
  routeRules: {
    '/api/**': {
      cors: true
    }
  },
  future: {
    compatibilityVersion: 4
  }
})