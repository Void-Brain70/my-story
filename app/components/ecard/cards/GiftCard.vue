<template>
  <div class="gift-wrapper">
    <!-- Sparkle particles (always rendered, visible after open) -->
    <div class="sparkle-field" :class="{ active: isOpened }">
      <div
        v-for="s in sparkles"
        :key="s.id"
        class="sparkle"
        :style="{
          left: s.x + '%',
          top: s.y + '%',
          animationDelay: s.delay + 's',
          animationDuration: s.dur + 's',
          background: s.color,
          width: s.size + 'px',
          height: s.size + 'px',
        }"
      ></div>
    </div>

    <!-- Main card surface -->
    <div
      class="gift-card"
      :style="{ background: theme.bg, color: theme.text }"
      @click="handleOpen"
    >
      <!-- ===== CLOSED STATE ===== -->
      <transition name="fade-out">
        <div v-if="!isOpened" class="closed-view">

          <!-- Gift box assembly -->
          <div class="gift-box-wrap">
            <!-- Bow top -->
            <div class="bow-wrap">
              <div class="bow-left"  :style="{ background: theme.accent }"></div>
              <div class="bow-right" :style="{ background: theme.accent }"></div>
              <div class="bow-knot"  :style="{ background: theme.accent }"></div>
            </div>

            <!-- Lid -->
            <div
              class="box-lid"
              :style="{ background: theme.accent }"
              :class="{ lid-open: isOpened }"
            >
              <!-- Lid ribbon vertical -->
              <div class="lid-ribbon" :style="{ background: lighten(theme.accent) }"></div>
            </div>

            <!-- Box body -->
            <div class="box-body" :style="{ background: theme.accent }">
              <!-- Vertical ribbon -->
              <div class="ribbon-v" :style="{ background: lighten(theme.accent) }"></div>
              <!-- Horizontal ribbon -->
              <div class="ribbon-h" :style="{ background: lighten(theme.accent) }"></div>
              <!-- Shine overlay -->
              <div class="box-shine"></div>
            </div>
          </div>

          <!-- Tap hint -->
          <p class="tap-hint" :style="{ color: theme.text }">
            <span class="tap-icon" :style="{ color: theme.accent }">🎁</span>
            Tap the gift to open
          </p>

          <!-- "For [name]" label -->
          <p v-if="data.to" class="for-label" :style="{ color: theme.accent }">
            For {{ data.to }}
          </p>
        </div>
      </transition>

      <!-- ===== OPENED STATE ===== -->
      <transition name="pop-in">
        <div v-if="isOpened" class="opened-view">
          <!-- Occasion badge -->
          <div v-if="data.occasion" class="occasion-badge" :style="{ background: theme.accent, color: theme.bg }">
            {{ data.occasion }}
          </div>

          <!-- To -->
          <p v-if="data.to" class="msg-to" :style="{ color: theme.text }">
            Dear <span :style="{ color: theme.accent }">{{ data.to }}</span>,
          </p>

          <!-- Message -->
          <div class="msg-body" :style="{ borderColor: theme.accent }">
            <p :style="{ color: theme.text }">{{ data.message || 'Wishing you all the joy in the world!' }}</p>
          </div>

          <!-- From -->
          <p v-if="data.from" class="msg-from" :style="{ color: theme.text }">
            With love, <span :style="{ color: theme.accent }">{{ data.from }}</span> 💛
          </p>

          <!-- Reclose hint -->
          <p class="reclose-hint" :style="{ color: theme.text }">Tap to close</p>
        </div>
      </transition>
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
      href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
    },
  ],
})

const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

const isOpened = ref(false)

function handleOpen() {
  isOpened.value = !isOpened.value
}

// Lighten accent color for ribbon highlight (naive approach: add alpha overlay)
function lighten(color: string): string {
  // We overlay white at low opacity via a wrapper; return a lighter tint
  // For CSS hex we just return white at 40% — handled via pseudo element
  return color + 'cc'
}

// Generate sparkle data
const sparkles = computed(() => {
  const colors = [props.theme.accent, '#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#7B68EE']
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: 5 + (i * 37 + 13) % 90,
    y: 5 + (i * 53 + 7)  % 90,
    delay: (i * 0.15) % 1.8,
    dur: 0.8 + (i * 0.11) % 0.8,
    size: 4 + (i * 3) % 8,
    color: colors[i % colors.length],
  }))
})
</script>

