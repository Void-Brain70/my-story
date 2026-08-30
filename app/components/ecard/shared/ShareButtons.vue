<template>
  <div class="space-y-3">
    <!-- URL display -->
    <div class="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
      <span class="text-xs text-gray-400 truncate flex-1 font-mono">{{ currentUrl }}</span>
      <button
        @click="copyLink"
        class="shrink-0 text-xs px-3 py-1 rounded-lg transition-all duration-200 font-semibold"
        :style="{ background: `${accent}33`, color: accent, border: `1px solid ${accent}55` }"
      >
        {{ copied ? '✓ Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Share buttons -->
    <div class="flex gap-3 flex-wrap">
      <button
        @click="shareWhatsApp"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 transition-all"
      >
        <span>💬</span> WhatsApp
      </button>
      <button
        @click="shareFacebook"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 hover:bg-[#1877F2]/30 transition-all"
      >
        <span>👤</span> Facebook
      </button>
      <button
        @click="shareNative"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
      >
        <span>📤</span> Share
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  accent?: string
}>()

const accent = computed(() => props.accent ?? '#7c3aed')
const copied = ref(false)

const currentUrl = ref('')
onMounted(() => { currentUrl.value = window.location.href })

async function copyLink() {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback: select + copy
    const el = document.createElement('textarea')
    el.value = currentUrl.value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

function shareWhatsApp() {
  const text = encodeURIComponent(`${props.title ?? 'You are invited!'}\n${currentUrl.value}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

function shareFacebook() {
  const url = encodeURIComponent(currentUrl.value)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

async function shareNative() {
  if (navigator.share) {
    try {
      await navigator.share({ title: props.title ?? 'E-Card Invitation', url: currentUrl.value })
    } catch {}
  } else {
    copyLink()
  }
}
</script>
