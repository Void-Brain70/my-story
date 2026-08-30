<template>
  <div
    class="baby-card"
    :style="{
      background: theme.bg || '#fff0f5',
      color: theme.text || '#5a3a4a',
    }"
  >
    <!-- Floating bubbles -->
    <div class="bubbles" aria-hidden="true">
      <div
        v-for="n in 10"
        :key="n"
        class="bubble"
        :class="`b-${n}`"
        :style="{ borderColor: theme.accent || '#f4a7c3' }"
      />
    </div>

    <!-- Stork SVG carrying bundle (pendulum swing) -->
    <div class="stork-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 200 180"
        xmlns="http://www.w3.org/2000/svg"
        class="stork-svg"
        :style="{ '--accent': theme.accent || '#f4a7c3' }"
      >
        <!-- Swing arm (rope from beak) -->
        <line
          x1="100" y1="10"
          x2="130" y2="80"
          stroke="#ccc"
          stroke-width="1.5"
          stroke-dasharray="3 2"
          class="swing-rope"
        />

        <!-- Bundle (circle) swings -->
        <g class="bundle-group">
          <circle cx="130" cy="88" r="18" fill="#ffe0ec" stroke="var(--accent)" stroke-width="2" />
          <!-- tiny face -->
          <circle cx="126" cy="86" r="2" fill="var(--accent)" />
          <circle cx="134" cy="86" r="2" fill="var(--accent)" />
          <path d="M126 93 Q130 97 134 93" stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" />
        </g>

        <!-- Stork body (oval) -->
        <ellipse cx="95" cy="72" rx="22" ry="30" fill="white" stroke="var(--accent)" stroke-width="2" />

        <!-- Wing -->
        <path
          d="M73 68 Q55 52 68 42 Q80 55 73 68 Z"
          fill="#ffe0ec"
          stroke="var(--accent)"
          stroke-width="1.5"
          class="wing"
        />

        <!-- Head -->
        <circle cx="95" cy="36" r="14" fill="white" stroke="var(--accent)" stroke-width="2" />

        <!-- Eye -->
        <circle cx="100" cy="33" r="2.5" fill="var(--accent)" />
        <circle cx="101" cy="32" r="1" fill="white" />

        <!-- Beak (triangle) -->
        <polygon points="108,34 120,36 108,38" fill="#f78c2a" />

        <!-- Legs -->
        <line x1="85" y1="100" x2="78" y2="130" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" />
        <line x1="105" y1="100" x2="112" y2="130" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" />
        <!-- Feet -->
        <line x1="78" y1="130" x2="68" y2="130" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
        <line x1="78" y1="130" x2="78" y2="138" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
        <line x1="112" y1="130" x2="122" y2="130" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
        <line x1="112" y1="130" x2="112" y2="138" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Card body content -->
    <div class="card-body">
      <p class="tagline" :style="{ color: theme.accent || '#f4a7c3' }">
        Welcome to the world
      </p>

      <!-- Baby name letter-by-letter reveal -->
      <h1
        class="baby-name"
        :style="{ color: theme.accent || '#f4a7c3' }"
        aria-label="Baby name"
      >
        <span
          v-for="(letter, i) in nameLetters"
          :key="i"
          class="letter"
          :style="{ animationDelay: `${0.4 + i * 0.08}s` }"
        >{{ letter === ' ' ? ' ' : letter }}</span>
      </h1>

      <!-- DOB + Weight badge -->
      <div
        class="badge"
        :style="{
          background: theme.accent || '#f4a7c3',
          color: '#fff',
        }"
      >
        <span v-if="data.dob">{{ data.dob }}</span>
        <span v-if="data.dob && data.weight" class="badge-sep">·</span>
        <span v-if="data.weight">{{ data.weight }}</span>
      </div>

      <!-- Message -->
      <p v-if="data.message" class="message">
        {{ data.message }}
      </p>

      <!-- Parents -->
      <p v-if="data.parents" class="parents">
        — {{ data.parents }}
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
      href: 'https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;600;700&display=swap',
    },
  ],
})

const nameLetters = computed<string[]>(() =>
  (props.data.babyName || 'Little One').split(''),
)
</script>

