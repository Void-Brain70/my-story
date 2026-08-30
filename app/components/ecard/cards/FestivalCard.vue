<template>
  <div
    class="festival-card"
    :style="{
      background: theme.bg || '#1a0a2e',
      color: theme.text || '#fff5e0',
    }"
  >
    <!-- Islamic geometric background pattern -->
    <div class="geo-pattern" :style="{ '--accent': theme.accent || '#d4a843' }" />

    <!-- Firework bursts -->
    <div class="fireworks" aria-hidden="true">
      <div
        v-for="n in 8"
        :key="n"
        class="firework"
        :class="`fw-${n}`"
        :style="{ '--accent': theme.accent || '#d4a843' }"
      />
    </div>

    <!-- Crescent + star (Eid) -->
    <div class="moon-wrap" aria-hidden="true">
      <div class="crescent" :style="{ '--accent': theme.accent || '#d4a843' }" />
      <div class="star" :style="{ '--accent': theme.accent || '#d4a843' }" />
    </div>

    <!-- Main content -->
    <div class="card-body">
      <!-- Festival name -->
      <h1
        class="festival-name"
        :style="{ '--accent': theme.accent || '#d4a843', color: theme.accent || '#d4a843' }"
      >
        {{ data.festival || 'Eid Mubarak' }}
      </h1>

      <!-- Greeting in Amiri font -->
      <p class="arabic-greeting" :style="{ color: theme.accent || '#d4a843' }">
        عِيدٌ مُبَارَكٌ
      </p>

      <!-- Divider -->
      <div class="divider" :style="{ background: theme.accent || '#d4a843' }" />

      <!-- Message -->
      <p v-if="data.message" class="message">
        {{ data.message }}
      </p>

      <!-- From / To -->
      <div class="attribution">
        <span v-if="data.to" class="to">
          To: <strong>{{ data.to }}</strong>
        </span>
        <span v-if="data.from" class="from">
          From: <strong>{{ data.from }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel+Decorative:wght@400;700&display=swap',
    },
  ],
})
</script>

<style scoped>
/* ── Card shell ─────────────────────────────────────────────── */
.festival-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  min-height: 580px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  font-family: 'Amiri', serif;
}

/* ── Geometric Islamic background pattern ───────────────────── */
.geo-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    repeating-linear-gradient(
      60deg,
      var(--accent) 0px,
      var(--accent) 1px,
      transparent 1px,
      transparent 30px
    ),
    repeating-linear-gradient(
      -60deg,
      var(--accent) 0px,
      var(--accent) 1px,
      transparent 1px,
      transparent 30px
    ),
    repeating-linear-gradient(
      0deg,
      var(--accent) 0px,
      var(--accent) 1px,
      transparent 1px,
      transparent 30px
    );
  pointer-events: none;
}

/* ── Fireworks ──────────────────────────────────────────────── */
.fireworks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.firework {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow:
    0 0 6px 2px var(--accent),
    20px -20px 0 var(--accent),
    -20px -20px 0 var(--accent),
    20px 20px 0 var(--accent),
    -20px 20px 0 var(--accent),
    0 -28px 0 var(--accent),
    0 28px 0 var(--accent),
    28px 0 0 var(--accent),
    -28px 0 0 var(--accent);
  animation: burst 3s ease-out infinite;
}

.fw-1 { top: 12%;  left: 15%;  animation-delay: 0s;    animation-duration: 3.2s; }
.fw-2 { top: 8%;   left: 75%;  animation-delay: 0.6s;  animation-duration: 2.8s; }
.fw-3 { top: 20%;  left: 50%;  animation-delay: 1.1s;  animation-duration: 3.5s; }
.fw-4 { top: 5%;   left: 38%;  animation-delay: 1.8s;  animation-duration: 2.6s; }
.fw-5 { top: 18%;  left: 85%;  animation-delay: 0.3s;  animation-duration: 3.1s; }
.fw-6 { top: 25%;  left: 5%;   animation-delay: 2.1s;  animation-duration: 2.9s; }
.fw-7 { top: 10%;  left: 60%;  animation-delay: 1.5s;  animation-duration: 3.3s; }
.fw-8 { top: 30%;  left: 30%;  animation-delay: 0.9s;  animation-duration: 2.7s; }

@keyframes burst {
  0%   { transform: scale(0);     opacity: 0; }
  20%  { transform: scale(1.5);   opacity: 1; }
  60%  { transform: scale(1);     opacity: 0.7; }
  100% { transform: scale(0.5);   opacity: 0; }
}

/* ── Crescent moon ──────────────────────────────────────────── */
.moon-wrap {
  position: absolute;
  top: 24px;
  right: 32px;
  animation: float 4s ease-in-out infinite;
}

.crescent {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset -10px 2px 0 2px var(--accent);
  filter: drop-shadow(0 0 8px var(--accent));
}

.star {
  position: absolute;
  top: 4px;
  left: 38px;
  width: 12px;
  height: 12px;
  background: var(--accent);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2%  35%,
    39% 35%
  );
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.85); }
}

/* ── Card body ──────────────────────────────────────────────── */
.card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  width: 100%;
}

/* ── Festival name with glow ────────────────────────────────── */
.festival-name {
  font-family: 'Cinzel Decorative', 'Amiri', serif;
  font-size: clamp(2rem, 8vw, 3.2rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.04em;
  animation: glow-pulse 2.5s ease-in-out infinite;
  text-shadow:
    0 0 12px var(--accent),
    0 0 30px var(--accent),
    0 0 60px var(--accent);
}

@keyframes glow-pulse {
  0%, 100% {
    text-shadow:
      0 0 8px var(--accent),
      0 0 20px var(--accent),
      0 0 40px var(--accent);
  }
  50% {
    text-shadow:
      0 0 18px var(--accent),
      0 0 45px var(--accent),
      0 0 80px var(--accent),
      0 0 120px var(--accent);
  }
}

/* ── Arabic greeting ────────────────────────────────────────── */
.arabic-greeting {
  font-family: 'Amiri', serif;
  font-size: clamp(1.4rem, 5vw, 2rem);
  font-style: italic;
  direction: rtl;
  opacity: 0;
  animation: fade-up 0.8s ease 0.4s forwards;
}

/* ── Divider ────────────────────────────────────────────────── */
.divider {
  width: 60%;
  height: 1px;
  opacity: 0.5;
  border-radius: 4px;
}

/* ── Message ────────────────────────────────────────────────── */
.message {
  font-family: 'Amiri', serif;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 380px;
  opacity: 0;
  animation: fade-up 0.8s ease 0.7s forwards;
}

/* ── Attribution ────────────────────────────────────────────── */
.attribution {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
  opacity: 0;
  animation: fade-up 0.8s ease 0.9s forwards;
}

.to, .from {
  font-family: 'Amiri', serif;
  letter-spacing: 0.03em;
}

/* ── Shared entrance animation ──────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
