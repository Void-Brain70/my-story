<template>
  <section id="experience" class="relative text-white max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-rose-500 to-rose-600
             bg-clip-text text-transparent mb-16"
    >
      &lt; Experience /&gt;
    </h1>

    <!-- Timeline -->
    <div class="relative">
      <!-- Vertical Line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-rose-500 h-full"></div>

      <!-- Timeline Items -->
      <div v-for="(exp, i) in experiences" :key="i" class="relative mb-16 flex flex-col md:flex-row items-center justify-between">
        <!-- Timeline Marker -->
        <div
            class="absolute left-1/2 top-0 transform -translate-x-1/2 w-5 h-5 bg-rose-500 rounded-full border-2 border-white z-10 animate-pulse"
        ></div>

        <!-- Card -->
        <div
            class="relative md:w-5/12 w-full p-6 bg-white/5 border border-rose-600 shadow-lg backdrop-blur-xl rounded-3xl group transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/50"
            v-intersect="() => visible[i] = true"
            :class="[
            visible[i] ? 'animate-fade-slide opacity-100' : 'opacity-0',
            i % 2 === 0 ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-right'
          ]"
        >
          <!-- Logo -->
          <div v-if="exp.logo" class="mb-4 flex" :class="i % 2 === 0 ? 'justify-start' : 'md:justify-end'">
            <img :src="exp.logo" alt="Logo" class="h-12 w-auto rounded-full border border-white/20 shadow-md" />
          </div>

          <p class="text-rose-500 font-semibold text-sm md:text-base">{{ exp.period }}</p>
          <h3 class="text-xl md:text-2xl font-bold mt-1">{{ exp.role }}</h3>
          <p class="text-gray-300 font-medium">{{ exp.company }}</p>
          <p class="text-gray-400 mt-2 text-sm md:text-md leading-relaxed">{{ exp.description }}</p>

          <!-- Hover gradient overlay -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none"></div>
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
/* Slide & fade animation */
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide {
  animation: fadeSlideUp 0.8s ease-out forwards;
}

/* Marker pulse already via Tailwind animate-pulse */

/* Card hover effect is handled with Tailwind's hover:scale & hover:shadow */
</style>