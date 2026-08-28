<template>
  <section id="projects" class="relative text-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-16">
    <!-- Background orbs -->
    <div class="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
    <div class="absolute bottom-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

    <div class="relative z-10">
      <h1
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
               bg-gradient-to-r from-cyan-500 to-teal-500
               bg-clip-text text-transparent mb-4 sm:mb-6"
      >
        &lt; Projects /&gt;
      </h1>
      <p class="text-center text-gray-400 text-sm sm:text-base mb-10 sm:mb-14 max-w-xl mx-auto">
        A selection of projects I've built — from full-stack platforms and API services
        to <span class="text-cyan-400 font-semibold">30+ ed-tech products</span> serving learners across Bangladesh.
      </p>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div
            v-for="(project, i) in projects"
            :key="i"
            class="group relative"
            v-intersect="() => visible[i] = true"
            :class="visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transition: 'opacity 0.6s ease, transform 0.6s ease', transitionDelay: `${i * 120}ms` }"
        >
          <!-- Glow -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

          <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-2xl overflow-hidden group-hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col">
            <!-- Card top gradient bar -->
            <div :class="`h-1.5 bg-gradient-to-r ${project.color}`"></div>

            <!-- Card Header -->
            <div :class="`bg-gradient-to-r ${project.color} p-4 sm:p-5 relative overflow-hidden`">
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="relative z-10 flex items-center justify-between">
                <div class="flex gap-1.5">
                  <span class="w-2.5 h-2.5 bg-red-400/80 rounded-full"></span>
                  <span class="w-2.5 h-2.5 bg-yellow-400/80 rounded-full"></span>
                  <span class="w-2.5 h-2.5 bg-green-400/80 rounded-full"></span>
                </div>
                <span class="text-white/80 text-xs font-mono">{{ project.file }}</span>
              </div>
              <div class="relative z-10 mt-3">
                <h3 class="text-white text-lg sm:text-xl font-bold">{{ project.title }}</h3>
                <p class="text-white/60 text-xs mt-0.5">{{ project.type }}</p>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 sm:p-6 flex flex-col flex-1">
              <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 flex-1">
                {{ project.description }}
              </p>

              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span
                    v-for="(tech, j) in project.tech"
                    :key="j"
                    class="px-2.5 py-1 text-[10px] sm:text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Links -->
              <div class="flex gap-3">
                <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-white/5 border border-white/10 text-gray-300 rounded-full hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300"
                >
                  <Icon name="mdi:github" class="w-4 h-4" />
                  Code
                </a>
                <a
                    v-if="project.live"
                    :href="project.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/30"
                >
                  <Icon name="mdi:open-in-new" class="w-4 h-4" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ed-Tech Platforms -->
      <div class="mt-16 sm:mt-20">
        <div class="flex items-center gap-4 mb-3">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/40"></div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
            Ed-Tech <span class="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Platforms</span>
          </h2>
          <div class="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/40"></div>
        </div>
        <p class="text-center text-gray-500 font-mono text-xs sm:text-sm mb-8 sm:mb-10">
          // live products used by students nationwide
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <a
              v-for="(item, i) in edTech"
              :key="i"
              :href="item.live"
              target="_blank"
              rel="noopener noreferrer"
              class="edtech-card group/card relative flex flex-col bg-gradient-to-br from-[#161616] to-[#0f0f0f] border border-white/10 rounded-xl p-4 sm:p-5
                     hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
              v-intersect="() => (edVisible[i] = true)"
              :class="edVisible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="flex items-start justify-between gap-2 mb-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center
                          font-mono font-bold text-cyan-400 text-xs sm:text-sm group-hover/card:bg-cyan-500/25 transition-colors duration-300">
                {{ item.mark }}
              </div>
              <Icon
                  name="mdi:arrow-top-right"
                  class="w-4 h-4 text-gray-600 group-hover/card:text-cyan-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-300"
              />
            </div>

            <h3 class="text-white font-bold text-sm sm:text-base leading-snug group-hover/card:text-cyan-400 transition-colors duration-300">
              {{ item.title }}
            </h3>
            <p class="text-cyan-400/70 text-[10px] sm:text-[11px] font-medium mt-0.5 mb-2.5">{{ item.type }}</p>

            <p class="text-gray-400 text-xs leading-relaxed flex-1 mb-3.5">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                  v-for="(tech, j) in item.tech"
                  :key="j"
                  class="px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400 rounded-full
                         group-hover/card:border-cyan-500/20 group-hover/card:text-cyan-400/80 transition-colors duration-300"
              >
                {{ tech }}
              </span>
            </div>

            <span class="font-mono text-[10px] text-gray-600 truncate pt-2.5 border-t border-white/5">{{ item.domain }}</span>
          </a>
        </div>

        <!-- Volume callout -->
        <div class="mt-8 sm:mt-10 flex justify-center">
          <div class="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <span class="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">30+</span>
            <span class="text-gray-400 text-xs sm:text-sm leading-snug text-left">
              ed-tech platforms delivered<br class="hidden sm:block" />
              <span class="text-gray-500">— the products above are a sample</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean[]>([]);
const edVisible = ref<boolean[]>([]);

