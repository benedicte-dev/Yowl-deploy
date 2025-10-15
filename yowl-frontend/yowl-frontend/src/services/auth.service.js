import http from './http'
export const register = (p) => http.post('/register', p)
export const login    = (p) => http.post('/login', p)
export const me       = ()  => http.get('/me')
export const logout   = ()  => http.post('/logout')
export const logoutAll= ()  => http.post('/logout-all')

export const sendVerifyEmail = () => http.post('/email/verification-notification')
export const forgotPassword  = (p) => http.post('/forgot-password', p)
export const resetPassword   = (p) => http.post('/reset-password', p)
export const verifyCallback  = (id, hash, params) => http.get(`/verify-email/${id}/${hash}`, { params })
