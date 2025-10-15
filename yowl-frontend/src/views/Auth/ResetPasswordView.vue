<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Two‑column layout with full height to center the card vertically -->
    <main
      class="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 px-6 lg:px-10 pb-16 min-h-screen"
    >
      <!-- Illustration (left column) -->
      <section class="order-2 lg:order-1 hidden lg:flex items-center">
        <div class="w-full">
          <div class="relative">
            <!-- Large gradient panel -->
            <div
              class="h-[380px] w-[540px] rounded-3xl bg-gradient-to-br from-emerald-400/70 via-cyan-400/60 to-sky-300/60 shadow-xl"
            ></div>

            <!-- Floating card containing the illustration -->
            <div
              class="absolute left-14 top-16 h-[230px] w-[340px] rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(16,185,129,.25)] grid place-items-center"
            >
              <img
                src="@/assets/signup-illustration.svg"
                alt="Reset password visual"
                class="w-[84%]"
              />
            </div>

            <!-- Decorative tile on the right -->
            <div
              class="absolute right-8 bottom-0 h-[170px] w-[170px] rounded-3xl bg-gradient-to-b from-emerald-500 to-cyan-500 shadow-xl grid place-items-center"
            ></div>
          </div>
        </div>
      </section>

      <!-- Form (right column) -->
      <section class="order-1 lg:order-2 flex items-center">
        <div
          class="max-w-lg mx-auto lg:ml-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl"
        >
          <!-- YOWL logo -->
          <div class="flex items-center gap-3 mb-6">
            <div
              class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold"
            >
              Y
            </div>
            <span class="font-semibold text-slate-900">YOWL</span>
          </div>

          <!-- Heading and description -->
          <h1 class="text-3xl font-semibold text-slate-900">
            Reset password
          </h1>
          <p class="mt-2 text-slate-500">
            Enter your email, the reset token sent to you, and choose a new
            password.
          </p>

          <!-- Form -->
          <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
            <!-- Email input -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"
                >Email</label
              >
              <input
                v-model.trim="form.email"
                type="email"
                placeholder="john@example.com"
                autocomplete="email"
                class="form-input"
              />
              <p v-if="errors.email" class="form-error">
                {{ errors.email }}
              </p>
            </div>

            <!-- Token input -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"
                >Token</label
              >
              <input
                v-model.trim="form.token"
                type="text"
                placeholder="Reset token"
                autocomplete="one-time-code"
                class="form-input"
              />
              <p v-if="errors.token" class="form-error">
                {{ errors.token }}
              </p>
            </div>

            <!-- New password -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"
                >New password</label
              >
              <div class="relative">
                <input
                  :type="showPwd ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="••••••••••"
                  autocomplete="new-password"
                  class="form-input pr-10"
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
              <p v-if="errors.password" class="form-error">
                {{ errors.password }}
              </p>
            </div>

            <!-- Confirm new password -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"
                >Confirm new password</label
              >
              <div class="relative">
                <input
                  :type="showPwd2 ? 'text' : 'password'"
                  v-model="form.password_confirmation"
                  placeholder="••••••••••"
                  autocomplete="new-password"
                  :class="[
                    'form-input pr-10',
                    form.password_confirmation &&
                    form.password !== form.password_confirmation
                      ? 'border-rose-400 focus:ring-rose-500'
                      : ''
                  ]"
                />
                <button
                  type="button"
                  @click="showPwd2 = !showPwd2"
                  class="icon-toggle"
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon v-if="!showPwd2" />
                  <EyeOffIcon v-else />
                </button>
              </div>
              <p
                v-if="form.password_confirmation && form.password !== form.password_confirmation"
                class="form-error"
              >
                Passwords do not match.
              </p>
              <p v-else-if="errors.password_confirmation" class="form-error">
                {{ errors.password_confirmation }}
              </p>
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
              <svg
                v-if="submitting"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Reset password
            </button>

            <!-- Success message -->
            <div
              v-if="successMessage"
              class="rounded-lg bg-emerald-50 text-emerald-700 px-4 py-3"
            >
              {{ successMessage }}
            </div>

            <!-- Link back to login -->
            <p class="mt-3 text-center text-sm text-slate-600">
              Back to
              <router-link to="/login" class="link font-medium"
                >Sign in</router-link
              >
            </p>

            <!-- Disclaimer / Terms -->
            <p class="mt-6 text-xs text-slate-500 text-center">
              By continuing, you agree to YOWL's
              <a
                href="/legal/terms-of-service"
                class="link"
                >Terms of Service</a
              >
              and
              <a href="/legal/privacy-policy" class="link"
                >Privacy Policy</a
              >.
            </p>

            <!-- Global error message -->
            <div
              v-if="errors._"
              class="rounded-lg bg-rose-50 text-rose-700 px-4 py-3"
            >
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
import { useRouter, useRoute } from 'vue-router'
import http from '@/services/http'

