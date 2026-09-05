<template>
  <div class="view-root" :style="{ background: theme?.bg ?? '#080810' }">
    <!-- Ambient particles -->
    <EcardSharedParticles v-if="isOpen && cardConfig" :type="cardConfig.particleType" />
    <!-- Music player -->
    <EcardSharedMusicPlayer
      v-if="cardData"
      :type="cardData.type"
      :accent="theme?.accent"
      :autoPlay="false"
    />
    <!-- === OPENER STAGE === -->
    <Transition name="opener-out">
      <div v-if="!isOpen && cardData" class="opener-stage">
        <!-- Dynamic opener based on card type -->
        <!-- ENVELOPE opener (wedding, anniversary) -->
        <div v-if="openerType === 'envelope'" class="envelope-wrapper" @click="openCard">
          <div class="envelope" :style="{ '--accent': theme?.accent ?? '#d4af37' }">
            <div class="envelope-flap" :class="{ open: isOpening }" />
            <div class="envelope-body">
              <div class="envelope-heart" :style="{ color: theme?.accent }">💌</div>
            </div>
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to open your invitation</p>
        </div>
        <!-- BALLOON opener (birthday) -->
        <div v-else-if="openerType === 'balloon'" class="balloon-wrapper" @click="openCard">
          <div class="balloons">
            <div v-for="i in 5" :key="i" class="balloon" :style="balloonStyle(i)" />
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to reveal your surprise 🎉</p>
        </div>

        <!-- GIFT BOX opener -->
        <div v-else-if="openerType === 'giftbox'" class="giftbox-wrapper" @click="openCard">
          <div class="giftbox" :style="{ '--accent': theme?.accent ?? '#d4af37' }">
            <div class="giftbox-lid" :class="{ open: isOpening }">
              <div class="ribbon-v" />
              <div class="bow-left" />
              <div class="bow-right" />
            </div>
            <div class="giftbox-body">
              <div class="ribbon-v-body" />
            </div>
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap the gift to open 🎁</p>
        </div>

        <!-- FLIP opener (visiting card) -->
        <div v-else-if="openerType === 'flip'" class="flip-wrapper" @click="openCard">
          <div class="biz-card-preview" :style="{ background: `${theme?.bg}dd`, borderColor: theme?.accent }">
            <div class="biz-card-shine" />
            <p class="text-2xl font-bold" :style="{ color: theme?.accent }">{{ cardData?.name ?? 'Your Card' }}</p>
            <p class="text-sm opacity-60" :style="{ color: theme?.text }">{{ cardData?.title ?? '' }}</p>
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to view your digital card</p>
        </div>

        <!-- LOCKET opener (anniversary) -->
        <div v-else-if="openerType === 'locket'" class="locket-wrapper" @click="openCard">
          <div class="locket" :style="{ '--accent': theme?.accent ?? '#f43f5e' }">
            <div class="locket-left" :class="{ open: isOpening }" />
            <div class="locket-right" :class="{ open: isOpening }" />
            <div class="locket-heart">❤️</div>
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to open your locket 💕</p>
        </div>

        <!-- SCROLL opener (graduation) -->
        <div v-else-if="openerType === 'scroll'" class="scroll-wrapper" @click="openCard">
          <div class="scroll-container" :style="{ '--accent': theme?.accent ?? '#3b82f6' }">
            <div class="scroll-roll top-roll" />
            <div class="scroll-paper">🎓</div>
            <div class="scroll-roll bot-roll" />
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to unroll your diploma 🎓</p>
        </div>

        <!-- CRACKER opener (festival) -->
        <div v-else-if="openerType === 'cracker'" class="cracker-wrapper" @click="openCard">
          <div class="cracker" :style="{ '--accent': theme?.accent ?? '#fbbf24' }">
            <div class="cracker-left" :class="{ pull: isOpening }" />
            <div class="cracker-bang" :class="{ show: isOpening }">🎆</div>
            <div class="cracker-right" :class="{ pull: isOpening }" />
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to celebrate! 🎉</p>
        </div>

        <!-- TICKET opener (invitation) -->
        <div v-else-if="openerType === 'ticket'" class="ticket-wrapper" @click="openCard">
          <div class="ticket" :style="{ '--accent': theme?.accent ?? '#a855f7', '--bg': theme?.bg ?? '#05000a' }">
            <div class="ticket-main">
              <p class="text-xs uppercase tracking-widest opacity-50" :style="{ color: theme?.text }">You are invited to</p>
              <p class="text-xl font-bold mt-1" :style="{ color: theme?.accent }">{{ cardData?.eventName ?? 'An Event' }}</p>
            </div>
            <div class="ticket-stub" />
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to tear open your ticket 🎫</p>
        </div>

        <!-- BOOK opener (thank you) -->
        <div v-else-if="openerType === 'book'" class="book-wrapper" @click="openCard">
          <div class="book" :style="{ '--accent': theme?.accent ?? '#f59e0b' }">
            <div class="book-cover" :class="{ open: isOpening }">
              <span class="text-4xl">🙏</span>
              <span class="text-sm mt-2 font-semibold" :style="{ color: theme?.accent }">Thank You</span>
            </div>
            <div class="book-spine" />
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to open your note</p>
        </div>

        <!-- CRIB opener (baby) -->
        <div v-else-if="openerType === 'crib'" class="crib-wrapper" @click="openCard">
          <div class="crib" :style="{ '--accent': theme?.accent ?? '#38bdf8' }">
            <div class="crib-mobile">🌟 ⭐ 🌙</div>
            <div class="crib-body">
              <div class="baby-bundle">👶</div>
            </div>
          </div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to meet the new arrival 👶</p>
        </div>

        <!-- Generic fallback -->
        <div v-else class="generic-opener" @click="openCard">
          <div class="text-6xl mb-4 animate-bounce">{{ cardConfig?.emoji ?? '✉️' }}</div>
          <p class="tap-hint" :style="{ color: theme?.text }">Tap to open</p>
        </div>
      </div>
    </Transition>

    <!-- === CARD STAGE === -->
    <Transition name="card-in">
      <div v-if="isOpen && cardData" class="card-stage">
        <!-- Card component -->
        <component
          :is="cardComponent"
          :data="cardData"
          :theme="theme"
          class="card-component"
        />

        <!-- Share panel -->
        <div
          class="share-panel"
          :style="{ background: `${theme?.bg ?? '#080810'}ee`, borderColor: `${theme?.accent ?? '#ffffff'}22` }"
        >
          <h3 class="text-center text-sm font-semibold mb-3 uppercase tracking-widest opacity-60" :style="{ color: theme?.text }">
            Share this card
          </h3>
          <EcardSharedShareButtons :title="shareTitle" :accent="theme?.accent" />
        </div>

        <!-- Back button -->
        <div class="text-center mt-6 pb-10">
          <NuxtLink
            :to="`/e-card/${cardData.type}`"
            class="text-sm opacity-50 hover:opacity-100 transition-opacity"
            :style="{ color: theme?.text }"
          >
            ← Create a new card
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Error state -->
    <div v-if="!cardData && !loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center text-white">
        <p class="text-5xl mb-4">😕</p>
        <p class="text-gray-400 mb-4">Invalid or expired card link.</p>
        <NuxtLink to="/e-card" class="text-cyan-400 hover:underline">Create a new card →</NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-4xl animate-spin">✨</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { CARD_TYPES, decodeCardData } from '~/composables/useECard'

