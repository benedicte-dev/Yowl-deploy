import http from './http'
export const profile = (id) => http.get(`/users/${id}`)
export const updateProfile = (id, p) => http.put(`/users/${id}`, p)
export const uploadAvatar = (form) => http.post('/users/avatar', form)
export const listUsers = (params) => http.get('/users', { params })
