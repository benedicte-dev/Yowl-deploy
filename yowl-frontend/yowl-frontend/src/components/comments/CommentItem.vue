<!-- src/components/comments/CommentItem.vue -->
<template>
  <article class="bg-white border border-slate-200 rounded-xl p-4">
    <div class="flex items-start gap-3">
      <!-- Avatar / initiale -->
      <div class="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center font-semibold">
        {{ initials }}
      </div>

      <div class="flex-1 min-w-0">
        <!-- En-tête -->
        <header class="flex flex-wrap items-center gap-2 text-sm">
          <strong class="text-slate-900 truncate">{{ displayName }}</strong>
          <span class="text-slate-400">•</span>
          <time class="text-slate-500">{{ formattedDate }}</time>

          <!-- Compteurs (facultatif si présents) -->
          <span v-if="typeof comment.likes_count === 'number'" class="ml-2 text-slate-400">
            • {{ comment.likes_count }} like<span v-if="comment.likes_count !== 1">s</span>
          </span>
          <span v-if="typeof comment.dislikes_count === 'number'" class="text-slate-400">
            • {{ comment.dislikes_count }} dislike<span v-if="comment.dislikes_count !== 1">s</span>
          </span>
          <span v-if="typeof comment.reported_count === 'number'" class="text-slate-400">
            • {{ comment.reported_count }} report<span v-if="comment.reported_count !== 1">s</span>
          </span>
          <span v-if="comment.is_edited" class="text-slate-400">• edited</span>
        </header>

        <!-- Corps -->
        <p class="mt-1 text-slate-700 whitespace-pre-wrap break-words">
          {{ displayBody }}
        </p>

        <!-- Actions -->
        <div class="mt-2 flex items-center gap-4 text-xs text-slate-500">
          <button class="hover:text-slate-700" @click="$emit('reply', comment)">Reply</button>
          <button class="hover:text-slate-700" @click="$emit('report', comment)">Report</button>
          <button
            v-if="comment.can?.delete"
            class="hover:text-rose-600"
            @click="del"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Réponses imbriquées (si fournies) -->
    <div
      v-if="Array.isArray(comment.replies) && comment.replies.length"
      class="mt-3 space-y-3 border-l pl-3"
    >
      <CommentItem
        v-for="r in comment.replies"
        :key="r.id"
        :comment="r"
        @reply="$emit('reply', r)"
        @report="$emit('report', r)"
        @deleted="$emit('deleted', $event)"
      />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import commentApi from '@/services/comment.service'

const props = defineProps({
  // Accepte deux formes :
  //  - { author, content, created_at, ... }
  //  - { user, body, created_at, ... }
  comment: { type: Object, required: true },
})
const emit = defineEmits(['reply', 'report', 'deleted'])

/* ---------- Normalisations affichage ---------- */
const who = computed(() => props.comment.author || props.comment.user || {})
const displayName = computed(() => who.value.name || who.value.username || 'Unknown')
const initials = computed(() => (displayName.value?.[0] || 'U').toUpperCase())

const displayBody = computed(() =>
  props.comment.content ?? props.comment.body ?? '')

const formattedDate = computed(() => {
  const iso = props.comment.created_at || props.comment.updated_at
  try { return new Date(iso).toLocaleString() } catch { return '' }
})

/* ---------- Actions ---------- */
async function del () {
  try {
    await commentApi.remove(props.comment.id)
    emit('deleted', props.comment.id)
  } catch {
    // option: toast d’erreur
  }
}
</script>
