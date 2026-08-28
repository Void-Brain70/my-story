<template>
  <div class="overflow-x-hidden">
    <div class="pt-16 sm:pt-20 md:pt-8">
      <Hero/>
    </div>
    <div class="pt-12 sm:pt-16 md:pt-20">
      <About/>
    </div>
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Skill/>
    </div>
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Projects/>
    </div>
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Experience/>
    </div>
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Education/>
    </div>
    <div class="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20">
      <Contact/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/section/Hero.vue";
import About from "~/components/section/About.vue";
import Skill from "~/components/section/Skill.vue";
import Projects from "~/components/section/Projects.vue";
import Experience from "~/components/section/Experience.vue";
import Education from "~/components/section/Education.vue";
import Contact from "~/components/section/Contact.vue";

import { profile, sameAs } from "~/data/profile";
import { projects, edTech } from "~/data/projects";
import { experiences } from "~/data/experience";
import { education } from "~/data/education";
import { allSkillNames } from "~/data/skills";

const { public: { siteUrl } } = useRuntimeConfig()
const origin = String(siteUrl).replace(/\/$/, '')

// Title stays under ~60 chars and description under ~160 so neither is
// truncated in the SERP.
const pageTitle = 'Anik Chandra | Full-Stack Developer (Laravel, Nuxt, NestJS)'
const pageDescription =
    'Anik Chandra — Full-Stack Developer in Dhaka, Bangladesh. 3+ years building Laravel, Vue.js, Nuxt.js and NestJS applications, including 30+ ed-tech platforms.'

// Dedicated 1200x630 social card - square avatars get cropped badly by X and
// LinkedIn, and Google wants >=1200px wide for image-rich results.
const ogImage = `${origin}/images/og-image.png`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,

  ogType: 'profile',
  ogSiteName: profile.name,
  ogLocale: 'en_US',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: `${origin}/`,
  ogImage,
  ogImageSecureUrl: ogImage,
  ogImageType: 'image/png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${profile.name} — ${profile.jobTitle}`,
  profileFirstName: profile.firstName,
  profileLastName: profile.lastName,

  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
  twitterImageAlt: `${profile.name} — ${profile.jobTitle}`,
})

const currentRole = experiences[0]!

const personId = `${origin}/#person`
const websiteId = `${origin}/#website`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      givenName: profile.firstName,
      familyName: profile.lastName,
      url: `${origin}/`,
      mainEntityOfPage: { '@id': `${origin}/#webpage` },
      image: {
        '@type': 'ImageObject',
        '@id': `${origin}/#primaryimage`,
        url: `${origin}/images/me.png`,
        width: 500,
        height: 500,
        caption: `${profile.name} — ${profile.jobTitle}`,
      },
      jobTitle: profile.jobTitle,
      description: pageDescription,
      worksFor: {
        '@type': 'Organization',
        name: currentRole.company,
        url: currentRole.link,
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: profile.jobTitle,
        occupationLocation: {
          '@type': 'Country',
          name: profile.countryName,
        },
        skills: allSkillNames.join(', '),
      },
      sameAs,
      knowsAbout: allSkillNames,
      knowsLanguage: [
        { '@type': 'Language', name: 'English', alternateName: 'en' },
        { '@type': 'Language', name: 'Bengali', alternateName: 'bn' },
      ],
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.locality,
        addressRegion: profile.region,
        addressCountry: profile.country,
      },
      alumniOf: education.map(edu => ({
        '@type': 'EducationalOrganization',
        name: edu.institute,
        url: edu.link,
      })),
      // Roles carry the dates that the Experience timeline shows visually.
      hasCredential: education.map(edu => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: edu.credential,
        educationalLevel: edu.degree,
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: edu.institute,
          url: edu.link,
        },
        dateCreated: edu.endDate,
      })),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${origin}/`,
      name: `${profile.name} Portfolio`,
      description: pageDescription,
      inLanguage: 'en',
      publisher: { '@id': personId },
      author: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${origin}/#webpage`,
      url: `${origin}/`,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      mainEntity: { '@id': personId },
      primaryImageOfPage: { '@id': `${origin}/#primaryimage` },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${origin}/#projects`,
      name: 'Featured Projects',
      numberOfItems: projects.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: projects.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          genre: project.type,
          keywords: project.tech.join(', '),
          author: { '@id': personId },
          ...(project.live ? { url: project.live } : {}),
        },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${origin}/#ed-tech`,
      name: 'Ed-Tech Platforms',
      numberOfItems: edTech.length,
      itemListElement: edTech.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'WebApplication',
          name: item.title,
          url: item.live,
          description: item.description,
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web',
          keywords: item.tech.join(', '),
          author: { '@id': personId },
        },
      })),
    },
  ],
}

useHead({
  link: [
    { rel: 'canonical', href: `${origin}/` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>
