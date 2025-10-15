// src/services/reaction.service.js
import http from './http'

export default {
  // Ajouter un "like" sur un contenu
  async like(contentId) {
    const res = await http.post(`/contents/${contentId}/reactions`, { type: 'like' })
    return res.data
  },

  // Retirer le "like"
  async unlike(contentId) {
    const res = await http.delete(`/contents/${contentId}/reactions`)
    return res.data
  },

  // Enregistrer une "vue"
  async view(contentId) {
    const res = await http.post(`/contents/${contentId}/views`)
    return res.data
  },

  // Enregistrer un "partage"
  async share(contentId) {
    const res = await http.post(`/contents/${contentId}/shares`)
    return res.data
  }
}
