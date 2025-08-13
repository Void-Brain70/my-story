<template>
  <div>
    <Navbar/>
    <main class="container mx-auto max-w-[1300px] lg:max-w-[1005px] xl:max-w-[1160px] min-[1300px]:max-w-[1256px] 2xl:max-w-[1300px] max-[1300px]:p-4">
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
</script>

<style scoped>

</style>