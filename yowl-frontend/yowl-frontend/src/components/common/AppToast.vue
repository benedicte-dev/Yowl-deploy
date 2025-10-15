<template>
  <!-- Container -->
  <div class="fixed top-6 right-6 z-50 flex flex-col gap-3 w-[320px]">
    <TransitionGroup name="fade" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="rounded-xl shadow-lg px-4 py-3 text-white flex items-start justify-between"
        :class="typeClass(toast.type)"
      >
        <div class="flex-1 pr-3">
          <p class="font-medium text-sm leading-snug">
            {{ toast.message }}
          </p>
        </div>
        <button
          class="text-white/70 hover:text-white text-lg leading-none"
          @click="remove(toast.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/store/ui.store'

const ui = useUIStore()
const toasts = computed(() => ui.toasts)

function remove(id) {
  ui.toasts = ui.toasts.filter(t => t.id !== id)
}

function typeClass(type) {
  switch (type) {
    case 'success':
      return 'bg-emerald-600'
    case 'error':
      return 'bg-rose-600'
    case 'warning':
      return 'bg-amber-500'
    default:
      return 'bg-slate-800'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
