<template>
  <div class="grad-wrapper">
    <!-- Graduation cap (toss animation runs once on mount) -->
    <div class="cap-launcher" :class="{ 'cap-toss': capTossed }">
      <span class="grad-cap">🎓</span>
    </div>

    <!-- Diploma scroll container -->
    <div
      class="scroll-container"
      :class="{ 'scroll-unrolled': scrollUnrolled }"
    >
      <!-- Scroll top roll decoration -->
      <div class="scroll-roll scroll-roll-top" :style="{ background: theme.accent }">
        <div class="roll-inner" :style="{ background: theme.bg }"></div>
      </div>

      <!-- Parchment body -->
      <div class="parchment" :style="{ background: theme.bg }">
        <!-- Parchment texture overlay -->
        <div class="parchment-texture"></div>

        <!-- School seal -->
        <div class="seal" :style="{ borderColor: theme.accent, color: theme.accent }">
          <div class="seal-inner" :style="{ background: theme.accent + '22' }">
            <span class="seal-stars">★ ★ ★</span>
            <span class="seal-school" :style="{ color: theme.accent }">{{ shortSchool }}</span>
          </div>
        </div>

        <!-- Wax seal (gold, corner) -->
        <div class="wax-seal">
          <div class="wax-circle">
            <span class="wax-stars">✦</span>
          </div>
        </div>

        <!-- Content -->
        <div class="diploma-content">
          <!-- Header text -->
          <p class="pres-text" :style="{ color: theme.text }">This is to certify that</p>

          <!-- Graduate name -->
          <h1 class="graduate-name" :style="{ color: theme.accent }">
            {{ data.name || 'Graduate Name' }}
          </h1>

          <!-- Degree line -->
          <p class="degree-line" :style="{ color: theme.text }">
            has successfully completed
          </p>

          <p class="degree-name" :style="{ color: theme.text }">
            <span class="degree-highlight" :style="{ color: theme.accent }">{{ data.degree || 'Bachelor of Science' }}</span>
          </p>

          <!-- School -->
          <p class="school-line" :style="{ color: theme.text }">
            from <strong :style="{ color: theme.accent }">{{ data.school || 'University Name' }}</strong>
          </p>

          <!-- Year badge -->
          <div class="year-badge" :style="{ background: theme.accent, color: theme.bg }">
            {{ data.year || new Date().getFullYear() }}
          </div>

          <!-- Divider ornament -->
          <div class="ornament-divider" :style="{ color: theme.accent }">
            ✦ &nbsp; ✦ &nbsp; ✦
          </div>

          <!-- Congratulations text -->
          <h2 class="congrats-text" :style="{ color: theme.accent }">
            Congratulations!
          </h2>

          <!-- Message -->
          <p v-if="data.message" class="message-text" :style="{ color: theme.text }">
            {{ data.message }}
          </p>

          <!-- From -->
          <p v-if="data.from" class="from-line" :style="{ color: theme.text }">
            — {{ data.from }}
          </p>
        </div>
      </div>

      <!-- Scroll bottom roll decoration -->
      <div class="scroll-roll scroll-roll-bottom" :style="{ background: theme.accent }">
        <div class="roll-inner" :style="{ background: theme.bg }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#imports'

defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap',
    },
  ],
})

const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

const scrollUnrolled = ref(false)
const capTossed = ref(false)

onMounted(() => {
  // Trigger cap toss immediately
  requestAnimationFrame(() => {
    capTossed.value = true
  })
  // Unroll scroll with slight delay
  setTimeout(() => {
    scrollUnrolled.value = true
  }, 200)
})

const shortSchool = computed(() => {
  const school: string = props.data.school || 'UNIV'
  return school
    .split(/\s+/)
    .map((w: string) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 5)
})
</script>

<style scoped>
/* ── Font base ── */
.grad-wrapper {
  font-family: 'EB Garamond', Georgia, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  min-height: 520px;
}

/* ── Cap toss ── */
.cap-launcher {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  pointer-events: none;
}

