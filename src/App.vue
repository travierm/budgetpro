<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <div class="max-w-2xl mx-auto mt-8">
      <h1 class="text-4xl font-bold text-gray-500">BudgetPro</h1>

      <div class="my-4 flex gap-2">
        <button
          class="px-4 py-1 text-gray-500 bg-transparent border border-gray-500 rounded-full hover:bg-gray-500 hover:text-white transition-colors duration-300">
          Input Data
        </button>

        <button
          class="px-4 py-1 text-gray-500 bg-transparent border border-gray-500 rounded-full hover:bg-gray-500 hover:text-white transition-colors duration-300">
          Forecast
        </button>
      </div>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
