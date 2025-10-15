import http from './http'

export default {
  // TAGS
  async getPopularTags() {
    // GET /lookup/tags/popular  -> [{ name, count }]
    const res = await http.get('/lookup/tags/popular')
    return res.data
  },

  async getTrendingTags() {
    // GET /lookup/trending-tags -> [{ name, count }]
    const res = await http.get('/lookup/trending-tags')
    return res.data
  },

  async searchTags(q) {
    // GET /lookup/tags?q=ai     -> [{ name, count }]
    const res = await http.get('/lookup/tags', { params: { q } })
    return res.data
  },

  //  DOMAINS
  async getFollowedDomains() {
    // GET /lookup/followed-domains -> [{ name, count }]
    const res = await http.get('/lookup/followed-domains')
    return res.data
  },

  async searchDomains(q) {
    // GET /lookup/domains?q=git -> [{ name, count }]
    const res = await http.get('/lookup/domains', { params: { q } })
    return res.data
  },

  //  CATEGORIES
  async getCategories() {
    // GET /lookup/categories -> [{ id, name, slug }]
    const res = await http.get('/lookup/categories')
    return res.data
  },
}
