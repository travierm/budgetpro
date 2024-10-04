<template>
    <div @click="setCurrentRevision(slot)"
        class="border-2 rounded-lg p-4 border-dashed hover:border-solid hover:border-gray-500 hover:cursor-pointer">

        <div class="flex justify-between mb-4">
            <span ref="editableContent" class="text-xl focus:outline-none" :contenteditable="isEditing"
                @blur="saveTabName" @keydown.enter.prevent="$event.target.blur()">{{ data.tabName }}</span>
            <div class="flex space-x-2">
                <button @click.stop="toggleEdit"
                    class="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    <PencilIcon v-if="!isEditing" class="w-5 h-5" aria-hidden="true" />
                    <CheckIcon v-else class="w-5 h-5" aria-hidden="true" />
                </button>
                <button v-if="revisions.length >= 2" @click.stop="deleteRevision(slot)"
                    class="text-red-400 hover:text-red-300 transition-colors duration-200">
                    <TrashIcon class="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
        </div>

        <p class="text-md text-white">
            <span>Total Income: {{ calculateTotal(data.income)
                }}</span>
            <br />
            <span>Total Expenses: {{ calculateTotal(data.expenses)
                }}</span>
            <br />
            <span>Total Balance: {{ calculateTotal(data.accountBalances) }}</span>
        </p>
    </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { currentRevision, deleteRevision, useReactiveState } from '../lib/localStorage';
import { formatCurrency } from '../lib/useFormatCurrency';
import { ref } from 'vue';

const props = defineProps({
    data: Object,
    slot: Number
})

const revisions = useReactiveState('revisions', [])

function calculateTotal(rows) {
    return formatCurrency(rows.reduce((total, row) => total + parseFloat(row.value), 0))
}

function setCurrentRevision(slot) {
    currentRevision.value = slot
}

const isEditing = ref(false)
const editableContent = ref(null)

const toggleEdit = () => {
    isEditing.value = !isEditing.value
    if (isEditing.value) {
        setTimeout(() => {
            editableContent.value.focus()
        })
    } else {
        saveTabName()
    }
}

const saveTabName = () => {
    props.data.tabName = editableContent.value.textContent.trim()
}
</script>