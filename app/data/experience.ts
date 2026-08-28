export interface ExperienceItem {
  period: string
  /** ISO dates backing the visible `period` label - used by JSON-LD only. */
  startDate: string
  endDate: string | null
  role: string
  company: string
  link: string
  description: string
  logo: string
  tech: string[]
}

export const experiences: ExperienceItem[] = [
  {
    period: 'Jan 2026 – Present',
    startDate: '2026-01',
    endDate: null,
    role: 'Software Developer Level-II',
    company: 'Nextive Solution',
    link: 'https://www.nextivesolution.com/',
    description:
      'Designing and shipping features across the full stack — Laravel and NestJS services, REST APIs and real-time modules on the backend, server-rendered Nuxt 3 frontends in TypeScript on the front. Also own deployments and CI pipelines on Vercel, Laravel Forge and GitHub Actions, along with schema design, query optimisation and code review.',
    logo: '/images/experience/nsLogo.jpeg',
    tech: ['Laravel', 'NestJS', 'Nuxt.js', 'TypeScript', 'MySQL', 'Vercel', 'GitHub Actions'],
  },
  {
    period: 'Dec 2023 – Dec 2025',
    startDate: '2023-12',
    endDate: '2025-12',
    role: 'Software Developer Level-I',
    company: 'BD Funnel Builder',
    link: 'https://bdfunnelbuilder.com/',
    description:
      'Delivered client features end to end on a Laravel and MySQL backend — REST APIs, authentication and role management, queued jobs and Filament admin panels — together with the Vue.js and TailwindCSS interfaces that consumed them. Debugged production issues, tuned slow queries and kept releases moving through a Git-based review workflow.',
    logo: '/images/experience/bdfb.png',
    tech: ['Laravel', 'PHP', 'Filament', 'Vue.js', 'MySQL', 'TailwindCSS', 'Forge'],
  },
  {
    period: 'Sep 2022 – Sep 2023',
    startDate: '2022-09',
    endDate: '2023-09',
    role: 'Junior Software Developer',
    company: 'Nextive Solution',
    link: 'https://www.nextivesolution.com/',
    description:
      'Built interactive UIs and admin dashboards with Vue.js, TailwindCSS and Bootstrap, turning designs into responsive, cross-browser components. Integrated REST APIs alongside the backend team, verified endpoints in Postman, and learned the day-to-day discipline of branching, code review and clean, reusable component structure.',
    logo: '/images/experience/nsLogo.jpeg',
    tech: ['Vue.js', 'JavaScript', 'TailwindCSS', 'Bootstrap', 'REST APIs', 'Postman', 'Git'],
  },
]
