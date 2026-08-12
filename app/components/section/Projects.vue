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
        A selection of projects I've built — from full-stack platforms to API services.
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean[]>([]);

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
