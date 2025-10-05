<template>
  <section id="experience" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-rose-500 to-rose-600
             bg-clip-text text-transparent mb-12 md:mb-16"
    >
      &lt; Experience /&gt;
    </h1>

    <!-- Timeline Container -->
    <div class="relative">
      <!-- Vertical Line with gradient (hidden on mobile) -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-rose-500 via-rose-600 to-transparent"></div>

      <!-- Timeline Items -->
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
          <!-- Timeline Marker (hidden on mobile) -->
          <div class="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div class="relative">
              <div class="w-5 h-5 bg-rose-500 rounded-full ring-4 ring-rose-500/30 animate-pulse-slow"></div>
              <!-- Connecting line to card -->
              <div
                  :class="[
                    'absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r w-8',
                    i % 2 === 0 ? 'left-full from-rose-500 to-transparent' : 'right-full from-transparent to-rose-500'
                  ]"
              ></div>
            </div>
          </div>

          <!-- Card Container (alternating sides on desktop) -->
          <div :class="[
            'grid grid-cols-1 md:grid-cols-2 gap-8',
            i % 2 === 0 ? 'md:grid-flow-col-dense' : ''
          ]">
            <!-- Spacer for alternating layout (desktop only) -->
            <div v-if="i % 2 === 0" class="hidden md:block"></div>

            <!-- Experience Card -->
            <div class="group relative">
              <!-- Glow effect on hover -->
              <div class="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

              <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl group-hover:border-rose-500/50 transition-all duration-500">
                <!-- Top accent bar -->
                <div class="h-1.5 bg-gradient-to-r from-rose-500 to-pink-600"></div>

                <div class="p-5 sm:p-6 md:p-8">
                  <!-- Header with Logo and Period -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <!-- Logo -->
                    <div v-if="exp.logo" class="flex-shrink-0">
                      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10 p-2 group-hover:border-rose-500/30 transition-colors duration-300">
                        <img :src="exp.logo" alt="Company Logo" class="w-full h-full object-contain" />
                      </div>
                    </div>

                    <!-- Period Badge -->
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 border border-rose-500/30 rounded-full sm:ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-rose-400 font-semibold text-xs">{{ exp.period }}</span>
                    </div>
                  </div>

                  <!-- Role -->
                  <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                    {{ exp.role }}
                  </h3>

                  <!-- Company -->
                  <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-300 font-semibold text-base sm:text-lg">{{ exp.company }}</p>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                    {{ exp.description }}
                  </p>

                  <!-- Bottom corner decoration -->
                  <div class="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-rose-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            <!-- Spacer for alternating layout (desktop only) -->
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
    period: "12/09/2023 - Running",
    role: "Software Developer",
    company: "BD Funnel Builder",
    description: "Building scalable web applications using Laravel, Nuxt.js, and NestJS. Responsible for backend APIs, frontend components, and cloud deployments.",
    logo: "/images/experience/bdfb.png",
  },
  {
    period: "01/09/2022 - 10/09/2023",
    role: "Web Developer",
    company: "Nexttive Solution",
    description: "Developed interactive UIs and dashboards using VueJS and TailwindCSS, ensuring cross-browser compatibility and responsive design.",
    logo: "/images/experience/nsLogo.jpeg",
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
/* Smooth transitions for scroll animations */
.relative {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

/* Slower pulse animation for timeline markers */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>