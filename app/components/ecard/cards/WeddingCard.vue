<template>
  <div
    class="wedding-card relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl"
    :style="{ background: theme.bg, color: theme.text }"
  >
    <!-- Soft radial glow backdrop -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        background: `radial-gradient(ellipse at 50% 30%, ${theme.accent}22 0%, transparent 70%)`,
      }"
    />

    <!-- Corner ornaments -->
    <span class="corner corner-tl" :style="{ color: theme.accent }">✦</span>
    <span class="corner corner-tr" :style="{ color: theme.accent }">✦</span>
    <span class="corner corner-bl" :style="{ color: theme.accent }">✦</span>
    <span class="corner corner-br" :style="{ color: theme.accent }">✦</span>

    <!-- Inner border frame -->
    <div
      class="border-frame absolute inset-4 rounded-xl pointer-events-none"
      :style="{ borderColor: `${theme.accent}55` }"
    />

    <div class="relative z-10 flex flex-col items-center px-10 py-12 text-center gap-6">

      <!-- Top flourish -->
      <div class="flourish-line text-2xl tracking-widest" :style="{ color: theme.accent }">
        ❦ &nbsp; ✦ &nbsp; ❦
      </div>

      <!-- Preamble -->
      <p
        class="preamble-text text-sm uppercase tracking-[0.35em] opacity-80"
        :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.text }"
      >
        Together with their families
      </p>
      <p
        class="text-xs uppercase tracking-[0.25em] opacity-60"
        :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.text }"
      >
        invite you to celebrate the wedding of
      </p>

      <!-- Ornamental divider -->
      <div class="ornament-divider w-full flex items-center gap-3" :style="{ color: theme.accent }">
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}55` }" />
        <span class="text-xl">❧</span>
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}55` }" />
      </div>

      <!-- Names section with glow halo -->
      <div class="names-wrapper relative flex flex-col items-center gap-1">
        <!-- Halo glow -->
        <div
          class="name-halo absolute inset-0 rounded-full pointer-events-none blur-3xl opacity-30"
          :style="{ background: theme.accent }"
        />

        <!-- Bride name -->
        <h1
          class="bride-name shimmer-text relative z-10 leading-none"
          :style="{
            fontFamily: '\'Great Vibes\', cursive',
            color: theme.text,
            '--shimmer-color': theme.accent,
          }"
        >
          {{ data.bride || 'The Bride' }}
        </h1>

        <!-- And -->
        <span
          class="and-text text-2xl tracking-widest opacity-70 my-1"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.accent }"
        >
          &amp;
        </span>

        <!-- Groom name -->
        <h1
          class="groom-name shimmer-text relative z-10 leading-none"
          :style="{
            fontFamily: '\'Great Vibes\', cursive',
            color: theme.text,
            '--shimmer-color': theme.accent,
          }"
        >
          {{ data.groom || 'The Groom' }}
        </h1>
      </div>

      <!-- Ornamental divider -->
      <div class="ornament-divider w-full flex items-center gap-3" :style="{ color: theme.accent }">
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}55` }" />
        <span class="text-xl">❦</span>
        <div class="flex-1 h-px" :style="{ background: `${theme.accent}55` }" />
      </div>

      <!-- Date & Time -->
      <div class="date-block flex flex-col items-center gap-1">
        <p
          class="text-xl font-semibold tracking-widest"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.accent }"
        >
          {{ formatDate(data.date) }}
        </p>
        <p
          class="text-sm tracking-[0.2em] opacity-80"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.text }"
        >
          {{ data.time || '' }}
        </p>
      </div>

      <!-- Venue -->
      <div class="venue-block flex flex-col items-center gap-1">
        <p
          class="text-base font-bold uppercase tracking-widest"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.accent }"
        >
          {{ data.venue || '' }}
        </p>
        <p
          class="text-sm opacity-70 leading-relaxed max-w-xs"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.text }"
        >
          {{ data.address || '' }}
        </p>
      </div>

      <!-- Message -->
      <div
        v-if="data.message"
        class="message-block mt-2 px-6 py-4 rounded-lg relative overflow-hidden max-w-md"
        :style="{ background: `${theme.accent}15`, borderColor: `${theme.accent}40` }"
        style="border: 1px solid;"
      >
        <p
          class="text-sm italic leading-relaxed opacity-90"
          :style="{ fontFamily: '\'Playfair Display\', serif', color: theme.text }"
        >
          "{{ data.message }}"
        </p>
      </div>

      <!-- Bottom flourish -->
      <div class="flourish-line text-xl tracking-widest mt-2" :style="{ color: theme.accent }">
        ✦ &nbsp; ❦ &nbsp; ✦
      </div>

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
      href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap',
    },
  ],
})

function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
/* ── Corner ornaments ────────────────────────────────────────── */
.corner {
  position: absolute;
  font-size: 1.1rem;
  opacity: 0.7;
  z-index: 20;
  animation: pulse-ornament 3s ease-in-out infinite;
}
.corner-tl { top: 0.75rem; left: 0.75rem; }
.corner-tr { top: 0.75rem; right: 0.75rem; }
.corner-bl { bottom: 0.75rem; left: 0.75rem; }
.corner-br { bottom: 0.75rem; right: 0.75rem; }

.corner-tl,
.corner-br { animation-delay: 0s; }
.corner-tr,
.corner-bl { animation-delay: 1.5s; }

@keyframes pulse-ornament {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.3); }
}

/* ── Inner border frame ──────────────────────────────────────── */
.border-frame {
  border: 1px solid;
  animation: border-shimmer 4s ease-in-out infinite;
}
@keyframes border-shimmer {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}

/* ── Name shimmer gradient animation ────────────────────────── */
.bride-name,
.groom-name {
  font-size: clamp(2.8rem, 8vw, 4.5rem);
  background: linear-gradient(
    90deg,
    v-bind('theme.text') 0%,
    v-bind('theme.accent') 40%,
    #ffffff 50%,
    v-bind('theme.accent') 60%,
    v-bind('theme.text') 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sweep 4s linear infinite;
}

@keyframes shimmer-sweep {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* ── Glow halo ───────────────────────────────────────────────── */
.name-halo {
  width: 120%;
  height: 160%;
  top: -30%;
  left: -10%;
  animation: halo-pulse 3s ease-in-out infinite;
}
@keyframes halo-pulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50%       { opacity: 0.45; transform: scale(1.1); }
}

/* ── Flourish float ──────────────────────────────────────────── */
.flourish-line {
  animation: float-y 4s ease-in-out infinite;
}
@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
}

/* ── Preamble entrance ───────────────────────────────────────── */
.preamble-text {
  animation: fade-in-up 1s ease both;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 0.8; transform: translateY(0); }
}
</style>
