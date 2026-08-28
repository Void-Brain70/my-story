// https://nuxt.com/docs/api/configuration/nuxt-config

// Single source of truth for the canonical origin. Override per-environment
// with NUXT_PUBLIC_SITE_URL (no trailing slash).
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://anik-chandra-me.vercel.app').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/sitemap'],

  runtimeConfig: {
    public: {
      siteUrl,
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID || 'service_gdt557p',
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID || 'template_bkavvk2',
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY || 'GjFU8_AGyYtnNHsiL',
    },
  },

  site: {
    url: siteUrl,
    name: 'Anik Chandra',
    description: 'Portfolio of Anik Chandra - Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js and NestJS.',
    defaultLocale: 'en',
  },

  sitemap: {
    autoLastmod: true,
    xsl: false,
  },

  // Pre-render to static HTML so crawlers get fully-formed markup
  // without executing JavaScript.
  nitro: {
    prerender: {
      routes: ['/', '/robots.txt', '/sitemap.xml'],
      crawlLinks: true,
    },
  },

  css: ['~/assets/css/style.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr',
      },
      title: 'Anik Chandra | Full-Stack Developer',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Anik Chandra' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'msapplication-TileColor', content: '#0a0a0a' },
        { name: 'keywords', content: 'Anik Chandra, Full-Stack Developer, Laravel Developer, Vue.js Developer, Nuxt.js Developer, NestJS Developer, Web Developer Bangladesh, Software Engineer Dhaka, Ed-Tech Developer, Frontend Developer, Backend Developer' },
        // Open Graph defaults (page-level tags override these)
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Anik Chandra' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logo.png' },
        // Skill icons are served from jsDelivr - warm the connection early.
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      ],
    },
  },
})
