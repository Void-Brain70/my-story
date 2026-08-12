<template>
  <footer class="relative bg-[#0a0a0a] text-gray-300 overflow-hidden border-t border-white/5">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.02]">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent"></div>

    <div class="relative z-10 max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">

        <!-- Brand / About -->
        <div class="col-span-1 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3 sm:mb-4">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-base sm:text-lg">AC</span>
            </div>
            <h2 class="text-white text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Anik Chandra
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
            Full-Stack Developer specializing in modern web technologies. Building scalable applications with passion and precision.
          </p>
          <div class="flex items-center gap-2 mt-3 sm:mt-4">
            <Icon name="mdi:email-outline" class="h-4 w-4 text-cyan-500" />
            <a href="mailto:dasssanik124102@gmail.com" class="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              dasssanik124102@gmail.com
            </a>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <Icon name="mdi:phone-outline" class="h-4 w-4 text-cyan-500" />
            <a href="tel:+8801521215839" class="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              +880 1521 215 839
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-2">
          <!-- Quick Links -->
          <div>
            <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span class="h-1 w-1 bg-cyan-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul class="space-y-2 sm:space-y-2.5">
              <li v-for="(link, i) in footerLinks" :key="i">
                <a :href="link.href" @click.prevent="scrollToSection(link.href)" class="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">
                  <Icon name="mdi:chevron-right" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Tech Stack -->
          <div>
            <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span class="h-1 w-1 bg-cyan-500 rounded-full"></span>
              Tech Stack
            </h3>
            <ul class="space-y-2">
              <li v-for="(item, i) in techStack" :key="i" class="text-xs sm:text-sm text-gray-400">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-white text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center justify-center md:justify-start gap-2">
            <span class="h-1 w-1 bg-cyan-500 rounded-full"></span>
            Connect
          </h3>
          <div class="flex justify-center md:justify-start flex-wrap gap-2 sm:gap-3">
            <a v-for="(social, i) in socialLinks" :key="i"
               :href="social.href" target="_blank" rel="noopener noreferrer"
               class="group w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
               :aria-label="social.label">
              <Icon :name="social.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
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
          <p class="text-xs sm:text-sm text-gray-600 text-center">
            Built with <span class="text-cyan-500">Nuxt.js</span> &amp; <span class="text-cyan-500">TailwindCSS</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToSection = (href: string) => {
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const techStack = ['Laravel', 'NestJS', 'Nuxt.js', 'Vue.js', 'TypeScript'];

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skill' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Void-Brain70', icon: 'mdi:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anik-chandra-a5a62022a/', icon: 'mdi:linkedin' },
  { label: 'WhatsApp', href: 'https://wa.me/8801521215839', icon: 'mdi:whatsapp' },
];
</script>
