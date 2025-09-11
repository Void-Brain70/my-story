<template>
  <section id="home" class="bg-[#111111] text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-0 sm:px-0 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <!-- Left Text -->
        <div class="text-center md:text-left md:order-1 order-2">
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight">
            Hi, I’m <span class="text-rose-600">Anik Chandra</span> <br/>
            <span class="text-rose-600">Software Developer</span>
          </h1>
          <p class="mt-6 text-md md:text-lg text-gray-300 max-w-lg">
            I build scalable web apps, create stunning UIs, and write clean,
            maintainable code. Let’s turn your ideas into
            <span class="text-rose-500">production-ready software</span>.
          </p>
          <div class="mt-8 flex flex-row gap-4 justify-center md:justify-start">
            <!-- Primary Button -->
            <NuxtLink
                to="/projects"
                class="px-6 py-2 md:py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-full shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              View My Work
            </NuxtLink>
            <!-- Secondary Button -->
            <NuxtLink
                to="/contact"
                class="px-6 py-2 md:py-3 border-2 border-rose-600 text-rose-500 font-semibold rounded-full hover:bg-rose-600 hover:text-white transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Hire Me
            </NuxtLink>
          </div>
        </div>
        <!-- Right Rotating Code Snippet -->
        <div class="flex justify-center md:justify-end items-center relative h-[250px] md:h-auto md:order-2 order-1">
          <transition name="fade-scale" mode="out-in">
            <div :key="currentSnippet" class="relative bg-gray-900 border border-gray-700 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <!-- Fake Window Header -->
              <div class="flex gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <!-- Code Snippet -->
              <pre class="p-5 text-sm text-gray-100 whitespace-pre-wrap"><code v-html="currentSnippet"></code></pre>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Rotating code snippets
function escapeHtml(code: string) {
  return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}
// Update snippets
const snippets = [
  escapeHtml(`# Python
def greet():
    print("Hello, I’m Anik Chandra!")
greet()`),

  escapeHtml(`<?php
// PHP
echo "Hello, I’m Anik Chandra!";`),

  escapeHtml(`// JavaScript
function greet() {
  console.log("Hello, I’m Anik Chandra!");
}
greet();`),

  escapeHtml(`// TypeScript
const greet = (name: string): void => {
  console.log(\`Hello, I’m \${name}!\`);
}
greet("Anik Chandra");`),

  escapeHtml(`# C++
#include <iostream>
using namespace std;
int main() {
  cout << "Hello, I’m Anik Chandra!" << endl;
  return 0;
}`),
];

const currentIndex = ref(0);
const currentSnippet = ref(snippets[currentIndex.value]);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % snippets.length;
    currentSnippet.value = snippets[currentIndex.value];
  }, 2500);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Fade + Scale Animation */
.fade-scale-enter-active {
  transition: all 0.6s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>
