<!-- src/views/Auth/LoginView.vue -->
<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 2-column layout -->
    <main
      class="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 px-6 lg:px-10 pb-16"
    >
      <!-- Illustration (left column) -->
      <section class="order-2 lg:order-1 hidden lg:flex items-center">
        <div class="w-full">
          <div class="relative">
            <!-- large gradient panel -->
            <div
              class="h-[380px] w-[540px] rounded-3xl bg-gradient-to-br from-emerald-400/70 via-cyan-400/60 to-sky-300/60 shadow-xl"
            ></div>

            <!-- floating card -->
            <div
              class="absolute left-14 top-16 h-[230px] w-[340px] rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(16,185,129,.25)] grid place-items-center"
            >
              <img src="@/assets/signup-illustration.svg" alt="Login visual" class="w-[84%]" />
            </div>

            <!-- right tile -->
            <div
              class="absolute right-8 bottom-0 h-[170px] w-[170px] rounded-3xl bg-gradient-to-b from-emerald-500 to-cyan-500 shadow-xl grid place-items-center"
            ></div>
          </div>
        </div>
      </section>

      <!-- Form (right column) -->
      <section class="order-1 lg:order-2">
        <div class="max-w-lg ml-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <!-- YOWL logo inside the form card -->
          <div class="flex items-center gap-3 mb-6">
            <div class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">Y</div>
            <span class="font-semibold text-slate-900">YOWL</span>
          </div>

          <h1 class="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p class="mt-2 text-slate-500">
            Please enter your details to sign in to your account.
          </p>

          <!-- Login form -->
          <form class="mt-8 space-y-5" @submit.prevent="onSubmit" novalidate>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                v-model.trim="form.email"
                type="email"
                placeholder="john@example.com"
                autocomplete="email"
                class="form-input"
                :aria-invalid="!!errors.email"
              />
              <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div class="relative">
                <input
                  :type="showPwd ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="••••••••••"
                  autocomplete="current-password"
                  class="form-input pr-10"
                  :aria-invalid="!!errors.password"
                />
                <button
                  type="button"
                  @click="showPwd = !showPwd"
                  class="icon-toggle"
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon v-if="!showPwd" />
                  <EyeOffIcon v-else />
                </button>
              </div>
              <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
            </div>

            <!-- Remember me & forgot password -->
            <div class="flex items-center justify-between pt-2">
              <label class="flex items-center gap-2 text-sm text-slate-700 select-none">
                <input type="checkbox" v-model="form.remember" class="checkbox" />
                <span>Remember me</span>
              </label>
              <router-link to="/forgot-password" class="text-sm link font-medium">Forgot password?</router-link>
            </div>

            <!-- Submit button -->
            <button
              :disabled="submitting || !canSubmit"
              :class="[
                'w-full inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition shadow-lg',
                submitting || !canSubmit
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              ]"
            >
              <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sign in
            </button>

            <!-- Don't have an account -->
            <p class="mt-3 text-center text-sm text-slate-600">
              Don't have an account?
              <router-link to="/register" class="link font-medium">Sign up</router-link>
            </p>

            <!-- Divider with text -->
            <div class="flex items-center gap-4 my-6">
              <hr class="flex-grow border-t border-slate-200" />
              <span class="text-sm text-slate-500 select-none">Or sign in with</span>
              <hr class="flex-grow border-t border-slate-200" />
            </div>

            <!-- Continue with Google button -->
            <button
              type="button"
              class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50 transition"
            >
              <img
                alt="Google"
                class="h-5 w-5 mr-2"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              Continue with Google
            </button>

            <!-- Terms notice -->
            <p class="mt-6 text-xs text-slate-500 text-center">
              By continuing, you agree to YOWL's
              <a href="/legal/terms-of-service" class="link">Terms of Service</a>
              and
              <a href="/legal/privacy-policy" class="link">Privacy Policy</a>.
            </p>

            <!-- Global error message -->
            <div v-if="errors._" class="rounded-lg bg-rose-50 text-rose-700 px-4 py-3">
              {{ errors._ }}
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPwd = ref(false)
const submitting = ref(false)
const errors = reactive({})

