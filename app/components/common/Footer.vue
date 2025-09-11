<template>
  <footer class="bg-[#191919] text-gray-300">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-4 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand / About -->
        <div>
          <h2 class="text-white text-lg font-bold mb-4">My Website</h2>
          <p class="text-sm">
            A short description about your website or brand. Make it catchy and informative.
          </p>
        </div>
        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-sm font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white">About</NuxtLink></li>
            <li><NuxtLink to="/story" class="hover:text-white">Story</NuxtLink></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-white text-sm font-semibold mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white">Blog</a></li>
            <li><a href="#" class="hover:text-white">Help Center</a></li>
            <li><a href="#" class="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-white text-sm font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-white" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="hover:text-white" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="hover:text-white" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} My Website. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No JS needed unless you want dynamic data
</script>

<style scoped>
/* Optionally import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
