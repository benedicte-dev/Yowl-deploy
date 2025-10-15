<!-- src/views/Content/ContentCreateView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
    <div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-emerald-700 font-semibold">Share a New Link</h1>
        <p class="mt-2 text-slate-600">
          Discover something interesting? Share it with the YOWL community and start a meaningful conversation.
        </p>
      </div>

      <div class="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-[0_10px_40px_-15px_rgba(16,185,129,.25)]">
        <!-- URL -->
        <div class="p-6 border-b border-slate-100">
          <label class="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <span class="text-emerald-600">🔗</span> Website URL
          </label>
          <div class="flex gap-3">
            <input
              v-model.trim="url"
              type="url"
              placeholder="https://example.com/article"
              autocomplete="off"
              class="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
            />
            <button
              type="button"
              @click="onPreview"
              :disabled="!isValidUrl || loadingPreview"
              class="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition border"
              :class="!isValidUrl || loadingPreview
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'"
            >
              <span>🌐</span>
              <span>{{ loadingPreview ? 'Loading…' : 'Preview Link' }}</span>
            </button>
          </div>
          <p class="mt-2 text-sm text-slate-500">
            Paste any web link to automatically fetch its preview and details.
          </p>
          <p v-if="errors.url" class="mt-2 text-sm text-rose-600">{{ errors.url }}</p>
        </div>

        <!-- Preview -->
        <section v-if="previewReady" class="px-6 pb-6 pt-4">
          <h3 class="sr-only">Link Preview</h3>
          <div class="rounded-xl border border-emerald-200/70 overflow-hidden">
            <img v-if="preview.image_url" :src="preview.image_url" alt="Preview image" class="w-full h-60 object-cover" />
            <div class="p-4">
              <div class="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <span class="h-6 w-6 grid place-items-center rounded-full bg-emerald-50 text-emerald-600 text-xs">A</span>
                <span>{{ preview.author || 'Author' }}</span>
                <span class="mx-1 text-slate-300">•</span>
                <a v-if="preview.site_name" :href="url" target="_blank" rel="noopener" class="text-emerald-600 hover:underline">
                  {{ preview.site_name }}
                </a>
              </div>
              <p class="font-medium text-slate-900">
                {{ preview.title || '—' }}
              </p>
              <p class="mt-1 text-sm text-slate-600">
                {{ preview.description || 'No description available for this link.' }}
              </p>
            </div>
          </div>
        </section>

        <!-- Tags -->
        <section class="px-6 pb-6">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span class="text-emerald-600">🏷️</span> Select Tags <span class="text-rose-500">*</span>
            </label>
            <span class="text-xs text-slate-500">{{ selectedTags.length }}/5 selected</span>
          </div>

          <div class="text-sm text-slate-500 mb-2">Popular Tags</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="t in popularTags"
              :key="t.id || t.slug || t.name || t"
              type="button"
              @click="toggleTag(t.name || t)"
              class="px-3 py-1 rounded-full border text-sm transition"
              :class="selectedTags.includes(t.name || t)
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
            >
              #{{ t.name || t }}
            </button>

            <!-- custom tag -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="showCustomTag = !showCustomTag"
                class="px-3 py-1 rounded-full border border-slate-200 text-slate-600 text-sm hover:bg-slate-100"
              >
                + Add Custom Tag
              </button>
              <input
                v-if="showCustomTag"
                v-model.trim="customTag"
                type="text"
                placeholder="e.g. NextJS"
                class="rounded-lg border border-slate-200 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
                @keydown.enter.prevent="addCustomTag"
                @blur="addCustomTag"
              />
            </div>
          </div>

          <p v-if="errors.tag_ids" class="mt-2 text-sm text-rose-600">{{ errors.tag_ids }}</p>
        </section>

        <!-- Thoughts -->
        <section class="px-6 pb-6">
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Add Your Thoughts <span class="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            v-model="comment"
            rows="4"
            maxlength="280"
            placeholder="What makes this link interesting? Share your perspective…"
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
          ></textarea>
          <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Your comment will appear at the top of the discussion</span>
            <span>{{ comment.length }}/280</span>
          </div>
        </section>

        <!-- Submit -->
        <div class="px-6 pb-6">
          <button
            type="button"
            @click="onPublish"
            :disabled="!canPublish || submitting"
            class="w-full inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition shadow-lg"
            :class="!canPublish || submitting
              ? 'bg-emerald-300/60 text-white cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'"
          >
            <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Publish Discussion
          </button>
          <p v-if="publishHint" class="mt-3 text-center text-xs text-slate-500">
            {{ publishHint }}
          </p>
          <div v-if="errors._" class="mt-3 rounded-lg bg-rose-50 text-rose-700 px-4 py-3">
            {{ errors._ }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/services/http'
import { useContentStore } from '@/stores/content.store'

const router = useRouter()
const content = useContentStore()

// ----------------- State
const url = ref('')
const preview = reactive({
  title: '',
  description: '',
  image_url: '',
  author: '',
  site_name: ''
})
const loadingPreview = ref(false)
const previewReady = computed(() => !!(preview.title || preview.image_url || preview.description))

// Tags
const popularTags = ref([
  { name: 'Technology' }, { name: 'AI' }, { name: 'Web Development' }, { name: 'React' },
  { name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'Design' }, { name: 'UI/UX' },
  { name: 'Programming' }, { name: 'DevOps' }, { name: 'Mobile' }, { name: 'Startups' }
])
const selectedTags = ref([])
const showCustomTag = ref(false)
const customTag = ref('')

const comment = ref('')
const submitting = ref(false)
const errors = reactive({})

// ----------------- Derived
const isValidUrl = computed(() => {
  try { new URL(url.value); return true } catch { return false }
})
const canPublish = computed(() =>
  isValidUrl.value && selectedTags.value.length > 0 && !submitting.value
)
const publishHint = computed(() => {
  if (!isValidUrl.value) return 'Please enter a valid URL to continue'
  if (selectedTags.value.length === 0) return 'Please select at least one tag to continue'
  return ''
})

// ----------------- Helpers
function resetErrors () { Object.keys(errors).forEach(k => delete errors[k]) }

async function onPreview () {
  resetErrors()
  if (!isValidUrl.value) { errors.url = 'Invalid URL.'; return }
  loadingPreview.value = true
  try {
    const { data } = await http.post('/share/preview', { url: url.value })
    const src = data?.data || data || {}
    preview.title       = src.title || ''
    preview.description = src.description || ''
    preview.image_url   = src.thumbnail_url || src.image_url || src.image || ''
    preview.author      = src.author || src.author_name || ''
    preview.site_name   = src.site_name || src.domain || new URL(url.value).hostname
  } catch (e) {
    errors._ = e?.response?.data?.message || 'Unable to fetch preview for this URL.'
  } finally {
    loadingPreview.value = false
  }
}

function toggleTag (t) {
  if (!t) return
  const exists = selectedTags.value.includes(t)
  if (exists) selectedTags.value = selectedTags.value.filter(x => x !== t)
  else if (selectedTags.value.length < 5) selectedTags.value.push(t)
}

function addCustomTag () {
  const t = (customTag.value || '').trim()
  if (!t) { showCustomTag.value = false; return }
  if (!selectedTags.value.includes(t)) toggleTag(t)
  customTag.value = ''
  showCustomTag.value = false
}

// Résolution des tags (noms -> IDs via /v1/tags)
async function resolveTagIds (names = []) {
  const ids = []
  for (const name of names) {
    const { data } = await http.get('/tags', { params: { q: name, per_page: 1 } })
    const first = (data?.data || [])[0]
    if (first?.id) ids.push(first.id)
    else throw new Error(`Unable to resolve tag "${name}"`)
  }
  return ids
}

async function redirectToExistingIfAny (theUrl) {
  try {
    const { data } = await http.get('/contents', { params: { q: theUrl, per_page: 1 } })
    const found = (data?.data || [])[0]
    if (found?.id) {
      if (router.hasRoute('contents.show')) {
        router.push({ name: 'contents.show', params: { id: found.id } })
        return true
      }
    }
  } catch {}
  return false
}

async function onPublish () {
  resetErrors()
  if (!canPublish.value) return
  submitting.value = true
  try {
    const tag_ids = await resolveTagIds(selectedTags.value)

    const fallbackTitle = (() => {
      try { return new URL(url.value).hostname } catch { return 'Link' }
    })()

    const payload = {
      url: url.value,
      title: preview.title || fallbackTitle,
      description: preview.description || (comment.value || undefined),
      thumbnail_url: preview.image_url || undefined,
      meta_json: { preview },
      tag_ids
    }

    // tu peux garder ton store; sinon: await http.post('/contents', payload)
    await content.create(payload)

    // REDIRECTION VERS LA LISTE (ContentListView)
    if (router.hasRoute('contents.list')) router.push({ name: 'contents.list' })
    else router.push('/contents')
  } catch (e) {
    const status = e?.response?.status
    const body   = e?.response?.data

    if (status === 422) {
      const bag = body?.errors || {}

      // Copier les erreurs de champ
      for (const [k, v] of Object.entries(bag)) errors[k] = Array.isArray(v) ? v[0] : String(v)

      // Si doublon d’URL, essayer de rediriger vers le contenu existant
      const isDuplicate =
        bag?.url_hash?.some?.(m => /déjà été partagée|already been shared/i.test(m)) ||
        /déjà été partagée|already been shared/i.test(body?.message || '')

      if (isDuplicate) {
        const jumped = await redirectToExistingIfAny(url.value)
        if (!jumped) errors._ = body?.message || 'This URL was already shared.'
        return
      }

      errors._ = body?.message || 'Validation error.'
    } else {
      errors._ = body?.message || e?.message || 'Unexpected error.'
    }
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // Charger des tags actifs si dispo
  try {
    const { data } = await http.get('/tags', { params: { per_page: 50 } })
    const arr = data?.data || data
    if (Array.isArray(arr) && arr.length) popularTags.value = arr
  } catch { /* silencieux */ }
})
</script>
