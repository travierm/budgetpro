<template>
    <div @click="setCurrentRevision(slot)" class="border-2 rounded-lg p-4"
        :class="{ 'border-green-500': slot === CURRENT_REVISION, 'border-dashed hover:border-solid hover:border-gray-500 hover:cursor-pointer': slot !== CURRENT_REVISION }">

        <div class="flex justify-between mb-4">
            <p class="text-xl">{{ data.tabName }}</p>
            <button v-if="slot !== CURRENT_REVISION" @click.stop="deleteRevision(slot)"
                class="text-red-400 hover:text-red-300 transition-colors duration-200">
                <TrashIcon class="w-5 h-5" aria-hidden="true" />
            </button>
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
import { TrashIcon } from '@heroicons/vue/24/outline'
import { currentRevision, deleteRevision, useReactiveRevisionState, useReactiveState } from '../lib/localStorage';
import { formatCurrency } from '../lib/useFormatCurrency';

const props = defineProps({
    data: Object,
    slot: Number
})

const CURRENT_REVISION = useReactiveState('CURRENT_REVISION', 0)

function calculateTotal(rows) {
    return formatCurrency(rows.reduce((total, row) => total + parseFloat(row.value), 0))
}

function setCurrentRevision(slot) {
    currentRevision.value = slot
}
</script>