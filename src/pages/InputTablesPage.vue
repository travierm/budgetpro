<script setup>
import TableInput from '../components/TableInput.vue';
import { syncedRef } from '../lib/localStorage';

const income = syncedRef('app.income', [])
const expenses = syncedRef('app.expenses', [])
const accountBalances = syncedRef('app.accountBalances', [])
</script>

<template>
    <div class="flex flex-row gap-4 mt-2">
        <TableInput v-model="expenses" name="Expenses" class="max-w-2xl mx-auto" gradient-from="from-orange-600"
            gradient-to="to-orange-800" />

        <TableInput v-model="income" name="Income" class="max-w-2xl mx-auto" gradient-from="from-green-600"
            gradient-to="to-green-800" />

        <TableInput v-model="accountBalances" name="Account Balances" class="max-w-2xl mx-auto"
            gradient-from="from-indigo-600" gradient-to="to-indigo-800" key-text="Account" value-text="Balance" />
    </div>
</template>