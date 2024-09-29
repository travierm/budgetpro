<script setup>
import { computed } from 'vue';
import MainPage from './pages/MainPage.vue';
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-center my-4 gradient-title">BudgetPro</h1>
    <div>
      <MainPage />
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