// Router instances
const router = useRouter()
const route = useRoute()

// Form state: prepopulate token from query parameters if present
const form = reactive({
  email: '',
  token: route.query.token || '',
  password: '',
  password_confirmation: '',
})

// Local state for password visibility toggles
const showPwd = ref(false)
const showPwd2 = ref(false)

// Submission and success state
const submitting = ref(false)
const successMessage = ref('')

// Errors object keyed by field names (email, token, password, password_confirmation) and global key '_'
const errors = reactive({})

// Determine if form can be submitted: all fields non‑empty, password length >= 10, passwords match
const canSubmit = computed(() =>
  form.email.trim().length > 0 &&
  form.token.trim().length > 0 &&
  form.password.length >= 10 &&
  form.password_confirmation.length >= 10 &&
  form.password === form.password_confirmation
)

// Reset errors
function resetErrors () {
  for (const key of Object.keys(errors)) delete errors[key]
}

// Map API validation errors to our error object
function mapValidationErrors (bag) {
  for (const [key, arr] of Object.entries(bag || {})) {
    errors[key] = Array.isArray(arr) ? arr[0] : String(arr)
  }
}

// Submit form handler
async function onSubmit () {
  resetErrors()
  successMessage.value = ''
  if (!canSubmit.value) {
    errors._ = 'Please complete the form correctly before submitting.'
    return
  }
  submitting.value = true
  try {
    // Send reset password request to API
    await http.post('/reset-password', {
      email: form.email,
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })
    // Show success message and optionally redirect
    successMessage.value =
      'Your password has been reset. You can now sign in.'
    // Optionally redirect after a brief delay
    // setTimeout(() => router.push({ name: 'login' }), 3000)
  } catch (e) {
    if (e?.response?.status === 422) {
      mapValidationErrors(e.response.data.errors)
    } else {
      errors._ =
        e?.response?.data?.message ||
        'Unable to reset password. Please try again later.'
    }
  } finally {
    submitting.value = false
  }
}

// Eye icons for toggling password visibility (copied from LoginView)
const EyeIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-5 w-5',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.214.07.45 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z',
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      }),
    ],
  )

const EyeOffIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-5 w-5',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.98 0 1.93-.128 2.828-.367M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.5a10.522 10.522 0 01-4.254 5.568M6.228 6.228L3 3m3.228 3.228L21 21',
      }),
    ],
  )
</script>

<style scoped>
@reference "../../app.css";

/* Input styling */
.form-input {
  @apply w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400
         focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500;
}

/* Error message styling */
.form-error {
  @apply mt-1 text-sm text-rose-600;
}

/* Link styling */
.link {
  @apply text-emerald-600 hover:underline;
}

/* Icon toggle styling for password visibility buttons */
.icon-toggle {
  @apply absolute inset-y-0 right-3 my-auto p-2 text-slate-400 hover:text-slate-600;
}
</style>
