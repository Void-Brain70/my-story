<template>
  <main class="overflow-x-hidden" role="main">
    <article id="home" class="pt-16 sm:pt-20 md:pt-8" aria-label="Introduction">
      <Hero/>
    </article>
    <article id="about" class="pt-12 sm:pt-16 md:pt-20" aria-label="About Anik Chandra">
      <About/>
    </article>
    <article id="skill" class="pt-12 sm:pt-16 md:pt-20" aria-label="Technical Skills">
      <Skill/>
    </article>
    <article id="projects" class="pt-12 sm:pt-16 md:pt-20" aria-label="Projects">
      <Projects/>
    </article>
    <article id="experience" class="pt-12 sm:pt-16 md:pt-20" aria-label="Work Experience">
      <Experience/>
    </article>
    <article id="education" class="pt-12 sm:pt-16 md:pt-20" aria-label="Education Background">
      <Education/>
    </article>
    <article id="contact" class="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20" aria-label="Get in Touch">
      <Contact/>
    </article>
  </main>
</template>

<script setup lang="ts">
import Hero from "~/components/section/Hero.vue";
import About from "~/components/section/About.vue";
import Skill from "~/components/section/Skill.vue";
import Projects from "~/components/section/Projects.vue";
import Experience from "~/components/section/Experience.vue";
import Education from "~/components/section/Education.vue";
import Contact from "~/components/section/Contact.vue";

useSeoMeta({
  title: 'Anik Chandra | Full-Stack Developer - Portfolio',
  ogTitle: 'Anik Chandra | Full-Stack Developer - Laravel, Vue.js, NestJS Expert',
  description: 'Anik Chandra is a Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js, and NestJS. Explore my portfolio showcasing skills, experience, and projects in modern web development.',
  ogDescription: 'Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js, and NestJS. Building scalable web applications with passion and precision.',
  ogImage: '/images/me.png',
  ogUrl: 'https://anikchandra.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Anik Chandra | Full-Stack Developer',
  twitterDescription: 'Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js, and NestJS. Building scalable web applications.',
  twitterImage: '/images/me.png',
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Anik Chandra',
        url: 'https://anikchandra.dev',
        image: '/images/me.png',
        jobTitle: 'Full-Stack Developer',
        worksFor: { '@type': 'Organization', name: 'Freelance' },
        sameAs: [
          'https://github.com/Void-Brain70',
          'https://www.linkedin.com/in/anik-chandra-a5a62022a/',
        ],
        knowsAbout: ['Laravel', 'Vue.js', 'Nuxt.js', 'NestJS', 'TypeScript', 'JavaScript', 'PHP', 'MySQL', 'MongoDB', 'Tailwind CSS'],
        email: 'mailto:dasssanik124102@gmail.com',
        telephone: '+8801521215839',
        address: { '@type': 'PostalAddress', addressCountry: 'Bangladesh' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Asia Pacific', url: 'https://www.uap-bd.edu/' },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Anik Chandra Portfolio',
        url: 'https://anikchandra.dev',
        description: 'Personal portfolio website of Anik Chandra, a Full-Stack Developer specializing in Laravel, Vue.js, and NestJS.',
        author: { '@type': 'Person', name: 'Anik Chandra' },
      }),
    },
  ],
});
</script>
