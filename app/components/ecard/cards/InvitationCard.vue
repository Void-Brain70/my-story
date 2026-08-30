<template>
  <div
    class="invitation-wrapper"
    :style="{ '--accent': theme.accent || '#c0392b', '--bg': theme.bg || '#1a1a2e', '--text': theme.text || '#f0e6d3' }"
  >
    <!-- Ticket frame -->
    <div class="ticket" :class="{ 'torn': stubTorn }">

      <!-- ── Stub (left) ── -->
      <div class="stub" :class="{ 'slide-out': stubTorn }">
        <div class="stub-inner">
          <p class="stub-label">ADMIT</p>
          <p class="stub-one">ONE</p>
          <p class="stub-date">{{ shortDate }}</p>
          <!-- Perforation circles on right edge of stub -->
          <div class="perf-circles right">
            <span v-for="n in 7" :key="n" />
          </div>
        </div>
      </div>

      <!-- ── Main ticket body ── -->
      <div class="ticket-body">
        <!-- Perforation circles on left edge of body -->
        <div class="perf-circles left">
          <span v-for="n in 7" :key="n" />
        </div>

        <div class="ticket-content">
          <!-- Event name -->
          <h1 class="event-name" style="animation-delay: 0.6s">
            {{ data.eventName || 'Special Event' }}
          </h1>

          <!-- Thin ruled divider -->
          <div class="ruled-line" style="animation-delay: 0.8s" />

          <!-- Host -->
          <p v-if="data.host" class="host" style="animation-delay: 0.9s">
            Hosted by <strong>{{ data.host }}</strong>
          </p>

          <!-- Event details grid -->
          <div class="details-grid" style="animation-delay: 1.0s">
            <div v-if="data.date" class="detail">
              <span class="detail-icon">📅</span>
              <span>{{ data.date }}</span>
            </div>
            <div v-if="data.time" class="detail">
              <span class="detail-icon">🕐</span>
              <span>{{ data.time }}</span>
            </div>
            <div v-if="data.venue" class="detail">
              <span class="detail-icon">📍</span>
              <span>{{ data.venue }}</span>
            </div>
            <div v-if="data.address" class="detail detail-wide">
              <span class="detail-icon">🗺</span>
              <span>{{ data.address }}</span>
            </div>
            <div v-if="data.dress" class="detail detail-wide">
              <span class="detail-icon">👗</span>
              <span>Dress: {{ data.dress }}</span>
            </div>
          </div>

          <!-- Message -->
          <p v-if="data.message" class="message" style="animation-delay: 1.2s">
            {{ data.message }}
          </p>

          <!-- Countdown -->
          <div v-if="countdown" class="countdown" style="animation-delay: 1.3s">
            <div v-for="unit in countdown" :key="unit.label" class="count-unit">
              <span class="count-num">{{ unit.value }}</span>
              <span class="count-label">{{ unit.label }}</span>
            </div>
          </div>
          <p v-else-if="eventPassed" class="event-past">
            Event has passed
          </p>

          <!-- RSVP -->
          <div class="rsvp" style="animation-delay: 1.5s">
            <p class="rsvp-label">RSVP</p>
            <div class="rsvp-buttons">
              <button
                class="btn-attending"
                :class="{ active: rsvp === 'yes' }"
                :style="rsvp === 'yes' ? { background: theme.accent || '#c0392b', color: '#fff' } : {}"
                @click="rsvp = 'yes'"
                type="button"
                aria-pressed="rsvp === 'yes'"
              >
                ✓ Attending
              </button>
              <button
                class="btn-regrets"
                :class="{ active: rsvp === 'no' }"
                @click="rsvp = 'no'"
                type="button"
                aria-pressed="rsvp === 'no'"
              >
                ✗ Regrets
              </button>
            </div>
            <p v-if="rsvp === 'yes'" class="rsvp-confirm attending">
              We look forward to seeing you!
            </p>
            <p v-if="rsvp === 'no'" class="rsvp-confirm regrets">
              We'll miss you — thank you for letting us know.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  data: Record<string, any>
  theme: { bg: string; accent: string; text: string }
}>()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Roboto:wght@300;400;500&display=swap',
    },
  ],
})

/* ── RSVP local state ───────────────────────────────────────── */
const rsvp = ref<'yes' | 'no' | null>(null)

/* ── Stub tear animation on mount ───────────────────────────── */
const stubTorn = ref(false)
onMounted(() => {
  setTimeout(() => {
    stubTorn.value = true
  }, 800)
})

