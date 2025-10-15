<!-- src/components/comments/CommentForm.vue -->
<template>
  <form @submit.prevent="submit" class="bg-slate-50 border border-slate-200 rounded-xl p-4">
    <label for="comment-textarea" class="sr-only">Add your comment</label>
    <textarea
      id="comment-textarea"
      v-model="body"
      :maxlength="MAX"
      :disabled="submitting"
      class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
      rows="3"
      placeholder="Add your comment…"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? 'comment-error' : undefined"
      @keydown.enter.exact.prevent="maybeSubmitOnEnter"
      @keydown.meta.enter.prevent="submit"
      @keydown.ctrl.enter.prevent="submit"
    />

    <!-- Error -->
    <p
      v-if="error"
      id="comment-error"
      class="mt-2 text-sm text-rose-600"
    >
      {{ error }}
    </p>

    <div class="mt-3 flex items-center justify-between">
      <span class="text-xs"
            :class="remaining < 0 ? 'text-rose-600' : 'text-slate-500'">
        {{ body.length }}/{{ MAX }}
      </span>

      <button
        type="submit"
        :disabled="isDisabled"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition border"
        :class="isDisabled
          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
          : 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600'"
      >
        <svg v-if="submitting" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        <span>Comment</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  submitting: { type: Boolean, default: false },
  error: { type: String, default: '' },
  autoFocus: { type: Boolean, default: false },
})

const emit = defineEmits(['submit'])

const MAX = 1000
const body = ref('')

const remaining = computed(() => MAX - body.value.length)
const isDisabled = computed(() =>
  props.submitting || body.value.trim().length === 0 || remaining.value < 0
)

// Optionnel : focus auto
watch(
  () => props.autoFocus,
  (v) => {
    if (v) {
      requestAnimationFrame(() => {
        const el = document.getElementById('comment-textarea')
        el?.focus?.()
      })
    }
  },
  { immediate: true }
)

// Envoi via Enter (seulement si pas Shift pour garder le saut de ligne)
function maybeSubmitOnEnter(e) {
  if (e.shiftKey) return // autorise le retour à la ligne
  submit()
}

function submit() {
  const text = body.value.trim()
  if (!text || isDisabled.value) return
  emit('submit', text)
  // On vide immédiatement le champ pour une sensation de rapidité;
  // si tu préfères, tu peux le faire côté parent après succès.
  body.value = ''
}
</script>
