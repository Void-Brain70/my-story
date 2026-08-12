<template>
  <section id="education" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-cyan-500 to-teal-500
             bg-clip-text text-transparent mb-12 md:mb-16"
    >
      &lt; Education /&gt;
    </h1>

    <div class="relative">
      <!-- Vertical timeline line -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-teal-500 to-transparent"></div>

      <div class="space-y-8 md:space-y-16">
        <div
            v-for="(edu, i) in education"
            :key="i"
            class="relative transition-all duration-800 ease-out"
            v-intersect="() => visible[i] = true"
            :class="visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: `${i * 150}ms` }"
        >
          <!-- Timeline Node -->
          <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-cyan-500/20 z-10"></div>

          <div :class="[
            'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center',
            i % 2 === 0 ? 'md:grid-flow-col-dense' : ''
          ]">
            <div v-if="i % 2 === 0" class="hidden md:block"></div>

            <!-- Education Card -->
            <div class="group relative">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur-xl group-hover:border-cyan-500/50 transition-all duration-500">
                <!-- Period Badge -->
                <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-cyan-400 font-semibold text-xs sm:text-sm">{{ edu.period }}</span>
                </div>

                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {{ edu.degree }}
                </h3>

                <div class="flex items-start gap-2 mb-3 sm:mb-4">
                  <Icon name="mdi:school-outline" class="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <a :href="edu.link" target="_blank" rel="noopener noreferrer" class="text-gray-300 font-medium text-sm sm:text-base hover:text-cyan-400 transition-colors">
                    {{ edu.institute }}
                  </a>
                </div>

                <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                  {{ edu.description }}
                </p>

                <div class="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            <div v-if="i % 2 !== 0" class="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean[]>([]);

const education = [
  {
    period: "2018 – 2022",
    degree: "BSc in Computer Science & Engineering",
    institute: "University of Asia Pacific",
    link: "https://www.uap-bd.edu/",
    description:
        "Specialized in software engineering, web & mobile development, cloud computing, and team-based projects. Completed capstone projects in full-stack web applications and cloud deployment.",
  },
  {
    period: "2014 – 2016",
    degree: "Higher Secondary Certificate (Science)",
    institute: "Govt Science College, Dhaka",
    link: "https://www.gsctd.edu.bd/",
    description:
        "Focused on mathematics, physics, and computer science fundamentals. Participated in programming competitions and science fairs, strengthening analytical and problem-solving skills.",
  },
  {
    period: "2012 – 2014",
    degree: "Secondary School Certificate (Science)",
    institute: "Dashani Mohanpur High School, Chandpur",
    link: "https://dmhighschool.edu.bd/",
    description:
        "Graduated with honors in science subjects. Developed a strong foundation in mathematics and logical thinking through STEM activities and academic competitions.",
  },
];

const vIntersect = {
  mounted(el: HTMLElement, binding: any) {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              binding.value();
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
    );
    observer.observe(el);
  },
};
</script>

<style scoped>
.relative {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
</style>