const projects = [
  {
    title: "BD Funnel Builder",
    type: "Full-Stack Web Platform",
    file: "funnel-builder.ts",
    description: "A full-featured sales funnel platform enabling businesses to create multi-step landing pages, track leads, manage campaigns, and integrate payment systems seamlessly.",
    tech: ["Laravel", "Nuxt.js", "NestJS", "MySQL", "TailwindCSS", "Vercel"],
    github: "https://github.com/Void-Brain70",
    live: "https://bdfunnelbuilder.com/",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Admin Dashboard System",
    type: "Backend + Admin Panel",
    file: "admin-panel.php",
    description: "Multi-tenant admin panel with role-based access control, real-time analytics charts, automated report generation, and team management for enterprise-level operations.",
    tech: ["Laravel", "Filament", "Vue.js", "MySQL", "Chart.js"],
    github: "https://github.com/Void-Brain70",
    live: null,
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "RESTful API Gateway",
    type: "Microservice API",
    file: "api-gateway.ts",
    description: "High-performance API gateway built with NestJS handling authentication with JWT, rate limiting, request routing, and structured logging for distributed web applications.",
    tech: ["NestJS", "TypeScript", "MongoDB", "JWT", "Swagger"],
    github: "https://github.com/Void-Brain70",
    live: null,
    color: "from-cyan-600 to-teal-400",
  },
  {
    title: "Portfolio Website",
    type: "Frontend / SSR",
    file: "portfolio.vue",
    description: "This very portfolio — a modern, performant SSR website built with Nuxt.js, featuring smooth animations, dark theme, cyan accent design, and full SEO optimization.",
    tech: ["Nuxt.js", "Vue.js", "TailwindCSS", "TypeScript", "EmailJS"],
    github: "https://github.com/Void-Brain70",
    live: "https://anik-chandra-me.vercel.app/",
    color: "from-teal-400 to-cyan-500",
  },
];

const edTech = [
  {
    title: "Admission Assistant",
    mark: "AA",
    type: "University Admission Prep",
    domain: "admissionassistant.com.bd",
    description: "Admission platform for HSC graduates targeting public universities — MCQ practice, model tests, eligibility checking, admission calendar, GPA calculator, and a gamified leaderboard with daily streaks and badges.",
    tech: ["Laravel", "Nuxt.js", "MySQL"],
    live: "https://www.admissionassistant.com.bd/",
  },
  {
    title: "eTestPaper",
    mark: "eT",
    type: "Question Bank & Test Engine",
    domain: "etestpaper.net",
    description: "Bangladesh's first digital test paper, serving 250k+ students. Five years of board question banks, topic-wise MCQ and creative practice across 105+ subjects, leaderboards and mistake review.",
    tech: ["Laravel", "Nuxt.js", "MySQL"],
    live: "https://www.etestpaper.net/",
  },
  {
    title: "BeBrainer",
    mark: "BB",
    type: "Nursing Exam LMS",
    domain: "bebrainer.app",
    description: "Nursing education LMS covering entrance, BSc and diploma tracks — live and recorded classes, online exams, printed books shipped on enrollment, and round-the-clock instructor support.",
    tech: ["Laravel", "Nuxt.js", "Filament"],
    live: "https://www.bebrainer.app/",
  },
  {
    title: "Learning Bangladesh",
    mark: "LB",
    type: "Skill Development LMS",
    domain: "learningbangladesh.com",
    description: "Career skill development delivered in Bengali — structured courses, course bundles, live workshops and e-books, backed by a blog and an online certificate verification system.",
    tech: ["Laravel", "Vue.js", "MySQL"],
    live: "https://www.learningbangladesh.com/",
  },
  {
    title: "Global Academy",
    mark: "GA",
    type: "Language & Test Prep LMS",
    domain: "globalacademy.com.bd",
    description: "Learning management system for language and test preparation — Chinese, Japanese and IELTS programs with live interactive classes, mock IELTS exams and blended online/offline scheduling.",
    tech: ["Laravel", "Nuxt.js", "TailwindCSS"],
    live: "https://www.globalacademy.com.bd/",
  },
  {
    title: "English A2Z",
    mark: "A2Z",
    type: "English Learning Platform",
    domain: "englisha2z.com.bd",
    description: "Premium English platform covering IELTS, PTE, spoken and foundation English through recorded, live and offline batches, with a premium eBook library and mock test simulation.",
    tech: ["Laravel", "Nuxt.js", "MySQL"],
    live: "https://englisha2z.com.bd/",
  },
  {
    title: "English Fantasy",
    mark: "EF",
    type: "English Learning Platform",
    domain: "englishfantasybd.com",
    description: "Online English learning platform delivering spoken English and exam preparation courses with enrollment, class delivery and student progress tracking built in.",
    tech: ["Laravel", "Vue.js", "MySQL"],
    live: "https://englishfantasybd.com/",
  },
  {
    title: "Karigori Pathsala",
    mark: "KP",
    type: "Diploma & Polytechnic LMS",
    domain: "karigoripathsala.com",
    description: "Academic partner for polytechnic and diploma students — semester and department-wise live classes, recorded lessons, suggestion books, printed textbooks and a companion mobile app.",
    tech: ["Laravel", "Nuxt.js", "Filament"],
    live: "https://www.karigoripathsala.com/",
  },
];

const vIntersect = {
  mounted(el: HTMLElement, binding: any) {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              binding.value();
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
    );
    observer.observe(el);
  },
};
</script>

<style scoped>
.edtech-card {
  transition: opacity 0.6s ease, transform 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>
