import http from './http'
export const share = (contentId, p) => http.post(`/contents/${contentId}/shares`, p)
export const listShares = (contentId) => http.get(`/contents/${contentId}/shares`)
