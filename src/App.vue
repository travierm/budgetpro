<script setup>
import { BoltIcon, ChartBarIcon, CircleStackIcon, CloudIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute()

const isActive = computed(() => ({
  data: route.path === '/',
  forecast: route.path === '/forecast',
}))
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center my-4 gradient-title">BudgetPro</h1>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-title {
  background: linear-gradient(to right, #64748b, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
