// src/stores/content.store.js
import { defineStore } from 'pinia'
import contentApi from '@/services/content.service'

export const useContentStore = defineStore('content', {
  state: () => ({
    items: [],          // liste des contenus (feed)
    current: null,      // contenu affiché sur ContentShowView
    page: 1,
    perPage: 10,
    total: 0,
    hasMore: true,
    loading: false,
    filters: {
      q: '',
      tag: '',
      domain: '',
      category: '',
      sort: 'recent',
      followed_only: false,
    },
  }),

  getters: {
    isEmpty: (s) => !s.items?.length,
  },

  actions: {
    // ============================================================
    // FETCH LIST (Home / Feed)
    // ============================================================
    async fetchList(params = {}) {
      this.loading = true
      try {
        const query = {
          page: 1,
          per_page: this.perPage,
          ...this.filters,
          ...params,
        }

        const { data, meta } = await contentApi.list(query)
        this.items = Array.isArray(data) ? data : []
        this.page = meta?.current_page ?? meta?.page ?? 1
        this.total = meta?.total ?? this.items.length
        this.hasMore = !!meta?.has_more || (this.page * this.perPage < this.total)

        // Sauvegarde locale (persistance basique)
        localStorage.setItem('contents', JSON.stringify(this.items))
      } catch (e) {
        console.error('Erreur lors du fetch des contenus:', e)
      } finally {
        this.loading = false
      }
    },

    // ============================================================
    // LOAD MORE (Pagination)
    // ============================================================
    async loadMore() {
      if (!this.hasMore || this.loading) return
      this.loading = true
      try {
        const { data, meta } = await contentApi.list({
          ...this.filters,
          page: this.page + 1,
          per_page: this.perPage,
        })

        this.items.push(...(Array.isArray(data) ? data : []))
        this.page = meta?.current_page ?? this.page + 1
        this.total = meta?.total ?? this.total
        this.hasMore = !!meta?.has_more || (this.page * this.perPage < this.total)

        // Mise à jour stockage local
        localStorage.setItem('contents', JSON.stringify(this.items))
      } catch (e) {
        console.error('Erreur loadMore:', e)
      } finally {
        this.loading = false
      }
    },

    // ============================================================
    // FETCH ONE (Détail / ContentShowView)
    // ============================================================
    async fetchOne(id) {
      this.loading = true
      try {
        const res = await contentApi.getOne(id)
        this.current = res?.data || res || null

        // Sauvegarde du dernier contenu consulté
        localStorage.setItem('current_content', JSON.stringify(this.current))
        return this.current
      } catch (e) {
        console.error('Erreur lors du fetch du contenu:', e)
        this.current = null
        throw e
      } finally {
        this.loading = false
      }
    },

    // ============================================================
    // CREATE (Add URL / ContentCreateView)
    // ============================================================
    async create(payload) {
      this.loading = true
      try {
        const res = await contentApi.create(payload)
        const newItem = res?.data || res

        // Ajoute en tête du feed s'il est déjà chargé
        if (Array.isArray(this.items)) {
          this.items.unshift(newItem)
        }

        // Persistance locale
        localStorage.setItem('contents', JSON.stringify(this.items))
        return newItem
      } catch (e) {
        console.error('Erreur création contenu:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    // ============================================================
    // REACT (like, share, report)
    // ============================================================
    async react(id, type) {
      try {
        const res = await contentApi.react(id, type)
        return res
      } catch (e) {
        console.error(`Erreur reaction ${type}:`, e)
        throw e
      }
    },

    // ============================================================
    // COMMENT (ajouter un commentaire)
    // ============================================================
    async comment(contentId, payload) {
      try {
        const created = await contentApi.comment(contentId, payload)

        // Injection directe dans current si présent
        if (this.current && this.current.id === contentId) {
          this.current.comments = [created, ...(this.current.comments || [])]

          // Met à jour le compteur de commentaires
          if (this.current.comments_count != null) {
            this.current.comments_count++
          } else if (this.current.counts) {
            this.current.counts.comments = (this.current.counts.comments || 0) + 1
          }
        }

        // Mise à jour persistante
        localStorage.setItem('current_content', JSON.stringify(this.current))
        return created
      } catch (e) {
        const bag = e?.response?.data?.errors || e?.errors
        if (bag?.content) console.warn('Validation commentaire:', bag.content)
        console.error('Erreur ajout commentaire:', e)
        throw e
      }
    },

    // ============================================================
    // RESTORE STATE (depuis localStorage après reload)
    // ============================================================
    restoreFromLocal() {
      try {
        const saved = localStorage.getItem('contents')
        if (saved) this.items = JSON.parse(saved)

        const current = localStorage.getItem('current_content')
        if (current) this.current = JSON.parse(current)
      } catch (e) {
        console.warn('Impossible de restaurer les contenus locaux', e)
      }
    },

    // ============================================================
    // RESET STORE
    // ============================================================
    clear() {
      this.items = []
      this.current = null
      this.page = 1
      this.total = 0
      this.hasMore = true
      localStorage.removeItem('contents')
      localStorage.removeItem('current_content')
    },
  },
})
