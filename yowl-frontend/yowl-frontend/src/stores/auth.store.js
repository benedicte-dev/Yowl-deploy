// src/stores/auth.store.js
import { defineStore } from 'pinia'
import http from '@/services/http'

// --------------------------------------
// Utilitaire pour extraire le token de la réponse API
// --------------------------------------
function extractToken(res) {
  const d = res?.data ?? {}
  const h = res?.headers ?? {}
  return (
    d.meta?.token ||           // format Laravel custom
    d.token ||                 // format simple
    d.access_token ||          // format OAuth
    d?.data?.token ||          // token imbriqué dans data
    (h.authorization && h.authorization.replace(/Bearer\s+/i, '')) ||
    null
  )
}

// --------------------------------------
// STORE PRINCIPAL
// --------------------------------------
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    bootstrapped: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (s) => !!s.token || !!s.user,
    isVerified: (s) => !!(s.user?.email_verified || s.user?.email_verified_at),
  },

  actions: {
    // ----------------------------
    // MÉTHODES INTERNES
    // ----------------------------
    _setToken(t) {
      this.token = t || null
      if (t) {
        localStorage.setItem('token', t)
        http.defaults.headers.common.Authorization = `Bearer ${t}`
      } else {
        localStorage.removeItem('token')
        delete http.defaults.headers.common.Authorization
      }
    },

    _setUser(u) {
      this.user = u || null
    },

    _clear() {
      this._setToken(null)
      this._setUser(null)
    },

    // ----------------------------
    // BOOTSTRAP AUTOMATIQUE AU DÉMARRAGE
    // ----------------------------
    async bootstrap() {
      if (this.bootstrapped) return
      this.bootstrapped = true

      // Si on a déjà un token sauvegardé
      if (this.token) {
        try {
          http.defaults.headers.common.Authorization = `Bearer ${this.token}`
          const res = await http.get('/me')
          this._setUser(res?.data?.data || res?.data || null)
        } catch {
          this._clear()
        }
        return
      }

      // Si aucun token : on teste quand même (cookie Sanctum ou session)
      try {
        const res = await http.get('/me')
        this._setUser(res?.data?.data || res?.data || null)
      } catch {
        /* ignore */
      }
    },

    // ----------------------------
    // REFRESH DES DONNÉES UTILISATEUR
    // ----------------------------
    async refreshUser() {
      const res = await http.get('/me')
      const user = res?.data?.data || res?.data || null
      this._setUser(user)
      return user
    },

    // ----------------------------
    // LOGIN
    // ----------------------------
    async login({ email, password, remember = false }) {
      this.loading = true
      this.error = null
      try {
        const res = await http.post('/login', { email, password, remember })

        // 1️⃣ Sauver le token
        const token = extractToken(res)
        if (token) this._setToken(token)

        // 2️⃣ Hydrater user immédiatement
        const immediateUser = res?.data?.data
        if (immediateUser) this._setUser(immediateUser)

        // 3️⃣ Reconfirmer via /me
        try {
          await this.refreshUser()
        } catch {
          /* fallback */
        }

        return true
      } catch (e) {
        this._clear()
        this.error = e?.response?.data?.message || 'Erreur de connexion'
        throw e
      } finally {
        this.loading = false
      }
    },

    // ----------------------------
    // INSCRIPTION
    // ----------------------------
    async register(payload) {
      this.loading = true
      this.error = null
      try {
        const res = await http.post('/register', payload)
        const token = extractToken(res)
        if (token) this._setToken(token)
        const immediateUser = res?.data?.data
        if (immediateUser) this._setUser(immediateUser)
        try {
          await this.refreshUser()
        } catch {}
        return res?.data
      } catch (e) {
        this.error = e?.response?.data?.message || 'Erreur lors de l’inscription'
        throw e
      } finally {
        this.loading = false
      }
    },

    // ----------------------------
    // LOGOUT
    // ----------------------------
    async logout() {
      try {
        await http.post('/logout')
      } catch {
        /* ignore */
      }
      this._clear()
    },

    // ----------------------------
    // RÉENVOI DE L’EMAIL DE VÉRIFICATION
    // ----------------------------
    async resendVerification() {
      await http.post('/email/verification-notification')
    },
  },
})
