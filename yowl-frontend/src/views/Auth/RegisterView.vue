<template>
  <div class="min-h-screen bg-slate-50">
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
              <!-- Illustration image placed here; adjust path if necessary -->
              <img
                src="@/assets/signup-illustration.svg"
                alt="Signup visual"
                class="w-[84%]"
              />
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
        <div class="max-w-900 ml-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <!-- YOWL logo inside the form card -->
          <div class="flex items-center gap-3 mb-6">
            <div class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">Y</div>
            <span class="font-semibold text-slate-900">YOWL</span>
          </div>

          <h1 class="text-3xl font-semibold text-slate-900">Sign up</h1>
          <p class="mt-2 text-slate-500">
            Let’s get you all set up so you can access your personal account.
          </p>

          <!-- Registration form -->
          <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                v-model.trim="form.name"
                type="text"
                placeholder="John DOE"
                autocomplete="name"
                class="form-input"
              />
              <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
            </div>

            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                v-model.trim="form.username"
                type="text"
                placeholder="john_doe"
                autocomplete="username"
                class="form-input"
              />
              <p v-if="errors.username" class="form-error">
                {{ errors.username }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                v-model.trim="form.email"
                type="email"
                placeholder="john@example.com"
                autocomplete="email"
                class="form-input"
              />
              <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
            </div>

            <!-- Date of birth -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Date of birth
              </label>
              <input
                v-model="form.birthdate"
                type="date"
                class="form-input"
              />
              <p v-if="errors.birthdate" class="form-error">
                {{ errors.birthdate }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
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

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  :type="showPwd2 ? 'text' : 'password'"
                  v-model="form.password_confirmation"
                  placeholder="••••••••••"
                  autocomplete="new-password"
                  class="form-input pr-10"
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
                v-if="errors.password_confirmation"
                class="form-error"
              >
                {{ errors.password_confirmation }}
              </p>
            </div>

            <!-- Checkboxes -->
            <div class="space-y-2 pt-1">
              <label class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="form.is_over_13"
                  class="checkbox"
                />
                <span class="text-sm text-slate-700">I'm over 13 years old</span>
              </label>
              <label class="flex items-start gap-3">
                <input
                  type="checkbox"
                  v-model="form.accept_terms"
                  class="checkbox"
                />
                <span class="text-sm text-slate-700">
                  I agree to all the
                  <a href="/legal/terms" class="link">Terms</a> and
                  <a href="/legal/privacy" class="link">Privacy Policies</a>
                </span>
              </label>
              <p v-if="errors.accept_terms" class="form-error">
                {{ errors.accept_terms }}
              </p>
            </div>

            <!-- Submit button -->
            <button
              :disabled="submitting || !canSubmit"
              :class="[
                'w-full mt-1 inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition shadow-lg',
                submitting || !canSubmit
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              ]"
            >
              <!-- Show a spinner while submitting -->
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
              Create account
            </button>

            <!-- Already have an account -->
            <p class="mt-3 text-center text-sm text-slate-600">
              Already have an account?
              <router-link to="/login" class="link font-medium">Login</router-link>
            </p>

            <!-- Separator with text -->
            <div class="flex items-center gap-4 my-6">
              <hr class="flex-grow border-t border-slate-200" />
              <span class="text-sm text-slate-500 select-none">Or Sign up with</span>
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
// Import dependencies
import { reactive, ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const auth = useAuthStore()

// Reactive form state, including the username field
const form = reactive({
  name: '',
  username: '',
  email: '',
  birthdate: '',
  password: '',
  password_confirmation: '',
  is_over_13: false,
  accept_terms: false,
})

// Password visibility toggles
const showPwd = ref(false)
const showPwd2 = ref(false)
// Submission state
const submitting = ref(false)
// Validation errors
const errors = reactive({})

// Computed property to determine if the form can be submitted
const canSubmit = computed(() =>
  form.name.trim().length >= 4 &&
  form.username.trim().length >= 4 &&
  form.email.trim().length > 0 &&
  form.password.length >= 10 &&
  form.password === form.password_confirmation &&
  form.is_over_13 &&
  form.accept_terms
)

// Helper: reset all validation errors
function resetErrors () {
  for (const key of Object.keys(errors)) {
    delete errors[key]
  }
}

// Helper: map backend validation errors into our local errors object
function mapValidationErrors (bag) {
  for (const [key, arr] of Object.entries(bag || {})) {
    errors[key] = Array.isArray(arr) ? arr[0] : String(arr)
  }
}

// Form submission handler
async function onSubmit () {
  resetErrors()
  if (!canSubmit.value) {
    errors._ = 'Please complete the form correctly before submitting.'
    return
  }
  submitting.value = true
  try {
    // Send registration request via the auth store
    await auth.register({ ...form })
    // Redirect after successful registration (update route name as needed)
    router.push({ name: 'verify.info' })
  } catch (e) {
    if (e?.response?.status === 422) {
      mapValidationErrors(e.response.data.errors)
    } else {
      errors._ = e?.response?.data?.message || 'Unexpected error. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}

// Eye icon component for password visibility
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

// EyeOff icon component for hidden password
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

/* Base input styling */
.form-input {
  @apply w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500;
}

/* Error message styling */
.form-error {
  @apply mt-1 text-sm text-rose-600;
}

/* Checkbox styling */
.checkbox {
  @apply h-5 w-5 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500;
}

/* Link styling */
.link {
  @apply text-emerald-600 hover:underline;
}

/* Icon toggle button for password visibility */
.icon-toggle {
  @apply absolute inset-y-0 right-3 my-auto p-2 text-slate-400 hover:text-slate-600;
}
</style>