<style scoped>
/* ── Card shell ─────────────────────────────────────────────── */
.baby-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 600px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  box-shadow: 0 20px 50px rgba(244, 167, 195, 0.3);
  font-family: 'Nunito', sans-serif;
}

/* ── Bubbles ────────────────────────────────────────────────── */
.bubbles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid;
  opacity: 0;
  animation: rise 6s ease-in infinite;
}

.b-1  { width: 24px; height: 24px; bottom: 5%;  left: 8%;   animation-delay: 0s;    animation-duration: 5.8s; }
.b-2  { width: 16px; height: 16px; bottom: 10%; left: 20%;  animation-delay: 1.2s;  animation-duration: 6.4s; }
.b-3  { width: 30px; height: 30px; bottom: 3%;  left: 40%;  animation-delay: 0.6s;  animation-duration: 7.0s; }
.b-4  { width: 20px; height: 20px; bottom: 8%;  left: 60%;  animation-delay: 2.0s;  animation-duration: 5.5s; }
.b-5  { width: 14px; height: 14px; bottom: 2%;  left: 75%;  animation-delay: 0.3s;  animation-duration: 6.8s; }
.b-6  { width: 26px; height: 26px; bottom: 6%;  left: 88%;  animation-delay: 1.7s;  animation-duration: 6.0s; }
.b-7  { width: 18px; height: 18px; bottom: 4%;  left: 52%;  animation-delay: 3.0s;  animation-duration: 5.2s; }
.b-8  { width: 22px; height: 22px; bottom: 9%;  left: 30%;  animation-delay: 0.9s;  animation-duration: 7.3s; }
.b-9  { width: 12px; height: 12px; bottom: 1%;  left: 65%;  animation-delay: 2.4s;  animation-duration: 6.2s; }
.b-10 { width: 28px; height: 28px; bottom: 7%;  left: 4%;   animation-delay: 1.5s;  animation-duration: 5.9s; }

@keyframes rise {
  0%   { opacity: 0;   transform: translateY(0) scale(0.6); }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { opacity: 0;   transform: translateY(-420px) scale(1.1); }
}

/* ── Stork ──────────────────────────────────────────────────── */
.stork-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 160px;
  animation: pendulum 3s ease-in-out infinite;
  transform-origin: top center;
}

.stork-svg {
  width: 100%;
}

/* Bundle pendulum swing */
.bundle-group {
  animation: bundle-swing 3s ease-in-out infinite;
  transform-origin: 100px 10px; /* pivot at beak */
}

/* Stork body gentle sway */
.stork-wrap {
  animation: stork-sway 4s ease-in-out infinite;
  transform-origin: 50% 0%;
}

.wing {
  animation: flap 1s ease-in-out infinite;
  transform-origin: 73px 55px;
}

@keyframes bundle-swing {
  0%, 100% { transform: rotate(-8deg); }
  50%       { transform: rotate(8deg); }
}

@keyframes stork-sway {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(3deg); }
}

@keyframes flap {
  0%, 100% { transform: rotate(0deg) scaleX(1); }
  50%       { transform: rotate(-10deg) scaleX(0.85); }
}

/* ── Card body ──────────────────────────────────────────────── */
.card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  padding-top: 180px; /* leave room for stork */
  width: 100%;
}

/* ── Tagline ────────────────────────────────────────────────── */
.tagline {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0;
  animation: fade-in 0.6s ease 0.2s forwards;
}

/* ── Baby name letter reveal ────────────────────────────────── */
.baby-name {
  font-family: 'Bubblegum Sans', cursive;
  font-size: clamp(2.4rem, 10vw, 3.6rem);
  line-height: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.7);
  animation: letter-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes letter-pop {
  from { opacity: 0; transform: translateY(20px) scale(0.7); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

/* ── DOB / weight badge ─────────────────────────────────────── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  letter-spacing: 0.03em;
  opacity: 0;
  animation: fade-in 0.6s ease 1.2s forwards;
}

.badge-sep {
  opacity: 0.7;
}

/* ── Message + parents ──────────────────────────────────────── */
.message {
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 340px;
  opacity: 0;
  animation: fade-in 0.6s ease 1.5s forwards;
}

.parents {
  font-size: 1rem;
  font-style: italic;
  font-weight: 600;
  opacity: 0;
  animation: fade-in 0.6s ease 1.8s forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
