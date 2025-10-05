<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Global mobile optimization styles */
* {
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
}

/* Prevent horizontal scroll on mobile */
@media (max-width: 640px) {
  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  /* Better touch interactions */
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Allow text selection for text content */
  p, span, h1, h2, h3, h4, h5, h6, a {
    -webkit-user-select: text;
    user-select: text;
  }

  /* Optimize images for mobile */
  img {
    max-width: 100%;
    height: auto;
  }
}

/* Smooth scroll for anchor links */
a[href^="#"] {
  scroll-behavior: smooth;
}
</style>