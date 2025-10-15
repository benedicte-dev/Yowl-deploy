import axios from 'axios'

// =====================================
// CONFIG DE BASE
// =====================================
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
})

// =====================================
// INJECTION AUTOMATIQUE DU TOKEN
// =====================================
http.interceptors.request.use((config) => {
  try {
    // Vérifie d’abord si tu utilises le store complet (auth JSON) ou juste token string
    const savedAuth = localStorage.getItem('auth')
    let token = null

    if (savedAuth) {
      const parsed = JSON.parse(savedAuth)
      token = parsed?.token || null
    } else {
      token = localStorage.getItem('token')
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    console.warn('Erreur lecture token localStorage', e)
  }

  return config
})

// =====================================
// INTERCEPTEUR DE RÉPONSE GLOBALE
// =====================================
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const { response } = err || {}

    // --- Gestion des erreurs d’authentification ---
    if (response && [401, 419].includes(response.status)) {
      console.warn('Session expirée ou non autorisée.')

      // Nettoie localStorage et supprime l’en-tête global
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
      delete http.defaults.headers.common.Authorization

      // Si tu veux rediriger automatiquement vers login :
      // window.location.href = '/login'
      // ou notifier globalement :
      // window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    // --- Gestion des erreurs de validation (422) ---
    if (response && response.status === 422) {
      console.warn('Erreur de validation:', response.data?.errors || response.data)
    }

    // --- Gestion des autres erreurs API ---
    if (response && response.status >= 500) {
      console.error('Erreur serveur API', response)
    }

    return Promise.reject(err)
  }
)

// =====================================
// EXPORT
// =====================================
export default http
