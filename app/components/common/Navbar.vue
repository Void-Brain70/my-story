<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">

        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-rose-500 text-2xl font-bold">Navbar</h1>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/story" class="nav-link">Story</NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-rose-500 hover:bg-gray-100 focus:outline-none">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-4 py-3 space-y-2">
        <NuxtLink to="/" class="mobile-link">Home</NuxtLink>
        <NuxtLink to="/about" class="mobile-link">About</NuxtLink>
        <NuxtLink to="/story" class="mobile-link">Story</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200;
}
.mobile-link {
  @apply block text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200;
}
</style>