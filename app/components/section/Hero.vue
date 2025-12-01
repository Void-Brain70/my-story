<template>
  <section id="home" class="relative bg-[#111111] text-white overflow-hidden min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center py-6 sm:py-12 md:py-6">
    <!-- Animated gradient orbs (smaller on mobile) -->
    <div class="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse-slow opacity-40"></div>
    <div class="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow opacity-30" style="animation-delay: 1.5s;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        <!-- Left Text -->
        <div class="text-center md:text-left md:order-1 order-2">
          <!-- Greeting Badge -->
          <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-500/10 border border-rose-500/30 rounded-full mb-4 sm:mb-6">
            <span class="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-rose-500"></span>
            </span>
            <span class="text-rose-400 text-xs sm:text-sm font-medium">Available for work</span>
          </div>

          <!-- Main Heading with Gradient -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            Hi, I'm
            <span class="block mt-1 sm:mt-2 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Anik Chandra
            </span>
            <span class="block mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span class="text-white">Full-Stack</span>
              <span class="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent"> Developer</span>
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
            Transforming ideas into powerful digital solutions with
            <span class="text-rose-400 font-semibold">modern technologies</span> and
            <span class="text-rose-400 font-semibold">best practices</span>
          </p>

          <!-- Description with icons -->
          <div class="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
            <div class="flex items-start gap-2 sm:gap-3 text-gray-300 text-left">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                Specializing in <span class="text-white font-semibold">Laravel, NestJS, and Nuxt.js</span> to build robust full-stack applications
              </p>
            </div>
            <div class="flex items-start gap-2 sm:gap-3 text-gray-300 text-left">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                Crafting <span class="text-white font-semibold">pixel-perfect interfaces</span> with exceptional user experiences
              </p>
            </div>
            <div class="flex items-start gap-2 sm:gap-3 text-gray-300 text-left">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                Delivering <span class="text-white font-semibold">production-ready code</span> with focus on performance and scalability
              </p>
            </div>
            <div class="flex items-start gap-2 sm:gap-3 text-gray-300 text-left">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs sm:text-sm md:text-base">
                Leveraging <span class="text-white font-semibold">cloud technologies</span> for seamless deployment and CI/CD workflows
              </p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <!-- Primary Button -->
            <NuxtLink
                to="#home"
                class="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold text-sm sm:text-base rounded-full overflow-hidden hover:from-rose-600 hover:to-rose-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View My Work
            </NuxtLink>

            <!-- Secondary Button -->
            <a
                href="#contact"
                @click.prevent="scrollToContact"
                class="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-rose-500/50 text-rose-400 font-semibold text-sm sm:text-base rounded-full hover:bg-rose-500/10 hover:border-rose-500 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Icon name="mdi:email-outline" class="h-4 w-4 sm:h-5 sm:w-5" />
              Hire Me
            </a>
          </div>
        </div>

        <!-- Right Code Window -->
        <div class="flex justify-center md:justify-end items-center md:order-2 order-1">
          <div class="relative group w-full max-w-sm sm:max-w-md">
            <!-- Glow effect -->
            <div class="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

            <!-- Code Window -->
            <transition name="fade-scale" mode="out-in">
              <div :key="currentSnippet" class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden group-hover:border-rose-500/50 transition-all duration-500">
                <!-- Window Header -->
                <div class="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/10">
                  <div class="flex gap-1.5 sm:gap-2">
                    <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></span>
                    <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors cursor-pointer"></span>
                    <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></span>
                  </div>
                  <!-- Language Badge -->
                  <div class="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-rose-500/20 border border-rose-500/30 rounded-full">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full animate-pulse"></span>
                    <span class="text-rose-400 text-[10px] sm:text-xs font-semibold">{{ currentLanguage }}</span>
                  </div>
                </div>

                <!-- Code Content -->
                <div class="relative">
                  <pre class="p-4 sm:p-5 md:p-6 text-xs sm:text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed"><code v-html="currentSnippet"></code></pre>
                  <!-- Corner accent -->
                  <div class="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tl from-rose-500/10 to-transparent rounded-tl-full"></div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Scroll to contact section
const scrollToContact = () => {
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Rotating code snippets
function escapeHtml(code: string) {
  return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}

// Snippets with language names
const snippets = [
  {
    language: "Python",
    code: escapeHtml(`# Python
def greet():
    print("Hello, I'm Anik Chandra!")
greet()`)
  },
  {
    language: "PHP",
    code: escapeHtml(`<?php
// PHP
echo "Hello, I'm Anik Chandra!";`)
  },
  {
    language: "JavaScript",
    code: escapeHtml(`// JavaScript
function greet() {
  console.log("Hello, I'm Anik Chandra!");
}
greet();`)
  },
  {
    language: "TypeScript",
    code: escapeHtml(`// TypeScript
const greet = (name: string): void => {
  console.log(\`Hello, I'm \${name}!\`);
}
greet("Anik Chandra");`)
  },
  {
    language: "C++",
    code: escapeHtml(`# C++
#include <iostream>
using namespace std;
int main() {
  cout << "Hello, I'm Anik Chandra!" << endl;
  return 0;
}`)
  },
];

const currentIndex = ref(0);
const currentSnippet = computed(() => snippets[currentIndex.value].code);
const currentLanguage = computed(() => snippets[currentIndex.value].language);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % snippets.length;
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Fade + Scale Animation for code snippets */
.fade-scale-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-leave-active {
  transition: all 0.4s ease-out;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Gradient animation */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Pulse animation for gradient orbs */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
