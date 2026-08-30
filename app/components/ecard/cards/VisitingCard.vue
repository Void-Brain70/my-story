<template>
  <div class="visiting-card-wrapper">
    <div
      class="card-scene"
      @click="handleFlip"
      :class="{ 'is-flipped': isFlipped }"
    >
      <!-- Animated gradient border ring -->
      <div class="border-ring" :style="{ '--accent': theme.accent }"></div>

      <!-- Card inner (holds front + back) -->
      <div class="card-inner">

        <!-- ===== FRONT FACE ===== -->
        <div class="card-face card-front" :style="{ background: theme.bg, color: theme.text }">
          <!-- Top accent bar -->
          <div class="accent-bar" :style="{ background: theme.accent }"></div>

          <!-- Logo / Initials avatar -->
          <div class="logo-avatar" :style="{ background: theme.accent }">
            <span class="logo-initials" :style="{ color: theme.bg }">
              {{ initials }}
            </span>
          </div>

          <!-- Company chip -->
          <div v-if="data.company" class="company-chip" :style="{ borderColor: theme.accent, color: theme.accent }">
            {{ data.company }}
          </div>

          <!-- Name -->
          <h1 class="card-name" :style="{ color: theme.text }">
            {{ data.name || 'Your Name' }}
          </h1>

          <!-- Title -->
          <p class="card-title" :style="{ color: theme.accent }">
            {{ data.title || 'Professional Title' }}
          </p>

          <!-- Tagline -->
          <p v-if="data.tagline" class="card-tagline" :style="{ color: theme.text }">
            "{{ data.tagline }}"
          </p>

          <!-- Divider -->
          <div class="divider" :style="{ background: theme.accent }"></div>

          <!-- Website preview on front -->
          <p v-if="data.website" class="front-website" :style="{ color: theme.accent }">
            {{ data.website }}
          </p>

          <!-- Flip hint -->
          <div v-if="!hasFlippedOnce" class="flip-hint">
            <span class="flip-hint-dot" :style="{ background: theme.accent }"></span>
            Click to flip
          </div>
        </div>

        <!-- ===== BACK FACE ===== -->
        <div class="card-face card-back" :style="{ background: theme.bg, color: theme.text }">
          <!-- Top accent bar -->
          <div class="accent-bar" :style="{ background: theme.accent }"></div>

          <!-- Back header -->
          <div class="back-header">
            <p class="back-name" :style="{ color: theme.accent }">{{ data.name || 'Your Name' }}</p>
            <p class="back-sub" :style="{ color: theme.text, opacity: 0.7 }">Contact Details</p>
          </div>

          <!-- Contact rows -->
          <div class="contact-list">
            <div v-if="data.email" class="contact-row">
              <span class="contact-icon">✉️</span>
              <a :href="`mailto:${data.email}`" class="contact-text" :style="{ color: theme.text }">{{ data.email }}</a>
            </div>
            <div v-if="data.phone" class="contact-row">
              <span class="contact-icon">📞</span>
              <a :href="`tel:${data.phone}`" class="contact-text" :style="{ color: theme.text }">{{ data.phone }}</a>
            </div>
            <div v-if="data.website" class="contact-row">
              <span class="contact-icon">🌐</span>
              <a :href="data.website" target="_blank" class="contact-text" :style="{ color: theme.text }">{{ data.website }}</a>
            </div>
            <div v-if="data.address" class="contact-row">
              <span class="contact-icon">📍</span>
              <span class="contact-text" :style="{ color: theme.text }">{{ data.address }}</span>
            </div>
          </div>

          <!-- QR code placeholder (8×8 grid) -->
          <div class="qr-block">
            <div class="qr-grid">
              <div
                v-for="(cell, i) in qrPattern"
                :key="i"
                class="qr-cell"
                :style="{ background: cell ? theme.accent : 'transparent' }"
              ></div>
            </div>
            <p class="qr-label" :style="{ color: theme.text, opacity: 0.5 }">Scan</p>
          </div>

          <!-- Bottom accent bar -->
          <div class="bottom-bar" :style="{ background: theme.accent }"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#imports'

defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
  ],
})

const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

const isFlipped = ref(false)
const hasFlippedOnce = ref(false)

function handleFlip() {
  isFlipped.value = !isFlipped.value
  if (!hasFlippedOnce.value) hasFlippedOnce.value = true
}

const initials = computed(() => {
  const name: string = props.data.name || ''
  return name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() || '')
    .join('')
})

// Deterministic 8×8 QR-like pattern seeded from name
const qrPattern = computed(() => {
  const seed = (props.data.name || 'card').split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0)
  // Always-on corner squares for realism
  const corners = new Set([0,1,8,9, 6,7,14,15, 48,49,56,57])
  return Array.from({ length: 64 }, (_, i) => {
    if (corners.has(i)) return true
    return ((seed * (i + 1) * 2654435761) >>> 0) % 3 !== 0
  })
})
</script>

<style scoped>
/* ── Font assignments ── */
.visiting-card-wrapper {
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* ── Scene / perspective ── */
.card-scene {
  position: relative;
  width: 380px;
  height: 220px;
  perspective: 1200px;
  cursor: pointer;
  user-select: none;
}

/* ── Rotating gradient border ring ── */
.border-ring {
  position: absolute;
  inset: -4px;
  border-radius: 20px;
  z-index: 0;
  background: conic-gradient(
    from 0deg,
    var(--accent),
    transparent 40%,
    var(--accent) 60%,
    transparent 80%,
    var(--accent)
  );
  animation: ring-spin 3s linear infinite;
}

@keyframes ring-spin {
  to { transform: rotate(360deg); }
}

/* ── Card inner (flip container) ── */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  border-radius: 16px;
  z-index: 1;
}

.card-scene.is-flipped .card-inner {
  transform: rotateY(180deg);
}

/* ── Shared face styles ── */
.card-face {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-back {
  transform: rotateY(180deg);
}

/* ── Accent bar ── */
.accent-bar {
  height: 4px;
  width: 100%;
}

/* ── FRONT styles ── */
.logo-avatar {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo-initials {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.company-chip {
  position: absolute;
  top: 28px;
  left: 24px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 8px;
  opacity: 0.85;
}

.card-name {
  position: absolute;
  bottom: 74px;
  left: 24px;
  right: 90px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}

.card-title {
  position: absolute;
  bottom: 56px;
  left: 24px;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
}

.card-tagline {
  position: absolute;
  bottom: 38px;
  left: 24px;
  right: 24px;
  font-size: 0.65rem;
  font-style: italic;
  opacity: 0.6;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  position: absolute;
  bottom: 28px;
  left: 24px;
  width: 40px;
  height: 2px;
  border-radius: 2px;
  opacity: 0.5;
}

.front-website {
  position: absolute;
  bottom: 12px;
  left: 24px;
  font-size: 0.62rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.8;
}

/* ── Flip hint ── */
.flip-hint {
  position: absolute;
  bottom: 10px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.6rem;
  opacity: 0.45;
  animation: pulse-hint 2s ease-in-out infinite;
}

.flip-hint-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

@keyframes pulse-hint {
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 0.9; }
}

/* ── BACK styles ── */
.back-header {
  padding: 12px 24px 0;
}

.back-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
}

.back-sub {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 2px 0 0;
}

.contact-list {
  padding: 10px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  font-size: 0.75rem;
  width: 18px;
  flex-shrink: 0;
}

.contact-text {
  font-size: 0.65rem;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

/* ── QR placeholder ── */
.qr-block {
  position: absolute;
  bottom: 14px;
  right: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(8, 7px);
  grid-template-rows: repeat(8, 7px);
  gap: 1px;
  padding: 4px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
}

.qr-cell {
  width: 7px;
  height: 7px;
  border-radius: 1px;
}

.qr-label {
  font-size: 0.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

/* ── Bottom bar ── */
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0.6;
}
</style>
