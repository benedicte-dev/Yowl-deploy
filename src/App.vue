<!-- src/App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const authRoutes = new Set(['login','register','forgot','reset','verify.info','verify.callback'])
</script>

<template>
  <component :is="authRoutes.has(route.name) ? AuthLayout : 'div'">
    <router-view />
  </component>
  
</template>
