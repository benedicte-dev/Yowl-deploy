<template>
  <div class="min-h-screen bg-slate-50">

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
              <!-- Use the same illustration asset as the signup/login pages -->
              <img
                src="@/assets/signup-illustration.svg"
                alt="Forgot password visual"
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
            Forgot password?
          </h1>
          <p class="mt-2 text-slate-500">
            Enter your email address and we will send you a link to reset your
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
              <!-- Loading spinner when submitting -->
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
              Send reset link
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
              Remember your password?
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
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/services/http'

// Router instance (not used here but ready if you need redirection)
const router = useRouter()

// Form state for the email address
const form = reactive({
  email: '',
})

// Submission state
const submitting = ref(false)

// Success message after the reset link is sent
const successMessage = ref('')

// Error messages keyed by field name and a global error key '_'
const errors = reactive({})

// Compute whether the form can be submitted (basic validation: email not empty)
const canSubmit = computed(() => form.email.trim().length > 0)

// Reset errors helper
function resetErrors () {
  for (const key of Object.keys(errors)) {
    delete errors[key]
  }
}

// Map validation errors from the API to our errors object
function mapValidationErrors (bag) {
  for (const [key, arr] of Object.entries(bag || {})) {
    errors[key] = Array.isArray(arr) ? arr[0] : String(arr)
  }
}

// Form submission handler
async function onSubmit () {
  resetErrors()
  successMessage.value = ''
  if (!canSubmit.value) {
    errors._ = 'Please enter your email before submitting.'
    return
  }
  submitting.value = true
  try {
    // Send the forgot password request to the API
    await http.post('/forgot-password', { email: form.email })
    // On success, show a message to the user
    successMessage.value =
      'If this email is registered with us, a reset link has been sent.'
  } catch (e) {
    // Handle validation errors (422)
    if (e?.response?.status === 422) {
      mapValidationErrors(e.response.data.errors)
    } else {
      errors._ =
        e?.response?.data?.message ||
        'Unable to send reset link. Please try again later.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@reference "../../app.css";

/* Reuse form input styles defined in app.css (applied via @apply utility) */
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
</style>
