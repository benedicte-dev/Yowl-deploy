import http from './http'
export const listActions = (params) => http.get('/moderation/actions', { params })
export const takeAction = (p) => http.post('/moderation/actions', p)
