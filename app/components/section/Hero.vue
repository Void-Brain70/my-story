<template>
  <section class="relative bg-gray-900 text-white overflow-hidden">
    <!-- Background gradient & floating dots -->
    <div class="absolute inset-0 -z-10">
      <div class="w-full h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"></div>
      <svg class="absolute top-0 left-0 w-full h-full opacity-20" fill="none" viewBox="0 0 100 100">
        <circle v-for="(dot, index) in dots" :key="index" :cx="dot.x" :cy="dot.y" :r="dot.r" :class="dot.color" fill="currentColor" />
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col-reverse md:flex-row items-center gap-12">
      <!-- Left Text Content -->
      <transition name="fade-slide" appear>
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight">
            Hi, I’m <span class="text-rose-500">Anik Chandra</span> <br />
            <span class="text-rose-400">Software Developer</span>
          </h1>
          <p class="mt-6 text-lg text-gray-300 max-w-lg font-mono">
            I build scalable web apps, create stunning UIs, and write clean, maintainable code.
            Let’s turn your ideas into <span class="text-amber-400">production-ready software</span>.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <NuxtLink
                to="/projects"
                class="px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition transform hover:-translate-y-1 motion-safe:duration-300"
            >
              View My Work
            </NuxtLink>
            <NuxtLink
                to="/contact"
                class="px-6 py-3 border border-rose-300 hover:border-rose-400 rounded-lg font-medium transition transform hover:-translate-y-1 motion-safe:duration-300"
            >
              Hire Me
            </NuxtLink>
          </div>
        </div>
      </transition>

      <!-- Right Image -->
      <transition name="fade-scale" appear>
        <div class="flex-1 flex justify-center relative">
          <img
              src="https://via.placeholder.com/500x400"
              alt="Anik Chandra"
              class="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
          <!-- Floating code snippet -->
          <div class="absolute top-6 right-6 bg-gray-800 p-4 rounded-xl shadow-lg font-mono text-sm text-rose-300 animate-pulse">
            <code>&lt;code&gt;Hello World&lt;/code&gt;</code>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
const dots = [
  { x: 20, y: 30, r: 1, color: 'text-rose-400' },
  { x: 80, y: 70, r: 1, color: 'text-pink-300' },
  { x: 50, y: 50, r: 0.8, color: 'text-rose-300' },
  { x: 15, y: 80, r: 1.2, color: 'text-amber-400' }
]


</script>

<style scoped>
/* Fade + Slide Animation */
.fade-slide-enter-active {
  transition: all 0.8s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Fade + Scale Animation */
.fade-scale-enter-active {
  transition: all 0.8s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>