<template>
  <section id="about" class="relative text-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-16">
    <!-- Code editor background decoration -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]"></div>

      <div class="absolute inset-0 opacity-[0.025]">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>

      <div class="absolute left-0 top-0 bottom-0 w-14 bg-[#0f0f0f]/60 border-r border-cyan-500/10 hidden md:block">
        <div class="font-mono text-[10px] text-gray-700 pt-24 space-y-4 text-right pr-3">
          <div>01</div><div>02</div><div>03</div>
          <div class="text-cyan-500/40">04</div>
          <div>05</div><div>06</div><div>07</div>
          <div>08</div><div>09</div><div>10</div>
          <div>11</div><div>12</div>
        </div>
      </div>

      <div class="absolute top-16 left-20 md:left-24 font-mono text-xs text-gray-800/40 hidden lg:block space-y-1">
        <div><span class="text-purple-500/30">class</span> <span class="text-blue-400/30">Developer</span> <span class="text-white/15">extends</span> <span class="text-blue-400/30">Person</span> <span class="text-white/15">&#123;</span></div>
        <div class="pl-4"><span class="text-emerald-400/30">constructor</span><span class="text-white/15">() &#123;</span></div>
        <div class="pl-8"><span class="text-yellow-500/30">super</span><span class="text-white/15">();</span></div>
        <div class="pl-4"><span class="text-white/15">&#125;</span></div>
        <div><span class="text-white/15">&#125;</span></div>
      </div>

      <div class="absolute top-40 right-12 font-mono text-xs text-gray-800/40 hidden xl:block space-y-1">
        <div><span class="text-cyan-500/30">const</span> <span class="text-blue-400/30">profile</span> <span class="text-white/15">= &#123;</span></div>
        <div class="pl-4"><span class="text-emerald-400/30">role</span><span class="text-white/15">:</span> <span class="text-orange-400/30">"Full-Stack"</span><span class="text-white/15">,</span></div>
        <div class="pl-4"><span class="text-emerald-400/30">passion</span><span class="text-white/15">:</span> <span class="text-orange-400/30">"Coding"</span></div>
        <div><span class="text-white/15">&#125;</span></div>
      </div>

      <div class="absolute bottom-24 left-16 md:left-28 font-mono text-xs text-gray-800/40 hidden lg:block">
        <div><span class="text-yellow-500/30">export default</span> <span class="text-blue-400/30">AnikChandra</span></div>
      </div>

      <div class="absolute top-1/3 right-1/4 text-8xl text-cyan-500/[0.03] font-mono hidden md:block select-none">&lt;/&gt;</div>
      <div class="absolute bottom-1/4 left-1/3 text-7xl text-cyan-500/[0.03] font-mono hidden md:block select-none">&#123; &#125;</div>

      <div class="absolute bottom-32 right-16 font-mono text-xs text-green-600/20 hidden xl:block">
        <div>// Building the future</div>
        <div>// One line at a time</div>
      </div>

      <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5"></div>
      <div class="absolute top-1/4 right-10 w-0.5 h-5 bg-cyan-400/30 animate-pulse hidden lg:block"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <h1
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
               bg-gradient-to-r from-cyan-500 to-teal-500
               bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-12"
      >
        &lt; About Me /&gt;
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
        <!-- Image -->
        <div class="flex justify-center md:justify-start order-1 md:order-1">
          <div class="relative group w-full max-w-sm sm:max-w-md mx-auto md:mx-0">
            <div class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500">
              <div class="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                    src="/images/image3.jpeg"
                    alt="Anik Chandra - Full-Stack Developer specializing in Laravel, Vue.js, and NestJS"
                    loading="lazy"
                    class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div class="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-14 sm:w-20 h-14 sm:h-20 bg-cyan-500/20 rounded-full blur-lg sm:blur-xl"></div>
            <div class="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-teal-500/20 rounded-full blur-lg sm:blur-xl"></div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="order-2 md:order-2">
          <div class="mb-5 sm:mb-6 text-center md:text-left">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Hi, I'm <span class="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Anik Chandra</span>
            </h2>
            <div class="h-1 w-20 sm:w-24 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto md:mx-0"></div>
          </div>

          <!-- Info Cards -->
          <div class="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-cyan-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-cyan-400 font-semibold mb-1 text-sm sm:text-base">Full-Stack Developer</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Expertise in <span class="text-cyan-500 font-medium">Nuxt.js, NestJS, and Laravel</span>. Building scalable and efficient applications for 3+ years.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-cyan-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-cyan-400 font-semibold mb-1 text-sm sm:text-base">Quality & Performance</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Strong foundation in <span class="text-white">computer science</span> with focus on clean code, performance optimization, and seamless deployment workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 group-hover:border-cyan-500/30 transition-all duration-300">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-cyan-400 font-semibold mb-1 text-sm sm:text-base">Innovation & Growth</h3>
                    <p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      Passionate about <span class="text-white">open-source contributions</span> and experimenting with new technologies to build impactful solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Row -->
          <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div v-for="(stat, i) in stats" :key="i"
                 class="relative bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:border-cyan-500/30 transition-all duration-300 group">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p class="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">{{ stat.value }}</p>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-1 leading-tight">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
            <a
                href="/docs/Resume_of_Anik_Chandra.pdf"
                target="_blank"
                download
                class="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full overflow-hidden
                       bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-sm sm:text-base
                       hover:from-cyan-600 hover:to-teal-600 transition-all duration-300
                       hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-3-3m3 3l3-3m6 3v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
              </svg>
              Download CV
            </a>

            <a
                href="#contact"
                @click.prevent="scrollToContact"
                class="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                       border-2 border-cyan-500/50 text-cyan-400 font-semibold text-sm sm:text-base
                       hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300
                       hover:scale-105 cursor-pointer"
            >
              <Icon name="mdi:email-outline" class="h-4 w-4 sm:h-5 sm:w-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToContact = () => {
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Delivered' },
  { value: '15+', label: 'Technologies' },
];
</script>