const canSubmit = computed(() =>
  form.email.trim().length > 0 && form.password.length >= 6
)

function resetErrors () {
  for (const key of Object.keys(errors)) delete errors[key]
}

function mapValidationErrors (bag) {
  for (const [key, arr] of Object.entries(bag || {})) {
    errors[key] = Array.isArray(arr) ? arr[0] : String(arr)
  }
}

async function onSubmit () {
  resetErrors()
  if (!canSubmit.value) {
    errors._ = 'Please complete the form correctly before submitting.'
    return
  }
  submitting.value = true
  try {
    await auth.login({
      email: form.email,
      password: form.password,
      remember: form.remember,
    })

    const target = route.query.redirect || { name: 'contents.list' }
    router.push(target)

    // Redirection intelligente: si on a une intention (redirect), on la respecte
    const redirect = route.query.redirect
    if (redirect && typeof redirect === 'string') {
      router.push(redirect)
    } else {
      router.push({ name: 'contents.list' })
    }
  } catch (e) {
    if (e?.response?.status === 422) mapValidationErrors(e.response.data.errors)
    else errors._ = e?.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    submitting.value = false
  }
}

// mini icons
const EyeIcon = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', class:'h-5 w-5', fill:'none', viewBox:'0 0 24 24', stroke:'currentColor' }, [
  h('path', { 'stroke-linecap':'round','stroke-linejoin':'round','stroke-width':'1.5', d:'M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.214.07.45 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z' }),
  h('path', { 'stroke-linecap':'round','stroke-linejoin':'round','stroke-width':'1.5', d:'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])
const EyeOffIcon = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', class:'h-5 w-5', fill:'none', viewBox:'0 0 24 24', stroke:'currentColor' }, [
  h('path', { 'stroke-linecap':'round','stroke-linejoin':'round','stroke-width':'1.5', d:'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.98 0 1.93-.128 2.828-.367M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.5a10.522 10.522 0 01-4.254 5.568M6.228 6.228L3 3m3.228 3.228L21 21' })
])
</script>

<style scoped>
@import "../../app.css";

/* Base input styling (reused from RegisterView) */
.form-input {
  width: 100%;
  border-radius: 0.75rem; /* rounded-xl */
  border: 1px solid #e6edf2; /* approximate border-slate-200 */
  background-color: #ffffff; /* bg-white */
  padding: 0.75rem 1rem; /* py-3 px-4 */
  color: #0f172a; /* text-slate-900 */
  font-size: 1rem;
}
.form-input::placeholder {
  color: #94a3b8; /* placeholder-slate-400 */
  opacity: 1;
}
.form-input:focus {
  outline: none;
  border-color: #10b981; /* focus:border-emerald-500 */
  box-shadow: 0 0 0 4px rgba(16,185,129,0.08); /* focus:ring-4 focus:ring-emerald-100 */
}

/* Error text */
.form-error {
  margin-top: 0.25rem; /* mt-1 */
  font-size: 0.875rem; /* text-sm */
  color: #be123c; /* text-rose-600 (approx) */
}

/* Checkbox */
.checkbox {
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
  border-radius: 0.25rem; /* rounded */
  border: 1px solid #cbd5e1; /* border-slate-300 */
  accent-color: #10b981; /* text-emerald-600 for native check accent where supported */
}
.checkbox:focus {
  box-shadow: 0 0 0 3px rgba(16,185,129,0.12); /* focus:ring-emerald-500 approximation */
}

/* Links */
.link {
  color: #10b981; /* text-emerald-600 */
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}

/* Icon toggle (password visibility button) */
.icon-toggle {
  position: absolute;
  right: 0.75rem; /* right-3 */
  top: 50%;
  transform: translateY(-50%); /* vertical centering */
  padding: 0.5rem; /* p-2 */
  color: #94a3b8; /* text-slate-400 */
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-toggle:hover {
  color: #475569; /* text-slate-600 */
}
</style>
