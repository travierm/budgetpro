<script setup>
import TableInput from './components/TableInput.vue';
import { syncedRef } from './lib/localStorage';

const income = syncedRef('app.income', [])
const expenses = syncedRef('app.expenses', [])
</script>

<template>
  <div>
    <div class="max-w-2xl mx-auto mt-8">
      <h1 class="text-4xl font-bold text-gray-500">BudgetPro</h1>

      <div class="flex flex-row gap-4 mt-2">
        <TableInput v-model="expenses" name="Expenses" class="max-w-2xl mx-auto" gradient-from="from-orange-600"
          gradient-to="to-orange-800" />

        <TableInput v-model="income" name="Income" class="max-w-2xl mx-auto" gradient-from="from-green-600"
          gradient-to="to-green-800" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
