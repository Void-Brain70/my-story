<template>
  <div
    class="anniversary-card relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl"
    :style="{ background: theme.bg, color: theme.text }"
  >
    <!-- Starfield background dots -->
    <div class="starfield absolute inset-0 pointer-events-none overflow-hidden">
      <span
        v-for="s in stars"
        :key="s.id"
        class="star absolute rounded-full"
        :style="{
          width: s.size + 'px',
          height: s.size + 'px',
          top: s.top + '%',
          left: s.left + '%',
          background: theme.accent,
          animationDelay: s.delay + 's',
          animationDuration: s.dur + 's',
        }"
      />
    </div>

    <!-- Floating CSS hearts (border-radius trick, no emoji) -->
    <div class="hearts-layer absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="h in hearts"
        :key="h.id"
        class="heart absolute"
        :style="{
          left: h.left + '%',
          bottom: '-2rem',
          '--heart-color': theme.accent,
          animationDelay: h.delay + 's',
          animationDuration: h.dur + 's',
          transform: `scale(${h.scale})`,
        }"
      />
    </div>

    <!-- Inner glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        background: `radial-gradient(ellipse at 50% 50%, ${theme.accent}18 0%, transparent 65%)`,
      }"
    />

    <div class="relative z-10 flex flex-col items-center px-10 py-12 text-center gap-7">

      <!-- Header tag line -->
      <p
        class="text-xs uppercase tracking-[0.4em] opacity-60"
        :style="{ fontFamily: '\'Cormorant Garamond\', serif', color: theme.text }"
      >
        Celebrating Love
      </p>

      <!-- Names -->
      <h2
        class="couple-names leading-tight"
        :style="{ fontFamily: '\'Dancing Script\', cursive', color: theme.text }"
      >
        {{ data.name1 || 'Name 1' }} &amp; {{ data.name2 || 'Name 2' }}
      </h2>

      <!-- Milestone badge (if matched) -->
      <div
        v-if="milestone"
        class="milestone-badge px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
        :style="{
          background: `${theme.accent}25`,
          border: `1px solid ${theme.accent}70`,
          color: theme.accent,
          fontFamily: '\'Cormorant Garamond\', serif',
        }"
      >
        {{ milestone }}
      </div>

      <!-- Years number with animated heart -->
      <div class="years-block flex flex-col items-center gap-2">
        <div
          class="years-number relative leading-none"
          :style="{ color: theme.accent, fontFamily: '\'Cormorant Garamond\', serif' }"
        >
          {{ data.years || '?' }}
        </div>

        <!-- Pulsing CSS heart below number -->
        <div
          class="pulse-heart"
          :style="{ '--heart-color': theme.accent }"
        />

        <p
          class="text-lg uppercase tracking-[0.3em] opacity-80 mt-1"
          :style="{ fontFamily: '\'Cormorant Garamond\', serif', color: theme.text }"
        >
          {{ Number(data.years) === 1 ? 'Year' : 'Years' }} Together
        </p>
      </div>

      <!-- Divider -->
      <div class="w-full flex items-center gap-3" :style="{ color: theme.accent }">
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}40` }" />
        <div class="small-heart" :style="{ '--heart-color': theme.accent }" />
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}40` }" />
      </div>

      <!-- Date -->
      <p
        v-if="data.date"
        class="text-base tracking-widest"
        :style="{ fontFamily: '\'Cormorant Garamond\', serif', color: theme.accent, opacity: 0.9 }"
      >
        {{ formatDate(data.date) }}
      </p>

      <!-- Message -->
      <blockquote
        v-if="data.message"
        class="message px-6 py-4 rounded-xl max-w-md italic leading-relaxed opacity-85 text-sm relative"
        :style="{
          fontFamily: '\'Cormorant Garamond\', serif',
          color: theme.text,
          background: `${theme.accent}12`,
          border: `1px solid ${theme.accent}35`,
        }"
      >
        "{{ data.message }}"
      </blockquote>

      <!-- Quote at bottom -->
      <p
        class="quote-text text-xs italic opacity-50 max-w-sm leading-relaxed"
        :style="{ fontFamily: '\'Cormorant Garamond\', serif', color: theme.text }"
      >
        "A great marriage is not when the perfect couple comes together. It is when an imperfect couple learns to enjoy their differences."
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    },
  ],
})

