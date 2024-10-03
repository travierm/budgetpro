<template>
    <div>
        <div class="flex gap-4 px-4 text-white justify-center">
            <MemorySlot v-for="(revision, index) in revisions" :key="index" :data="revision" :slot="index" />
        </div>

        <div class="flex gap-4 px-4 text-white justify-center">
            <button @click="createRevision()"
                class="bg-transparent border-2 border-gray-500 border-dashed rounded-lg px-6 py-2 mt-4 hover:border-green-500 text-white transition-colors duration-300">
                Duplicate Active Slot
            </button>
        </div>
    </div>
</template>

<script setup>
import { createRevision, useReactiveState } from '../lib/localStorage';
import MemorySlot from '../components/MemorySlot.vue';

const revisions = useReactiveState('revisions', [])
</script>