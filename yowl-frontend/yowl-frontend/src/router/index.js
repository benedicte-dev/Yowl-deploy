// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, requireVerified, noAuth } from './guards'

// Lazy imports (avec alias @)
// Home
const HomeView            = () => import('@/views/HomeView.vue')

// Auth
const LoginView           = () => import('@/views/Auth/LoginView.vue')
const RegisterView        = () => import('@/views/Auth/RegisterView.vue')
const VerifyInfoView      = () => import('@/views/Auth/VerifyInfoView.vue')
const VerifyCallbackView  = () => import('@/views/Auth/VerifyCallbackView.vue')
const ForgotPasswordView  = () => import('@/views/Auth/ForgotPasswordView.vue')
const ResetPasswordView   = () => import('@/views/Auth/ResetPasswordView.vue')

// Content
const ContentCreateView   = () => import('@/views/Content/ContentCreateView.vue')
const ContentListView     = () => import('@/views/Content/ContentListView.vue')
const ContentShowView     = () => import('@/views/Content/ContentShowView.vue')

// Profile
const DashboardView       = () => import('@/views/Profile/DashboardView.vue')

// Misc
const NotFound            = () => import('@/views/NotFound.vue')

const routes = [
  // Public
  { path: '/', name: 'home', component: HomeView },

  // Auth
  { path: '/login',           name: 'login',    component: LoginView,          beforeEnter: noAuth },
  { path: '/register',        name: 'register', component: RegisterView,       beforeEnter: noAuth },
  { path: '/forgot-password', name: 'forgot',   component: ForgotPasswordView, beforeEnter: noAuth },
  { path: '/reset-password',  name: 'reset',    component: ResetPasswordView,  beforeEnter: noAuth },

  // Email verification flow
  // 1) Page d’info après inscription ("vérifiez votre email")
  { path: '/verify-info', name: 'verify.info', component: VerifyInfoView, beforeEnter: requireAuth },

  // 2a) Format FRONTEND (redirection depuis backend) : /email-confirmation?verified=1
  { path: '/email-confirmation', name: 'verify.callback', component: VerifyCallbackView },

  // 2b) Format LARAVEL signé : /email/verify/:id/:hash?expires=&signature=
  //    On réutilise le même composant.
  { path: '/email/verify/:id/:hash', name: 'verify.callback.legacy', component: VerifyCallbackView },

  // Content
  { path: '/contents/list', name: 'contents.list', component: ContentListView },
  {
    path: '/contents/new',
    name: 'contents.create',
    component: ContentCreateView,
    beforeEnter: [requireAuth, requireVerified]
  },
  { path: '/contents/:id', name: 'contents.show', component: ContentShowView },

  // Profile
  { path: '/dashboard', name: 'dashboard', component: DashboardView, beforeEnter: requireAuth },

  // 404
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
