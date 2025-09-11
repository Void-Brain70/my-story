<template>
  <section id="skill" class="bg-[#0D0D0D] text-white overflow-hidden mx-10 py-12 rounded-3xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <h1
          class="text-3xl sm:text-4xl font-extrabold text-center
               bg-gradient-to-r from-rose-500 to-rose-600
               bg-clip-text text-transparent mb-6 md:mb-12"
      >
        &lt; My Skills /&gt;
      </h1>

      <!-- Tabs -->
      <div class="flex flex-wrap justify-center mb-10 gap-3">
        <button
            v-for="(tab, i) in tabs"
            :key="i"
            @click="activeTab = tab.key"
            class="px-5 py-2 rounded-full text-sm font-semibold transition-all
                 backdrop-blur-md border border-white/10 shadow-sm"
            :class="activeTab === tab.key
            ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg scale-105'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
            v-for="(item, i) in getActiveItems"
            :key="i"
            class="group bg-white/5 border border-white/10 backdrop-blur-xl
                 rounded-2xl p-6 flex flex-col items-center justify-center
                 shadow-xl hover:shadow-rose-500/30
                 transform hover:-translate-y-2 transition duration-300"
        >
          <!-- Icon -->
          <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="h-14 w-14 object-contain mb-4 transition-transform group-hover:scale-110"
          />

          <!-- Skill name -->
          <span class="text-sm font-medium text-center">{{ item.name }}</span>

          <!-- Progress bar (optional if has level) -->
          <div v-if="item.level" class="w-full mt-3">
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                  class="h-2 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-700"
                  :style="{ width: item.level + '%' }"
              ></div>
            </div>
            <p class="text-[11px] text-gray-400 mt-1 text-right">{{ item.level }}%</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Tabs
const tabs = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "tools", label: "Tools" },
  { key: "databases", label: "Databases" },
  { key: "webDesign", label: "Web Design" },
];

const activeTab = ref("languages");

// Data
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
  { name: "NestJS", image: "/images/skill/NestJS.svg", level: 70 },
  { name: "Filament", image: "/images/skill/filament.png", level: 65 },
  { name: "NuxtJS", image: "/images/skill/nuxt.svg", level: 80 },
  { name: "VueJS", image: "/images/skill/Vue.png", level: 85 },
];
const tools = [
  { name: "Git", image: "/images/skill/git.png", level: 80 },
  { name: "GitHub Actions", image: "/images/skill/github.png", level: 75 },
  { name: "Vercel", image: "/images/skill/vercel.svg", level: 70 },
  { name: "Forge", image: "/images/skill/forge.webp", level: 60 },
  { name: "Postman", image: "/images/skill/postman.svg", level: 85 },
];
const databases = [
  { name: "MySQL", image: "/images/skill/mysql.png", level: 80 },
  { name: "SQLite", image: "/images/skill/sqlite.png", level: 90 },
  { name: "MongoDB", image: "/images/skill/mongo.png", level: 65 },
];
const webDesign = [
  { name: "HTML", image: "/images/skill/html.png", level: 95 },
  { name: "CSS", image: "/images/skill/css.jpg", level: 90 },
  { name: "TailwindCSS", image: "/images/skill/tailwind.png", level: 85 },
  { name: "PrimeVue", image: "/images/skill/primevue.png", level: 50 },
  { name: "Bootstrap", image: "/images/skill/bootstrap.png", level: 80 },
  { name: "Sass", image: "/images/skill/sass.png", level: 75 },
  { name: "Vuetify", image: "/images/skill/vuetify.svg", level: 60 },
];

// Computed
const getActiveItems = computed(() => {
  switch (activeTab.value) {
    case "languages":
      return programmingLanguages;
    case "frameworks":
      return frameworks;
    case "tools":
      return tools;
    case "databases":
      return databases;
    case "webDesign":
      return webDesign;
    default:
      return [];
  }
});
</script>

<style scoped>
/* Smooth fade-in when switching tabs */
.grid > div {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>