definePageMeta({ layout: 'ecard' })

const route = useRoute()
const loading = ref(true)
const isOpen = ref(false)
const isOpening = ref(false)

// Decode card data from URL
const cardData = computed(() => {
  const encoded = route.query.d as string
  if (!encoded) return null
  return decodeCardData(encoded)
})

const cardConfig = computed(() =>
  cardData.value?.type ? CARD_TYPES[cardData.value.type] ?? null : null
)

const theme = computed(() => {
  if (!cardConfig.value || !cardData.value) return null
  return cardConfig.value.themes.find(t => t.id === cardData.value!.theme) ?? cardConfig.value.themes[0]
})

const openerType = computed(() => cardConfig.value?.openerType ?? 'envelope')

const shareTitle = computed(() => {
  if (!cardData.value || !cardConfig.value) return 'E-Card Invitation'
  const d = cardData.value
  switch (d.type) {
    case 'wedding':    return `Wedding Invitation — ${d.bride} & ${d.groom}`
    case 'birthday':   return `Happy Birthday ${d.name}!`
    case 'festival':   return `${d.festival} Greetings from ${d.from}`
    case 'visiting':   return `${d.name} — ${d.title}`
    case 'graduation': return `Congratulations ${d.name}! 🎓`
    case 'anniversary': return `${d.name1} & ${d.name2} — ${d.years} Years!`
    default:           return `${cardConfig.value.label} — E-Card Studio`
  }
})

