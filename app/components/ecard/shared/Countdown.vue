<template>
  <div v-if="targetDate" class="flex gap-4 justify-center flex-wrap">
    <div v-for="unit in units" :key="unit.label" class="flex flex-col items-center">
      <div
        class="text-3xl md:text-4xl font-bold tabular-nums min-w-[3rem] text-center py-2 px-3 rounded-xl"
        :style="{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }"
      >
        {{ String(unit.value).padStart(2, '0') }}
      </div>
      <span class="text-xs mt-1 uppercase tracking-widest opacity-60">{{ unit.label }}</span>
    </div>
  </div>
  <div v-else-if="isPast" class="text-center font-semibold" :style="{ color: accent }">
    🎉 The day has arrived!
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  date: string
  accent?: string
}>()

const accent = computed(() => props.accent ?? '#d4af37')

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => clearInterval(timer))

const diff = computed(() => {
  const target = new Date(props.date)
  return target.getTime() - now.value.getTime()
})

const isPast = computed(() => diff.value <= 0)
const targetDate = computed(() => diff.value > 0 ? true : null)

const units = computed(() => {
  const total = Math.max(0, diff.value)
  const days    = Math.floor(total / 86400000)
  const hours   = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  return [
    { label: 'Days',    value: days },
    { label: 'Hours',   value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]
})
</script>
