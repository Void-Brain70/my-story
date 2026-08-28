export interface Skill {
  name: string
  image: string
  level: number
}

export const programmingLanguages: Skill[] = [
  { name: 'JavaScript', image: '/images/skill/js.png', level: 90 },
  { name: 'TypeScript', image: '/images/skill/ts.svg', level: 90 },
  { name: 'PHP', image: '/images/skill/php.png', level: 85 },
  { name: 'Python', image: '/images/skill/python.png', level: 75 },
  { name: 'C++', image: '/images/skill/c_plus.png', level: 70 },
  { name: 'C', image: '/images/skill/c.png', level: 70 },
]

export const frameworks: Skill[] = [
  { name: 'Laravel', image: '/images/skill/laravel2.png', level: 90 },
  { name: 'VueJS', image: '/images/skill/Vue.png', level: 85 },
  { name: 'NuxtJS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg', level: 80 },
  { name: 'NestJS', image: '/images/skill/NestJS.svg', level: 70 },
  { name: 'Filament', image: '/images/skill/filament.png', level: 65 },
]

export const tools: Skill[] = [
  { name: 'Postman', image: '/images/skill/postman.svg', level: 85 },
  { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 80 },
  { name: 'GitHub Actions', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', level: 75 },
  { name: 'Vercel', image: '/images/skill/vercel.svg', level: 70 },
  { name: 'Forge', image: '/images/skill/forge.webp', level: 60 },
]

export const databases: Skill[] = [
  { name: 'MySQL', image: '/images/skill/mysql.png', level: 85 },
  { name: 'SQLite', image: '/images/skill/sqlite.png', level: 80 },
  { name: 'MongoDB', image: '/images/skill/mongo.png', level: 65 },
]

export const webDesign: Skill[] = [
  { name: 'HTML', image: '/images/skill/html.png', level: 95 },
  { name: 'CSS', image: '/images/skill/css.jpg', level: 90 },
  { name: 'TailwindCSS', image: '/images/skill/tailwind.png', level: 85 },
  { name: 'Bootstrap', image: '/images/skill/bootstrap.png', level: 80 },
  { name: 'Sass', image: '/images/skill/sass.png', level: 75 },
  { name: 'Vuetify', image: '/images/skill/vuetify.svg', level: 60 },
  { name: 'PrimeVue', image: '/images/skill/primevue.png', level: 55 },
]

export const skillGroups = [
  { key: 'languages', label: 'Languages', items: programmingLanguages },
  { key: 'frameworks', label: 'Frameworks', items: frameworks },
  { key: 'tools', label: 'Tools', items: tools },
  { key: 'databases', label: 'Databases', items: databases },
  { key: 'webDesign', label: 'Web Design', items: webDesign },
] as const

/**
 * Flat skill list, deduplicated - feeds schema.org `knowsAbout` so the
 * structured data always mirrors the rendered Skills grid.
 */
export const allSkillNames: string[] = [
  ...new Set(skillGroups.flatMap(g => g.items.map(i => i.name))),
]