useHead(() => ({
  title: shareTitle.value,
  meta: [
    { name: 'description', content: `${shareTitle.value} — Open this beautiful animated e-card.` },
    { property: 'og:title', content: shareTitle.value },
  ],
}))

// Lazy-load card component based on type
const CARD_MAP: Record<string, () => Promise<any>> = {
  wedding:    () => import('~/components/ecard/cards/WeddingCard.vue'),
  birthday:   () => import('~/components/ecard/cards/BirthdayCard.vue'),
  visiting:   () => import('~/components/ecard/cards/VisitingCard.vue'),
  gift:       () => import('~/components/ecard/cards/GiftCard.vue'),
  anniversary: () => import('~/components/ecard/cards/AnniversaryCard.vue'),
  festival:   () => import('~/components/ecard/cards/FestivalCard.vue'),
  graduation: () => import('~/components/ecard/cards/GraduationCard.vue'),
  thankyou:   () => import('~/components/ecard/cards/ThankYouCard.vue'),
  baby:       () => import('~/components/ecard/cards/BabyCard.vue'),
  invitation: () => import('~/components/ecard/cards/InvitationCard.vue'),
}

const cardComponent = computed(() => {
  const type = cardData.value?.type
  if (!type || !CARD_MAP[type]) return null
  return defineAsyncComponent(CARD_MAP[type])
})

onMounted(() => {
  loading.value = false
})

function openCard() {
  isOpening.value = true
  setTimeout(() => {
    isOpen.value = true
  }, 600)
}

// Balloon styles for birthday opener
function balloonStyle(i: number) {
  const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#22d3ee', '#fbbf24']
  return {
    background: colors[(i - 1) % colors.length],
    left: `${(i - 1) * 20 + 5}%`,
    animationDelay: `${(i - 1) * 0.3}s`,
    animationDuration: `${2 + i * 0.4}s`,
  }
}
</script>

<style scoped>
.view-root {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* ── Opener stage ── */
.opener-stage {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.tap-hint {
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.7;
  animation: pulse-hint 2s ease-in-out infinite;
  letter-spacing: 0.05em;
}

@keyframes pulse-hint {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.03); }
}

