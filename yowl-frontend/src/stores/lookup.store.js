import { defineStore } from 'pinia'
import lookupApi from '@/services/lookup.service'

const TTL_MS = 5 * 60 * 1000 // 5 minutes

export const useLookupStore = defineStore('lookup', {
  state: () => ({
    // Data
    popularTags: [],        // [{ name, count }]
    trendingTags: [],       // [{ name, count }]
    followedDomains: [],    // [{ name, count }]
    categories: [],         // [{ id, name, slug }]

    // Search / suggestions
    tagSuggestions: [],     // [{ name, count }]
    domainSuggestions: [],  // [{ name, count }]

    // Loading flags
    loading: {
      popularTags: false,
      trendingTags: false,
      followedDomains: false,
      categories: false,
      tagSuggest: false,
      domainSuggest: false,
    },

    // Error messages (facultatif)
    error: {
      popularTags: null,
      trendingTags: null,
      followedDomains: null,
      categories: null,
      tagSuggest: null,
      domainSuggest: null,
    },

    // Caching
    _ts: {
      popularTags: 0,
      trendingTags: 0,
      followedDomains: 0,
      categories: 0,
    },
  }),

  getters: {
    tagNames: (s) => s.popularTags.map(t => t.name),
    trendingTagNames: (s) => s.trendingTags.map(t => t.name),
    domainNames: (s) => s.followedDomains.map(d => d.name),
    categoryOptions: (s) => s.categories.map(c => ({ label: c.name, value: c.slug || c.id })),
    isStale: (s) => (key) => (Date.now() - (s._ts[key] || 0)) > TTL_MS,
  },

  actions: {
    // POPULAR TAG
    async loadPopularTags({ force = false } = {}) {
      if (!force && this.popularTags.length && !this.isStale('popularTags')) return this.popularTags
      this.loading.popularTags = true
      this.error.popularTags = null
      try {
        const res = await lookupApi.getPopularTags()
        this.popularTags = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        this._ts.popularTags = Date.now()
        return this.popularTags
      } catch (e) {
        this.error.popularTags = e?.response?.data?.message || 'Unable to load popular tags'
        throw e
      } finally {
        this.loading.popularTags = false
      }
    },

    // TRENDING TAGS
    async loadTrendingTags({ force = false } = {}) {
      if (!force && this.trendingTags.length && !this.isStale('trendingTags')) return this.trendingTags
      this.loading.trendingTags = true
      this.error.trendingTags = null
      try {
        const res = await lookupApi.getTrendingTags()
        this.trendingTags = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        this._ts.trendingTags = Date.now()
        return this.trendingTags
      } catch (e) {
        this.error.trendingTags = e?.response?.data?.message || 'Unable to load trending tags'
        throw e
      } finally {
        this.loading.trendingTags = false
      }
    },

    // FOLLOWED DOMAINS
    async loadFollowedDomains({ force = false } = {}) {
      if (!force && this.followedDomains.length && !this.isStale('followedDomains')) return this.followedDomains
      this.loading.followedDomains = true
      this.error.followedDomains = null
      try {
        const res = await lookupApi.getFollowedDomains()
        this.followedDomains = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        this._ts.followedDomains = Date.now()
        return this.followedDomains
      } catch (e) {
        this.error.followedDomains = e?.response?.data?.message || 'Unable to load followed domains'
        throw e
      } finally {
        this.loading.followedDomains = false
      }
    },

    // CATEGORIE
    async loadCategories({ force = false } = {}) {
      if (!force && this.categories.length && !this.isStale('categories')) return this.categories
      this.loading.categories = true
      this.error.categories = null
      try {
        const res = await lookupApi.getCategories()
        this.categories = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        this._ts.categories = Date.now()
        return this.categories
      } catch (e) {
        this.error.categories = e?.response?.data?.message || 'Unable to load categories'
        throw e
      } finally {
        this.loading.categories = false
      }
    },

    //UGGEST TAG
    async suggestTags(q) {
      const query = String(q || '').trim()
      if (!query) {
        this.tagSuggestions = []
        return []
      }
      this.loading.tagSuggest = true
      this.error.tagSuggest = null
      try {
        const res = await lookupApi.searchTags(query)
        this.tagSuggestions = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        return this.tagSuggestions
      } catch (e) {
        this.error.tagSuggest = e?.response?.data?.message || 'Unable to load tag suggestions'
        throw e
      } finally {
        this.loading.tagSuggest = false
      }
    },

    // SUGGEST DOMAINS
    async suggestDomains(q) {
      const query = String(q || '').trim()
      if (!query) {
        this.domainSuggestions = []
        return []
      }
      this.loading.domainSuggest = true
      this.error.domainSuggest = null
      try {
        const res = await lookupApi.searchDomains(query)
        this.domainSuggestions = Array.isArray(res?.data) ? res.data : (res?.data || res || [])
        return this.domainSuggestions
      } catch (e) {
        this.error.domainSuggest = e?.response?.data?.message || 'Unable to load domain suggestions'
        throw e
      } finally {
        this.loading.domainSuggest = false
      }
    },
  },
})
