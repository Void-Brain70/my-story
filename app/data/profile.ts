/**
 * Single source of truth for identity data.
 *
 * Everything here is rendered somewhere on the page AND fed into the JSON-LD
 * graph in `pages/index.vue`. Keeping one copy is what stops structured data
 * from drifting away from visible content - Google treats that drift as a
 * structured-data violation.
 */

export const profile = {
  name: 'Anik Chandra',
  firstName: 'Anik',
  lastName: 'Chandra',
  initials: 'AC',
  jobTitle: 'Full-Stack Developer',
  headline: 'Full-Stack Developer specializing in Laravel, Vue.js, Nuxt.js and NestJS',
  email: 'dasssanik124102@gmail.com',
  phone: '+8801521215839',
  phoneDisplay: '+880 1521 215 839',
  locality: 'Dhaka',
  region: 'Dhaka Division',
  country: 'BD',
  countryName: 'Bangladesh',
  resume: '/docs/Resume_of_Anik_Chandra.pdf',
  yearsExperience: 3,
} as const

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Void-Brain70', icon: 'mdi:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anik-chandra-a5a62022a/', icon: 'mdi:linkedin' },
  { label: 'WhatsApp', href: `https://wa.me/${profile.phone.replace('+', '')}`, icon: 'mdi:whatsapp' },
] as const

/** Profiles that identify the same person - emitted as schema.org `sameAs`. */
export const sameAs = socials
  .filter(s => s.label !== 'WhatsApp')
  .map(s => s.href)
