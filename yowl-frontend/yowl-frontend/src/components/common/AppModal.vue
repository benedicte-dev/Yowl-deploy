<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded w-1/2"><slot /></div>
  </div>
</template>
<script>
export default { name: 'AppModal' };
</script>
