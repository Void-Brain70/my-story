<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <div class="pt-16 sm:pt-20 md:pt-8">
      <Hero/>
    </div>
    <!-- About Section -->
    <div class="pt-12 sm:pt-16 md:pt-20">
      <About/>
    </div>
    <!-- Skills Section -->
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Skill/>
    </div>
    <!-- Experience Section -->
    <div class="pt-12 sm:pt-16 md:pt-20">
      <Experience/>
    </div>
    <!-- Education Section -->
    <div class="pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20">
      <Education/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/section/Hero.vue";
import About from "~/components/section/About.vue";
import Skill from "~/components/section/Skill.vue";
import Experience from "~/components/section/Experience.vue";
import Education from "~/components/section/Education.vue";
</script>

<style scoped>

</style>
