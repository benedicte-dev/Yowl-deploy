<!-- src/views/Auth/VerifyCallbackView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center">
    <main
      class="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 px-6 lg:px-10 py-16"
    >
      <!-- Illustration -->
      <section class="hidden lg:flex items-center justify-center">
        <div class="relative">
          <div
            class="h-[380px] w-[540px] rounded-3xl bg-gradient-to-br from-emerald-400/70 via-cyan-400/60 to-sky-300/60 shadow-xl"
          ></div>
          <div
            class="absolute left-14 top-16 h-[230px] w-[340px] rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(16,185,129,.25)] grid place-items-center"
          >
            <img
              src="@/assets/signup-illustration.svg"
              alt="Verifying"
              class="w-[84%]"
            />
          </div>
          <div
            class="absolute right-8 bottom-0 h-[170px] w-[170px] rounded-3xl bg-gradient-to-b from-emerald-500 to-cyan-500 shadow-xl"
          ></div>
        </div>
      </section>

      <!-- Card -->
      <section class="flex items-center justify-center">
        <div
          class="max-w-lg bg-white border border-slate-200 rounded-2xl p-8 shadow-xl"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold"
            >
              Y
            </div>
            <span class="font-semibold text-slate-900">YOWL</span>
          </div>

          <!-- Transition des états -->
          <Transition name="fade" mode="out-in">
            <!-- verifying -->
            <div v-if="state === 'verifying'" key="verifying" class="text-center py-6">
              <svg
                class="animate-spin mx-auto h-8 w-8 text-emerald-600"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <h1 class="mt-4 text-2xl font-semibold text-slate-900">
                Verifying your email…
              </h1>
              <p class="mt-2 text-slate-500">
                Please wait while we confirm your verification link.
              </p>
            </div>

            <!-- success -->
            <div v-else-if="state === 'success'" key="success" class="text-center">
              <h1 class="text-2xl font-semibold text-emerald-700">
                Email verified!
              </h1>
              <p class="mt-2 text-slate-600">
                Your account is now active. You can start exploring YOWL.
              </p>
              <router-link
                :to="{ name: 'contents.list' }"
                class="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-6 py-3 font-medium shadow-lg hover:bg-emerald-700"
              >
                Go to feed
              </router-link>
            </div>

            <!-- error -->
            <div v-else key="error" class="text-center">
              <h1 class="text-2xl font-semibold text-rose-700">
                Verification failed
              </h1>
              <p class="mt-2 text-slate-600">{{ error }}</p>
              <div class="mt-6 space-x-3">
                <router-link
                  :to="{ name: 'verify.info' }"
                  class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50"
                >
                  Send a new link
                </router-link>
                <router-link
                  :to="{ name: 'login' }"
                  class="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-6 py-3 font-medium shadow-lg hover:bg-emerald-700"
                >
                  Back to login
                </router-link>
              </div>
            </div>
          </Transition>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store' // adapte si besoin

const route = useRoute()
const auth = useAuthStore()

const state = ref('verifying') // verifying | success | error
const error = ref('')

onMounted(async () => {
  try {

    const { id, hash } = route.params
    const query = route.query


    state.value = 'success'
  } catch (e) {
    state.value = 'error'
    error.value =
      e?.response?.data?.message ||
      'Your verification link is invalid or has expired.'
  }
})
</script>

<style scoped>
@reference "../../app.css";

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-300 ease-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0 translate-y-2;
}
</style>
