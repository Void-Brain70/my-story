<template>
  <div class="particles-container" aria-hidden="true">
    <div
      v-for="p in particles"
      :key="p.id"
      class="particle"
      :class="`particle--${type}`"
      :style="p.style"
    >{{ p.char }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'petals' | 'confetti' | 'hearts' | 'stars' | 'fireworks' | 'bubbles' | 'snow'
  count?: number
  accent?: string
}>()

const count = computed(() => props.count ?? 25)

const charMap: Record<string, string[]> = {
  petals:    ['🌸', '🌺', '🌹', '🌷', '💮'],
  confetti:  ['🎊', '🎉', '✨', '⭐', '🌟'],
  hearts:    ['❤️', '💕', '💖', '💗', '💓'],
  stars:     ['✨', '⭐', '🌟', '💫', '⚡'],
  fireworks: ['🎆', '🎇', '✨', '💥', '🌟'],
  bubbles:   ['🫧', '💫', '✨', '⚪', '🔵'],
  snow:      ['❄️', '🌨', '⛄', '❅', '❆'],
}

const particles = computed(() =>
  Array.from({ length: count.value }, (_, i) => {
    const chars = charMap[props.type] ?? charMap.stars
    const char = chars[i % chars.length]
    const left = Math.random() * 100
    const delay = Math.random() * 8
    const duration = Math.random() * 8 + 6
    const size = Math.random() * 18 + 10

    return {
      id: i,
      char,
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: Math.random() * 0.7 + 0.3,
      },
    }
  })
)
</script>

<style scoped>
.particles-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  top: -60px;
  user-select: none;
  will-change: transform;
}

.particle--petals,
.particle--snow {
  animation: fall-sway linear infinite;
}

.particle--confetti,
.particle--fireworks {
  animation: fall-spin linear infinite;
}

.particle--hearts {
  animation: float-up linear infinite;
}

.particle--stars,
.particle--bubbles {
  animation: float-drift linear infinite;
}

@keyframes fall-sway {
  0%   { transform: translateY(-60px) translateX(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.8; }
  100% { transform: translateY(110vh) translateX(80px) rotate(360deg); opacity: 0; }
}

@keyframes fall-spin {
  0%   { transform: translateY(-60px) translateX(0) rotate(0deg) scale(0.5); opacity: 0; }
  10%  { opacity: 1; }
  50%  { transform: translateY(50vh) translateX(-40px) rotate(180deg) scale(1); }
  100% { transform: translateY(110vh) translateX(60px) rotate(360deg) scale(0.8); opacity: 0; }
}

@keyframes float-up {
  0%   { transform: translateY(110vh) scale(0.5); opacity: 0; }
  10%  { opacity: 1; }
  50%  { transform: translateY(50vh) translateX(30px) scale(1); }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-60px) translateX(-20px) scale(0.8); opacity: 0; }
}

@keyframes float-drift {
  0%   { transform: translateY(110vh) translateX(0) scale(0.3); opacity: 0; }
  15%  { opacity: 1; }
  50%  { transform: translateY(50vh) translateX(40px) scale(1); }
  85%  { opacity: 0.8; }
  100% { transform: translateY(-60px) translateX(-30px) scale(0.5); opacity: 0; }
}
</style>
