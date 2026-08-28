<template>
  <section id="education" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
        class="text-3xl sm:text-4xl font-extrabold text-center
             bg-gradient-to-r from-cyan-500 to-teal-500
             bg-clip-text text-transparent mb-4"
    >
      &lt; Education /&gt;
    </h2>
    <p class="text-center text-gray-500 font-mono text-xs sm:text-sm mb-10 md:mb-12">
      // academic milestones
    </p>

    <!-- Horizontal milestone rail (desktop only) -->
    <div class="hidden md:block relative mb-10">
      <div class="absolute top-1/2 left-[16.6%] right-[16.6%] h-px -translate-y-1/2 bg-gradient-to-r from-cyan-500/50 via-teal-500/50 to-cyan-500/20"></div>
      <div class="relative grid grid-cols-3">
        <div v-for="(edu, i) in education" :key="'node-' + i" class="flex justify-center">
          <span class="relative flex h-3.5 w-3.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-500/60 animate-ping-slow"></span>
            <span class="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20"></span>
          </span>
        </div>
      </div>
    </div>

    <!-- Milestone Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      <div
          v-for="(edu, i) in education"
          :key="i"
          class="edu-card group relative"
          v-intersect="() => (visible[i] = true)"
          :class="visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: `${i * 140}ms` }"
      >
        <div class="absolute -inset-px bg-gradient-to-b from-cyan-500/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div class="relative h-full flex flex-col bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl overflow-hidden
                    group-hover:border-cyan-500/40 group-hover:-translate-y-1.5 transition-all duration-500">
          <!-- Watermark passing year -->
          <span class="pointer-events-none absolute -top-2 right-3 font-mono text-5xl sm:text-6xl font-black text-white/[0.045] select-none tracking-tighter">
            {{ edu.passing }}
          </span>

          <!-- Emblem -->
          <div class="relative w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-teal-500/10 border border-cyan-500/25 flex items-center justify-center
                      group-hover:from-cyan-500/40 group-hover:border-cyan-500/50 transition-all duration-500">
            <Icon name="mdi:school" class="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
          </div>

          <h3 class="relative text-base sm:text-lg font-bold text-white leading-snug mb-1.5 group-hover:text-cyan-400 transition-colors duration-300">
            {{ edu.degree }}
          </h3>

          <p v-if="edu.dept" class="relative flex items-start gap-1.5 text-cyan-400/90 text-xs sm:text-sm font-medium leading-snug mb-3">
            <Icon name="mdi:chevron-right" class="h-4 w-4 flex-shrink-0 mt-px text-cyan-500/70" />
            <span>{{ edu.dept }}</span>
          </p>

          <a
              :href="edu.link"
              target="_blank"
              rel="noopener noreferrer"
              class="relative inline-flex items-start gap-1.5 text-gray-400 text-xs sm:text-sm mb-4 hover:text-cyan-400 transition-colors w-fit"
          >
            <Icon name="mdi:map-marker-outline" class="h-4 w-4 flex-shrink-0 mt-px" />
            <span class="underline decoration-white/15 underline-offset-4 group-hover:decoration-cyan-500/50 transition-colors">{{ edu.institute }}</span>
          </a>

          <p class="relative text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">
            {{ edu.description }}
          </p>

          <!-- Footer meta -->
          <div class="relative mt-5 pt-4 border-t border-dashed border-white/10 flex items-center justify-between gap-3">
            <span class="font-mono text-[11px] sm:text-xs text-gray-500 tracking-wide">{{ edu.period }}</span>
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Icon name="mdi:check-decagram" class="h-3 w-3 text-cyan-400 flex-shrink-0" />
              <span class="font-mono text-[10px] sm:text-[11px] text-cyan-400 font-semibold">Passed {{ edu.passing }}</span>
            </span>
          </div>

          <div class="pointer-events-none absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
    passing: "2022",
    period: "2018 – 2022",
    degree: "Bachelor of Science (BSc)",
    dept: "Computer Science and Engineering",
    institute: "University of Asia Pacific",
    link: "https://www.uap-bd.edu/",
    description:
        "Specialized in software engineering, web & mobile development, cloud computing, and team-based projects. Completed capstone projects in full-stack web applications and cloud deployment.",
  },
  {
    passing: "2016",
    period: "2014 – 2016",
    degree: "Higher Secondary Certificate (HSC)",
    dept: "Science",
    institute: "Govt Science College, Dhaka",
    link: "https://www.gsctd.edu.bd/",
    description:
        "Focused on mathematics, physics, and computer science fundamentals. Participated in programming competitions and science fairs, strengthening analytical and problem-solving skills.",
  },
  {
    passing: "2014",
    period: "2012 – 2014",
    degree: "Secondary School Certificate (SSC)",
    dept: "Science",
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
.edu-card {
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
