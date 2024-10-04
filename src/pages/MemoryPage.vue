<template>
    <div>
        <div class="flex gap-4 px-4 text-white justify-center">
            <MemorySlot v-for="(revision, index) in revisions" :key="index" :data="revision" :slot="index" />
        </div>
    </div>
</template>

<script setup>
import { createRevision, useReactiveState } from '../lib/localStorage';
import MemorySlot from '../components/MemorySlot.vue';

const revisions = useReactiveState('revisions', [])
</script>