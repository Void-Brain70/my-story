# Vue 3 & Nuxt 3 Deep Dive — সম্পূর্ণ গাইড
### Book 12 of 14 | Phase 4 | Week 27-28

---

## ভূমিকা | Introduction

**English:** Vue 3 with Composition API is a complete rewrite of Vue 2. Nuxt 3 is the meta-framework on top of Vue 3 that adds SSR, file-based routing, and auto-imports.

**বাংলা:** Vue 3 Composition API দিয়ে পুরো নতুনভাবে লেখা হয়েছে। Nuxt 3 Vue 3-এর উপরে SSR, file-based routing এবং auto-imports যোগ করে।

---

## Chapter 1: Composition API — কম্পোজিশন এপিআই

### ref vs reactive

```typescript
import { ref, reactive, computed, watch, watchEffect } from 'vue';

// ref — primitive values-এর জন্য
const count = ref(0);
const name = ref('Anik');
const user = ref<User | null>(null);

// Access: .value দিয়ে (template-এ .value লাগে না)
console.log(count.value);  // 0
count.value++;              // 1

// reactive — object-এর জন্য
const state = reactive({
    users: [] as User[],
    loading: false,
    error: null as string | null
});

// Direct access
state.loading = true;
state.users.push(newUser);
```

### computed — কম্পিউটেড

```typescript
const price = ref(100);
const quantity = ref(3);
const discount = ref(10);

// Computed — automatically updates
const subtotal = computed(() => price.value * quantity.value);
const total = computed(() => subtotal.value - discount.value);

// Writable computed
const firstName = ref('Anik');
const lastName = ref('Chandra');

const fullName = computed({
    get: () => `${firstName.value} ${lastName.value}`,
    set: (value: string) => {
        const parts = value.split(' ');
        firstName.value = parts[0];
        lastName.value = parts[1] || '';
    }
});

fullName.value = 'Rahim Uddin';  // firstName = Rahim, lastName = Uddin
```

### watch & watchEffect

```typescript
const userId = ref(1);
const user = ref<User | null>(null);

// watch — নির্দিষ্ট কিছু watch করো
watch(userId, async (newId, oldId) => {
    console.log(`User changed from ${oldId} to ${newId}`);
    user.value = await fetchUser(newId);
}, { immediate: true });  // শুরুতেই একবার চালাও

// Multiple sources watch
watch([firstName, lastName], ([newFirst, newLast]) => {
    console.log(`Name: ${newFirst} ${newLast}`);
});

// Deep watch — object-এর ভেতরের changes
const form = ref({ name: '', email: '' });
watch(form, (newForm) => {
    console.log('Form changed:', newForm);
}, { deep: true });

// watchEffect — automatic dependency tracking
watchEffect(() => {
    // userId.value read হলেই automatically watch করে
    console.log('Fetching user:', userId.value);
    fetchUser(userId.value);
});
```

---

## Chapter 2: Composables — কম্পোজেবল

### বাংলা ব্যাখ্যা
Composable হলো Vue 3-এর reusable logic। Vue 2-এর mixins-এর চেয়ে অনেক ভালো।

```typescript
// composables/useApi.ts
export function useApi<T>(url: string) {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetch(params?: Record<string, any>): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            data.value = await $fetch<T>(url, { params });
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    return { data, loading, error, fetch };
}

// ব্যবহার
const { data: users, loading, error, fetch: fetchUsers } = useApi<User[]>('/api/users');
onMounted(() => fetchUsers({ page: 1 }));
```

```typescript
// composables/useAuth.ts
export const useAuth = () => {
    const user = useState<User | null>('user', () => null);
    const isLoggedIn = computed(() => user.value !== null);

    async function login(credentials: LoginDto): Promise<void> {
        const response = await $fetch<{ user: User; token: string }>('/api/auth/login', {
            method: 'POST',
            body: credentials
        });
        user.value = response.user;
        useCookie('token').value = response.token;
        await navigateTo('/dashboard');
    }

    async function logout(): Promise<void> {
        await $fetch('/api/auth/logout', { method: 'POST' });
        user.value = null;
        useCookie('token').value = null;
        await navigateTo('/login');
    }

    return { user, isLoggedIn, login, logout };
};

// composables/usePagination.ts
export function usePagination(defaultLimit = 10) {
    const page = ref(1);
    const limit = ref(defaultLimit);
    const total = ref(0);

    const totalPages = computed(() => Math.ceil(total.value / limit.value));
    const hasNextPage = computed(() => page.value < totalPages.value);
    const hasPrevPage = computed(() => page.value > 1);

    function nextPage() { if (hasNextPage.value) page.value++; }
    function prevPage() { if (hasPrevPage.value) page.value--; }
    function goToPage(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)); }

    return { page, limit, total, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage, goToPage };
}
```

---

## Chapter 3: Nuxt 3 Features — নাক্সট ৩ ফিচার

### File-based Routing
```
pages/
├── index.vue           → /
├── about.vue           → /about
├── blog/
│   ├── index.vue       → /blog
│   └── [slug].vue      → /blog/:slug (dynamic)
├── users/
│   ├── index.vue       → /users
│   └── [id]/
│       ├── index.vue   → /users/:id
│       └── edit.vue    → /users/:id/edit
└── [...404].vue        → 404 (catch-all)
```

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

