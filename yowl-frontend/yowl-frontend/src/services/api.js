// src/services/api.js
// Centralise les routes API pour le frontend
const base = '/contents'

export default {
  // Comments
  commentsForContent(contentId) {
    return `${base}/${contentId}/comments`
  },
  commentById(commentId) {
    return `/comments/${commentId}`
  },

  // Reactions on content
  reactionsForContent(contentId) {
    return `${base}/${contentId}/reactions`
  },

  // Views and shares
  viewsForContent(contentId) {
    return `${base}/${contentId}/views`
  },
  sharesForContent(contentId) {
    return `${base}/${contentId}/shares`
  }
}