/* ── Short date for stub ────────────────────────────────────── */
const shortDate = computed(() => {
  if (!props.data.date) return ''
  const d = new Date(props.data.date)
  if (isNaN(d.getTime())) return props.data.date
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

/* ── Countdown timer ────────────────────────────────────────── */
interface CountUnit { label: string; value: string }

const countdown = ref<CountUnit[] | null>(null)
const eventPassed = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function calcCountdown() {
  if (!props.data.date) return
  const eventDate = new Date(props.data.date + (props.data.time ? ' ' + props.data.time : ''))
  if (isNaN(eventDate.getTime())) return

  const now = Date.now()
  const diff = eventDate.getTime() - now

  if (diff <= 0) {
    countdown.value = null
    eventPassed.value = true
    if (timer) clearInterval(timer)
    return
  }

  const totalSec = Math.floor(diff / 1000)
  const days  = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const mins  = Math.floor((totalSec % 3600) / 60)
  const secs  = totalSec % 60

  countdown.value = [
    { label: 'days',    value: String(days).padStart(2, '0') },
    { label: 'hours',   value: String(hours).padStart(2, '0') },
    { label: 'minutes', value: String(mins).padStart(2, '0') },
    { label: 'seconds', value: String(secs).padStart(2, '0') },
  ]
}

onMounted(() => {
  calcCountdown()
  timer = setInterval(calcCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* ── Wrapper ────────────────────────────────────────────────── */
.invitation-wrapper {
  width: 100%;
  max-width: 580px;
  font-family: 'Roboto', sans-serif;
  perspective: 1000px;
}

/* ── Ticket frame ───────────────────────────────────────────── */
.ticket {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  background: var(--bg);
  color: var(--text);
  min-height: 500px;
  animation: ticket-enter 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) both;
}

@keyframes ticket-enter {
  from { opacity: 0; transform: rotateY(-15deg) scale(0.92); }
  to   { opacity: 1; transform: rotateY(0deg)   scale(1); }
}

/* ── Stub ───────────────────────────────────────────────────── */
.stub {
  width: 90px;
  flex-shrink: 0;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.7s ease;
  transform-origin: left center;
}

.stub.slide-out {
  transform: translateX(-110%) rotate(-3deg);
  opacity: 0;
}

.stub-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 1rem 0.25rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: #fff;
  position: relative;
  z-index: 1;
}

.stub-label {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.stub-one {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.stub-date {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  opacity: 0.85;
}

/* ── Perforation circles ────────────────────────────────────── */
.perf-circles {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px 0;
}

.perf-circles.right {
  right: -8px;
}

.perf-circles.left {
  left: -8px;
}

.perf-circles span {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0a0a14;
  flex-shrink: 0;
}

/* ── Main ticket body ───────────────────────────────────────── */
.ticket-body {
  flex: 1;
  position: relative;
  padding: 0 8px;
  overflow: hidden;
}

/* Subtle repeating diagonal lines texture on body */
.ticket-body::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: repeating-linear-gradient(
    45deg,
    var(--text),
    var(--text) 1px,
    transparent 1px,
    transparent 12px
  );
  pointer-events: none;
}

.ticket-content {
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  position: relative;
  z-index: 1;
}

/* ── Event name ─────────────────────────────────────────────── */
.event-name {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: center;
  color: var(--accent);
  opacity: 0;
  animation: slide-in 0.5s ease 0.3s forwards;
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 40%, transparent);
}

/* ── Ruled divider ──────────────────────────────────────────── */
.ruled-line {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--accent), transparent);
  opacity: 0.5;
  opacity: 0;
  animation: fade-in 0.4s ease 0.8s forwards;
}

/* ── Host ───────────────────────────────────────────────────── */
.host {
  text-align: center;
  font-size: 0.95rem;
  opacity: 0;
  animation: fade-in 0.4s ease 0.9s forwards;
}

/* ── Details grid ───────────────────────────────────────────── */
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
  opacity: 0;
  animation: fade-in 0.5s ease 1.0s forwards;
}

.detail {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.88rem;
  line-height: 1.4;
}

.detail-wide {
  grid-column: 1 / -1;
}

.detail-icon {
  flex-shrink: 0;
  font-size: 0.95rem;
}

/* ── Message ────────────────────────────────────────────────── */
.message {
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.65;
  text-align: center;
  opacity: 0;
  animation: fade-in 0.4s ease 1.2s forwards;
  border-left: 2px solid var(--accent);
  padding-left: 0.75rem;
}

/* ── Countdown ──────────────────────────────────────────────── */
.countdown {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  animation: fade-in 0.4s ease 1.3s forwards;
}

.count-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  min-width: 52px;
}

.count-num {
  font-family: 'Oswald', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.count-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
  margin-top: 2px;
}

.event-past {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.55;
  font-style: italic;
}

/* ── RSVP ───────────────────────────────────────────────────── */
.rsvp {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: fade-in 0.4s ease 1.5s forwards;
  border-top: 1px dashed rgba(255,255,255,0.15);
  padding-top: 0.75rem;
  margin-top: 0.25rem;
}

.rsvp-label {
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.55;
}

.rsvp-buttons {
  display: flex;
  gap: 0.6rem;
}

.btn-attending,
.btn-regrets {
  cursor: pointer;
  border: 1.5px solid var(--accent);
  background: transparent;
  color: var(--text);
  border-radius: 4px;
  padding: 0.35rem 0.9rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.btn-attending:hover,
.btn-attending.active {
  background: var(--accent);
  color: #fff;
}

.btn-regrets:hover,
.btn-regrets.active {
  background: rgba(255,255,255,0.1);
}

.btn-attending:active,
.btn-regrets:active {
  transform: scale(0.96);
}

.rsvp-confirm {
  font-size: 0.82rem;
  font-style: italic;
  text-align: center;
  animation: pop-in 0.35s cubic-bezier(0.34, 1.6, 0.64, 1);
}

.rsvp-confirm.attending { color: #4ade80; }
.rsvp-confirm.regrets   { opacity: 0.65; }

/* ── Shared animations ──────────────────────────────────────── */
@keyframes slide-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
