<script setup>
import { computed } from 'vue';
import MainPage from './pages/MainPage.vue';
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="lg:mx-[150px] mx-[20px] md:mx-[40px]">
    <h1 class="text-4xl font-bold text-center my-4 gradient-title">BudgetPro</h1>
    <div>
      <Navbar />
      <RouterView />
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
