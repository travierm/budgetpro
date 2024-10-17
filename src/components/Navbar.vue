<script setup>
import { CircleStackIcon, CpuChipIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReactiveState } from '../lib/localStorage';

const route = useRoute()

const isActive = computed(() => ({
    data: route.path === '/',
    about: route.path === '/about',
    memory: route.path === '/memory',
    forecast: route.path === '/forecast',
}))

const revisions = useReactiveState('revisions', [])

function isActiveTab(index) {
    if (route.path === '/') {
        return index === 0
    }

    return index == route.params.index
}
</script>

<template>
    <div class="my-6 flex gap-2 justify-center">
        <div class="flex space-x-2 ">
            <div class="relative" v-for="(revision, index) in revisions" :key="index">
                <router-link :to="`/${index === 0 ? '' : index}`" custom v-slot="{ navigate }">
                    <button @click="navigate"
                        class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-indigo-500 hover:border-transparent group"
                        :class="{ 'ring-1 ring-indigo-500 border-transparent': isActiveTab(index) }">
                        <CircleStackIcon class="w-5 h-5 transition-colors duration-300 group-hover:text-indigo-500"
                            :class="{ 'text-indigo-500': isActiveTab(index) }" aria-hidden="true" />
                        <span>{{ revision.tabName }}</span>
                    </button>
                </router-link>
                <!-- <button @click="$emit('close-tab', revision)" v-if="!isActiveTab(index)"
                    class="absolute -top-1 -right-1 bg-gray-700 text-gray-300 rounded-full p-0.5 hover:bg-gray-600 hover:text-white focus:outline-none">
                    <XMarkIcon class="w-3 h-3" />
                </button> -->
            </div>
        </div>

        <router-link to="/memory" custom v-slot="{ navigate }">
            <button @click="navigate"
                class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-green-500 hover:border-transparent group"
                :class="{ 'ring-1 ring-green-500 border-transparent': isActive.memory }">
                <CpuChipIcon class="w-5 h-5 transition-colors duration-300  group-hover:text-green-500"
                    :class="{ 'text-green-500': isActive.memory }" aria-hidden="true" />
                <span>Memory</span>
            </button>
        </router-link>

        <router-link to="/about" custom v-slot="{ navigate }">
            <button @click="navigate"
                class="px-4 py-1 text-gray-300 bg-transparent border border-gray-500 rounded-full transition-all duration-300 flex items-center space-x-2 focus:outline-none hover:ring-1 hover:ring-blue-500 hover:border-transparent group"
                :class="{ 'ring-1 ring-blue-500 border-transparent': isActive.about }">
                <InformationCircleIcon class="w-5 h-5 transition-colors duration-300  group-hover:text-blue-500"
                    :class="{ 'text-blue-500': isActive.about }" aria-hidden="true" />
                <span>About</span>
            </button>
        </router-link>
    </div>
</template>