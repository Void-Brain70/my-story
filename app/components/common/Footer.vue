<template>
  <footer class="relative bg-[#0a0a0a] text-gray-300 overflow-hidden border-t border-white/5">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.02]">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
    </div>

    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-rose-500/5 via-transparent to-transparent"></div>

    <div class="relative z-10 max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <!-- Brand / About -->
        <div class="col-span-1 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3 sm:mb-4">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-base sm:text-lg">AC</span>
            </div>
            <h2 class="text-white text-lg sm:text-xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
              Anik Chandra
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
            Full-Stack Developer specializing in modern web technologies. Building scalable applications with passion and precision.
          </p>
          <!-- Email -->
          <div class="flex items-center gap-2 mt-3 sm:mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:anik@example.com" class="text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
              anik@example.com
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <div class="h-1 w-1 bg-rose-500 rounded-full"></div>
            Quick Links
          </h3>
          <ul class="space-y-2 sm:space-y-2.5">
            <li>
              <a href="#home" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="#about" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                About
              </a>
            </li>
            <li>
              <a href="#skill" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Skills
              </a>
            </li>
            <li>
              <a href="#experience" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Experience
              </a>
            </li>
            <li>
              <a href="#education" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Education
              </a>
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <div class="h-1 w-1 bg-rose-500 rounded-full"></div>
            Tech Stack
          </h3>
          <ul class="space-y-2 sm:space-y-2.5">
            <li class="text-xs sm:text-sm text-gray-400">Laravel</li>
            <li class="text-xs sm:text-sm text-gray-400">NestJS</li>
            <li class="text-xs sm:text-sm text-gray-400">Nuxt.js</li>
            <li class="text-xs sm:text-sm text-gray-400">Vue.js</li>
            <li class="text-xs sm:text-sm text-gray-400">TailwindCSS</li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <div class="h-1 w-1 bg-rose-500 rounded-full"></div>
            Connect
          </h3>
          <div class="flex flex-wrap gap-2 sm:gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               class="group w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
               aria-label="GitHub">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               class="group w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
               aria-label="LinkedIn">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               class="group w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
               aria-label="Twitter">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               class="group w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
               aria-label="Instagram">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/5 pt-6 sm:pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            &copy; {{ new Date().getFullYear() }} Anik Chandra. All rights reserved.
          </p>
          <div class="flex items-center gap-4 sm:gap-6">
            <a href="#" class="text-xs sm:text-sm text-gray-500 hover:text-rose-400 transition-colors">Privacy Policy</a>
            <a href="#" class="text-xs sm:text-sm text-gray-500 hover:text-rose-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No JS needed unless you want dynamic data
</script>
