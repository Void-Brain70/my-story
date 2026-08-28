<template>
  <div>
    <!-- Keyboard/screen-reader users can jump past the fixed nav -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <Navbar/>

    <main
      id="main-content"
      class="container mx-auto max-w-[1300px] lg:max-w-[1005px] xl:max-w-[1160px] min-[1300px]:max-w-[1256px] 2xl:max-w-[1300px] max-[1300px]:p-4"
    >
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
.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 1000;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #06b6d4, #14b8a6);
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  transition: top 0.2s ease;
}

.skip-link:focus-visible {
  top: 1rem;
  outline: 2px solid #fff;
  outline-offset: 2px;
}
</style>
