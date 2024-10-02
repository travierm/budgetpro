<template>
    <div>
        <div class="flex gap-4 px-4 text-white justify-center">
            <div class="border-2 border-green-700 rounded-lg p-6 active:border-dashed" v-for="revision in revisions"
                :key="index">
                <p class="text-xl mb-2">Slot 1</p>
                <p class="text-md">
                    <span class="text-green-700">Total Income: {{ calculateTotal(revision.income)
                        }}</span>
                    <br />
                    <span class="text-green-700">Total Expenses: {{ calculateTotal(revision.expenses)
                        }}</span>
                    <br />
                    <span class="text-green-700">Account Balance: {{ calculateTotal(revision.accountBalances) }}</span>
                </p>
            </div>
        </div>

        <div class="flex gap-4 px-4 text-white justify-center">
            <button @click="createRevision()" class="bg-blue-800 text-white rounded-lg px-4 py-2 mt-4">Duplicate Active
                Slot</button>
        </div>
    </div>
</template>

<script setup>
import { formatCurrency } from '../lib/useFormatCurrency';
import { createRevision, getAppData, syncedRef } from '../lib/localStorage';
import { ref } from 'vue';

function calculateTotal(rows) {
    return formatCurrency(rows.reduce((total, row) => total + parseFloat(row.value), 0))
}

const revisions = syncedRef('revisions', [])
</script>