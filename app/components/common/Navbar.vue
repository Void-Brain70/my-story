<template>
  <nav class="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md border-b border-gray-700 shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">

        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-rose-500 text-2xl font-bold">{ Anik Chandra }</h1>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-x-6">
          <div v-for="(item , i) in navItems" :key="i">
            <NuxtLink :to="item.to" class="nav-item">{{ item.label }}</NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
              @click="isOpen = !isOpen"
              type="button"
              class="hamburger-btn relative w-6 h-6 flex flex-col justify-between items-center group"
          >
            <span :class="{ 'rotate-45 translate-y-3': isOpen }" class="hamburger-line"></span>
            <span :class="{ 'opacity-0': isOpen }" class="hamburger-line"></span>
            <span :class="{ '-rotate-45 -translate-y-3': isOpen }" class="hamburger-line"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu with smooth transition -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="md:hidden bg-black/80 backdrop-blur-md border-t border-gray-700">
        <div class="flex flex-col px-4 py-5 space-y-4">
          <NuxtLink v-for="(item, i) in navItems" :key="i" :to="item.to" class="mobile-link">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const navItems = [
  { label: 'Projects', to: '/' },
  { label: 'Expertise', to: '/' },
  { label: 'About', to: '/' },
  { label: 'Contact', to: '/' },
  { label: 'Story', to: '/' }
]
</script>

<style scoped>
/* Desktop menu with brackets hover effect */
.nav-item {
  @apply relative text-rose-500 font-medium transition-colors duration-300;
}

.nav-item::before,
.nav-item::after {
  content: '';
  @apply opacity-0 absolute text-rose-500 font-semibold;
  transition: all 0.3s ease;
}

.nav-item::before {
  content: '{';
  left: -0.6rem;
  top: 0;
}

.nav-item::after {
  content: '}';
  right: -0.6rem;
  top: 0;
}

.nav-item:hover::before,
.nav-item:hover::after {
  @apply opacity-100;
}

.nav-item:hover {
  @apply text-rose-600;
}

/* Mobile menu links */
.mobile-link {
  @apply text-white text-lg font-medium transition-colors duration-300;
}

.mobile-link:hover {
  @apply text-rose-500;
}

/* Smooth slide/fade transition for mobile menu */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Hamburger button animation */
.hamburger-btn {
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  @apply block w-8 h-0.5 bg-rose-500 rounded transition-all duration-300 ease-in-out;
}

/* Hover effect */
.hamburger-btn:hover .hamburger-line {
  @apply bg-rose-600;
}
</style>