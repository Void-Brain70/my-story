<template>
  <div>
    <div class="pt-20 md:pt-28">
      <Hero/>
    </div>
    <div class="pt-12 md:pt-20">
      <About/>
    </div>
    <div class="py-12 md:py-20">
      <Skill/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/section/Hero.vue";
import About from "~/components/section/About.vue";
import Skill from "~/components/section/Skill.vue";
</script>

<style scoped>

</style>
