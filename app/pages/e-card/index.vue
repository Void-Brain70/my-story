<template>
  <div class="min-h-screen bg-[#080810] text-white">
    <!-- Hero -->
    <div class="relative overflow-hidden py-20 px-4 text-center">
      <div class="absolute inset-0 pointer-events-none">
        <div v-for="i in 30" :key="i" class="star" :style="starStyle(i)" />
      </div>
      <h1 class="relative text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        E-Card Studio
      </h1>
      <p class="relative text-lg text-gray-400 max-w-xl mx-auto">
        Create beautiful animated digital cards for every occasion — share with one link.
      </p>
    </div>
    <!-- Card type grid -->
    <div class="max-w-6xl mx-auto px-4 pb-20">
      <h2 class="text-center text-xl text-gray-400 mb-10 uppercase tracking-widest">Choose your card type</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="card in cardList"
          :key="card.id"
          :to="`/e-card/${card.id}`"
          class="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" :style="{ background: card.hoverGlow }" />
          <span class="relative text-4xl select-none">{{ card.emoji }}</span>
          <span class="relative text-sm font-semibold text-center leading-tight text-gray-200">{{ card.label }}</span>
          <span class="relative text-xs text-gray-500 text-center leading-snug hidden sm:block">{{ card.description }}</span>
          <div class="relative mt-1 text-xs text-white/40 group-hover:text-white/70 transition-colors">Create →</div>
        </NuxtLink>
      </div>
    </div>
    <!-- Features strip -->
    <div class="border-t border-white/5 py-12 px-4">
      <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="f in features" :key="f.icon" class="flex flex-col items-center gap-2">
          <span class="text-3xl">{{ f.icon }}</span>
          <span class="text-sm font-semibold text-gray-300">{{ f.title }}</span>
          <span class="text-xs text-gray-500">{{ f.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CARD_TYPES } from '~/composables/useECard'

definePageMeta({ layout: 'ecard' })

useHead({
  title: 'E-Card Studio — Create & Share Beautiful Digital Cards',
  meta: [{ name: 'description', content: 'Create animated digital cards for weddings, birthdays, festivals, and more. Share with one link.' }],
})

const cardList = Object.values(CARD_TYPES).map(c => ({
  ...c,
  hoverGlow: `radial-gradient(ellipse at center, ${glowColor(c.id)} 0%, transparent 70%)`,
}))

function glowColor(id: string): string {
  const map: Record<string, string> = {
    wedding: 'rgba(244,63,94,0.15)',
    birthday: 'rgba(168,85,247,0.15)',
    visiting: 'rgba(56,189,248,0.15)',
    gift: 'rgba(52,211,153,0.15)',
    anniversary: 'rgba(251,113,133,0.15)',
    festival: 'rgba(251,191,36,0.15)',
    graduation: 'rgba(59,130,246,0.15)',
    thankyou: 'rgba(45,212,191,0.15)',
    baby: 'rgba(125,211,252,0.15)',
    invitation: 'rgba(192,132,252,0.15)',
  }
  return map[id] ?? 'rgba(255,255,255,0.05)'
}

const features = [
  { icon: '✨', title: 'Animated', desc: 'Beautiful entrance animations' },
  { icon: '🎵', title: 'With Sound', desc: 'Ambient music & sound effects' },
  { icon: '🔗', title: 'One Link', desc: 'Share instantly via link' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Works on any device' },
]

function starStyle(i: number) {
  const size = Math.random() * 2 + 1
  return {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: 'white',
    opacity: Math.random() * 0.6 + 0.1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 3}s`,
  }
}
</script>

<style scoped>
@keyframes twinkle {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.4); }
}
</style>
