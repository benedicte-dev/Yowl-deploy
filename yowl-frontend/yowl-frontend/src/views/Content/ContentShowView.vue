<!-- src/views/Content/ContentShowView.vue -->
<template>
  <div class="bg-slate-50 min-h-screen">
    <main class="max-w-4xl mx-auto px-6 py-8">
      <!-- Bouton Retour -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Retour</span>
        </button>
      </div>

      <!-- Chargement / erreur -->
      <div v-if="loading" class="animate-pulse">
        <div class="h-7 w-2/3 bg-slate-200 rounded mb-3"></div>
        <div class="h-4 w-1/3 bg-slate-200 rounded mb-6"></div>
        <div class="h-56 w-full bg-slate-100 rounded-xl"></div>
      </div>
      <div v-else-if="error" class="bg-rose-50 text-rose-700 border border-rose-200 rounded-xl px-4 py-3">
        {{ error }}
      </div>

      <!-- Contenu -->
      <article v-else class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <!-- Header -->
        <header class="px-6 pt-6">
          <div class="flex items-center gap-2 text-sm text-slate-500">
            <span class="inline-flex items-center gap-2">
              <span class="h-6 w-6 grid place-items-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                {{ (content.user?.name || content.user?.username || 'U')[0]?.toUpperCase() }}
              </span>
              <span class="text-slate-700 font-medium">{{ content.user?.name || content.user?.username || 'Unknown' }}</span>
            </span>
            <span class="text-slate-400">•</span>
            <a
              :href="`https://${content.domain || content.domain_model?.host}`"
              target="_blank" rel="noopener"
              class="hover:underline text-emerald-600"
            >
              {{ content.domain || content.domain_model?.host || 'website' }}
            </a>
            <span class="text-slate-400">•</span>
            <time class="text-slate-500">{{ formatDate(content.created_at) }}</time>
          </div>

          <h1 class="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 leading-tight">
            {{ content.title }}
          </h1>

          <div class="mt-3 flex flex-wrap gap-3">
            <a :href="content.url" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
              <span>Open original</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h8m0 0v8m0-8L7 17"/>
              </svg>
            </a>

            <button @click="share"
              class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              Share
            </button>

            <button
              @click="toggleLike" :disabled="!isAuthedVerified"
              class="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
              :class="liked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'"
              :title="isAuthedVerified ? 'Like' : 'Login & verify to like'">
              <span>♥</span>
              <span>{{ likesCount }}</span>
            </button>
          </div>
        </header>

        <!-- Media -->
        <div v-if="content.thumbnail_url" class="px-6 mt-6">
          <img :src="content.thumbnail_url" :alt="content.title" class="w-full rounded-xl object-cover">
        </div>

        <!-- Body -->
        <section class="px-6 py-6">
          <p v-if="content.description" class="text-slate-700 leading-relaxed">
            {{ content.description }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="t in (content.tags || [])" :key="`t-${t.id}`" class="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">#{{ t.name }}</span>
            <span v-for="c in (content.categories || [])" :key="`c-${c.id}`" class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{{ c.name }}</span>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-4 text-center">
            <div class="bg-slate-50 rounded-xl p-3">
              <div class="text-lg font-semibold text-slate-900">{{ viewsCount }}</div>
              <div class="text-xs text-slate-500">Views</div>
            </div>
            <div class="bg-slate-50 rounded-xl p-3">
              <div class="text-lg font-semibold text-slate-900">{{ likesCount }}</div>
              <div class="text-xs text-slate-500">Likes</div>
            </div>
            <div class="bg-slate-50 rounded-xl p-3">
              <div class="text-lg font-semibold text-slate-900">{{ commentsCount }}</div>
              <div class="text-xs text-slate-500">Comments</div>
            </div>
          </div>
        </section>

        <!-- Comments -->
        <section class="px-6 pb-8 border-t border-slate-100">
          <h2 class="pt-6 pb-4 font-semibold text-slate-900">Discussion</h2>

          <div v-if="replyTo" class="mb-3 text-xs text-slate-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <span>Replying to <strong class="text-emerald-700">{{ replyTo.author?.name || 'Unknown' }}</strong></span>
            <button class="ml-auto text-emerald-700 hover:underline" @click="cancelReply">Cancel</button>
          </div>

          <div v-if="isAuthedVerified" class="mb-6">
            <CommentForm :submitting="adding" :error="commentError" @submit="addComment" />
          </div>
          <div v-else class="mb-6 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            Please
            <router-link class="text-emerald-600 hover:underline" :to="{ name:'login', query:{ redirect:$route.fullPath } }">login</router-link>
            and verify your email to join the discussion.
          </div>

          <div v-if="commentsLoading" class="space-y-4">
            <div v-for="n in 3" :key="n" class="bg-slate-50 border border-slate-100 rounded-xl p-4 animate-pulse">
              <div class="h-4 w-1/3 bg-slate-200 rounded mb-2"></div>
              <div class="h-4 w-3/4 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div v-else-if="comments.length === 0" class="text-slate-500 text-sm">
            No comments yet. Be the first to share your thoughts.
          </div>
          <ul v-else class="space-y-4">
            <li v-for="c in comments" :key="c.id">
              <CommentItem
                :comment="c"
                @deleted="removeLocalComment(c.id)"
                @reply="openReply(c)"
                @report="reportComment(c)"
              />
            </li>
          </ul>
        </section>
      </article>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import contentApi from '@/services/content.service'
import commentApi from '@/services/comment.service'
import reactionApi from '@/services/reaction.service'

import CommentForm from '@/components/comments/CommentForm.vue'
import CommentItem from '@/components/comments/CommentItem.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const id = Number(route.params.id)
const loading = ref(true)
const error = ref('')
const content = ref({})

const likesCount = ref(0)
const viewsCount = ref(0)
const commentsCount = ref(0)
const liked = ref(false)

const comments = ref([])
const commentsLoading = ref(true)
const adding = ref(false)
const commentError = ref('')

const replyTo = ref(null)

const isAuthed = computed(() => auth?.isAuthenticated)
const isVerified = computed(() => !!auth?.user?.email_verified_at || auth?.user?.email_verified === true)
const isAuthedVerified = computed(() => isAuthed.value && isVerified.value)

onMounted(async () => {
  await load()
  try { await reactionApi.view?.(id) } catch {}
  await fetchComments()
})

function goBack() {
  router.push({ name: 'contents.list' })
}

async function load () {
  loading.value = true
  error.value = ''
  try {
    const res = await contentApi.getOne(id)
    content.value = res.data || res

    likesCount.value    = Number(content.value.likes_count ?? 0)
    viewsCount.value    = Number(content.value.views_count ?? 0)
    commentsCount.value = Number(content.value.comments_count ?? 0)
    liked.value = !!content.value.meta?.liked_by_me
  } catch (e) {
    error.value = e?.response?.data?.message || 'Unable to load content.'
  } finally {
    loading.value = false
  }
}

async function fetchComments () {
  commentsLoading.value = true
  try {
    const res = await commentApi.list(id)
    comments.value = res.data || res || []
  } catch {
    comments.value = []
  } finally {
    commentsLoading.value = false
  }
}

function openReply(c) {
  replyTo.value = c
  setTimeout(() => {
    const el = document.querySelector('form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 0)
}
function cancelReply() { replyTo.value = null }

// normalise la langue (même logique que le service)
function normalizeLang(raw) {
  if (!raw || typeof raw !== 'string') return null
  const m = /^([a-z]{2,3})(?:[-_]?([a-zA-Z]{2}))?$/.exec(raw.trim())
  if (!m) return null
  const lang = m[1].toLowerCase() + (m[2] ? '-' + m[2].toUpperCase() : '')
  return /^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(lang) ? lang : null
}

async function addComment (text) {
  const contentText = String(text || '').trim()
  if (!contentText) return
  adding.value = true
  commentError.value = ''

  // essaie user.locale puis navigator.language, sinon n’envoie rien
  const rawLang = (auth?.user?.locale || navigator.language || '')
  const lang = normalizeLang(rawLang) // peut retourner null

  try {
    const created = await commentApi.create(id, {
      content: contentText,
      parent_id: replyTo.value?.id || null,
      // sera ignoré par le service si null/invalide
      lang,
    })
    let newC = created?.data || created

    // hydrate l’auteur pour éviter "Unknown"
    if (!newC.author) {
      newC.author = {
        id: auth.user?.id,
        name: auth.user?.name || auth.user?.username || 'You',
        username: auth.user?.username || null,
        avatar_url: auth.user?.avatar_url || null,
      }
    }
    if (!newC.created_at) newC.created_at = new Date().toISOString()

    if (replyTo.value && Array.isArray(replyTo.value.replies)) {
      replyTo.value.replies.unshift(newC)
      replyTo.value = null
    } else {
      comments.value.unshift(newC)
    }

    commentsCount.value++
    window.dispatchEvent(new CustomEvent('content:comment-added', { detail: { id } }))
  } catch (e) {
    commentError.value =
      e?.response?.data?.errors?.content?.[0] ||
      e?.response?.data?.errors?.lang?.[0] ||
      e?.response?.data?.message ||
      'Unable to post comment.'
  } finally {
    adding.value = false
  }
}

function removeLocalComment (commentId) {
  const idx = comments.value.findIndex(c => c.id === commentId)
  if (idx >= 0) {
    comments.value.splice(idx, 1)
    commentsCount.value = Math.max(0, commentsCount.value - 1)
  }
}

async function reportComment (comment) {
  if (!comment?.id) return
  try {
    await commentApi.update(comment.id, { status: 'reported' })
    comment.status = 'reported'
  } catch {}
}

async function toggleLike () {
  if (!isAuthedVerified.value || !reactionApi) return
  try {
    if (liked.value) {
      await reactionApi.unlike?.(id)
      liked.value = false
      likesCount.value = Math.max(0, likesCount.value - 1)
    } else {
      await reactionApi.like?.(id)
      liked.value = true
      likesCount.value++
    }
    window.dispatchEvent(new CustomEvent('content:like-changed', { detail: { id, liked: liked.value } }))
  } catch {}
}

async function share () {
  const shareUrl = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title: content.value.title, url: shareUrl })
    } else {
      await navigator.clipboard.writeText(shareUrl)
    }
    window.dispatchEvent(new CustomEvent('content:share', { detail: { id } }))
  } catch {}
}

function formatDate (iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' })
  } catch { return '' }
}
</script>
