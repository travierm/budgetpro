<script setup>
import { ChartBarIcon, CircleStackIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute()

const isActive = computed(() => ({
    data: route.path === '/',
    about: route.path === '/about',
    forecast: route.path === '/forecast',
}))
</script>

<template>
    <div class="my-4 flex gap-2 justify-center">
        <router-link to="/" custom v-slot="{ navigate }">
            <button @click="navigate"
                class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-indigo-500 hover:border-transparent group"
                :class="{ 'ring-1 ring-indigo-500 border-transparent': isActive.data }">
                <CircleStackIcon class="w-5 h-5 transition-colors duration-300 text-white group-hover:text-indigo-500"
                    :class="{ 'text-indigo-500': isActive.data }" aria-hidden="true" />
                <span>Dashboard</span>
            </button>
        </router-link>

        <router-link to="/about" custom v-slot="{ navigate }">
            <button @click="navigate"
                class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-blue-500 hover:border-transparent group"
                :class="{ 'ring-1 ring-blue-500 border-transparent': isActive.about }">
                <InformationCircleIcon
                    class="w-5 h-5 transition-colors duration-300 text-white group-hover:text-blue-500"
                    :class="{ 'text-blue-500': isActive.about }" aria-hidden="true" />
                <span>About</span>
            </button>
        </router-link>
    </div>
</template>