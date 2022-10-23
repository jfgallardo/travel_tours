<template>
  <div>
    <main class="flex flex-col justify-center items-center">
      <h1 class="text-9xl font-extrabold text-black tracking-widest">404</h1>
      <div class="bg-blue-300 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a
          class="relative inline-block text-sm font-medium text-blue-800 group active:text-blue-500 focus:outline-none focus:ring"
        >
          <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span
            class="bg-blue-300 relative block px-8 py-3 border border-current"
          >
            <router-link :to="{ name: 'LandingPage' }">Go Home</router-link>
          </span>
        </a>
      </button>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
