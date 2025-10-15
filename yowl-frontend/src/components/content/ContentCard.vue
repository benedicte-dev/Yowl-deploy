<!-- src/components/content/ContentCard.vue -->
<template>
  <article class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <!-- Header auteur -->
    <header class="flex items-center gap-3 px-6 py-4">
      <div class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 grid place-items-center text-white text-xs">
        {{ (authorName[0] || 'U')?.toUpperCase() }}
      </div>
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-700">
        <span class="font-medium text-slate-900 truncate max-w-[200px]">{{ authorName }}</span>
        <span class="text-slate-400">&bull;</span>
        <time class="text-slate-500">{{ formattedDate }}</time>
      </div>
    </header>

    <!-- Image -->
    <img
      v-if="thumbnail"
      :src="thumbnail"
      :alt="content.title || 'Preview image'"
      class="w-full h-56 md:h-64 object-cover cursor-pointer"
      @click="emit('open', safeContent)"
    />

    <!-- Body -->
    <div class="px-6 py-4">
      <button
        class="text-xs text-emerald-600 hover:underline"
        title="Filter by domain"
        @click="emit('domain', domainHost)"
      >
        {{ domainHost }}
      </button>

      <h3
        class="mt-1 font-semibold text-slate-900 leading-snug cursor-pointer hover:underline"
        @click="emit('open', safeContent)"
      >
        {{ content.title || '(no title)' }}
      </h3>

      <p v-if="description" class="mt-2 text-slate-600 text-sm">
        {{ description }}
      </p>
    </div>

    <!-- Tags -->
    <div class="px-6 pb-2 flex flex-wrap gap-2">
      <button
        v-for="tag in (content.tags || [])"
        :key="tag?.id ?? tag?.slug ?? tag?.name ?? String(tag)"
        class="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100"
        title="Filter by tag"
        @click="emit('tag', tag?.name ?? tag?.slug ?? String(tag))"
      >
        #{{ tag?.name ?? tag?.slug ?? String(tag) }}
      </button>
    </div>

    <!-- Actions / Counts -->
    <footer class="px-6 py-4 flex items-center justify-between border-t border-slate-100 text-slate-600">
      <div class="flex items-center gap-6 text-sm">
        <span class="flex items-center gap-1" :title="`${localCounts.comments} comments`">
          🗨️ {{ localCounts.comments }}
        </span>

        <button
          class="flex items-center gap-1 hover:text-emerald-600 disabled:opacity-50"
          :aria-pressed="liked ? 'true' : 'false'"
          :title="liked ? 'Unlike' : 'Like'"
          @click="toggleLike"
          :disabled="pending || !content.id"
        >
          <span>{{ liked ? '💚' : '🤍' }}</span>
          <span>{{ localCounts.likes }}</span>
        </button>

        <button
          class="flex items-center gap-1 hover:text-emerald-600"
          title="Share"
          @click="share"
        >
          🔗 {{ localCounts.shares }}
        </button>

        <span class="flex items-center gap-1" :title="`${localCounts.views} views`">
          👁️ {{ localCounts.views }}
        </span>
      </div>

      <a
        class="text-sm text-emerald-600 hover:underline"
        :href="content.url"
        target="_blank"
        rel="noopener"
        title="Open original link"
        @click="emitView()"
      >
        Open link →
      </a>
    </footer>
  </article>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useUIStore } from '@/stores/ui.store'
import reaction from '@/services/reaction.service'

/* ----------------------------------------------------------------
 * Props / Emits
 * ---------------------------------------------------------------- */
const props = defineProps({
  content: { type: Object, required: true }
})
const emit = defineEmits(['tag', 'domain', 'open', 'like-changed', 'share', 'view', 'comment-added'])

/* ----------------------------------------------------------------
 * UI / State local
 * ---------------------------------------------------------------- */
const ui = useUIStore()
const safeContent = computed(() => props.content || {})

const liked = ref(Boolean(
  props.content?.meta?.liked_by_me ?? props.content?.liked ?? false
))
const pending = ref(false)

