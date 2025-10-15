<template>
  <section class="bg-slate-50 min-h-screen flex flex-col items-center py-20">
    <!-- Heading and description -->
    <div class="text-center mb-8 max-w-lg">
      <h1 class="text-2xl sm:text-3xl font-semibold text-emerald-600">
        Share a New Link
      </h1>
      <p class="mt-2 text-slate-700 text-sm sm:text-base">
        Discover something interesting? Share it with the <strong>YOWL</strong>
        community and start a meaningful conversation.
      </p>
    </div>

    <!-- Card containing the URL input and actions -->
    <div
      class="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
    >
      <label
        class="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"
        for="share-url"
      >
        <!-- Link icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.59 13.41a2 2 0 002.82 0l4.59-4.59a2 2 0 00-2.82-2.82l-1.17 1.17m-2.12-2.12a2 2 0 00-2.82 0L6 8.59a2 2 0 102.82 2.82l1.17-1.17"
          />
        </svg>
        Website URL
      </label>
      <div class="flex">
        <input
          id="share-url"
          v-model.trim="url"
          type="url"
          placeholder="https://example.com/article"
          class="flex-1 rounded-l-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
        />
        <!-- Preview Link button navigates to the ShareLinkView with the URL as a query parameter -->
        <router-link
          :to="{ path: '/share-link', query: { url: url } }"
          class="inline-flex items-center justify-center gap-1 px-4 py-3 rounded-r-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'pointer-events-none opacity-50': !url.trim() }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 5v14m7-7H5"
            />
          </svg>
          <span>Preview Link</span>
        </router-link>
      </div>
      <p class="mt-2 text-xs text-slate-500">
        Paste any web link to automatically fetch its preview and details.
      </p>
      <!-- Disabled Publish button (actual publish occurs on the ShareLinkView) -->
      <button
        disabled
        class="mt-6 w-full rounded-xl bg-emerald-500/60 text-white px-6 py-3 font-medium flex items-center justify-center cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 12h16M4 12l7-7m-7 7l7 7"
          />
        </svg>
        Publish Discussion
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Reactive URL field. When populated, the user can navigate to the
// ShareLinkView via the Preview Link button.
const url = ref('')
</script>

<style scoped>
/* The disabled publish button uses a lower opacity to indicate it cannot be clicked. */
</style>
