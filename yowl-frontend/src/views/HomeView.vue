<!--
  HomeView.vue

  This view renders the landing page for YOWL. It follows the design of
  the provided mockup with several distinct sections: a hero banner with a
  headline and calls to action, a row of preview discussion cards and
  community metrics, a features section highlighting key benefits, a
  trending discussions panel, a testimonials section, and a footer with
  additional links. The layout is fully responsive and uses Tailwind
  utility classes throughout. Emojis are used as simple icons for the
  demonstration; these can be swapped out for SVGs if desired.
-->
<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-24 pb-20">
      <!-- Subtle background gradient -->
      <div
        class="absolute inset-0 -top-24 h-[700px] w-full bg-gradient-to-b from-white via-white to-slate-50 pointer-events-none"
      ></div>
      <div
        class="relative max-w-[1200px] mx-auto px-6 lg:px-10 text-center"
      >
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900"
        >
          Open Conversations for the
          <span
            class="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent"
          >
            Open Web
          </span>
        </h1>
        <p
          class="mt-6 text-lg text-slate-600 max-w-2xl mx-auto"
        >
          YOWL centralizes discussions and analysis on any webpage — join
          readers and experts around the world.
        </p>
        <!-- Call to action buttons -->
        <div
          class="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <router-link
            to="/login"
            class="inline-block rounded-xl px-8 py-3 text-white font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg"
          >
            Join YOWL
          </router-link>
          <router-link
            to="/discussions"
            class="inline-block rounded-xl px-8 py-3 font-medium border border-slate-200 text-slate-900 hover:bg-slate-100 shadow-lg"
          >
            Explore Discussions
          </router-link>
        </div>
        <!-- Discussion previews -->
        <div
          class="mt-16 flex flex-col md:flex-row justify-center gap-6"
        >
          <div
            class="w-full md:w-1/3 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 space-y-3"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              ></div>
              <div>
                <p
                  class="text-sm font-medium text-slate-900"
                >
                  Sarah Chen
                </p>
                <p class="text-xs text-slate-500">2h</p>
              </div>
            </div>
            <p class="text-sm text-slate-700">
              Fascinating article on AI ethics. The framework proposed
              could
            </p>
            <div
              class="flex items-center gap-4 text-slate-500 text-xs pt-1"
            >
              <span class="flex items-center gap-1">
                <span>🗨️</span><span>24</span>
              </span>
              <span class="flex items-center gap-1">
                <span>❤️</span><span>48</span>
              </span>
            </div>
          </div>
          <div
            class="w-full md:w-1/3 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 space-y-3"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              ></div>
              <div>
                <p
                  class="text-sm font-medium text-slate-900"
                >
                  Marcus Rodriguez
                </p>
                <p class="text-xs text-slate-500">5h</p>
              </div>
            </div>
            <p class="text-sm text-slate-700">
              Great breakdown of the economic implications. Would
            </p>
            <div
              class="flex items-center gap-4 text-slate-500 text-xs pt-1"
            >
              <span class="flex items-center gap-1">
                <span>🗨️</span><span>12</span>
              </span>
              <span class="flex items-center gap-1">
                <span>❤️</span><span>32</span>
              </span>
            </div>
          </div>
          <div
            class="w-full md:w-1/3 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 space-y-3"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              ></div>
              <div>
                <p
                  class="text-sm font-medium text-slate-900"
                >
                  Jordan Lee
                </p>
                <p class="text-xs text-slate-500">1d</p>
              </div>
            </div>
            <p class="text-sm text-slate-700">
              Understanding ML bias in healthcare is crucial. We need
            </p>
            <div
              class="flex items-center gap-4 text-slate-500 text-xs pt-1"
            >
              <span class="flex items-center gap-1">
                <span>🗨️</span><span>56</span>
              </span>
              <span class="flex items-center gap-1">
                <span>❤️</span><span>89</span>
              </span>
            </div>
          </div>
        </div>
        <!-- Metrics row -->
        <div
          class="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm"
            >
              👥
            </div>
            <p
              class="text-sm font-medium text-slate-700"
            >
              10K+ Active Users
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm"
            >
              💬
            </div>
            <p
              class="text-sm font-medium text-slate-700"
            >
              1M+ Discussions
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm"
            >
              🌍
            </div>
            <p
              class="text-sm font-medium text-slate-700"
            >
              Global Community
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24">
      <div
        class="max-w-[1200px] mx-auto px-6 lg:px-10 text-center"
      >
        <h2
          class="text-3xl sm:text-4xl font-bold text-slate-900"
        >
          Everything You Need to Engage
        </h2>
        <p
          class="mt-2 text-slate-600 max-w-2xl mx-auto"
        >
          YOWL brings together the best features for meaningful online
          discussions
        </p>
        <div
          class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div
            class="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm"
          >
            <div
              class="h-10 w-10 mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white"
            >
              💬
            </div>
            <h3
              class="text-lg font-semibold text-slate-900"
            >
              Comment Anywhere
            </h3>
            <p
              class="mt-2 text-sm text-slate-600"
            >
              Add your thoughts to any webpage. Follow conversations
              across the internet in one unified feed.
            </p>
          </div>
          <div
            class="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm"
          >
            <div
              class="h-10 w-10 mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white"
            >
              🏷️
            </div>
            <h3
              class="text-lg font-semibold text-slate-900"
            >
              Follow Domains &amp; Topics
            </h3>
            <p
              class="mt-2 text-sm text-slate-600"
            >
              Curate your feed by following specific websites, topics,
              or communities that matter to you.
            </p>
          </div>
          <div
            class="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm"
          >
            <div
              class="h-10 w-10 mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white"
            >
              🛡️
            </div>
            <h3
              class="text-lg font-semibold text-slate-900"
            >
              Moderated &amp; Transparent
            </h3>
            <p
              class="mt-2 text-sm text-slate-600"
            >
              Community-driven moderation with transparent rules keeps
              discussions respectful and on-topic.
            </p>
          </div>
          <div
            class="p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm"
          >
            <div
              class="h-10 w-10 mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white"
            >
              👥
            </div>
            <h3
              class="text-lg font-semibold text-slate-900"
            >
              Built for Communities
            </h3>
            <p
              class="mt-2 text-sm text-slate-600"
            >
              Connect with readers and experts worldwide. Build
              meaningful connections around shared interests.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Discussions Section -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h2
          class="text-3xl sm:text-4xl font-bold text-slate-900 text-center"
        >
          See Discussions in Action
        </h2>
        <p
          class="mt-2 text-center text-slate-600"
        >
          Real conversations happening right now on YOWL
        </p>
        <div
          class="mt-12 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-slate-200"
          >
            <h3 class="text-lg font-semibold text-slate-900">
              Trending Discussions
            </h3>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                All
              </button>
              <button
                class="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Following
              </button>
            </div>
          </div>
          <ul>
            <li
              v-for="(post, idx) in trendingPosts"
              :key="idx"
              class="flex flex-col sm:flex-row items-start gap-4 p-4 border-b border-slate-100 last:border-b-0"
            >
              <div
                class="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm"
              >
                💬
              </div>
              <div class="flex-1">
                <div
                  class="text-sm font-medium text-slate-900 flex flex-wrap items-center gap-x-2 gap-y-1"
                >
                  <span>{{ post.author }}</span>
                  <span class="text-slate-400">&bull;</span>
                  <span class="text-slate-500">{{ post.time }}</span>
                  <span class="text-slate-400">&bull;</span>
                  <a
                    :href="post.link"
                    class="text-emerald-600 hover:underline"
                    >{{ post.domain }}</a
                  >
                </div>
                <a
                  :href="post.link"
                  class="block mt-1 font-semibold text-slate-900 hover:underline"
                  >
                  {{ post.title }}
                </a>
                <p class="mt-1 text-sm text-slate-600">
                  {{ post.excerpt }}
                </p>
                <div
                  class="mt-2 flex items-center justify-between text-slate-500 text-xs"
                >
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <span>🗨️</span><span>{{ post.comments }}</span>
                    </span>
                    <span class="flex items-center gap-1">
                      <span>❤️</span><span>{{ post.likes }}</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="text-slate-400 hover:text-slate-600"
                      aria-label="Share"
                    >
                      🔗
                    </button>
                    <button
                      class="text-slate-400 hover:text-slate-600"
                      aria-label="More options"
                    >
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24">
      <div
        class="max-w-[1200px] mx-auto px-6 lg:px-10 text-center"
      >
        <div
          class="flex items-center justify-center gap-2 text-emerald-600 font-medium"
        >
          <span class="text-lg">⭐</span>
          <span>Trusted by 10K+ readers</span>
        </div>
        <h2
          class="mt-4 text-3xl sm:text-4xl font-bold text-slate-900"
        >
          Join the Community
        </h2>
        <p
          class="mt-2 text-slate-600"
        >
          See what our community members are saying about YOWL
        </p>
        <div
          class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="(testimonial, idx) in testimonials"
            :key="idx"
            class="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              ></div>
              <div>
                <p
                  class="text-sm font-medium text-slate-900"
                >
                  {{ testimonial.name }}
                </p>
                <p class="text-xs text-slate-500">
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
            <p class="text-sm text-slate-700">
              “{{ testimonial.quote }}”
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 py-12">
      <div
        class="max-w-[1200px] mx-auto px-6 lg:px-10"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <div
              class="flex items-center gap-2 mb-4"
            >
              <div
                class="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center font-bold"
              >
                Y
              </div>
              <span class="text-white font-semibold"
                >YOWL</span
              >
            </div>
            <p class="text-sm text-slate-400">
              Open Conversations for the Open Web
            </p>
            <p
              class="mt-4 text-sm text-slate-500"
            >
              4517 Washington Ave, Manchester, Kentucky 39495<br />
              Phone: (406) 555‑0128<br />
              Mail:
              <a
                href="mailto:info@yowl.com"
                class="underline text-slate-300"
                >info@yowl.com</a
              >
            </p>
          </div>
          <div>
            <h4
              class="text-slate-100 font-medium mb-3"
            >
              Supports
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:underline"
                  >Contact</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >FAQs</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Pricing Plans</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Sitemap</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="text-slate-100 font-medium mb-3"
            >
              Quick Links
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:underline"
                  >About</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Get Membership</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Post an Ad</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Blog</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="text-slate-100 font-medium mb-3"
            >
              Category
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:underline"
                  >Mobile</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Electronics</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Vehicles</a
                >
              </li>
              <li>
                <a href="#" class="hover:underline"
                  >Property</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-700 pt-6"
        >
          <div
            class="flex items-center gap-4 mb-4 sm:mb-0 text-sm"
          >
            <a
              href="#"
              class="inline-flex items-center gap-2 hover:underline"
            >
              <img
                alt="App Store"
                class="h-5 w-5"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.svg"
              />
              App Store
            </a>
            <a
              href="#"
              class="inline-flex items-center gap-2 hover:underline"
            >
              <img
                alt="Google Play"
                class="h-5 w-5"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              Google Play
            </a>
          </div>
          <div class="flex items-center gap-4 text-base">
            <a
              href="#"
              class="text-slate-400 hover:text-slate-200"
              aria-label="Facebook"
            >
              🔵
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-slate-200"
              aria-label="Twitter"
            >
              🐦
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-slate-200"
              aria-label="LinkedIn"
            >
              💼
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-slate-200"
              aria-label="Instagram"
            >
              📷
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Data for the trending discussions list
const trendingPosts = [
  {
    author: 'Dr. Emily Watson',
    time: '1h ago',
    domain: 'nature.com',
    title: 'New Study Reveals Breakthrough in Renewable Energy Storage',
    excerpt:
      'This could be a game-changer for grid-scale storage. The efficiency improvements are remarkable...',
    comments: 48,
    likes: 127,
    link: '#',
  },
  {
    author: 'Alex Thompson',
    time: '3h ago',
    domain: 'techcrunch.com',
    title: 'The Future of Remote Work: Trends for 2025',
    excerpt:
      "I've been working remotely for 5 years and these predictions align perfectly with what I'm seeing...",
    comments: 32,
    likes: 89,
    link: '#',
  },
  {
    author: 'Jordan Lee',
    time: '5h ago',
    domain: 'medium.com',
    title: 'Understanding Machine Learning Bias in Healthcare',
    excerpt:
      'Important discussion. We need more transparency in how these algorithms are trained and validated...',
    comments: 56,
    likes: 203,
    link: '#',
  },
]

// Data for testimonials
const testimonials = [
  {
    name: 'David Park',
    role: 'Journalist',
    quote:
      'YOWL has completely transformed how I engage with readers. The conversations are thoughtful and add real value to my work.',
  },
  {
    name: 'Lisa Martinez',
    role: 'Researcher',
    quote:
      'Finally, a platform where academic discussions can happen in the open. The moderation keeps everything professional.',
  },
  {
    name: 'Ryan Chen',
    role: 'Tech Lead',
    quote:
      'I love being able to follow discussions across different tech blogs in one place. It’s like Reddit meets RSS.',
  },
]
</script>

<style scoped>
@import "../app.css";

/* Custom style to constrain the line height of comment previews */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
