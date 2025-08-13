<template>
  <section class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse md:flex-row items-center gap-10">

      <!-- Left Text Content -->
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
          Welcome to <span class="text-indigo-500">Our Story</span>
        </h1>
        <p class="mt-6 text-lg text-gray-300 max-w-lg">
          We create amazing web experiences that help your business grow. Let’s work together and make something great.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <NuxtLink to="/about" class="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium transition">
            Learn More
          </NuxtLink>
          <NuxtLink to="/contact" class="px-6 py-3 border border-gray-400 hover:border-white rounded-lg font-medium transition">
            Contact Us
          </NuxtLink>
        </div>
      </div>

      <!-- Right Image -->
      <div class="flex-1 flex justify-center">
        <img
            src="https://via.placeholder.com/500x400"
            alt="Hero Image"
            class="rounded-2xl shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No special script needed unless you want animations
</script>