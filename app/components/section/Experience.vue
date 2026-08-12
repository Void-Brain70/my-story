<template>
  <section id="experience" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-cyan-500 to-teal-500
             bg-clip-text text-transparent mb-12 md:mb-16"
    >
      &lt; Experience /&gt;
    </h1>

    <div class="relative">
      <!-- Vertical timeline line -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-teal-500 to-transparent"></div>

      <div class="space-y-12 md:space-y-0">
        <div
            v-for="(exp, i) in experiences"
            :key="i"
            class="relative mb-12 md:mb-16 last:mb-0 transition-all duration-800 ease-out"
            v-intersect="() => visible[i] = true"
            :class="visible[i] ? 'opacity-100' : 'opacity-0'"
            :style="{
              transitionDelay: `${i * 200}ms`,
              transform: visible[i] ? 'translateX(0)' : 'translateY(30px)'
            }"
        >
          <!-- Timeline Marker -->
          <div class="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div class="relative">
              <div class="w-5 h-5 bg-cyan-500 rounded-full ring-4 ring-cyan-500/30 animate-pulse-slow"></div>
              <div
                  :class="[
                    'absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r w-8',
                    i % 2 === 0 ? 'left-full from-cyan-500 to-transparent' : 'right-full from-transparent to-cyan-500'
                  ]"
              ></div>
            </div>
          </div>

          <!-- Card Container (alternating sides) -->
          <div :class="['grid grid-cols-1 md:grid-cols-2 gap-8', i % 2 === 0 ? 'md:grid-flow-col-dense' : '']">
            <div v-if="i % 2 === 0" class="hidden md:block"></div>

            <!-- Experience Card -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

              <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl group-hover:border-cyan-500/50 transition-all duration-500">
                <div class="h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500"></div>

                <div class="p-5 sm:p-6 md:p-8">
                  <!-- Header -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div v-if="exp.logo" class="flex-shrink-0">
                      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10 p-2 group-hover:border-cyan-500/30 transition-colors duration-300">
                        <img :src="exp.logo" alt="Company Logo" class="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full sm:ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-cyan-400 font-semibold text-xs">{{ exp.period }}</span>
                    </div>
                  </div>

                  <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {{ exp.role }}
                  </h3>

                  <div class="flex items-center gap-2 mb-3">
                    <Icon name="mdi:briefcase-outline" class="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 flex-shrink-0" />
                    <a :href="exp.link" target="_blank" rel="noopener noreferrer" class="text-gray-300 font-semibold text-base sm:text-lg hover:text-cyan-400 transition-colors">
                      {{ exp.company }}
                    </a>
                  </div>

                  <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                    {{ exp.description }}
                  </p>

                  <!-- Tech Stack Tags -->
                  <div class="flex flex-wrap gap-2">
                    <span
                        v-for="(tech, j) in exp.tech"
                        :key="j"
                        class="px-2.5 py-1 text-[10px] sm:text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <div class="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            <div v-if="i % 2 !== 0" class="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean[]>([]);

const experiences = [
  {
    period: "Dec 2023 – Present",
    role: "Software Developer",
    company: "BD Funnel Builder",
    link: "https://bdfunnelbuilder.com/",
    description: "Building scalable web applications using Laravel, Nuxt.js, and NestJS. Responsible for backend RESTful APIs, frontend components, real-time features, and cloud deployments on Vercel and Forge.",
    logo: "/images/experience/bdfb.png",
    tech: ["Laravel", "Nuxt.js", "NestJS", "MySQL", "TailwindCSS", "Vercel"],
  },
  {
    period: "Sep 2022 – Sep 2023",
    role: "Web Developer",
    company: "Nextive Solution",
    link: "https://www.nextivesolution.com/",
    description: "Developed interactive UIs and dashboards using Vue.js and TailwindCSS. Ensured cross-browser compatibility, responsive design, and collaborated with backend teams to integrate REST APIs.",
    logo: "/images/experience/nsLogo.jpeg",
    tech: ["Vue.js", "TailwindCSS", "JavaScript", "REST APIs", "Git"],
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
.relative {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
