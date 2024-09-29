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
    <div class="max-w-4xl mx-auto mt-8">
      <h1 class="text-4xl font-bold text-gray-500 text-center">BudgetPro</h1>

      <div class="my-4 flex gap-2 justify-center">
        <router-link to="/" custom v-slot="{ navigate }">
          <button @click="navigate"
            class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-indigo-500 hover:border-transparent group"
            :class="{ 'ring-1 ring-indigo-500 border-transparent': isActive.data }">
            <CircleStackIcon class="w-5 h-5 transition-colors duration-300 text-white group-hover:text-indigo-500"
              :class="{ 'text-indigo-500': isActive.data }" aria-hidden="true" />
            <span>Data</span>
          </button>
        </router-link>

        <router-link to="/forecast" custom v-slot="{ navigate }">
          <button @click="navigate"
            class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-green-300 hover:border-transparent group"
            :class="{ 'ring-1 ring-green-300 border-transparent': isActive.forecast }">
            <ChartBarIcon class="w-5 h-5 transition-colors duration-300 text-white group-hover:text-green-300"
              :class="{ 'text-green-300': isActive.forecast }" aria-hidden="true" />
            <span>Forecast</span>
          </button>
        </router-link>
      </div>

      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
