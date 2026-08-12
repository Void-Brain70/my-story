<template>
  <section id="skill" class="relative text-white overflow-hidden mx-0 md:mx-10 py-6 sm:py-8 md:py-16 rounded-2xl md:rounded-3xl">
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0D0D0D]"></div>
    <div class="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 shadow-lg shadow-black/30"></div>

    <div class="absolute inset-0 opacity-[0.02]">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-cyan-500/25 to-teal-500/20 rounded-full blur-3xl animate-pulse-slow opacity-50"></div>
    <div class="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-tr from-teal-500/25 to-cyan-600/20 rounded-full blur-3xl animate-pulse-slow opacity-40" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse-slow opacity-30" style="animation-delay: 2s;"></div>
    <div class="absolute bottom-1/3 right-1/3 w-36 sm:w-56 h-36 sm:h-56 bg-teal-500/10 rounded-full blur-2xl animate-pulse-slow opacity-25" style="animation-delay: 3s;"></div>

    <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a0a0a]/50 rounded-2xl md:rounded-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
               bg-gradient-to-r from-cyan-500 to-teal-500
               bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-12"
      >
        &lt; My Skills /&gt;
      </h1>

      <!-- Tabs -->
      <div class="flex flex-wrap justify-center mb-8 sm:mb-10 md:mb-12 gap-2 sm:gap-3">
        <button
            v-for="(tab, i) in tabs"
            :key="i"
            @click="activeTab = tab.key"
            class="group relative px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                 backdrop-blur-md border overflow-hidden"
            :class="activeTab === tab.key
            ? 'border-cyan-500/50 text-white shadow-lg shadow-cyan-500/30 scale-105'
            : 'border-white/10 text-gray-300 hover:border-cyan-500/30 hover:scale-105'"
        >
          <div v-if="activeTab === tab.key" class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 -z-10"></div>
          <div v-else class="absolute inset-0 bg-white/5 group-hover:bg-white/10 -z-10 transition-colors duration-300"></div>
          <span class="flex items-center gap-1.5 sm:gap-2">
            <svg v-if="tab.key === 'languages'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <svg v-else-if="tab.key === 'frameworks'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <svg v-else-if="tab.key === 'tools'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg v-else-if="tab.key === 'databases'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            {{ tab.label }}
          </span>
        </button>
      </div>

      <!-- Skills Grid -->
      <TransitionGroup
          name="skills-grid"
          tag="div"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
      >
        <div
            v-for="(item, i) in getActiveItems"
            :key="activeTab + '-' + i"
            class="group relative skill-card"
            :style="{ '--enter-delay': `${i * 50}ms`, transitionDelay: `${i * 50}ms` }"
        >
          <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>

          <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 backdrop-blur-xl
                      rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between h-full
                      group-hover:border-cyan-500/50 transition-all duration-500">

            <div class="relative mb-3 sm:mb-4 p-2 sm:p-2.5 md:p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors duration-300">
              <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 object-contain transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300"
              />
            </div>

            <span class="text-xs sm:text-sm md:text-base font-semibold text-center text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
              {{ item.name }}
            </span>

            <div v-if="item.level" class="w-full mt-3 sm:mt-4">
              <div class="flex justify-between items-center mb-1.5 sm:mb-2">
                <span class="text-[10px] sm:text-xs text-gray-400">{{ getLevelLabel(item.level) }}</span>
                <span class="text-[10px] sm:text-xs font-bold text-cyan-400">{{ item.level }}%</span>
              </div>
              <div class="relative w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    class="progress-fill h-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-teal-500 rounded-full relative overflow-hidden"
                    :style="{ width: item.level + '%' }"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
                </div>
              </div>
            </div>

            <div class="absolute top-0 right-0 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const tabs = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "tools", label: "Tools" },
  { key: "databases", label: "Databases" },
  { key: "webDesign", label: "Web Design" },
];

const activeTab = ref("languages");

const getLevelLabel = (level: number): string => {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 55) return 'Intermediate';
  return 'Beginner';
};

const programmingLanguages = [
  { name: "JavaScript", image: "/images/skill/js.png", level: 90 },
  { name: "TypeScript", image: "/images/skill/ts.svg", level: 90 },
  { name: "PHP", image: "/images/skill/php.png", level: 85 },
  { name: "Python", image: "/images/skill/python.png", level: 75 },
  { name: "C++", image: "/images/skill/c_plus.png", level: 70 },
  { name: "C", image: "/images/skill/c.png", level: 70 },
];
const frameworks = [
  { name: "Laravel", image: "/images/skill/laravel2.png", level: 90 },
  { name: "VueJS", image: "/images/skill/Vue.png", level: 85 },
  { name: "NuxtJS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg", level: 80 },
  { name: "NestJS", image: "/images/skill/NestJS.svg", level: 70 },
  { name: "Filament", image: "/images/skill/filament.png", level: 65 },
];
const tools = [
  { name: "Postman", image: "/images/skill/postman.svg", level: 85 },
  { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", level: 80 },
  { name: "GitHub Actions", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", level: 75 },
  { name: "Vercel", image: "/images/skill/vercel.svg", level: 70 },
  { name: "Forge", image: "/images/skill/forge.webp", level: 60 },
];
const databases = [
  { name: "MySQL", image: "/images/skill/mysql.png", level: 85 },
  { name: "SQLite", image: "/images/skill/sqlite.png", level: 80 },
  { name: "MongoDB", image: "/images/skill/mongo.png", level: 65 },
];
const webDesign = [
  { name: "HTML", image: "/images/skill/html.png", level: 95 },
  { name: "CSS", image: "/images/skill/css.jpg", level: 90 },
  { name: "TailwindCSS", image: "/images/skill/tailwind.png", level: 85 },
  { name: "Bootstrap", image: "/images/skill/bootstrap.png", level: 80 },
  { name: "Sass", image: "/images/skill/sass.png", level: 75 },
  { name: "Vuetify", image: "/images/skill/vuetify.svg", level: 60 },
  { name: "PrimeVue", image: "/images/skill/primevue.png", level: 55 },
];

const getActiveItems = computed(() => {
  switch (activeTab.value) {
    case "languages": return programmingLanguages;
    case "frameworks": return frameworks;
    case "tools": return tools;
    case "databases": return databases;
    case "webDesign": return webDesign;
    default: return [];
  }
});
</script>

<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-stops));
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}

.animate-pulse-slow {
  animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skills-grid-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--enter-delay, 0ms);
}

.skills-grid-leave-active {
  transition: all 0.4s ease-out;
  transition-delay: 0ms;
}

.skills-grid-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(30px);
}

.skills-grid-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(-20px);
  position: absolute;
}

.skills-grid-move {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-card {
  transition: all 0.3s ease;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer {
  animation: shimmer 2s infinite;
}

.progress-fill {
  transition: width 1s ease-out;
}
</style>
