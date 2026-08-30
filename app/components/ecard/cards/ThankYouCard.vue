<template>
  <div
    class="thankyou-card"
    :style="{
      background: theme.bg || '#fdf6ee',
      color: theme.text || '#3b2f2f',
    }"
  >
    <!-- Paper texture overlay -->
    <div class="paper-texture" />

    <!-- Floating sparkle dots -->
    <div class="sparkles" aria-hidden="true">
      <div
        v-for="n in 12"
        :key="n"
        class="sparkle"
        :class="`sp-${n}`"
        :style="{ background: theme.accent || '#c9956c' }"
      />
    </div>

    <!-- SVG handwriting "Thank You" -->
    <div class="svg-wrap">
      <svg
        viewBox="0 0 520 110"
        xmlns="http://www.w3.org/2000/svg"
        class="handwriting-svg"
        aria-label="Thank You"
        role="img"
      >
        <text
          x="50%"
          y="80"
          text-anchor="middle"
          class="handwriting-text"
          :style="{ stroke: theme.accent || '#c9956c', fill: theme.accent || '#c9956c' }"
        >
          Thank You
        </text>
      </svg>
    </div>

    <!-- Elegant body content -->
    <div class="card-body">
      <!-- Thin ornamental rule -->
      <div class="ornament" :style="{ '--accent': theme.accent || '#c9956c' }">
        <span class="rule" :style="{ background: theme.accent || '#c9956c' }" />
        <span class="diamond" :style="{ background: theme.accent || '#c9956c' }" />
        <span class="rule" :style="{ background: theme.accent || '#c9956c' }" />
      </div>

      <p v-if="data.to" class="salutation" style="animation-delay: 1.2s">
        Dear <strong>{{ data.to }}</strong>,
      </p>

      <p v-if="data.reason" class="reason" style="animation-delay: 1.5s">
        {{ data.reason }}
      </p>

      <p v-if="data.message" class="message" style="animation-delay: 1.8s">
        {{ data.message }}
      </p>

      <div class="closing" style="animation-delay: 2.1s">
        <span>With gratitude,</span>
        <strong v-if="data.from">{{ data.from }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap',
    },
  ],
})

// Trigger stroke animation after mount
const mounted = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})
</script>

<style scoped>
/* ── Card shell ─────────────────────────────────────────────── */
.thankyou-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  min-height: 560px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2.5rem 3rem;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  font-family: 'Lora', serif;
}

/* ── Paper texture ──────────────────────────────────────────── */
.paper-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(150, 120, 80, 0.04) 28px,
      rgba(150, 120, 80, 0.04) 29px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 40px,
      rgba(150, 120, 80, 0.02) 40px,
      rgba(150, 120, 80, 0.02) 41px
    );
}

/* ── Sparkle dots ───────────────────────────────────────────── */
.sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: sparkle-anim 4s ease-in-out infinite;
}

/* size + position variety */
.sp-1  { width: 5px;  height: 5px;  top: 8%;   left: 10%;  animation-delay: 0s;    animation-duration: 3.8s; }
.sp-2  { width: 4px;  height: 4px;  top: 15%;  left: 80%;  animation-delay: 0.7s;  animation-duration: 4.2s; }
.sp-3  { width: 6px;  height: 6px;  top: 5%;   left: 50%;  animation-delay: 1.2s;  animation-duration: 3.5s; }
.sp-4  { width: 3px;  height: 3px;  top: 25%;  left: 90%;  animation-delay: 0.4s;  animation-duration: 4.6s; }
.sp-5  { width: 5px;  height: 5px;  top: 70%;  left: 6%;   animation-delay: 1.8s;  animation-duration: 3.9s; }
.sp-6  { width: 4px;  height: 4px;  top: 85%;  left: 75%;  animation-delay: 0.9s;  animation-duration: 4.1s; }
.sp-7  { width: 6px;  height: 6px;  top: 90%;  left: 35%;  animation-delay: 2.2s;  animation-duration: 3.6s; }
.sp-8  { width: 3px;  height: 3px;  top: 60%;  left: 95%;  animation-delay: 0.3s;  animation-duration: 4.4s; }
.sp-9  { width: 5px;  height: 5px;  top: 40%;  left: 3%;   animation-delay: 1.5s;  animation-duration: 3.7s; }
.sp-10 { width: 4px;  height: 4px;  top: 55%;  left: 88%;  animation-delay: 2.8s;  animation-duration: 4.0s; }
.sp-11 { width: 6px;  height: 6px;  top: 78%;  left: 20%;  animation-delay: 0.6s;  animation-duration: 4.3s; }
.sp-12 { width: 3px;  height: 3px;  top: 32%;  left: 65%;  animation-delay: 2.0s;  animation-duration: 3.4s; }

@keyframes sparkle-anim {
  0%   { opacity: 0; transform: scale(0) rotate(0deg); }
  30%  { opacity: 0.9; transform: scale(1.2) rotate(45deg); }
  60%  { opacity: 0.6; transform: scale(0.9) rotate(90deg); }
  100% { opacity: 0; transform: scale(0) rotate(135deg); }
}

/* ── SVG handwriting ────────────────────────────────────────── */
.svg-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  margin-bottom: 0.5rem;
}

.handwriting-svg {
  width: 100%;
  overflow: visible;
}

.handwriting-text {
  font-family: 'Caveat', cursive;
  font-size: 72px;
  font-weight: 700;
  stroke-width: 2px;
  fill: transparent;
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: draw-text 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
}

@keyframes draw-text {
  0%   { stroke-dashoffset: 1200; fill: transparent; }
  70%  { stroke-dashoffset: 0;    fill: transparent; }
  100% { stroke-dashoffset: 0;    fill: var(--fill-color, currentColor); }
}

/* Inject fill color via a trick since CSS vars don't cross fill */
.handwriting-text {
  --fill-color: inherit;
}

/* ── Card body ──────────────────────────────────────────────── */
.card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.85rem;
  width: 100%;
}

/* ── Ornamental divider ─────────────────────────────────────── */
.ornament {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 70%;
  margin-bottom: 0.25rem;
}

.rule {
  flex: 1;
  height: 1px;
  opacity: 0.45;
}

.diamond {
  width: 7px;
  height: 7px;
  transform: rotate(45deg);
  opacity: 0.7;
  flex-shrink: 0;
}

/* ── Body text blocks ───────────────────────────────────────── */
.salutation,
.reason,
.message,
.closing {
  opacity: 0;
  animation: fade-in-up 0.7s ease forwards;
}

.salutation {
  font-family: 'Lora', serif;
  font-size: 1.15rem;
  font-style: italic;
}

.reason {
  font-family: 'Lora', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.message {
  font-family: 'Lora', serif;
  font-size: 0.98rem;
  line-height: 1.75;
  max-width: 360px;
  opacity: 0.85;
}

.closing {
  font-family: 'Caveat', cursive;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  margin-top: 0.5rem;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
