<template>
  <nav class="fixed top-0 left-0 w-full z-50">

    <!-- ── Navbar bar ──────────────────────────────────────────────────────── -->
    <div class="relative bg-black/70 backdrop-blur-md border-b border-white/10">
      <!-- Scroll progress line -->
      <div
        class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-teal-500 transition-[width] duration-150 ease-out"
        :style="{ width: scrollProgress + '%' }"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <a
            href="#home"
            @click.prevent="scrollTo('home')"
            class="text-cyan-500 text-xl sm:text-2xl font-bold cursor-pointer hover:text-cyan-400 transition-colors duration-200 select-none"
          >
            { Anik Chandra }
          </a>

          <!-- Desktop nav -->
          <div class="hidden md:flex items-center gap-x-1">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="'#' + item.id"
              @click.prevent="scrollTo(item.id)"
              class="nav-item"
              :class="{ 'nav-item-active': activeSection === item.id }"
            >
              {{ item.label }}
            </a>
          </div>

          <!-- Mobile hamburger -->
          <button
            @click="isOpen = !isOpen"
            aria-label="Toggle navigation menu"
            class="md:hidden w-10 h-10 flex items-center justify-center rounded-xl
                   bg-white/5 border border-white/10
                   hover:border-cyan-500/40 hover:bg-cyan-500/10
                   transition-all duration-200"
          >
            <div class="relative w-[18px] h-[13px]">
              <span
                class="absolute left-0 w-full h-[2px] bg-cyan-500 rounded-full transition-all duration-300 origin-center"
                :class="isOpen ? 'top-[5.5px] rotate-45' : 'top-0'"
              ></span>
              <span
                class="absolute top-[5.5px] left-0 w-full h-[2px] bg-cyan-500 rounded-full transition-all duration-200"
                :class="isOpen ? 'opacity-0 scale-x-0' : ''"
              ></span>
              <span
                class="absolute left-0 w-full h-[2px] bg-cyan-500 rounded-full transition-all duration-300 origin-center"
                :class="isOpen ? 'top-[5.5px] -rotate-45' : 'top-[11px]'"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Mobile menu — Teleport escapes nav stacking context ────────────── -->
    <Teleport to="body">

      <!-- Backdrop -->
      <Transition name="t-backdrop">
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          style="z-index: 998"
          @click="isOpen = false"
        ></div>
      </Transition>

      <!-- Drawer -->
      <Transition name="t-drawer">
        <div
          v-if="isOpen"
          class="fixed top-0 right-0 h-full w-72 sm:w-80 flex flex-col md:hidden
                 bg-gradient-to-b from-[#0c0c0c] to-[#111111]
                 border-l border-white/10 shadow-2xl shadow-black/60"
          style="z-index: 999"
        >
          <!-- Glow accents -->
          <div class="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute bottom-24 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Header -->
          <div class="relative flex-shrink-0 px-5 pt-6 pb-4 border-b border-white/10">
            <div class="flex items-center justify-between mb-4">
              <!-- Profile chip -->
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500
                            flex items-center justify-center text-white font-bold text-sm
                            shadow-lg shadow-cyan-500/30 flex-shrink-0">
                  AC
                </div>
                <div>
                  <p class="text-white font-semibold text-sm leading-snug">Anik Chandra</p>
                  <p class="text-gray-400 text-xs">Full-Stack Developer</p>
                </div>
              </div>
              <!-- Close -->
              <button
                @click="isOpen = false"
                aria-label="Close menu"
                class="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0
                       bg-white/5 border border-white/10 text-gray-400
                       hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10
                       transition-all duration-200"
              >
                <Icon name="mdi:close" class="w-4 h-4" />
              </button>
            </div>
            <!-- Available badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              <span class="text-cyan-400 text-xs font-medium">Available for work</span>
            </div>
          </div>

          <!-- Nav items -->
          <div class="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
            <a
              v-for="(item, i) in navItems"
              :key="item.id"
              :href="'#' + item.id"
              @click.prevent="scrollTo(item.id); isOpen = false"
              class="drawer-item"
              :class="activeSection === item.id ? 'drawer-item-active' : 'drawer-item-default'"
              :style="{ animationDelay: `${i * 35}ms` }"
            >
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                :class="activeSection === item.id ? 'bg-cyan-500/20' : 'bg-white/5'"
              >
                <Icon
                  :name="item.icon"
                  class="w-[18px] h-[18px] transition-colors duration-200"
                  :class="activeSection === item.id ? 'text-cyan-400' : 'text-gray-500'"
                />
              </div>
              <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
              <span v-if="activeSection === item.id" class="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0"></span>
              <Icon v-else name="mdi:chevron-right" class="w-3.5 h-3.5 text-gray-700 flex-shrink-0" />
            </a>
          </div>

          <!-- Social links -->
          <div class="flex-shrink-0 px-5 py-4 border-t border-white/10">
            <p class="text-gray-600 text-[11px] uppercase tracking-wider font-medium mb-3">Connect</p>
            <div class="flex items-center gap-2">
              <a
                v-for="s in socialLinks"
                :key="s.href"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                       text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10
                       transition-all duration-200"
              >
                <Icon :name="s.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Transition>

    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen         = ref(false)
const activeSection  = ref('home')
const scrollProgress = ref(0)

const navItems = [
  { id: 'home',       label: 'Home',       icon: 'mdi:home-outline'         },
  { id: 'about',      label: 'About',      icon: 'mdi:account-outline'      },
  { id: 'skill',      label: 'Skills',     icon: 'mdi:lightning-bolt-outline'},
  { id: 'projects',   label: 'Projects',   icon: 'mdi:folder-open-outline'  },
  { id: 'experience', label: 'Experience', icon: 'mdi:briefcase-outline'     },
  { id: 'education',  label: 'Education',  icon: 'mdi:school-outline'        },
  { id: 'contact',    label: 'Contact',    icon: 'mdi:email-outline'         },
]

const socialLinks = [
  { label: 'GitHub',   href: 'https://github.com/Void-Brain70',                      icon: 'mdi:github'   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anik-chandra-a5a62022a/', icon: 'mdi:linkedin' },
  { label: 'WhatsApp', href: 'https://wa.me/8801521215839',                          icon: 'mdi:whatsapp' },
]

// ─── Smooth scroll ────────────────────────────────────────────────────────────
const scrollTo = (id: string) => {
  // Prefer the article wrapper from index.vue; fall back to any element with that id
  const el = document.querySelector(`article#${id}`) ?? document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Active-section tracking via IntersectionObserver ────────────────────────
//
// Why IntersectionObserver instead of scroll + getBoundingClientRect?
//
//  • index.vue uses <article id="x"> as wrappers
//  • Every component also has <section id="x"> — duplicate IDs in the DOM
//  • getBoundingClientRect is called synchronously on scroll and is sensitive to
//    timing / layout shifts; it was silently returning stale values here.
//
// IntersectionObserver is event-driven: the browser notifies us exactly when a
// section enters or exits the "hot zone" we define with rootMargin.
//
// Hot zone: from 80 px below the top (just under the navbar) down to 40 % from
// the bottom = the top 60 % of the viewport.  A section is "visible" when any
// pixel of it overlaps this zone.
//
// Active = the LAST section in navItems order that is currently in the hot zone.
// "Last" naturally means "the section the user has scrolled furthest into."

const visibleIds = new Set<string>()
let navObserver: IntersectionObserver | null = null

const pickActive = () => {
  let found = ''
  for (const item of navItems) {
    if (visibleIds.has(item.id)) found = item.id
  }
  if (found) activeSection.value = found
}

const initObserver = () => {
  navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleIds.add(entry.target.id)
        } else {
          visibleIds.delete(entry.target.id)
        }
      })
      pickActive()
    },
    {
      // rootMargin shrinks the viewport rectangle used for intersection tests:
      //   -80px top  → ignore the navbar area
      //   -40% bottom → only consider the top 60 % of the viewport
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    }
  )

  navItems.forEach(({ id }) => {
    // Query specifically for the <article> wrapper (index.vue) to avoid the
    // duplicate-ID problem with the <section> tags inside each component.
    // Fallback to getElementById if for any reason the article isn't found.
    const el = document.querySelector(`article#${id}`) ?? document.getElementById(id)
    if (el) navObserver!.observe(el)
  })
}

