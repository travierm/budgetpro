<template>
    <div>

        <div class="flex gap-4 px-4 text-white justify-center">
            <MemorySlot v-for="(revision, index) in revisions" :key="index" :data="revision" :slot="index" />
        </div>

        <div class="flex flex-col  mt-4 text-white text-md">
            <div class="flex justify-center items-center gap-x-2">
                <p>Click</p>
                <PencilIcon class="text-blue-400 w-5 h-5" />
                <p> to rename a memory slot</p>
            </div>

            <div class="flex justify-center items-center gap-x-2">
                <p>Click</p>
                <DocumentDuplicateIcon class="text-green-400 w-5 h-5" />
                <p> to duplicate a memory slot</p>
            </div>
        </div>

        <div class="flex justify-center mt-4 gap-x-2">
            <!-- Download backup -->
            <OvalButton color="blue" @click="downloadLocalStorageAsJSON" :icon="CloudArrowDownIcon">Download Backup
            </OvalButton>

            <!-- Restore backup -->
            <input type="file" accept=".json" @change="restoreBackup($event)" ref="fileInput" class="hidden">
            <OvalButton color="green" @click="triggerFileInput" :icon="CloudArrowUpIcon">Restore Backup</OvalButton>
            <OvalButton color="red" @click="confirmClearAppState" :icon="TrashIcon">Reset Data</OvalButton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAppState, useReactiveState, clearAppState } from '../lib/localStorage';
import MemorySlot from '../components/MemorySlot.vue';
import { CloudArrowDownIcon, CloudArrowUpIcon, TrashIcon, PencilIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline';
import OvalButton from '../components/OvalButton.vue';

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