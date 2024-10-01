<script setup>
import TableInput from '../components/TableInput.vue';
import QuickStats from '../components/QuickStats.vue';
import MonthForecast from '../components/MonthForecast.vue';

import { income, expenses, accountBalances } from '../lib/appData';
</script>

<template>
    <div class="flex gap-4 flex-col xl:flex-row">
        <div class="flex flex-col gap-4 xl:w-1/2">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TableInput v-model="income" name="Monthly Income" class="flex-grow" gradient-from="from-green-600"
                    gradient-to="to-green-800" />
                <TableInput v-model="accountBalances" name="Account Balances" class="flex-grow"
                    gradient-from="from-indigo-600" gradient-to="to-indigo-800" key-text="Account"
                    value-text="Balance" />
            </div>
            <TableInput v-model="expenses" name="Monthly Expenses" class="" gradient-from="from-orange-600"
                gradient-to="to-orange-800" />
        </div>

        <div class="xl:w-1/2">
            <div class="">
                <QuickStats />
            </div>

            <div class="mt-4">
                <MonthForecast />
            </div>
        </div>
    </div>
</template>