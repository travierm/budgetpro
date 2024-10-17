<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="lg:mx-[150px] mx-[20px] md:mx-[40px]">
    <div class="flex justify-center items-center">
      <h1 class="text-4xl font-bold text-center mt-4 gradient-text">BudgetPro</h1>
    </div>
    <div>
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  font-weight: 600;
  background: linear-gradient(135deg, #a0a0a0, #d0d0d0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}
</style>
