<template>
  <div
    class="birthday-card relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl"
    :style="{ background: theme.bg, color: theme.text }"
  >
    <!-- Starburst radial background -->
    <div class="starburst absolute inset-0 pointer-events-none" />

    <!-- Floating balloons -->
    <div class="balloons-layer absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="b in balloons"
        :key="b.id"
        class="balloon absolute"
        :style="{
          left: b.left + '%',
          bottom: '-5rem',
          '--balloon-color': b.color,
          animationDelay: b.delay + 's',
          animationDuration: b.dur + 's',
        }"
      >
        <!-- Balloon body -->
        <div
          class="balloon-body"
          :style="{ background: `radial-gradient(circle at 35% 35%, ${b.highlight}, ${b.color})` }"
        />
        <!-- Balloon string -->
        <svg
          class="balloon-string"
          width="2"
          height="40"
          viewBox="0 0 2 40"
          :style="{ display: 'block', margin: '0 auto' }"
        >
          <path d="M1 0 Q 5 20 1 40" :stroke="b.color" stroke-width="1.2" fill="none" />
        </svg>
      </div>
    </div>

    <div class="relative z-10 flex flex-col items-center px-8 py-12 text-center gap-6">

      <!-- "Happy Birthday" heading -->
      <h1
        class="happy-birthday-text leading-tight"
        :style="{ fontFamily: '\'Fredoka One\', cursive', color: theme.accent }"
      >
        Happy Birthday!
      </h1>

      <!-- Name -->
      <p
        class="name-text leading-none"
        :style="{ fontFamily: '\'Fredoka One\', cursive', color: theme.text }"
      >
        {{ data.name || 'Wonderful Person' }}
      </p>

      <!-- Age with rainbow animation (if provided) -->
      <div
        v-if="data.age"
        class="age-block flex items-baseline gap-2"
      >
        <span
          class="age-number rainbow-text"
          :style="{ fontFamily: '\'Fredoka One\', cursive' }"
        >
          {{ data.age }}
        </span>
        <span
          class="text-xl opacity-70"
          :style="{ fontFamily: '\'Fredoka One\', cursive', color: theme.text }"
        >
          years young
        </span>
      </div>

      <!-- Animated Birthday Cake SVG -->
      <div class="cake-wrapper my-2">
        <svg
          viewBox="0 0 160 160"
          xmlns="http://www.w3.org/2000/svg"
          class="cake-svg"
          aria-label="Birthday cake"
        >
          <!-- Plate -->
          <ellipse cx="80" cy="138" rx="62" ry="8" :fill="theme.accent + '33'" />

          <!-- Cake base layer (bottom) -->
          <rect x="22" y="100" width="116" height="38" rx="6" :fill="theme.accent" />
          <!-- Base layer stripe decoration -->
          <rect x="22" y="112" width="116" height="6" rx="0" :fill="theme.accent + 'aa'" opacity="0.5" />

          <!-- Cake top layer -->
          <rect x="34" y="68" width="92" height="34" rx="5" :fill="theme.accent + 'cc'" />
          <!-- Top layer stripe -->
          <rect x="34" y="78" width="92" height="5" rx="0" fill="white" opacity="0.15" />

          <!-- Frosting drips on top layer (white) -->
          <path
            d="M34 68 Q40 58 46 68 Q52 58 58 68 Q64 58 70 68 Q76 58 82 68 Q88 58 94 68 Q100 58 106 68 Q112 58 118 68 Q124 58 126 68"
            fill="white"
            opacity="0.8"
          />

          <!-- Frosting drips on base layer -->
          <path
            d="M22 100 Q30 88 38 100 Q46 88 54 100 Q62 88 70 100 Q78 88 86 100 Q94 88 102 100 Q110 88 118 100 Q126 88 134 100 Q138 92 138 100"
            fill="white"
            opacity="0.7"
          />

          <!-- Candles (3) -->
          <!-- Candle 1 -->
          <rect x="56" y="52" width="8" height="18" rx="3" fill="#fbbf24" />
          <!-- Candle 2 -->
          <rect x="76" y="46" width="8" height="24" rx="3" fill="#f472b6" />
          <!-- Candle 3 -->
          <rect x="96" y="52" width="8" height="18" rx="3" fill="#a78bfa" />

          <!-- Candle wicks -->
          <line x1="60" y1="52" x2="60" y2="49" stroke="#374151" stroke-width="1.5" />
          <line x1="80" y1="46" x2="80" y2="43" stroke="#374151" stroke-width="1.5" />
          <line x1="100" y1="52" x2="100" y2="49" stroke="#374151" stroke-width="1.5" />

          <!-- Flame 1 -->
          <g class="flame flame-1">
            <ellipse cx="60" cy="44" rx="4" ry="6" fill="#fde68a" opacity="0.9" />
            <ellipse cx="60" cy="43" rx="2.5" ry="4" fill="#fbbf24" />
            <ellipse cx="60" cy="42" rx="1.5" ry="2.5" fill="white" opacity="0.7" />
          </g>

          <!-- Flame 2 -->
          <g class="flame flame-2">
            <ellipse cx="80" cy="38" rx="4.5" ry="7" fill="#fde68a" opacity="0.9" />
            <ellipse cx="80" cy="37" rx="2.8" ry="5" fill="#fbbf24" />
            <ellipse cx="80" cy="36" rx="1.8" ry="3" fill="white" opacity="0.7" />
          </g>

          <!-- Flame 3 -->
          <g class="flame flame-3">
            <ellipse cx="100" cy="44" rx="4" ry="6" fill="#fde68a" opacity="0.9" />
            <ellipse cx="100" cy="43" rx="2.5" ry="4" fill="#fbbf24" />
            <ellipse cx="100" cy="42" rx="1.5" ry="2.5" fill="white" opacity="0.7" />
          </g>

          <!-- Dots/sprinkles on cake -->
          <circle cx="50" cy="110" r="2.5" fill="white" opacity="0.6" />
          <circle cx="70" cy="106" r="2" fill="white" opacity="0.5" />
          <circle cx="90" cy="112" r="2.5" fill="white" opacity="0.6" />
          <circle cx="110" cy="107" r="2" fill="white" opacity="0.5" />
          <circle cx="130" cy="111" r="2" fill="white" opacity="0.4" />
          <circle cx="58" cy="80" r="2" fill="white" opacity="0.5" />
          <circle cx="80" cy="76" r="2.5" fill="white" opacity="0.6" />
          <circle cx="102" cy="81" r="2" fill="white" opacity="0.5" />
          <circle cx="118" cy="77" r="2" fill="white" opacity="0.4" />
        </svg>
      </div>

      <!-- Date -->
      <p
        v-if="data.date"
        class="text-sm tracking-widest opacity-70"
        :style="{ fontFamily: '\'Fredoka One\', cursive', color: theme.text }"
      >
        {{ formatDate(data.date) }}
      </p>

      <!-- Message -->
      <div
        v-if="data.message"
        class="message-block px-6 py-4 rounded-2xl max-w-md text-sm leading-relaxed italic"
        :style="{
          background: `${theme.accent}18`,
          border: `1px solid ${theme.accent}40`,
          color: theme.text,
          fontFamily: '\'Fredoka One\', cursive',
        }"
      >
        "{{ data.message }}"
      </div>

      <!-- From -->
      <p
        v-if="data.from"
        class="from-text text-sm tracking-widest opacity-60"
        :style="{ fontFamily: '\'Fredoka One\', cursive', color: theme.text }"
      >
        — With love, {{ data.from }}
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap',
    },
  ],
})