<style scoped>
/* ── Fonts ── */
.gift-wrapper {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

/* ── Sparkle field ── */
.sparkle-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.sparkle-field.active {
  opacity: 1;
}

.sparkle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
}

.sparkle-field.active .sparkle {
  animation: sparkle-pop var(--dur, 1s) ease-out var(--delay, 0s) infinite;
}

@keyframes sparkle-pop {
  0%   { opacity: 0;   transform: scale(0) translateY(0); }
  30%  { opacity: 1;   transform: scale(1.2) translateY(-6px); }
  70%  { opacity: 0.8; transform: scale(1) translateY(-12px); }
  100% { opacity: 0;   transform: scale(0.3) translateY(-20px); }
}

/* Apply CSS vars per sparkle via inline style isn't directly usable, so we animate all */
.sparkle {
  animation: sparkle-pop 1s ease-out infinite;
  animation-delay: var(--sparkle-delay, 0s);
}

/* ── Main card ── */
.gift-card {
  position: relative;
  width: 320px;
  min-height: 380px;
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.22), 0 4px 20px rgba(0,0,0,0.12);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  z-index: 1;
}

/* ── Closed view ── */
.closed-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
}

/* ── Gift box assembly ── */
.gift-box-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Bow */
.bow-wrap {
  position: relative;
  width: 100px;
  height: 44px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: -4px;
  z-index: 3;
}

.bow-left,
.bow-right {
  width: 40px;
  height: 34px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  bottom: 4px;
  opacity: 0.92;
  box-shadow: inset -2px -2px 6px rgba(0,0,0,0.15);
}

.bow-left {
  left: 8px;
  transform: rotate(30deg);
  transform-origin: right bottom;
}

.bow-right {
  right: 8px;
  transform: rotate(-30deg);
  transform-origin: left bottom;
}

.bow-knot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: absolute;
  bottom: 2px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}

/* Lid */
.box-lid {
  width: 120px;
  height: 22px;
  border-radius: 4px 4px 0 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: top center;
}

.lid-open {
  transform: rotateX(-110deg) translateY(-8px);
}

.lid-ribbon {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 14px;
  transform: translateX(-50%);
  border-radius: 2px;
  opacity: 0.5;
}

/* Box body */
.box-body {
  width: 120px;
  height: 100px;
  border-radius: 0 0 6px 6px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1);
}

.ribbon-v {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 14px;
  transform: translateX(-50%);
  opacity: 0.45;
}

.ribbon-h {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  height: 14px;
  opacity: 0.45;
}

.box-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 70%);
  pointer-events: none;
}

/* Bounce animation on the box while closed */
.gift-box-wrap {
  animation: gift-bounce 2.4s ease-in-out infinite;
}

@keyframes gift-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Tap hint */
.tap-hint {
  font-size: 0.78rem;
  font-weight: 500;
  opacity: 0.75;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  animation: pulse-bounce 2s ease-in-out infinite;
}

.tap-icon {
  font-size: 1rem;
}

@keyframes pulse-bounce {
  0%, 100% { transform: scale(1); opacity: 0.75; }
  50%       { transform: scale(1.05); opacity: 1; }
}

/* For label */
.for-label {
  font-family: 'Pacifico', cursive;
  font-size: 1.1rem;
  margin: 0;
  text-align: center;
}

/* ── Opened view ── */
.opened-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem 0;
}

.occasion-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.msg-to {
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
}

.msg-body {
  background: rgba(255,255,255,0.06);
  border-left: 3px solid;
  border-radius: 0 8px 8px 0;
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 260px;
}

.msg-body p {
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  opacity: 0.9;
  text-align: center;
}

.msg-from {
  font-size: 0.82rem;
  margin: 0;
  text-align: center;
  opacity: 0.85;
}

.reclose-hint {
  font-size: 0.58rem;
  opacity: 0.4;
  margin: 0;
  letter-spacing: 0.08em;
}

/* ── Transitions ── */
.fade-out-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-out-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.pop-in-enter-active {
  transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}
.pop-in-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(20px);
}
</style>
