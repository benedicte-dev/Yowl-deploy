const KEY = 'yowl_token'
export const saveToken = (t) => localStorage.setItem(KEY, t)
export const loadToken = () => localStorage.getItem(KEY)
export const clearToken = () => localStorage.removeItem(KEY)
