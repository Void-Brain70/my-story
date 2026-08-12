// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/sitemap'],

  runtimeConfig: {
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID || 'service_gdt557p',
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID || 'template_bkavvk2',
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY || 'GjFU8_AGyYtnNHsiL',
    },
  },

  site: {
    url: 'https://anik-chandra-me.vercel.app/',
    name: 'Anik Chandra',
  },
  css: ['~/assets/css/style.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Anik Chandra | Full-Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Anik Chandra' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'msapplication-TileColor', content: '#0a0a0a' },
        // Primary Meta Tags
        { name: 'title', content: 'Anik Chandra | Full-Stack Developer - Laravel, Vue.js, NestJS Expert' },
        { name: 'description', content: 'Anik Chandra is a Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js, and NestJS. Building scalable web applications with modern technologies. Based in Bangladesh.' },
        { name: 'keywords', content: 'Anik Chandra, Full-Stack Developer, Laravel Developer, Vue.js Developer, NestJS Developer, Nuxt.js, Web Developer Bangladesh, Software Engineer, Frontend Developer, Backend Developer' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Anik Chandra' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@anikchandra' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://anik-chandra-me.vercel.app/' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logo.png' },
      ],
    },
  },
})