/* ── Envelope ── */
.envelope-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.envelope {
  width: 240px; height: 160px; position: relative;
  filter: drop-shadow(0 0 30px var(--accent, #d4af37));
}
.envelope-body {
  position: absolute; inset: 0; border-radius: 4px;
  background: linear-gradient(135deg, #2a1010, #1a0808);
  border: 1px solid var(--accent, #d4af37);
  display: flex; align-items: center; justify-content: center;
}
.envelope-heart { font-size: 3rem; animation: heartbeat 1.5s ease-in-out infinite; }
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.15); }
}
.envelope-flap {
  position: absolute; top: 0; left: 0; right: 0;
  height: 50%; clip-path: polygon(0 0, 50% 100%, 100% 0);
  background: linear-gradient(180deg, var(--accent, #d4af37) 0%, #8b6914 100%);
  transform-origin: top center;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  z-index: 2;
}
.envelope-flap.open { transform: rotateX(-160deg); }

/* ── Balloons ── */
.balloon-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.balloons { position: relative; width: 300px; height: 220px; }
.balloon {
  position: absolute; bottom: 20px; width: 60px; height: 75px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: float-balloon ease-in-out infinite;
}
.balloon::after {
  content: ''; position: absolute; bottom: -20px; left: 50%;
  width: 1px; height: 20px; background: rgba(255,255,255,0.4);
  transform: translateX(-50%);
}
@keyframes float-balloon {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50%       { transform: translateY(-20px) rotate(5deg); }
}

/* ── Gift box ── */
.giftbox-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.giftbox { position: relative; width: 160px; height: 160px; }
.giftbox-body {
  position: absolute; bottom: 0; left: 0; right: 0; height: 110px;
  background: linear-gradient(135deg, #7c2020, #4a1010);
  border: 2px solid var(--accent, #d4af37);
  border-radius: 4px; overflow: hidden;
}
.ribbon-v-body {
  position: absolute; left: 50%; top: 0; bottom: 0;
  width: 20px; transform: translateX(-50%);
  background: var(--accent, #d4af37); opacity: 0.8;
}
.giftbox-lid {
  position: absolute; top: 0; left: -4px; right: -4px; height: 55px;
  background: linear-gradient(135deg, #9c2020, #6a1010);
  border: 2px solid var(--accent, #d4af37);
  border-radius: 4px;
  transform-origin: bottom center;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  z-index: 2; display: flex; align-items: center; justify-content: center;
}
.giftbox-lid.open { transform: translateY(-100%) rotateX(-120deg); }
.ribbon-v {
  position: absolute; left: 50%; top: 0; bottom: 0;
  width: 20px; transform: translateX(-50%);
  background: var(--accent, #d4af37); opacity: 0.9;
}
.bow-left, .bow-right {
  position: absolute; top: 2px; width: 30px; height: 20px;
  border-radius: 50%; background: var(--accent, #d4af37); opacity: 0.9;
}
.bow-left  { left: 30%; transform: rotate(-30deg); }
.bow-right { right: 30%; transform: rotate(30deg); }

/* ── Locket ── */
.locket-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.locket {
  width: 140px; height: 140px; position: relative;
  filter: drop-shadow(0 0 20px var(--accent, #f43f5e));
}
.locket-left, .locket-right {
  position: absolute; top: 0; width: 50%; height: 100%;
  background: linear-gradient(135deg, #3d0010, #1a0005);
  border: 2px solid var(--accent, #f43f5e);
  transition: transform 0.6s ease;
}
.locket-left  { left: 0;  border-radius: 70px 0 0 70px; transform-origin: right center; }
.locket-right { right: 0; border-radius: 0 70px 70px 0; transform-origin: left center; }
.locket-left.open  { transform: rotateY(-120deg); }
.locket-right.open { transform: rotateY(120deg); }
.locket-heart {
  position: absolute; inset: 0; display: flex;
  align-items: center; justify-content: center;
  font-size: 2.5rem; z-index: 2;
  animation: heartbeat 1.5s ease-in-out infinite;
}

/* ── Scroll ── */
.scroll-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.scroll-container {
  display: flex; flex-direction: column; align-items: center;
  filter: drop-shadow(0 0 20px var(--accent, #3b82f6));
}
.scroll-roll {
  width: 160px; height: 28px; border-radius: 14px;
  background: linear-gradient(90deg, #2a1a00, var(--accent, #3b82f6), #2a1a00);
}
.scroll-paper {
  width: 140px; height: 100px; background: #f9f0d0;
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem; color: #4a3728;
}

/* ── Cracker ── */
.cracker-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.cracker { position: relative; width: 200px; height: 80px; display: flex; align-items: center; }
.cracker-left, .cracker-right {
  flex: 1; height: 100%;
  background: linear-gradient(90deg, var(--accent, #fbbf24), #7a5c00);
  border-radius: 8px; transition: transform 0.5s ease;
}
.cracker-left  { transform-origin: left center; }
.cracker-right { transform-origin: right center; }
.cracker-left.pull  { transform: rotate(-30deg) translateX(-20px); }
.cracker-right.pull { transform: rotate(30deg) translateX(20px); }
.cracker-bang {
  font-size: 2rem; position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease 0.3s;
}
.cracker-bang.show { transform: translate(-50%, -50%) scale(1.5); }

/* ── Ticket ── */
.ticket-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.ticket {
  width: 300px; display: flex; border-radius: 8px; overflow: hidden;
  border: 1px solid var(--accent, #a855f7);
  filter: drop-shadow(0 0 20px var(--accent, #a855f7));
}
.ticket-main {
  flex: 1; padding: 1.5rem; background: var(--bg, #05000a);
}
.ticket-stub {
  width: 60px; background: var(--accent, #a855f7);
  border-left: 2px dashed rgba(0,0,0,0.3);
  opacity: 0.8;
}

/* ── Book ── */
.book-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.book {
  width: 160px; height: 120px; position: relative;
  filter: drop-shadow(0 0 20px var(--accent, #f59e0b));
}
.book-spine {
  position: absolute; left: 0; top: 0; bottom: 0; width: 18px;
  background: linear-gradient(90deg, #1a0a00, var(--accent, #f59e0b), #1a0a00);
  border-radius: 4px 0 0 4px;
}
.book-cover {
  position: absolute; left: 18px; right: 0; top: 0; bottom: 0;
  background: linear-gradient(135deg, #2a1200, #1a0a00);
  border: 1px solid var(--accent, #f59e0b);
  border-radius: 0 4px 4px 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
}
.book-cover.open { transform: rotateY(-120deg); }

/* ── Crib ── */
.crib-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.crib {
  width: 180px; border: 2px solid var(--accent, #38bdf8);
  border-radius: 12px; overflow: hidden;
  filter: drop-shadow(0 0 20px var(--accent, #38bdf8));
}
.crib-mobile {
  background: rgba(255,255,255,0.05); text-align: center;
  font-size: 1.2rem; padding: 0.5rem; letter-spacing: 0.5rem;
  animation: sway 2s ease-in-out infinite;
}
@keyframes sway {
  0%, 100% { transform: rotate(-5deg); }
  50%       { transform: rotate(5deg); }
}
.crib-body {
  background: rgba(255,255,255,0.03); padding: 1.5rem;
  display: flex; align-items: center; justify-content: center;
}
.baby-bundle { font-size: 3rem; animation: rock 2s ease-in-out infinite; }
@keyframes rock {
  0%, 100% { transform: rotate(-8deg); }
  50%       { transform: rotate(8deg); }
}

/* ── Biz card preview ── */
.biz-card-preview {
  width: 300px; height: 170px; border-radius: 16px; border: 2px solid;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; position: relative; overflow: hidden;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.1));
}
.biz-card-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
  animation: shine-move 3s ease-in-out infinite;
}
@keyframes shine-move {
  0%   { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}

/* ── Card stage ── */
.card-stage {
  min-height: 100vh;
  padding-top: 2rem;
  display: flex; flex-direction: column; align-items: center;
}
.card-component { width: 100%; max-width: 680px; }

.share-panel {
  width: 100%; max-width: 560px; margin: 2rem 1rem 0;
  border: 1px solid; border-radius: 20px; padding: 1.5rem;
}

/* ── Transitions ── */
.opener-out-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.opener-out-leave-to     { opacity: 0; transform: scale(0.9); }

.card-in-enter-active { transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s; }
.card-in-enter-from   { opacity: 0; transform: scale(0.85) translateY(30px); }
</style>
