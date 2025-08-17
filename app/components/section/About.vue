<template>
  <section id="about" class="bg-gray-900 text-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div>
      <div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-center mb-8">
          About Me
        </h1>
      </div>
      <div>
        <p class="text-lg sm:text-xl text-gray-300 text-center max-w-2xl mx-auto">
          I’m Anik Das, a Full-Stack Developer with a passion for building modern web applications. I specialize in
          technologies like NestJS, Vue.js, and Tailwind CSS to create efficient and user-friendly solutions.
        </p>
      </div>
    </div>


    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">

      <!-- Left: Profile Image -->
      <div class="flex-1">
        <!--          <img-->
        <!--              src="/assets/profile.jpg"-->
        <!--              alt="Profile photo"-->
        <!--              class="w-full max-w-sm rounded-xl shadow-lg mx-auto md:mx-0"-->
        <!--          />-->
      </div>

      <!-- Right: About Me Text -->
      <div class="flex-1 text-center md:text-left space-y-6">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">About Me</h2>
        <p class="text-lg leading-relaxed">
          Hi! I’m <span class="font-semibold text-indigo-600">Anik Das</span>, a passionate Full-Stack Developer
          specializing in building modern web applications using technologies like <span
            class="font-medium text-indigo-600">NestJS, Vue.js, and Tailwind CSS</span>. I love creating efficient,
          user-friendly, and scalable solutions.
        </p>
        <p class="text-lg leading-relaxed">
          I enjoy solving complex problems, learning new technologies, and contributing to open-source projects. My
          goal is to deliver clean, maintainable, and impactful code.
        </p>
        <div>
          <!--            <a-->
          <!--                href="/assets/resume.pdf"-->
          <!--                target="_blank"-->
          <!--                class="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"-->
          <!--            >-->
          <!--              Download Resume-->
          <!--            </a>-->
        </div>

        <!-- Optional: Skills -->
        <div class="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
          <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">NestJS</span>
          <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Vue.js</span>
          <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
          <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
          <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>