<template>
  <div class="grid gap-6 sm:gap-8"
       :class="colsClass">
    <ContentCard
      v-for="item in items"
      :key="item.id"
      :content="item"
      @tag="$emit('tag', $event)"
      @domain="$emit('domain', $event)"
      @open="$emit('open', $event)"
      @like-changed="$emit('like-changed', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ContentCard from '@/components/content/ContentCard.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  columns: {
    type: [Number, String],
    default: 'auto' // 'auto' | 1 | 2 | 3
  }
})

const colsClass = computed(() => {
  if (props.columns === 1) return 'grid-cols-1'
  if (props.columns === 2) return 'grid-cols-1 md:grid-cols-2'
  if (props.columns === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  // auto: 1 -> 2 -> 3 selon la largeur
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
})
</script>