function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Deterministic balloon data to avoid SSR hydration mismatch
const BALLOON_COLORS = [
  { color: '#f87171', highlight: '#fca5a5' },
  { color: '#60a5fa', highlight: '#93c5fd' },
  { color: '#34d399', highlight: '#6ee7b7' },
  { color: '#fbbf24', highlight: '#fde68a' },
  { color: '#a78bfa', highlight: '#c4b5fd' },
  { color: '#f472b6', highlight: '#f9a8d4' },
  { color: '#fb923c', highlight: '#fdba74' },
]

const balloons = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: 4 + i * 13,
  delay: i * 0.8,
  dur: 7 + (i % 4),
  ...BALLOON_COLORS[i % BALLOON_COLORS.length],
}))
</script>

<style scoped>
/* ── Starburst radial background ─────────────────────────────── */
.starburst {
  background:
    radial-gradient(ellipse at 20% 20%, v-bind('theme.accent + "22"') 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, v-bind('theme.accent + "1a"') 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, v-bind('theme.accent + "15"') 0%, transparent 40%),
    radial-gradient(ellipse at 20% 80%, v-bind('theme.accent + "15"') 0%, transparent 40%),
    radial-gradient(ellipse at 50% 50%, v-bind('theme.accent + "10"') 0%, transparent 60%);
  animation: starburst-rotate 20s linear infinite;
}
@keyframes starburst-rotate {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

/* ── "Happy Birthday" text bounce ────────────────────────────── */
.happy-birthday-text {
  font-size: clamp(2.2rem, 9vw, 3.8rem);
  animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  text-shadow:
    3px 3px 0 v-bind('theme.accent + "55"'),
    -1px -1px 0 v-bind('theme.accent + "33"');
}
@keyframes bounce-in {
  from { opacity: 0; transform: scale(0.5) rotate(-5deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* ── Name text ───────────────────────────────────────────────── */
.name-text {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  animation: fade-in-up 0.7s ease 0.3s both;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Age rainbow gradient ─────────────────────────────────────── */
.age-number {
  font-size: clamp(4rem, 14vw, 7rem);
  line-height: 1;
  animation: age-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both;
}
.rainbow-text {
  background: linear-gradient(
    90deg,
    #f87171, #fbbf24, #34d399, #60a5fa, #a78bfa, #f472b6, #f87171
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    age-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both,
    rainbow-shift 4s linear infinite;
}
@keyframes rainbow-shift {
  0%   { background-position: 0% center; }
  100% { background-position: 300% center; }
}
@keyframes age-entrance {
  from { opacity: 0; transform: scale(0.3) rotate(10deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* ── Cake SVG ─────────────────────────────────────────────────── */
.cake-svg {
  width: clamp(130px, 40vw, 180px);
  height: auto;
  filter: drop-shadow(0 8px 24px v-bind('theme.accent + "50"'));
  animation: cake-float 4s ease-in-out infinite;
}
@keyframes cake-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* ── Flame flicker animations ────────────────────────────────── */
.flame {
  transform-origin: center bottom;
}
.flame-1 {
  animation: flicker-1 0.9s ease-in-out infinite alternate;
}
.flame-2 {
  animation: flicker-2 0.7s ease-in-out infinite alternate;
}
.flame-3 {
  animation: flicker-3 1.1s ease-in-out infinite alternate;
}
@keyframes flicker-1 {
  0%   { transform: scaleX(1)   scaleY(1)   rotate(-3deg); opacity: 0.95; }
  50%  { transform: scaleX(0.9) scaleY(1.1) rotate(2deg);  opacity: 1; }
  100% { transform: scaleX(1.1) scaleY(0.9) rotate(-1deg); opacity: 0.9; }
}
@keyframes flicker-2 {
  0%   { transform: scaleX(1)   scaleY(1)   rotate(3deg);  opacity: 1; }
  40%  { transform: scaleX(1.1) scaleY(0.85) rotate(-4deg); opacity: 0.9; }
  100% { transform: scaleX(0.85) scaleY(1.1) rotate(2deg);  opacity: 0.95; }
}
@keyframes flicker-3 {
  0%   { transform: scaleX(0.95) scaleY(1.05) rotate(2deg);  opacity: 0.92; }
  60%  { transform: scaleX(1.05) scaleY(0.95) rotate(-2deg); opacity: 1; }
  100% { transform: scaleX(1)    scaleY(1)    rotate(1deg);  opacity: 0.95; }
}

/* ── Balloons ─────────────────────────────────────────────────── */
.balloon {
  animation: balloon-float var(--dur, 8s) ease-in-out infinite;
}
.balloon-body {
  width: 38px;
  height: 46px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.15);
}
.balloon-body::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid var(--balloon-color);
}

@keyframes balloon-float {
  0%   { transform: translateY(0)     rotate(-4deg); }
  25%  { transform: translateY(-12px) rotate(3deg); }
  50%  { transform: translateY(-6px)  rotate(-2deg); }
  75%  { transform: translateY(-14px) rotate(4deg); }
  100% { transform: translateY(0)     rotate(-4deg); }
}

/* ── Message block ────────────────────────────────────────────── */
.message-block {
  animation: fade-in-up 0.7s ease 0.6s both;
}

/* ── From text ────────────────────────────────────────────────── */
.from-text {
  animation: fade-in-up 0.7s ease 0.8s both;
}
</style>
