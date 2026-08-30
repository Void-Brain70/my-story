<template>
  <div class="min-h-screen bg-[#080810] text-white">
    <!-- Header -->
    <div class="border-b border-white/10 px-4 py-4 flex items-center gap-3">
      <NuxtLink to="/e-card" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
        ← Back
      </NuxtLink>
      <span class="text-2xl">{{ config?.emoji }}</span>
      <h1 class="text-lg font-bold">{{ config?.label }}</h1>
    </div>

    <div v-if="!config" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-4xl mb-4">😕</p>
        <p class="text-gray-400">Card type not found.</p>
        <NuxtLink to="/e-card" class="mt-4 inline-block text-cyan-400 hover:underline">Go back</NuxtLink>
      </div>
    </div>

    <div v-else class="max-w-2xl mx-auto px-4 py-10">
      <!-- Theme picker -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Choose Theme</label>
        <div class="flex gap-3 flex-wrap">
          <button
            v-for="theme in config.themes"
            :key="theme.id"
            @click="formData.theme = theme.id"
            class="relative flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
            :class="formData.theme === theme.id
              ? 'border-white text-white scale-105 shadow-lg'
              : 'border-white/20 text-gray-400 hover:border-white/40'"
          >
            <span
              class="w-4 h-4 rounded-full border border-white/20 shrink-0"
              :style="{ background: theme.accent }"
            />
            {{ theme.label }}
          </button>
        </div>
      </div>

      <!-- Form fields -->
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div v-for="field in config.fields" :key="field.key">
          <label class="block text-sm font-medium text-gray-300 mb-1">
            {{ field.label }}
            <span v-if="field.required" class="text-rose-400 ml-1">*</span>
          </label>

          <textarea
            v-if="field.type === 'textarea'"
            v-model="formData[field.key]"
            :placeholder="field.placeholder"
            :required="field.required"
            rows="3"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all resize-none"
          />

          <select
            v-else-if="field.type === 'select'"
            v-model="formData[field.key]"
            :required="field.required"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all appearance-none"
          >
            <option value="" disabled class="bg-gray-900">Select an option</option>
            <option
              v-for="opt in field.options"
              :key="opt.value"
              :value="opt.value"
              class="bg-gray-900"
            >{{ opt.label }}</option>
          </select>

          <input
            v-else
            v-model="formData[field.key]"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all"
          />
        </div>

        <!-- Submit -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            :style="{ background: `linear-gradient(135deg, ${activeTheme?.accent ?? '#7c3aed'}, ${darken(activeTheme?.accent ?? '#7c3aed')})` }"
          >
            ✨ Generate {{ config.label }}
          </button>
        </div>
      </form>

      <!-- Preview info -->
      <div class="mt-8 p-4 rounded-xl border border-white/5 bg-white/3 text-center text-sm text-gray-500">
        After generating, you'll get a shareable link with a beautiful animated card.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CARD_TYPES, encodeCardData } from '~/composables/useECard'

definePageMeta({ layout: 'ecard' })

const route = useRoute()
const router = useRouter()

const type = computed(() => route.params.type as string)
const config = computed(() => CARD_TYPES[type.value] ?? null)

useHead(() => ({
  title: config.value ? `Create ${config.value.label} — E-Card Studio` : 'E-Card Studio',
}))

const formData = reactive<Record<string, any>>({
  theme: '',
})

watch(config, (c) => {
  if (c) {
    formData.theme = c.themes[0]?.id ?? ''
    c.fields.forEach(f => {
      if (!(f.key in formData)) formData[f.key] = ''
    })
  }
}, { immediate: true })

const activeTheme = computed(() =>
  config.value?.themes.find(t => t.id === formData.theme) ?? config.value?.themes[0]
)

function darken(hex: string): string {
  // Simple darkening by reducing brightness
  try {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.max(0, (num >> 16) - 40)
    const g = Math.max(0, ((num >> 8) & 0xff) - 40)
    const b = Math.max(0, (num & 0xff) - 40)
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`
  } catch {
    return hex
  }
}

function handleSubmit() {
  const data = { type: type.value, ...toRaw(formData) }
  const encoded = encodeCardData(data)
  router.push(`/e-card/view?d=${encoded}`)
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(1) opacity(0.4);
}
</style>
