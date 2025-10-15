<!-- src/views/Content/ContentListView.vue -->
<template>
  <div class="bg-slate-50 min-h-screen flex flex-col">
    <!-- Top nav -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between py-3">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">Y</div>
          <span class="font-semibold text-slate-900 text-lg">YOWL</span>
        </div>

        <!-- Search -->
        <div class="flex-1 mx-4">
          <div class="relative">
            <input
              v-model="searchInput"
              type="text"
              placeholder="Search articles…"
              class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 pl-10 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 19a8 8 0 100-16 8 8 0 000 16z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button
            @click="goCreate"
            class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2 font-medium shadow-md hover:bg-emerald-700 transition"
          >
            + Add URL
          </button>
          <div class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white grid place-items-center font-semibold">U</div>
        </div>
      </div>
    </header>

    <!-- Tabs -->
    <nav class="bg-white border-b border-slate-200">
      <div class="max-w-[1200px] mx-auto px-6 lg:px-10 flex gap-6 overflow-x-auto">
        <button
          class="py-3 px-1 text-sm sm:text-base font-medium"
          :class="activeTab === 'trending' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-700 hover:text-emerald-600'"
          @click="switchSort('trending')"
        >Trending</button>
        <button
          class="py-3 px-1 text-sm sm:text-base font-medium"
          :class="activeTab === 'active' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-700 hover:text-emerald-600'"
          @click="switchSort('most_active')"
        >Most Active</button>
        <button
          class="py-3 px-1 text-sm sm:text-base font-medium"
          :class="activeTab === 'recent' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-700 hover:text-emerald-600'"
          @click="switchSort('recent')"
        >Recent</button>
        <button
          class="py-3 px-1 text-sm sm:text-base font-medium"
          :class="activeTab === 'followed' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-700 hover:text-emerald-600'"
          @click="toggleFollowed"
        >Followed Domains</button>
      </div>
    </nav>

    <!-- Main -->
    <div class="flex-1">
      <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 px-6 lg:px-10 py-8">
        <!-- Feed -->
        <div class="flex-1 space-y-8">
          <!-- Skeletons -->
          <template v-if="loading && items.length === 0">
            <div v-for="n in 3" :key="n" class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div class="h-4 w-40 bg-slate-200 rounded mb-3"></div>
              <div class="h-48 bg-slate-100 rounded mb-4"></div>
              <div class="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
              <div class="h-4 w-2/5 bg-slate-200 rounded"></div>
            </div>
          </template>

          <!-- Cards via component -->
          <ContentCard
            v-for="post in items"
            :key="post.id"
            :content="post"
            @tag="applyTag"
            @domain="applyDomain"
            @open="openContent"
            @like-changed="onLikeChanged"
            @share="onShare"
            @view="onView"
            @comment-added="onCommentAdded"
          />

          <!-- Empty state -->
          <div v-if="!loading && items.length === 0" class="text-center text-slate-500 py-12">
            No results. Try another keyword.
          </div>

          <!-- Load more -->
          <div class="pt-2 pb-6">
            <button
              v-if="hasMore"
              @click="loadMore"
              :disabled="loading"
              class="block mx-auto bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 hover:bg-slate-100 transition disabled:opacity-60"
            >
              {{ loading ? 'Loading…' : 'Load More Posts' }}
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="w-full md:w-[280px] space-y-8">
          <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <h4 class="font-semibold text-slate-900 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <span>📈</span> Trending Tags
            </h4>
            <div v-if="trending.length === 0" class="px-4 py-3 text-sm text-slate-500">—</div>
            <button
              v-for="t in trending" :key="t.name"
              class="px-4 py-2 w-full text-left text-slate-700 hover:bg-slate-50 cursor-pointer flex justify-between"
              @click="applyTag(t.name)"
            >
              <span>#{{ t.name }}</span>
              <span class="text-slate-500 text-sm">{{ t.count }}</span>
            </button>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <h4 class="font-semibold text-slate-900 px-4 py-3 border-b border-slate-100">Followed Domains</h4>
            <div v-if="followed.length === 0" class="px-4 py-3 text-sm text-slate-500">—</div>
            <div v-for="d in followed" :key="d.name"
                 class="px-4 py-2 flex justify-between items-center text-slate-700 hover:bg-slate-50">
              <button class="hover:underline" @click="applyDomain(d.name)">{{ d.name }}</button>
              <span class="text-slate-500 text-sm">{{ d.count }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentCard from '@/components/content/ContentCard.vue'
import { useContentStore } from '@/stores/content.store'
import http from '@/services/http'
import reactionApi from '@/services/reaction.service'

const route = useRoute()
const router = useRouter()
const store = useContentStore()

/* ---------- Sidebar ---------- */
const trending = ref([])
const followed = ref([])
async function fetchSidebar() {
  try {
    const a = await http.get('/lookup/trending-tags')
    trending.value = a.data?.data || a.data || []
  } catch {}
  try {
    const b = await http.get('/lookup/followed-domains')
    followed.value = b.data?.data || b.data || []
  } catch {}
}

/* ---------- Recherche (debounce) ---------- */
const searchInput = ref(route.query.q?.toString() || '')
let debounceTimer = null
watch(searchInput, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    pushQuery({ q: val || undefined, page: undefined })
  }, 350)
})
onBeforeUnmount(() => clearTimeout(debounceTimer))

