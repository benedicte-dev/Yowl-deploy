<template>
  <section class="bg-slate-50 min-h-screen p-6 sm:p-10 flex flex-col items-center">
    <!-- Page heading -->
    <div class="w-full max-w-4xl mb-8">
      <div class="flex items-center gap-2 text-emerald-600">
        <!-- Gear icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.43 4.5L8.59 2m0 0L7.34.44M8.59 2L7.34 3.56M15 4.5l.84-2.5m0 0L16.66.44M15.84 2L17.1 3.56M4.5 9.43L2 8.59m0 0L.44 7.34M2 8.59l1.56-1.25m13.25 12.16l2.5.84m0 0l1.25 1.56M19.16 21.43L17.9 20.17M4.5 15l-.84 2.5m0 0L2.41 19.16M3.66 17.9L2.41 16.34"
          />
        </svg>
        <h1 class="text-2xl sm:text-3xl font-semibold">Settings</h1>
      </div>
      <p class="mt-1 text-slate-600 text-sm sm:text-base">
        Customise your YOWL experience
      </p>
    </div>

    <!-- Settings card -->
    <div
      class="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-8"
    >
      <!-- Account section -->
      <div>
        <h2 class="text-lg font-semibold text-slate-900 mb-2">Account</h2>
        <p class="text-sm text-slate-500 mb-4">
          Manage your account settings and security
        </p>
        <!-- Email -->
        <div class="flex items-center justify-between py-4 border-b border-slate-100">
          <div>
            <p class="font-medium text-slate-900">Email</p>
            <p class="text-sm text-slate-500">sarah.chen@example.com</p>
          </div>
          <button class="text-sm text-emerald-600 hover:underline">Change</button>
        </div>
        <!-- Username -->
        <div class="flex items-center justify-between py-4 border-b border-slate-100">
          <div>
            <p class="font-medium text-slate-900">Username</p>
            <p class="text-sm text-slate-500">@sarah_chen</p>
          </div>
          <button class="text-sm text-emerald-600 hover:underline">Change</button>
        </div>
        <!-- Password -->
        <div class="flex items-center justify-between py-4 border-b border-slate-100">
          <div>
            <p class="font-medium text-slate-900">Password</p>
            <p class="text-sm text-slate-500">Last changed 3 months ago</p>
          </div>
          <button class="text-sm text-emerald-600 hover:underline">Change</button>
        </div>
        <!-- Delete account -->
        <div class="flex items-center justify-between py-4">
          <div>
            <p class="font-medium text-rose-600">Delete Account</p>
            <p class="text-sm text-rose-500">Permanently delete your account and all data</p>
          </div>
          <button class="text-sm bg-rose-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-rose-700">Delete</button>
        </div>
      </div>

      <!-- Notifications section -->
      <div>
        <h2 class="text-lg font-semibold text-slate-900 mb-2">Notifications</h2>
        <p class="text-sm text-slate-500 mb-4">
          Choose what notifications you'd like to receive
        </p>

        <!-- Delivery Method -->
        <div class="mb-4">
          <h3 class="text-base font-medium text-slate-900 mb-2">Delivery Method</h3>
          <!-- Email notifications -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">Email Notifications</p>
              <p class="text-sm text-slate-500">Receive notifications via email</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="toggleEmail"
                v-model="notifyEmail"
                class="toggle-checkbox"
              />
              <label for="toggleEmail" class="toggle-label"></label>
            </div>
          </div>
          <!-- Push notifications -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">Push Notifications</p>
              <p class="text-sm text-slate-500">Receive push notifications in your browser</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="togglePush"
                v-model="notifyPush"
                class="toggle-checkbox"
              />
              <label for="togglePush" class="toggle-label"></label>
            </div>
          </div>
        </div>

        <!-- Activity -->
        <div class="mb-4">
          <h3 class="text-base font-medium text-slate-900 mb-2">Activity</h3>
          <!-- Comment replies -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">Comment Replies</p>
              <p class="text-sm text-slate-500">When someone replies to your comments</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="toggleReplies"
                v-model="notifyReplies"
                class="toggle-checkbox"
              />
              <label for="toggleReplies" class="toggle-label"></label>
            </div>
          </div>
          <!-- Post likes -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">Post Likes</p>
              <p class="text-sm text-slate-500">When someone likes your posts or comments</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="toggleLikes"
                v-model="notifyLikes"
                class="toggle-checkbox"
              />
              <label for="toggleLikes" class="toggle-label"></label>
            </div>
          </div>
        </div>

        <!-- Social -->
        <div class="mb-4">
          <h3 class="text-base font-medium text-slate-900 mb-2">Social</h3>
          <!-- New followers -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">New Followers</p>
              <p class="text-sm text-slate-500">When someone follows you</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="toggleFollowers"
                v-model="notifyFollowers"
                class="toggle-checkbox"
              />
              <label for="toggleFollowers" class="toggle-label"></label>
            </div>
          </div>
        </div>

        <!-- Discovery -->
        <div class="mb-4">
          <h3 class="text-base font-medium text-slate-900 mb-2">Discovery</h3>
          <!-- Trending posts digest -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p class="font-medium text-slate-900">Trending Posts</p>
              <p class="text-sm text-slate-500">Weekly digest of trending discussions</p>
            </div>
            <div>
              <input
                type="checkbox"
                id="toggleTrending"
                v-model="notifyTrending"
                class="toggle-checkbox"
              />
              <label for="toggleTrending" class="toggle-label"></label>
            </div>
          </div>
          <!-- Frequency note -->
          <div class="mt-4 p-4 rounded-xl bg-slate-100 text-slate-600 text-sm">
            <p class="font-medium text-slate-900 mb-1">Notification Frequency</p>
            <p>
              You can adjust the frequency of notifications at any time. We'll
              respect your preferences and only send what's most important to
              you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Notification toggles. These can be bound to API calls to save the
// user's preferences.
const notifyEmail = ref(true)
const notifyPush = ref(false)
const notifyReplies = ref(true)
const notifyLikes = ref(false)
const notifyFollowers = ref(true)
const notifyTrending = ref(false)
</script>

<style scoped>
/*
  Custom toggle switch styles. The checkbox itself is hidden and the
  adjacent label renders the switch. When the checkbox is checked the
  background and knob move accordingly.
*/
.toggle-checkbox {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.toggle-label {
  display: inline-block;
  width: 42px;
  height: 22px;
  background-color: #e5e7eb; /* slate-200 */
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #10b981; /* emerald-500/600 */
}

.toggle-checkbox:checked + .toggle-label::after {
  transform: translateX(20px);
}
</style>
