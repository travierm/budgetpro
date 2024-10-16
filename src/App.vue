<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="lg:mx-[150px] mx-[20px] md:mx-[40px]">

    <div class="flex justify-center items-center gradient-wrapper">
      <BanknotesIcon class="w-8 h-8 mr-2 gradient-icon" />
      <h1 class="text-4xl font-bold text-center my-4 gradient-text">BudgetPro</h1>
    </div>
    <div>
      <Navbar />
      <RouterView />
    </div>
  </div>

  <svg width="0" height="0" aria-hidden="true" style="position: absolute;">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1e90ff" />
        <stop offset="100%" stop-color="#32cd32" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #1e90ff, #32cd32);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.gradient-icon {
  color: transparent;
}

.gradient-icon :deep(path) {
  stroke: url(#gradient);
}
</style>
