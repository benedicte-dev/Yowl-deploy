export const required = (v) => !!v || 'Requis.'
export const email = (v) => /\S+@\S+\.\S+/.test(v) || 'Email invalide.'
export const minLength = (n) => (v) => (v && v.length >= n) || `Minimum ${n} caractères.`