.grad-cap {
  font-size: 2.4rem;
  display: block;
  transform: translateY(0) rotate(0deg);
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.25));
}

.cap-toss .grad-cap {
  animation: cap-toss-anim 2.2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
}

@keyframes cap-toss-anim {
  0%   { transform: translateY(0)    rotate(0deg)   scale(1);   opacity: 1; }
  30%  { transform: translateY(-80px) rotate(-25deg) scale(1.2); opacity: 1; }
  60%  { transform: translateY(-50px) rotate(15deg)  scale(1.1); opacity: 1; }
  85%  { transform: translateY(-10px) rotate(-5deg)  scale(1.0); opacity: 1; }
  100% { transform: translateY(0)    rotate(0deg)   scale(1);   opacity: 0.9; }
}

/* ── Scroll container (unroll animation) ── */
.scroll-container {
  transform: scaleY(0);
  transform-origin: top center;
  opacity: 0;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
  width: 360px;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 16px 40px rgba(0,0,0,0.22));
}

.scroll-container.scroll-unrolled {
  transform: scaleY(1);
  opacity: 1;
}

/* ── Scroll roll decorations ── */
.scroll-roll {
  height: 18px;
  border-radius: 999px;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-roll-top {
  border-radius: 999px 999px 4px 4px;
}

.scroll-roll-bottom {
  border-radius: 4px 4px 999px 999px;
}

.roll-inner {
  height: 8px;
  width: calc(100% - 20px);
  border-radius: 999px;
  opacity: 0.6;
}

/* ── Parchment ── */
.parchment {
  position: relative;
  overflow: hidden;
  padding: 2.5rem 2rem 2rem;
}

/* Parchment texture: subtle gradient overlays to mimic aged paper */
.parchment-texture {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(180,140,80,0.04) 28px,
      rgba(180,140,80,0.04) 29px
    ),
    radial-gradient(ellipse at 20% 20%, rgba(210,170,100,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, rgba(210,170,100,0.06) 0%, transparent 60%);
  pointer-events: none;
}

/* ── School seal (circular badge) ── */
.seal {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.seal-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.seal-stars {
  font-size: 0.38rem;
  letter-spacing: 1px;
  opacity: 0.7;
}

.seal-school {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: center;
  line-height: 1.2;
  padding: 0 2px;
}

/* ── Wax seal ── */
.wax-seal {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
}

.wax-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFD700, #B8860B);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.3);
}

.wax-stars {
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* ── Diploma content ── */
.diploma-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  padding-top: 0.5rem;
}

.pres-text {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.65;
  margin: 0 0 0.3rem;
}

.graduate-name {
  font-family: 'Cinzel Decorative', 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.degree-line {
  font-size: 0.75rem;
  font-style: italic;
  margin: 0;
  opacity: 0.7;
}

.degree-name {
  margin: 0.2rem 0 0.3rem;
}

.degree-highlight {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.school-line {
  font-size: 0.78rem;
  margin: 0.1rem 0 0.8rem;
  opacity: 0.85;
}

.school-line strong {
  font-weight: 600;
}

/* Year badge */
.year-badge {
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 4px 18px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  margin-bottom: 0.75rem;
}

/* Ornament divider */
.ornament-divider {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  margin-bottom: 0.6rem;
  opacity: 0.6;
}

/* Congratulations */
.congrats-text {
  font-family: 'Cinzel Decorative', cursive;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.6rem;
  letter-spacing: 0.02em;
  /* Gold shimmer animation */
  background: linear-gradient(90deg, currentColor 0%, #FFD700 40%, currentColor 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* Message */
.message-text {
  font-size: 0.82rem;
  font-style: italic;
  line-height: 1.65;
  margin: 0 0 0.5rem;
  max-width: 260px;
  opacity: 0.85;
  text-align: center;
}

/* From */
.from-line {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  margin: 0;
  opacity: 0.7;
  letter-spacing: 0.04em;
}
</style>
