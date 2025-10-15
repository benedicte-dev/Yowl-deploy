<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="t in tags"
      :key="t"
      class="text-xs px-3 py-1 rounded-full border transition"
      :class="t === modelValue
        ? 'bg-emerald-600 text-white border-emerald-600'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'"
      @click="$emit('update:modelValue', t === modelValue ? '' : t)"
    >
      #{{ t }}
    </button>

    <button
      v-if="showClear && modelValue"
      class="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
      @click="$emit('update:modelValue', '')"
      title="Clear tag filter"
    >
      Clear
    </button>
  </div>
</template>

<script setup>
defineProps({
  tags: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' }, // tag actif
  showClear: { type: Boolean, default: true }
})
defineEmits(['update:modelValue'])
</script>
