<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <!-- Top bar -->
    <header class="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
        <!-- Left: Brand -->
        <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2 group">
          <div class="h-8 w-8 rounded-full bg-emerald-600 text-white grid place-items-center font-bold group-hover:rotate-6 transition">
            Y
          </div>
          <span class="font-semibold tracking-wide">YOWL</span>
        </RouterLink>

        <!-- Middle: Search (optionnel) -->
        <div class="hidden md:block flex-1 max-w-xl">
          <div class="relative">
            <input
              v-model="searchText"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2 pl-10 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900/40 focus:border-emerald-500"
              @keydown.enter="applySearch"
            />
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 19a8 8 0 100-16 8 8 0 000 16z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <!-- Right: actions -->
        <div class="flex items-center gap-2">
          <!-- Add URL -->
          <button
            @click="goCreate"
            class="hidden sm:inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 text-sm font-medium shadow-md hover:bg-emerald-700 transition"
          >
            + Add URL
          </button>

          <!-- Theme toggle -->
          <button
            class="rounded-lg p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="toggleTheme"
            :title="isDark ? 'Light mode' : 'Dark mode'"
          >
            <span v-if="isDark">🌙</span>
            <span v-else>☀️</span>
          </button>

          <!-- Auth menu -->
          <div class="relative" ref="userRef">
            <!-- Not authenticated -->
            <template v-if="!isAuth">
              <RouterLink
                :to="{ name: 'login' }"
                class="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Login
              </RouterLink>
              <RouterLink
                :to="{ name: 'register' }"
                class="px-3 py-2 text-sm rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
              >
                Sign up
              </RouterLink>
            </template>

            <!-- Authenticated -->
            <template v-else>
              <button
                @click="openUser = !openUser"
                class="h-9 w-9 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white grid place-items-center font-semibold"
                :title="auth.user?.name || 'Account'"
              >
                {{ (auth.user?.name || 'U').charAt(0).toUpperCase() }}
              </button>

              <transition name="fade">
                <div
                  v-if="openUser"
                  class="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg overflow-hidden"
                >
                  <div class="px-4 py-3 text-sm">
                    <p class="font-medium truncate">{{ auth.user?.name || 'User' }}</p>
                    <p class="text-slate-500 truncate">{{ auth.user?.email || '' }}</p>
                  </div>
                  <hr class="border-slate-200 dark:border-slate-700" />
                  <nav class="py-1 text-sm">
                    <RouterLink
                      :to="{ name: 'dashboard' }"
                      class="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                      @click="openUser=false"
                    >Dashboard</RouterLink>
                    <RouterLink
                      :to="{ name: 'contents.list' }"
                      class="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                      @click="openUser=false"
                    >Feed</RouterLink>
                    <RouterLink
                      :to="{ name: 'settings' }"
                      class="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                      @click="openUser=false"
                    >Settings</RouterLink>
                    <button
                      class="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      @click="doLogout"
                    >Logout</button>
                  </nav>
                </div>
              </transition>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Page body -->
    <main class="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-10 py-8">
      <RouterView />
    </main>

    <!-- Global toasts -->
    <AppToast />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import AppToast from '@/components/common/AppToast.vue'
import { useAuthStore } from '@/store/auth.store'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore?.() || { user: null } // sécurité si le store n'est pas encore défini

/* ---------- Recherche (optionnelle) ---------- */
const searchText = ref(route.query.q?.toString() || '')
const searchPlaceholder = 'Search articles…'
function applySearch () {
  router.push({ name: 'contents.list', query: { ...route.query, q: searchText.value || undefined, page: undefined } })
}

/* ---------- Navigation ---------- */
function goCreate () {
  router.push({ name: 'contents.create' })
}

/* ---------- Auth / menu utilisateur ---------- */
const isAuth = !!auth?.user
const openUser = ref(false)
const userRef = ref(null)

function onClickOutside (e) {
  if (!userRef.value) return
  if (!userRef.value.contains(e.target)) openUser.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))

async function doLogout () {
  try {
    // si ton store possède logout()
    await auth?.logout?.()
  } finally {
    openUser.value = false
    router.push({ name: 'login' })
  }
}

/* ---------- Dark mode ---------- */
const isDark = ref(false)

function applyTheme (dark) {
  const el = document.documentElement
  if (dark) el.classList.add('dark')
  else el.classList.remove('dark')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  isDark.value = dark
}

function toggleTheme () {
  applyTheme(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved ? saved === 'dark' : preferDark)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all .18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
