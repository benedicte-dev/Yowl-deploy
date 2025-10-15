// src/services/content.service.js
import http from './http'

/** Détection automatique de la langue pour les commentaires */
function detectLang() {
  const l = document?.documentElement?.lang || navigator?.language || 'en'
  return l.split('-')[0]
}

export default {
  /* ----------------------------------------------------------------
   * 🔹 LIST (feed / homepage)
   * ---------------------------------------------------------------- */
  async list(params = {}) {
    const res = await http.get('/contents', { params })
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 SHOW / GET ONE (détail)
   * ---------------------------------------------------------------- */
  async getOne(id) {
    const res = await http.get(`/contents/${id}`)
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 CREATE (ajout d’un nouveau contenu)
   * ---------------------------------------------------------------- */
  async create(payload) {
    const res = await http.post('/contents', payload)
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 UPDATE (modification d’un contenu)
   * ---------------------------------------------------------------- */
  async update(id, payload) {
    const res = await http.put(`/contents/${id}`, payload)
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 DELETE (suppression d’un contenu)
   * ---------------------------------------------------------------- */
  async remove(id) {
    const res = await http.delete(`/contents/${id}`)
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 REACT (like / share / report)
   * ---------------------------------------------------------------- */
  async react(id, type) {
    // type ∈ ['like', 'share', 'report']
    const res = await http.post(`/contents/${id}/react`, { type })
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 COMMENT (ajouter un commentaire à un contenu)
   * ---------------------------------------------------------------- */
  async comment(contentId, payload) {
    let body
    if (typeof payload === 'string') {
      // si on envoie juste le texte
      body = { content: payload.trim(), lang: detectLang() }
    } else {
      // si on envoie un objet complet
      body = {
        content: String(payload?.content ?? '').trim(),
        parent_id: payload?.parent_id ?? undefined,
        lang: payload?.lang ?? detectLang(),
      }
    }

    if (!body.content) {
      const err = new Error('Le champ content est requis.')
      err.isValidation = true
      err.errors = { content: 'Le champ content est requis.' }
      throw err
    }

    const res = await http.post(`/contents/${contentId}/comments`, body)
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 PREVIEW (récupération des métadonnées d’un lien)
   * ---------------------------------------------------------------- */
  async preview(url) {
    const res = await http.post('/share/preview', { url })
    return res.data
  },

  /* ----------------------------------------------------------------
   * 🔹 LOOKUPS (tags, domaines, tendances)
   * ---------------------------------------------------------------- */
  async trendingTags() {
    const res = await http.get('/lookup/trending-tags')
    return res.data
  },

  async followedDomains() {
    const res = await http.get('/lookup/followed-domains')
    return res.data
  },

  async popularTags() {
    const res = await http.get('/lookup/tags/popular')
    return res.data
  },
}
