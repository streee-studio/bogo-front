// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/common.less'],
  devtools: { enabled: true },

  devServer:{
    host: 'localhost', // 사용하고 싶은 호스트 이름으로 변경
    port: 4014, // 필요한 경우 포트 번호도 변경 가능
  },
  app:{
    head:{
      script:[
        { src: 'https://kit.fontawesome.com/593448c29d.js' },
      ]
    }
  },
  modules:[
    ['dayjs-nuxt',{
      locales:['ko'],
      defaultLocale:'ko'
    }],
  ],
  plugins: [
    '~/plugins/numeral.js',
  ],
  // 설정
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    loaders: {
      less: {
        // Less 옵션 설정
      }
    }
  },
  routeRules: {
    '/apis/**': {
      proxy: {
        to: process.env.NODE_ENV === 'development'
            ? 'http://localhost/bogo-back/public/**'
            : 'https://bogo-api.streee.com/**',
      },
    },
  },
  runtimeConfig: {
    public: {
      siteURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4014' : 'https://buy.one-get.one',
    },
  },
  nitro: {
    preset: "vercel",
    experimental: {
      websocket: true
    }
  },
})
