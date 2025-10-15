// src/services/comment.service.js
import http from './http'
import api from './api'

/**
 * Normalise la structure renvoyée par l’API pour retourner un tableau
 * quelle que soit la profondeur de "data"
 */
function extractArray(payload) {
  // Cas 1 : tableau brut
  if (Array.isArray(payload)) return payload
  // Cas 2 : { data: [...] }
  if (Array.isArray(payload?.data)) return payload.data
  // Cas 3 : { data: { data: [...] } }
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  // Cas 4 : fallback (aucune donnée exploitable)
  return []
}

export default {
  /**
   * Liste les commentaires d’un contenu
   * Endpoint attendu : GET /v1/contents/{id}/comments
   */
  async list(contentId) {
    const res = await http.get(api.commentsForContent(contentId))
    return extractArray(res?.data) // retourne toujours un tableau propre
  },

  /**
   * Crée un nouveau commentaire
   * Endpoint attendu : POST /v1/contents/{id}/comments
   */
  async create(contentId, payload) {
    const res = await http.post(api.commentsForContent(contentId), payload)
    // certains backends encapsulent les données dans plusieurs niveaux
    return res?.data?.data || res?.data || res
  },

  /**
   * Met à jour un commentaire existant
   * Endpoint attendu : PUT /v1/comments/{id}
   */
  async update(commentId, payload) {
    const res = await http.put(api.commentById(commentId), payload)
    return res?.data?.data || res?.data || res
  },

  /**
   * Supprime un commentaire
   * Endpoint attendu : DELETE /v1/comments/{id}
   */
  async remove(commentId) {
    const res = await http.delete(api.commentById(commentId))
    return res?.data?.data || res?.data || res
  }
}
