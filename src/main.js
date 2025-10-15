// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './app.css'
import { useAuthStore } from '@/stores/auth.store'

// Création de l’application Vue
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// ⚙️ Hydrater la session AVANT de lancer le router
// On encapsule dans une IIFE async pour attendre correctement bootstrap()
;(async () => {
  const auth = useAuthStore()
  try {
    await auth.bootstrap() // Charge le user s’il existe déjà un token
  } catch (e) {
    console.warn('Erreur au bootstrap auth:', e)
  }

  // Démarrage du router après l’hydratation
  app.use(router)
  app.mount('#app')
})()
