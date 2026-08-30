<template>
  <button
    @click="toggle"
    class="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 active:scale-95"
    :style="{ background: `${accent}22`, borderColor: `${accent}55`, color: accent }"
    :title="playing ? 'Mute music' : 'Play music'"
  >
    <span class="text-xl">{{ playing ? '🔊' : '🔇' }}</span>
    <span v-if="playing" class="sound-wave" :style="{ borderColor: accent }" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: string
  accent?: string
  autoPlay?: boolean
}>()

const accent = computed(() => props.accent ?? '#d4af37')
const playing = ref(false)
let ctx: AudioContext | null = null
let gainNode: GainNode | null = null
let stopFn: (() => void) | null = null

// Pentatonic scale notes (Hz) for a pleasant ambient melody
const SCALES: Record<string, number[]> = {
  wedding:    [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
  birthday:   [293.66, 329.63, 369.99, 440.00, 493.88, 587.33],
  anniversary:[246.94, 293.66, 329.63, 369.99, 440.00, 493.88],
  festival:   [349.23, 392.00, 440.00, 523.25, 587.33, 659.25],
  graduation: [261.63, 311.13, 349.23, 415.30, 466.16, 523.25],
  default:    [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
}

function getScale(): number[] {
  return SCALES[props.type ?? ''] ?? SCALES.default
}

function playNote(freq: number, startTime: number, duration: number) {
  if (!ctx || !gainNode) return
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  env.gain.setValueAtTime(0, startTime)
  env.gain.linearRampToValueAtTime(0.15, startTime + 0.05)
  env.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.connect(env)
  env.connect(gainNode!)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.1)
}

function startMusic() {
  if (typeof window === 'undefined') return
  ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  gainNode = ctx.createGain()
  gainNode.gain.value = 0.5
  gainNode.connect(ctx.destination)

  const scale = getScale()
  let beat = 0
  const BPM = 72
  const step = 60 / BPM

  // Build a simple arpeggiated melody pattern
  const pattern = [0, 2, 4, 5, 4, 2, 0, 1, 3, 5, 3, 1]

  let running = true
  let nextTime = ctx.currentTime + 0.1

  function schedule() {
    if (!running || !ctx) return
    while (nextTime < ctx.currentTime + 0.5) {
      const idx = pattern[beat % pattern.length]
      const freq = scale[idx % scale.length]
      // Occasional octave shift for variety
      const octave = beat % 12 < 6 ? 1 : 0.5
      playNote(freq * octave, nextTime, step * 0.8)
      nextTime += step
      beat++
    }
    requestAnimationFrame(schedule)
  }

  schedule()
  stopFn = () => { running = false }
}

function stopMusic() {
  stopFn?.()
  stopFn = null
  if (gainNode) {
    gainNode.gain.linearRampToValueAtTime(0, (ctx?.currentTime ?? 0) + 0.3)
  }
  setTimeout(() => {
    ctx?.close()
    ctx = null
    gainNode = null
  }, 400)
}

function toggle() {
  if (playing.value) {
    stopMusic()
    playing.value = false
  } else {
    startMusic()
    playing.value = true
  }
}

onMounted(() => {
  if (props.autoPlay) {
    // Auto-play requires user interaction, so we just set up but don't play
    // User must click to start
  }
})

onUnmounted(() => {
  if (playing.value) stopMusic()
})
</script>

<style scoped>
@keyframes sound-ring {
  0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}

.sound-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid;
  animation: sound-ring 1.2s ease-out infinite;
}
</style>
