<template>
    <div @click="setCurrentRevision(slot)"
        class="border rounded-lg p-4 border-dashed hover:border-gray-300 hover:cursor-pointer">

        <div class="flex justify-between mb-4">
            <span ref="editableContent" class="text-xl focus:outline-none" :contenteditable="isEditing"
                @blur="saveTabName">{{ data.tabName }}</span>
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

        <div class="flex justify-center space-x-4 mt-4">
            <button @click.stop="toggleEdit" class="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                <PencilIcon v-if="!isEditing" class="w-5 h-5" aria-hidden="true" />
                <CheckIcon v-else class="w-5 h-5" aria-hidden="true" />
            </button>

            <button @click.stop="createRevision(slot)"
                class="text-green-400 hover:text-green-300 transition-colors duration-200">
                <DocumentDuplicateIcon class="w-5 h-5" aria-hidden="true" />
            </button>

            <button v-if="revisions.length >= 2" @click.stop="deleteRevision(slot)"
                class="text-red-400 hover:text-red-300 transition-colors duration-200">
                <TrashIcon class="w-5 h-5" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { CheckIcon, DocumentDuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { currentRevision, deleteRevision, useReactiveState, createRevision } from '../lib/localStorage';
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
    isEditing.value = false
    props.data.tabName = editableContent.value.textContent.trim()
}
</script>