// SEO
useSeoMeta({
    title: () => `${post.value?.title} | My Blog`,
    description: () => post.value?.excerpt,
    ogImage: () => post.value?.cover
});

const { data: post, pending, error } = await useFetch(`/api/posts/${slug}`);
</script>

<template>
    <article v-if="post">
        <h1>{{ post.title }}</h1>
        <div v-html="post.content" />
    </article>
    <LoadingSpinner v-else-if="pending" />
    <ErrorMessage v-else-if="error" :message="error.message" />
</template>
```

---

## Chapter 4: SSR vs SSG vs ISR

### বাংলা ব্যাখ্যা

```
SSR (Server Side Rendering):
- প্রতিটি request-এ server-এ render হয়
- সবসময় fresh data
- User-specific content-এর জন্য (dashboard, profile)

SSG (Static Site Generation):
- Build time-এ সব page render হয়
- অনেক দ্রুত, CDN-এ serve করা যায়
- Blog, documentation-এর জন্য

ISR (Incremental Static Regeneration):
- SSG + নির্দিষ্ট সময় পরে revalidate
- Best of both worlds
- E-commerce products, news-এর জন্য
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    // SSR (default)
    ssr: true,

    // SSG — সব page static generate করো
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/sitemap.xml']
        }
    },

    // Hybrid — page-by-page decide করো
    routeRules: {
        '/': { prerender: true },           // SSG
        '/blog/**': { isr: 3600 },          // ISR — 1 hour
        '/dashboard/**': { ssr: true },      // SSR always
        '/static/**': { static: true }       // Static
    }
});
```

---

## Chapter 5: Data Fetching — ডেটা ফেচিং

```typescript
// useFetch — SSR safe, auto-cache
const { data, pending, error, refresh } = await useFetch('/api/users', {
    key: 'users-list',
    query: { page: 1, limit: 10 },
    transform: (data) => data.users,
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
});

// useAsyncData — custom fetching logic
const { data: posts } = await useAsyncData('posts', async () => {
    const [latest, popular] = await Promise.all([
        $fetch('/api/posts?sort=latest'),
        $fetch('/api/posts?sort=popular')
    ]);
    return { latest, popular };
});

// $fetch — direct API call (client-side only)
async function createPost(data: CreatePostDto) {
    const result = await $fetch('/api/posts', {
        method: 'POST',
        body: data
    });
    await refresh();  // list refresh করো
}
```

---

## Chapter 6: Core Web Vitals Optimization

### বাংলা ব্যাখ্যা
Core Web Vitals হলো Google-এর performance metrics। ভালো score = ভালো SEO ranking।

```
LCP (Largest Contentful Paint) < 2.5s:
- Largest image/text কতক্ষণে load হয়
- Fix: Image optimize করো, preload করো

FID/INP (Interaction to Next Paint) < 200ms:
- Click/tap-এ কতক্ষণে respond করে
- Fix: Heavy JS code split করো

CLS (Cumulative Layout Shift) < 0.1:
- Page load-এ কতটা layout shift হয়
- Fix: Image-এ width/height দাও
```

```vue
<!-- Image optimization in Nuxt -->
<template>
    <!-- NuxtImg — auto-optimize করে -->
    <NuxtImg
        src="/hero.jpg"
        width="1200"
        height="600"
        format="webp"
        loading="lazy"
        alt="Hero image"
    />

    <!-- Above the fold — preload করো -->
    <NuxtImg
        src="/logo.png"
        preload
        loading="eager"
        alt="Logo"
    />
</template>
```

```typescript
// nuxt.config.ts — performance
export default defineNuxtConfig({
    // Image optimization
    image: {
        formats: ['webp', 'avif'],
        quality: 80
    },

    // CSS splitting
    css: ['~/assets/css/main.css'],

    // Lazy load components
    components: {
        dirs: [{ path: '~/components', pathPrefix: false }]
    }
});
```

---

## Practice Project | অনুশীলন প্রকল্প

### তোমার Portfolio Optimize করো

```
১. Composition API সব জায়গায় ব্যবহার করো

২. Composables তৈরি করো:
   - useContactForm()
   - useProjects()
   - useTheme()

৩. Route rules যোগ করো:
   - / → prerender: true (SSG)
   - /projects → isr: 3600

৪. Performance optimize করো:
   - সব images NuxtImg দিয়ে
   - Lazy load components
   - useSeoMeta প্রতিটি page-এ

৫. Lighthouse score measure করো:
   - Performance: 90+
   - SEO: 100
   - Accessibility: 90+
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **ref** = primitive values (`ref(0)`, access: `.value`)
- **reactive** = objects (direct access)
- **computed** = auto-update calculated value
- **watch** = specific value watch করো
- **watchEffect** = auto dependency tracking
- **Composable** = reusable logic function (use prefix)
- **useFetch** = SSR-safe API call
- **SSR** = server-এ render (fresh data, user-specific)
- **SSG** = build-time render (fast, CDN-friendly)
- **ISR** = SSG + auto revalidate

---

> **আগের বই:** [Book 11 — TypeScript](11-typescript.md) | **পরবর্তী বই:** [Book 13 — GraphQL](13-graphql.md)