// Milestone map
const MILESTONES: Record<number, string> = {
  1:  '1st · Paper Anniversary',
  5:  '5th · Wood Anniversary',
  10: '10th · Tin Anniversary',
  15: '15th · Crystal Anniversary',
  20: '20th · China Anniversary',
  25: '25th · Silver Anniversary',
  30: '30th · Pearl Anniversary',
  40: '40th · Ruby Anniversary',
  50: '50th · Golden Anniversary',
  60: '60th · Diamond Anniversary',
  75: '75th · Platinum Anniversary',
}

const milestone = computed<string | null>(() => {
  const y = Number(props.data.years)
  return MILESTONES[y] ?? null
})

function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Generate static star data (avoids hydration mismatch)
const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: (i % 3) + 1,
  top: ((i * 37 + 11) % 100),
  left: ((i * 53 + 7) % 100),
  delay: (i * 0.3) % 4,
  dur: 2.5 + (i % 3),
}))

// Generate floating heart data
const hearts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 5 + i * 9,
  delay: i * 0.7,
  dur: 5 + (i % 4),
  scale: 0.5 + (i % 3) * 0.3,
}))
</script>

<style scoped>
/* ── Star twinkle ────────────────────────────────────────────── */
.star {
  animation: twinkle var(--dur, 3s) ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.5); }
}

/* ── CSS Heart shape (border-radius trick) ───────────────────── */
.heart,
.pulse-heart,
.small-heart {
  position: relative;
  display: inline-block;
  background: var(--heart-color, #e05);
  transform: rotate(-45deg);
}

/* Floating hearts */
.heart {
  width: 20px;
  height: 20px;
  animation: float-heart var(--dur, 6s) ease-in infinite;
}
.heart::before,
.heart::after {
  content: '';
  position: absolute;
  background: var(--heart-color, #e05);
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.heart::before { top: -10px; left: 0; }
.heart::after  { top: 0; left: 10px; }

@keyframes float-heart {
  0%   { transform: rotate(-45deg) translateY(0) scale(var(--scale, 1)); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.4; }
  100% { transform: rotate(-45deg) translateY(-120vh) scale(var(--scale, 1)); opacity: 0; }
}

/* Pulsing heart (large, below number) */
.pulse-heart {
  width: 30px;
  height: 30px;
  animation: pulse-heart 1.4s ease-in-out infinite;
}
.pulse-heart::before,
.pulse-heart::after {
  content: '';
  position: absolute;
  background: var(--heart-color, #e05);
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.pulse-heart::before { top: -15px; left: 0; }
.pulse-heart::after  { top: 0; left: 15px; }

@keyframes pulse-heart {
  0%, 100% { transform: rotate(-45deg) scale(1); }
  50%       { transform: rotate(-45deg) scale(1.3); }
}

/* Small divider heart */
.small-heart {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
.small-heart::before,
.small-heart::after {
  content: '';
  position: absolute;
  background: var(--heart-color, #e05);
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
.small-heart::before { top: -6px; left: 0; }
.small-heart::after  { top: 0; left: 6px; }

/* ── Years number ────────────────────────────────────────────── */
.years-number {
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 600;
  animation: glow-pulse 2.5s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 20px v-bind('theme.accent + "60"'), 0 0 40px v-bind('theme.accent + "30"'); }
  50%       { text-shadow: 0 0 40px v-bind('theme.accent + "90"'), 0 0 80px v-bind('theme.accent + "50"'); }
}

/* ── Couple names ─────────────────────────────────────────────── */
.couple-names {
  font-size: clamp(2rem, 7vw, 3.2rem);
  animation: fade-in-down 0.9s ease both;
}
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Milestone badge bounce ───────────────────────────────────── */
.milestone-badge {
  animation: badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes badge-pop {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}

/* ── Message block ────────────────────────────────────────────── */
.message {
  animation: fade-in-up 1s ease 0.4s both;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 0.85; transform: translateY(0); }
}

/* ── Quote shimmer ────────────────────────────────────────────── */
.quote-text {
  animation: fade-in-up 1s ease 0.7s both;
}
</style>
