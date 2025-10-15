<template>
  <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="$emit('click')"><slot /></button>
</template>
<script>
export default { name: 'AppButton' };
</script>
