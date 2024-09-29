<script setup>
import TableInput from '../components/TableInput.vue';
import QuickStats from '../components/QuickStats.vue';
import MonthForecast from '../components/MonthForecast.vue';

import { income, expenses, accountBalances } from '../lib/appData';
</script>

<template>
    <div class="flex gap-4">
        <div class="flex flex-col gap-4 w-1/2">
            <div class="flex gap-4">
                <TableInput v-model="income" name="Income" class="flex-grow" gradient-from="from-green-600"
                    gradient-to="to-green-800" />
                <TableInput v-model="accountBalances" name="Account Balances" class="flex-grow"
                    gradient-from="from-indigo-600" gradient-to="to-indigo-800" key-text="Account"
                    value-text="Balance" />
            </div>
            <TableInput v-model="expenses" name="Expenses" class="" gradient-from="from-orange-600"
                gradient-to="to-orange-800" />
        </div>

        <div class="w-1/2">
            <div class="">
                <QuickStats />
            </div>

            <div class="mt-4">
                <MonthForecast />
            </div>
        </div>
    </div>
</template>