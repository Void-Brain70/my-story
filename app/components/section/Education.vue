<template>
  <section id="education" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Title -->
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-rose-500 to-rose-600
             bg-clip-text text-transparent mb-12 md:mb-16"
    >
      &lt; Education /&gt;
    </h1>

    <!-- Timeline Container -->
    <div class="relative">
      <!-- Vertical Line (hidden on mobile) -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-rose-500 via-rose-600 to-transparent"></div>

      <!-- Education Items -->
      <div class="space-y-8 md:space-y-16">
        <div
            v-for="(edu, i) in education"
            :key="i"
            class="relative transition-all duration-800 ease-out"
            v-intersect="() => visible[i] = true"
            :class="visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: `${i * 150}ms` }"
        >
          <!-- Timeline Node (hidden on mobile) -->
          <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full ring-4 ring-rose-500/20 z-10"></div>

          <!-- Card Container (alternating sides on desktop) -->
          <div :class="[
            'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center',
            i % 2 === 0 ? 'md:grid-flow-col-dense' : ''
          ]">
            <!-- Spacer for alternating layout (desktop only) -->
            <div v-if="i % 2 === 0" class="hidden md:block"></div>

            <!-- Education Card -->
            <div class="group relative">
              <!-- Background with glassmorphism -->
              <div class="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur-xl group-hover:border-rose-500/50 transition-all duration-500">
                <!-- Period Badge -->
                <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-rose-500/20 border border-rose-500/30 rounded-full mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-rose-400 font-semibold text-xs sm:text-sm">{{ edu.period }}</span>
                </div>

                <!-- Degree Title -->
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                  {{ edu.degree }}
                </h3>

                <!-- Institute -->
                <div class="flex items-start gap-2 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p class="text-gray-300 font-medium text-sm sm:text-base">{{ edu.institute }}</p>
                </div>

                <!-- Description -->
                <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                  {{ edu.description }}
                </p>

                <!-- Decorative Corner Accent -->
                <div class="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

const education = [
  {
    period: "2018 - 2022",
    degree: "BSc in Computer Science & Engineering",
    institute: "University of Asia Pacific",
    description:
        "Specialized in software engineering, web & mobile development, cloud computing, and team-based projects. Completed capstone projects in full-stack web applications and cloud deployment.",
  },
  {
    period: "2015 - 2016",
    degree: "Higher Secondary Certificate (Science)",
    institute: "Govt Science College, Dhaka",
    description:
        "Focused on mathematics, physics, and computer science fundamentals. Participated in programming competitions and science fairs, strengthening analytical skills.",
  },
  {
    period: "2013 - 2014",
    degree: "Secondary School Certificate (Science)",
    institute: "Dashani Mohanpur High School, Chandpur",
    description:
        "Graduated with honors in science subjects. Developed problem-solving abilities and participated in coding clubs and extracurricular STEM activities.",
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
</style>