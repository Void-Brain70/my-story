<template>
  <section id="education" class="relative text-white max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Title -->
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-rose-500 to-rose-600
             bg-clip-text text-transparent mb-16"
    >
      &lt; Education /&gt;
    </h1>

    <!-- Education Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
          v-for="(edu, i) in education"
          :key="i"
          class="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 group hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/40 transition-transform duration-500 animate-fade-slide"
          v-intersect="() => visible[i] = true"
          :class="visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 flex items-center justify-center rounded-full bg-rose-500/20 group-hover:bg-rose-500/40 transition-colors duration-500">
            <svg
                v-if="i === 0"
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.84 5.042L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l-6.16-3.422a12.083 12.083 0 00-.84 5.042L12 14z" />
            </svg>
            <svg
                v-else-if="i === 1"
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 20h14a2 2 0 002-2v-2H3v2a2 2 0 002 2z" />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7m0 0l3-3m-3 3l-3-3" />
            </svg>
          </div>
        </div>

        <!-- Text -->
        <p class="text-rose-500 font-semibold text-sm md:text-base mb-1">{{ edu.period }}</p>
        <h3 class="text-xl md:text-2xl font-bold mb-1">{{ edu.degree }}</h3>
        <p class="text-gray-300 font-medium mb-2">{{ edu.institute }}</p>
        <p class="text-gray-400 text-sm leading-relaxed">{{ edu.description }}</p>

        <!-- Hover gradient overlay -->
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none"></div>
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
/* Slide & fade animation */
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-slide {
  animation: fadeSlideUp 0.8s ease-out forwards;
}
</style>