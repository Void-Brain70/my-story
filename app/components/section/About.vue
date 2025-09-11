<template>
  <section id="about"
      class="relative text-white overflow-hidden max-w-7xl mx-auto lg:mx-10 py-8 px-6 sm:px-8 lg:px-12 rounded-3xl">
    <!-- Background gradient (behind glass) -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#000000] "></div>

    <!-- Glassmorphism layer -->
    <div
        class="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl
             border border-white/10 shadow-lg shadow-black/30 "
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Section Title -->
      <h1
          class="text-3xl sm:text-4xl font-extrabold text-center
               bg-gradient-to-r from-rose-500 to-rose-600
               bg-clip-text text-transparent mb-6 md:mb-12"
      >
        &lt; About Me /&gt;
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <!-- Image -->
        <div class="flex justify-center">
          <img
              src="/images/me2.jpeg"
              alt="Anik Das"
              class="w-full max-w-md h-auto rounded-3xl
                   shadow-lg shadow-rose-900/40 bg-rose-900/10 object-cover"
          />
        </div>

        <!-- Text -->
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-rose-600 mb-4">
            Hi, I’m Anik Das
          </h2>

          <p class="text-md md:text-lg text-gray-300 leading-relaxed mb-4">
            I am a <span class="text-rose-500 font-semibold">Software Developer</span> with expertise in
            <span class="text-white">full-stack development</span>, specializing in modern web technologies
            such as <span class="text-rose-500 font-medium">Nuxt.js, NestJS, and Laravel</span>.
          </p>

          <p class="text-md md:text-lg text-gray-300 leading-relaxed mb-4">
            I have a strong foundation in <span class="text-white">computer science</span> and experience
            building <span class="text-white">scalable, efficient, and user-friendly applications</span>.
            My focus is on clean code, performance, and seamless deployment workflows.
          </p>

          <p class="text-md md:text-lg text-gray-300 leading-relaxed mb-6">
            Outside of coding, I enjoy <span class="text-white">contributing to open-source projects</span>,
            experimenting with new technologies, and solving complex challenges.
            My mission is to build impactful solutions that help businesses grow and users thrive.
          </p>

          <!-- Download CV Button -->
          <a
              href="/docs/Resume_of_Anik_Chandra.pdf"
              target="_blank"
              download
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full
         bg-gradient-to-r from-rose-500 to-rose-600
         text-white font-semibold shadow-lg
         hover:from-rose-600 hover:to-rose-700
         transition-all duration-300 ease-in-out
         hover:scale-105 hover:shadow-rose-800/40"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v12m0 0l-3-3m3 3l3-3m6 3v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"
              />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for static design
</script>