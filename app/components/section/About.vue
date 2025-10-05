<template>
  <section id="about"
      class="relative text-white overflow-hidden max-w-7xl mx-auto lg:mx-10 py-6 sm:py-10 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 rounded-2xl md:rounded-3xl">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a1a1a] to-[#111111]"></div>

    <!-- Glassmorphism layer -->
    <div class="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 shadow-lg shadow-black/30"></div>

    <!-- Animated gradient orbs (smaller on mobile) -->
    <div class="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse-slow opacity-60"></div>
    <div class="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow opacity-50" style="animation-delay: 1.5s;"></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Section Title -->
      <h1
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
               bg-gradient-to-r from-rose-500 to-rose-600
               bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-12"
      >
        &lt; About Me /&gt;
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
        <!-- Image Container with Modern Effects -->
        <div class="flex justify-center md:justify-start order-1 md:order-1">
          <div class="relative group w-full max-w-sm sm:max-w-md mx-auto md:mx-0">
            <!-- Glow effect behind image -->
            <div class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

            <!-- Image container with border -->
            <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-rose-500/50 transition-all duration-500">
              <div class="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                    src="/images/me2.jpeg"
                    alt="Anik Das"
                    class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <!-- Overlay gradient on hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            <!-- Decorative elements (smaller on mobile) -->
            <div class="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-14 sm:w-20 h-14 sm:h-20 bg-rose-500/20 rounded-full blur-lg sm:blur-xl"></div>
            <div class="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-pink-600/20 rounded-full blur-lg sm:blur-xl"></div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="order-2 md:order-2">
          <!-- Name with gradient -->
          <div class="mb-5 sm:mb-6 text-center md:text-left">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Hi, I'm <span class="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">Anik Das</span>
            </h2>
            <div class="h-1 w-20 sm:w-24 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mx-auto md:mx-0"></div>
          </div>

          <!-- Info Cards -->
          <div class="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
            <!-- Card 1 -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-rose-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-rose-400 font-semibold mb-1 text-sm sm:text-base">Full-Stack Developer</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Expertise in modern web technologies like <span class="text-rose-500 font-medium">Nuxt.js, NestJS, and Laravel</span>. Building scalable and efficient applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-rose-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-rose-400 font-semibold mb-1 text-sm sm:text-base">Quality & Performance</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Strong foundation in <span class="text-white">computer science</span> with focus on clean code, performance optimization, and seamless deployment workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-rose-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-rose-400 font-semibold mb-1 text-sm sm:text-base">Innovation & Growth</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Passionate about <span class="text-white">open-source contributions</span> and experimenting with new technologies to build impactful solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
            <!-- Download CV Button -->
            <a
                href="/docs/Resume_of_Anik_Chandra.pdf"
                target="_blank"
                download
                class="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full overflow-hidden
                       bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold text-sm sm:text-base
                       hover:from-rose-600 hover:to-rose-700 transition-all duration-300
                       hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v12m0 0l-3-3m3 3l3-3m6 3v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"
                />
              </svg>
              Download CV
            </a>

            <!-- Contact Button -->
            <a
                href="#contact"
                class="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                       border-2 border-rose-500/50 text-rose-400 font-semibold text-sm sm:text-base
                       hover:bg-rose-500/10 hover:border-rose-500 transition-all duration-300
                       hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for static design
</script>

<style scoped>
/* Slow pulse animation for gradient orbs */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>