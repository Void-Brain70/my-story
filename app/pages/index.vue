<template>
  <div>
    <div class="pt-16 sm:pt-8 md:pt-8">
      <Hero/>
    </div>
    <div class="pt-8 sm:pt-12 md:pt-20">
      <About/>
    </div>
    <div class="pt-8 sm:pt-12 md:pt-20">
      <Skill/>
    </div>
    <div class="pt-8 sm:pt-12 md:pt-20">
      <Experience/>
    </div>
    <div class="pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-20 md:pb-20">
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
