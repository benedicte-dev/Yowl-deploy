import { useAuthStore } from '@/stores/auth.store'

export async function requireAuth(to, from, next) {
  const auth = useAuthStore()
  if (!auth.bootstrapped) await auth.bootstrap()
  if (!auth.user && (auth.token || true)) { // true => on tente cookie sanctum
    try { await auth.refreshUser() } catch {}
  }
  if (auth.isAuthenticated) return next()
  return next({ name: 'login', query: { redirect: to.fullPath } })
}

export async function requireVerified(to, from, next) {
  const auth = useAuthStore()
  if (!auth.bootstrapped) await auth.bootstrap()
  if (!auth.user && (auth.token || true)) {
    try { await auth.refreshUser() } catch {}
  }
  if (!auth.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  if (auth.isVerified) return next()
  return next({ name: 'verify.info' })
}

export function noAuth(to, from, next) {
  const auth = useAuthStore()
  if (auth.isAuthenticated) return next({ name: 'contents.list' })
  return next()
}