/* Compteurs locaux avec fallback depuis ContentResource :
   - likes_count, comments_count, views_count (directs)
   - shares_count (pas toujours présent => fallback meta.shares_count || 0)
*/
const localCounts = reactive({
  likes:    Number(props.content?.likes_count    ?? props.content?.counts?.likes    ?? 0),
  comments: Number(props.content?.comments_count ?? props.content?.counts?.comments ?? 0),
  views:    Number(props.content?.views_count    ?? props.content?.counts?.views    ?? 0),
  shares:   Number(
    props.content?.shares_count ??
    props.content?.counts?.shares ??
    props.content?.meta?.shares_count ??
    0
  ),
})

/* ----------------------------------------------------------------
 * Dérivés d'affichage
 * ---------------------------------------------------------------- */
const authorName = computed(() =>
  props.content?.user?.name ||
  props.content?.author_name ||
  'Unknown'
)

const domainHost = computed(() =>
  props.content?.domain ||
  props.content?.domain_model?.host ||
  'website'
)

const formattedDate = computed(() => {
  try {
    const d = new Date(props.content?.created_at || Date.now())
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return '' }
})

const thumbnail = computed(() =>
  props.content?.thumbnail_url ||
  props.content?.image_url ||
  null
)

const description = computed(() =>
  props.content?.description ||
  props.content?.excerpt ||
  ''
)

/* ----------------------------------------------------------------
 * Réactivité quand la prop change (refresh feed)
 * ---------------------------------------------------------------- */
watch(() => props.content, (c) => {
  liked.value = Boolean(c?.meta?.liked_by_me ?? c?.liked ?? false)
  localCounts.likes    = Number(c?.likes_count    ?? c?.counts?.likes    ?? localCounts.likes)
  localCounts.comments = Number(c?.comments_count ?? c?.counts?.comments ?? localCounts.comments)
  localCounts.views    = Number(c?.views_count    ?? c?.counts?.views    ?? localCounts.views)
  localCounts.shares   = Number(c?.shares_count   ?? c?.counts?.shares   ?? c?.meta?.shares_count ?? localCounts.shares)
}, { deep: true })

/* ----------------------------------------------------------------
 * Actions
 * ---------------------------------------------------------------- */
async function toggleLike () {
  if (pending.value || !props.content?.id) return
  pending.value = true

  const previousLiked = liked.value
  const previousLikes = localCounts.likes

  try {
    // Optimistic UI
    liked.value = !previousLiked
    localCounts.likes = Math.max(0, previousLikes + (liked.value ? 1 : -1))

    if (liked.value) {
      await reaction.like(props.content.id)
    } else {
      await reaction.unlike(props.content.id)
    }

    // Notifie parent + bus global (optionnel)
    emit('like-changed', { id: props.content.id, liked: liked.value, likes: localCounts.likes })
    window.dispatchEvent(new CustomEvent('content:like-changed', { detail: { id: props.content.id, liked: liked.value } }))
  } catch (e) {
    // Rollback UI
    liked.value = previousLiked
    localCounts.likes = previousLikes
    ui.toast?.('Action failed. Please try again.', 'error')
  } finally {
    pending.value = false
  }
}

async function share () {
  try {
    // Web Share API si dispo
    if (navigator.share && props.content?.url) {
      await navigator.share({ title: props.content?.title || 'Link', url: props.content.url })
    } else if (props.content?.url) {
      await navigator.clipboard.writeText(props.content.url)
      ui.toast?.('Link copied!', 'success')
    }

    // Best effort côté API
    try { await reaction.share?.(props.content.id) } catch {}

    // Réactivité locale + évènements
    localCounts.shares += 1
    emit('share', { id: props.content.id })
    window.dispatchEvent(new CustomEvent('content:share', { detail: { id: props.content.id } }))
  } catch {/* ignore */}
}

function emitView () {
  // UI instantanée
  localCounts.views += 1
  emit('view', { id: props.content.id })
  window.dispatchEvent(new CustomEvent('content:view', { detail: { id: props.content.id } }))
  // Best effort API (si tu as reaction.view)
  try { reaction.view?.(props.content.id) } catch {}
}
</script>