// ─── Scroll progress bar ─────────────────────────────────────────────────────
const onScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0
}

// ─── Close drawer on desktop resize ──────────────────────────────────────────
const onResize = () => {
  if (window.innerWidth >= 768) isOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScrollProgress, { passive: true })
  window.addEventListener('resize',  onResize)
  onScrollProgress()   // init progress bar
  initObserver()       // start section tracking
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollProgress)
  window.removeEventListener('resize',  onResize)
  navObserver?.disconnect()
  visibleIds.clear()
})
</script>

<style scoped>
/* ── Desktop nav item ──────────────────────────────────────────────────────── */
.nav-item {
  @apply relative px-3 py-1.5 text-sm font-medium text-gray-400 rounded-lg
         cursor-pointer select-none transition-all duration-200;
}
.nav-item:hover { @apply text-cyan-400 bg-cyan-500/10; }
.nav-item-active { @apply text-cyan-400 bg-cyan-500/10; }
.nav-item-active::after {
  content: '';
  @apply absolute bottom-0 left-3 right-3 h-[2px]
         bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full;
}

/* ── Mobile drawer item ────────────────────────────────────────────────────── */
.drawer-item {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-xl
         cursor-pointer select-none transition-all duration-200;
  animation: slideIn 0.28s ease both;
}
.drawer-item-default { @apply text-gray-400 hover:text-white hover:bg-white/5; }
.drawer-item-active {
  @apply text-white border border-cyan-500/25;
  background: linear-gradient(to right, rgb(6 182 212 / 0.12), rgb(20 184 166 / 0.08));
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(14px); }
  to   { opacity: 1; transform: translateX(0);    }
}

/* ── Transitions ───────────────────────────────────────────────────────────── */
.t-backdrop-enter-active, .t-backdrop-leave-active { transition: opacity 0.25s ease; }
.t-backdrop-enter-from,   .t-backdrop-leave-to     { opacity: 0; }

.t-drawer-enter-active { transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1); }
.t-drawer-leave-active { transition: transform 0.22s cubic-bezier(0.32, 0.72, 0, 1); }
.t-drawer-enter-from, .t-drawer-leave-to { transform: translateX(100%); }
</style>
