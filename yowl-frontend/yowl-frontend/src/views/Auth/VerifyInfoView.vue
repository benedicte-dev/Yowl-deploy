<!-- src/views/Auth/VerifyInfoView.vue -->
<template>
  <div class="min-h-screen bg-slate-50">
    <main class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 px-6 lg:px-10 py-12">
      <!-- Illustration (facultative) -->
      <section class="hidden lg:flex items-center">
        <div class="w-full">
          <div class="relative">
            <div class="h-[380px] w-[540px] rounded-3xl bg-gradient-to-br from-emerald-400/70 via-cyan-400/60 to-sky-300/60 shadow-xl"></div>
            <div class="absolute left-14 top-16 h-[230px] w-[340px] rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(16,185,129,.25)] grid place-items-center">
              <img src="@/assets/signup-illustration.svg" alt="Verify email" class="w-[84%]" />
            </div>
            <div class="absolute right-8 bottom-0 h-[170px] w-[170px] rounded-3xl bg-gradient-to-b from-emerald-500 to-cyan-500 shadow-xl"></div>
          </div>
        </div>
      </section>

      <!-- Carte -->
      <section class="flex items-center">
        <div class="w-full max-w-lg ml-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">Y</div>
            <span class="font-semibold text-slate-900">YOWL</span>
          </div>

          <h1 class="text-2xl font-semibold text-slate-900">Check your inbox</h1>
          <p class="mt-2 text-slate-600">
            We’ve sent a verification link to
            <span class="font-medium text-slate-900">{{ email || 'your email' }}</span>.
            Click the link in that email to activate your account.
          </p>

          <div v-if="notice" class="mt-4 rounded-lg px-4 py-3"
               :class="notice.type === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'">
            {{ notice.text }}
          </div>

          <div class="mt-8 space-y-3">
            <button
              :disabled="sending"
              @click="resend"
              class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50 transition disabled:opacity-60">
              <svg v-if="sending" class="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Resend verification email
            </button>

            <a
              :href="inboxUrl"
              target="_blank"
              rel="noopener"
              class="block text-center w-full rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50 transition">
              Open my inbox
            </a>

            <button
              @click="goFeed"
              class="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-6 py-3 font-medium shadow hover:bg-emerald-700 transition">
              Go to feed
            </button>
          </div>

          <p class="mt-6 text-xs text-slate-500">
            Already verified? You can continue using YOWL. If you didn’t receive the email, check your spam folder or click “Resend”.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = computed(() => auth.user?.email)
const inboxUrl = computed(() => {
  // petit helper pour ouvrir la bonne boîte si email Gmail/Outlook/etc.
  const e = (email.value || '').toLowerCase()
  if (e.endsWith('@gmail.com')) return 'https://mail.google.com/'
  if (e.endsWith('@outlook.com') || e.endsWith('@hotmail.com') || e.endsWith('@live.com')) return 'https://outlook.live.com/mail/'
  return 'https://mail.google.com/' // défaut "safe"
})

const sending = ref(false)
const notice = ref(null) // { type: 'ok' | 'err', text: string }

onMounted(() => {
  // Si l’utilisateur est déjà vérifié, on le laisse continuer
  if (auth.isVerified) goFeed()
})

function goFeed() {
  const dest = route.query.redirect || { name: 'contents.list' }
  router.push(dest)
}

async function resend() {
  sending.value = true
  notice.value = null
  try {
    await auth.resendVerification()
    notice.value = { type: 'ok', text: 'Verification email sent. Please check your inbox.' }
  } catch (e) {
    notice.value = { type: 'err', text: e?.response?.data?.message || 'Failed to send verification email.' }
  } finally {
    sending.value = false
  }
}
</script>
