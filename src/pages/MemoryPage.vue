<template>
    <div>
        <div class="flex gap-4 px-4 text-white justify-center">
            <MemorySlot v-for="(revision, index) in revisions" :key="index" :data="revision" :slot="index" />
        </div>

        <div class="flex justify-center mt-4 gap-x-2">
            <!-- Download backup -->
            <button @click="downloadLocalStorageAsJSON"
                class="rounded-full flex items-center px-4 py-2 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-black transition-colors duration-200">
                <CloudArrowDownIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Download Backup
            </button>

            <!-- Restore backup -->
            <input type="file" accept=".json" @change="restoreBackup($event)" ref="fileInput" class="hidden">
            <button @click="triggerFileInput"
                class="rounded-full flex items-center px-4 py-2 bg-transparent border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-colors duration-200">
                <CloudArrowUpIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Restore Backup
            </button>

            <!-- Clear App State with a warning -->
            <button @click="confirmClearAppState"
                class="rounded-full flex items-center px-4 py-2 bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-black transition-colors duration-200">
                <TrashIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Reset Data
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAppState, useReactiveState, clearAppState } from '../lib/localStorage';
import MemorySlot from '../components/MemorySlot.vue';
import { CloudArrowDownIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/vue/24/outline';

const revisions = useReactiveState('revisions', [])

const fileInput = ref(null);
const triggerFileInput = () => {
    fileInput.value.click();
};

const restoreBackup = (event) => {
    const file = event.target.files[0]

    if (file) {
        restoreLocalStorageFromJSON(file)
    }
};


function confirmClearAppState() {
    if (confirm('Are you sure you want to reset your data? This action cannot be undone.')) {
        clearAppState()
    }
}

function downloadLocalStorageAsJSON() {
    const data = JSON.stringify(localStorage.getItem('app_state'));
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `budget_pro_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function restoreLocalStorageFromJSON(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            let parsedData = JSON.parse(event.target.result)

            // Handle potential double-encoded JSON
            if (typeof parsedData === 'string') {
                parsedData = JSON.parse(parsedData)
            }

            const appState = getAppState()
            appState.value = {
                revisions: parsedData.revisions || [],
                CURRENT_REVISION: parsedData.CURRENT_REVISION || 0,
                APP_DATA_VERSION: parsedData.APP_DATA_VERSION || 1
            }

            console.log('App state restored successfully')
        } catch (error) {
            alert('Error parsing or applying backup data:' + error)
        }
    }

    reader.readAsText(file)
}
</script>