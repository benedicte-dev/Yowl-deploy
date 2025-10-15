<template>
  <div class="flex">
    <SideNav />
    <div class="flex-1 p-6"><slot /></div>
  </div>
</template>

<script>
import SideNav from '../components/nav/SideNav.vue';
export default { name: 'AdminLayout', components: { SideNav } };
</script>
