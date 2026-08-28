export interface Project {
  title: string
  type: string
  file: string
  description: string
  tech: string[]
  github: string | null
  live: string | null
  color: string
}

export interface EdTechProduct {
  title: string
  mark: string
  type: string
  domain: string
  description: string
  tech: string[]
  live: string
}

export const projects: Project[] = [
  {
    title: 'BD Funnel Builder',
    type: 'Full-Stack Web Platform',
    file: 'funnel-builder.ts',
    description:
      'A full-featured sales funnel platform enabling businesses to create multi-step landing pages, track leads, manage campaigns, and integrate payment systems seamlessly.',
    tech: ['Laravel', 'Nuxt.js', 'NestJS', 'MySQL', 'TailwindCSS', 'Vercel'],
    github: 'https://github.com/Void-Brain70',
    live: 'https://bdfunnelbuilder.com/',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Admin Dashboard System',
    type: 'Backend + Admin Panel',
    file: 'admin-panel.php',
    description:
      'Multi-tenant admin panel with role-based access control, real-time analytics charts, automated report generation, and team management for enterprise-level operations.',
    tech: ['Laravel', 'Filament', 'Vue.js', 'MySQL', 'Chart.js'],
    github: 'https://github.com/Void-Brain70',
    live: null,
    color: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'RESTful API Gateway',
    type: 'Microservice API',
    file: 'api-gateway.ts',
    description:
      'High-performance API gateway built with NestJS handling authentication with JWT, rate limiting, request routing, and structured logging for distributed web applications.',
    tech: ['NestJS', 'TypeScript', 'MongoDB', 'JWT', 'Swagger'],
    github: 'https://github.com/Void-Brain70',
    live: null,
    color: 'from-cyan-600 to-teal-400',
  },
  {
    title: 'Portfolio Website',
    type: 'Frontend / SSR',
    file: 'portfolio.vue',
    description:
      'This very portfolio — a modern, performant SSR website built with Nuxt.js, featuring smooth animations, dark theme, cyan accent design, and full SEO optimization.',
    tech: ['Nuxt.js', 'Vue.js', 'TailwindCSS', 'TypeScript', 'EmailJS'],
    github: 'https://github.com/Void-Brain70',
    live: 'https://anik-chandra-me.vercel.app/',
    color: 'from-teal-400 to-cyan-500',
  },
]

export const edTech: EdTechProduct[] = [
  {
    title: 'Admission Assistant',
    mark: 'AA',
    type: 'University Admission Prep',
    domain: 'admissionassistant.com.bd',
    description:
      'Admission platform for HSC graduates targeting public universities — MCQ practice, model tests, eligibility checking, admission calendar, GPA calculator, and a gamified leaderboard with daily streaks and badges.',
    tech: ['Laravel', 'Nuxt.js', 'MySQL'],
    live: 'https://www.admissionassistant.com.bd/',
  },
  {
    title: 'eTestPaper',
    mark: 'eT',
    type: 'Question Bank & Test Engine',
    domain: 'etestpaper.net',
    description:
      "Bangladesh's first digital test paper, serving 250k+ students. Five years of board question banks, topic-wise MCQ and creative practice across 105+ subjects, leaderboards and mistake review.",
    tech: ['Laravel', 'Nuxt.js', 'MySQL'],
    live: 'https://www.etestpaper.net/',
  },
  {
    title: 'BeBrainer',
    mark: 'BB',
    type: 'Nursing Exam LMS',
    domain: 'bebrainer.app',
    description:
      'Nursing education LMS covering entrance, BSc and diploma tracks — live and recorded classes, online exams, printed books shipped on enrollment, and round-the-clock instructor support.',
    tech: ['Laravel', 'Nuxt.js', 'Filament'],
    live: 'https://www.bebrainer.app/',
  },
  {
    title: 'Learning Bangladesh',
    mark: 'LB',
    type: 'Skill Development LMS',
    domain: 'learningbangladesh.com',
    description:
      'Career skill development delivered in Bengali — structured courses, course bundles, live workshops and e-books, backed by a blog and an online certificate verification system.',
    tech: ['Laravel', 'Vue.js', 'MySQL'],
    live: 'https://www.learningbangladesh.com/',
  },
  {
    title: 'Global Academy',
    mark: 'GA',
    type: 'Language & Test Prep LMS',
    domain: 'globalacademy.com.bd',
    description:
      'Learning management system for language and test preparation — Chinese, Japanese and IELTS programs with live interactive classes, mock IELTS exams and blended online/offline scheduling.',
    tech: ['Laravel', 'Nuxt.js', 'TailwindCSS'],
    live: 'https://www.globalacademy.com.bd/',
  },
  {
    title: 'English A2Z',
    mark: 'A2Z',
    type: 'English Learning Platform',
    domain: 'englisha2z.com.bd',
    description:
      'Premium English platform covering IELTS, PTE, spoken and foundation English through recorded, live and offline batches, with a premium eBook library and mock test simulation.',
    tech: ['Laravel', 'Nuxt.js', 'MySQL'],
    live: 'https://englisha2z.com.bd/',
  },
  {
    title: 'English Fantasy',
    mark: 'EF',
    type: 'English Learning Platform',
    domain: 'englishfantasybd.com',
    description:
      'Online English learning platform delivering spoken English and exam preparation courses with enrollment, class delivery and student progress tracking built in.',
    tech: ['Laravel', 'Vue.js', 'MySQL'],
    live: 'https://englishfantasybd.com/',
  },
  {
    title: 'Karigori Pathsala',
    mark: 'KP',
    type: 'Diploma & Polytechnic LMS',
    domain: 'karigoripathsala.com',
    description:
      'Academic partner for polytechnic and diploma students — semester and department-wise live classes, recorded lessons, suggestion books, printed textbooks and a companion mobile app.',
    tech: ['Laravel', 'Nuxt.js', 'Filament'],
    live: 'https://www.karigoripathsala.com/',
  },
]
