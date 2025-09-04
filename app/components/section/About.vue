<template>
  <section id="about" class="bg-gray-900  text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-center text-rose-500 mb-12">
        About Me
      </h1>
      <div class="flex flex-col md:flex-row items-center gap-12">
        <!-- Left: Profile Image -->
        <div class="flex-1 flex justify-center md:justify-start">
          <div class="relative group">
            <div
                class="w-64 h-64 rounded-3xl bg-gradient-to-tr from-rose-400 via-rose-500 to-pink-400 shadow-2xl transform transition duration-500 group-hover:scale-105">
            </div>
            <!-- Optional image inside gradient card -->
            <!-- <img src="/assets/profile.jpg" alt="Anik Das" class="absolute top-0 left-0 w-full h-full rounded-3xl object-cover" /> -->
          </div>
        </div>

        <!-- Right: About Me Text -->
        <div class="flex-1 text-center md:text-left space-y-6">
          <h2 class="text-3xl sm:text-4xl font-bold text-rose-500">Hi, I’m Anik Das</h2>
          <p class="text-lg text-gray-300 leading-relaxed">
            I’m a passionate Full-Stack Developer specializing in modern web applications using <span class="font-semibold text-rose-400">NestJS, Vue.js, and Tailwind CSS</span>.
            I create efficient, scalable, and user-friendly solutions.
          </p>
          <p class="text-lg text-gray-300 leading-relaxed">
            I enjoy solving complex problems, learning new technologies, and contributing to open-source projects. My goal is to deliver clean, maintainable, and impactful code.
          </p>

          <!-- Optional Buttons -->
          <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <NuxtLink
                to="/projects"
                class="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              View My Work
            </NuxtLink>
            <NuxtLink
                to="/contact"
                class="px-6 py-3 border-2 border-rose-500 text-rose-500 font-semibold rounded-xl hover:bg-rose-500 hover:text-white transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Hire Me
            </NuxtLink>
          </div>
          <!-- Skills -->
          <div class="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            <span class="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">NestJS</span>
            <span class="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Vue.js</span>
            <span class="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span class="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
            <span class="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No extra script needed for static design
</script>

<style scoped>
/* Optional subtle animations */
.group:hover div {
  transition: transform 0.5s ease;
  transform: scale(1.05);
}
</style>