/* ---------- State dérivé store ---------- */
const loading = computed(() => store.loading)
const items   = computed(() => store.items)
const hasMore = computed(() => store.hasMore)

/* ---------- Bootstrap ---------- */
onMounted(async () => {
  attachGlobalBus()
  await syncFromRoute()
  fetchSidebar()
})
watch(() => route.fullPath, () => { syncFromRoute() })
onBeforeUnmount(() => detachGlobalBus())

/* ---------- Helpers / actions ---------- */
function pushQuery(q) {
  router.push({ name: 'contents.list', query: { ...route.query, ...q } })
}

async function syncFromRoute() {
  const { q, tag, domain, category, sort, followed_only, page, per_page } = route.query
  store.filters.q = (q ?? '').toString()
  store.filters.tag = (tag ?? '').toString()
  store.filters.domain = (domain ?? '').toString()
  store.filters.category = (category ?? '').toString()
  store.filters.sort = (sort ?? 'recent').toString()
  store.filters.followed_only = ['1', 'true', 'yes'].includes((followed_only ?? '').toString())
  if (per_page) store.perPage = Number(per_page) || store.perPage
  await store.fetchList({ page: page ? Number(page) : 1 })
  searchInput.value = store.filters.q
}

function loadMore()        { store.loadMore() }
function applyTag(tag)     { pushQuery({ tag, page: undefined }) }
function applyDomain(dom)  { pushQuery({ domain: dom, page: undefined }) }
function switchSort(s)     { pushQuery({ sort: s, page: undefined }) }
function toggleFollowed()  { pushQuery({ followed_only: store.filters.followed_only ? undefined : '1', page: undefined }) }
function goCreate()        { router.push({ name: 'contents.create' }) }

const activeTab = computed(() => {
  if (store.filters.followed_only) return 'followed'
  if (store.filters.sort === 'trending') return 'trending'
  if (store.filters.sort === 'most_active') return 'active'
  return 'recent'
})

/* ---------- OUVERTURE D'UN POST (ROBUSTE) ---------- */
function openContent(payload) {
  // payload peut être:
  // - un objet { id, url }
  // - un Ref (payload.value.{id,url})
  // - un id direct (number/string)
  const maybeRef = payload && typeof payload === 'object' && 'value' in payload ? payload.value : payload
  const id = Number(
    (typeof maybeRef === 'object' ? maybeRef?.id : maybeRef) ?? NaN
  )
  const url = typeof maybeRef === 'object' ? maybeRef?.url : undefined

  if (!Number.isNaN(id) && id > 0) {
    router.push({ name: 'contents.show', params: { id } })
    return
  }
  if (url) {
    window.open(url, '_blank', 'noopener')
  }
}

/* ---------- Réactivité des compteurs depuis ContentCard ---------- */
function onLikeChanged({ id, liked }) {
  const i = store.items.findIndex(it => it.id === id)
  if (i === -1) return
  const it = store.items[i]
  const before = Number(it.likes_count ?? 0)
  it.likes_count = Math.max(0, before + (liked ? 1 : -1))
  if (it.meta && typeof it.meta === 'object') {
    it.meta.liked_by_me = !!liked
  } else {
    it.meta = { liked_by_me: !!liked }
  }
}

async function onShare({ id }) {
  try { await reactionApi.share?.(id) } catch {}
  const i = store.items.findIndex(it => it.id === id)
  if (i === -1) return
  const it = store.items[i]
  if (typeof it.shares_count === 'number') {
    it.shares_count = it.shares_count + 1
  } else {
    it.meta = it.meta || {}
    it.meta.shares_count = (Number(it.meta.shares_count || 0) + 1)
  }
}

function onView({ id }) {
  const i = store.items.findIndex(it => it.id === id)
  if (i === -1) return
  const it = store.items[i]
  it.views_count = Number(it.views_count || 0) + 1
}

function onCommentAdded({ id }) {
  const i = store.items.findIndex(it => it.id === id)
  if (i === -1) return
  const it = store.items[i]
  it.comments_count = Number(it.comments_count || 0) + 1
}

/* ---------- Event bus global ---------- */
function onBusLike(e)     { onLikeChanged(e.detail || {}) }
function onBusShare(e)    { onShare(e.detail || {}) }
function onBusView(e)     { onView(e.detail || {}) }
function onBusComment(e)  { onCommentAdded(e.detail || {}) }

function attachGlobalBus() {
  window.addEventListener('content:like-changed', onBusLike)
  window.addEventListener('content:share', onBusShare)
  window.addEventListener('content:view', onBusView)
  window.addEventListener('content:comment-added', onBusComment)
}
function detachGlobalBus() {
  window.removeEventListener('content:like-changed', onBusLike)
  window.removeEventListener('content:share', onBusShare)
  window.removeEventListener('content:view', onBusView)
  window.removeEventListener('content:comment-added', onBusComment)
}
</script>

<style scoped>
/* Optional: skeleton micro-animations */
</style>
