import http from './http'
export const createReport = (p) => http.post('/reports', p)
export const listReports = (params) => http.get('/reports', { params })
export const resolveReport = (id, p) => http.post(`/reports/${id}/resolve`, p)
