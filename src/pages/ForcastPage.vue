<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">6 Month Forecast</h2>
        <div class="flex flex-wrap gap-4">
            <div v-for="(month, index) in months" :key="month"
                class="flex-1 min-w-[150px] bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-between">
                <div class="text-gray-400 font-medium mb-2">{{ month }}</div>
                <div class="text-white font-bold text-md">{{ formatCurrency(balances[index]) }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { income, expenses, accountBalances } from '../lib/appData';

const getNextMonths = (count) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return Array.from({ length: count + 1 }, (_, i) => months[(currentMonth + i) % 12]);
};

const calculateProjectedBalances = computed(() => {
    let currentBalance = accountBalances.value.reduce((sum, account) => sum + account.value, 0);
    const balances = [currentBalance];

    const avgIncome = income.value.reduce((sum, month) => sum + month.value, 0) / income.value.length;
    const avgExpenses = expenses.value.reduce((sum, month) => sum + month.value, 0) / expenses.value.length;
    const avgNetProfit = avgIncome - avgExpenses;

    for (let i = 1; i <= 6; i++) {
        currentBalance += avgNetProfit;
        balances.push(currentBalance);
    }

    return balances;
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};

const months = getNextMonths(6);
const balances = calculateProjectedBalances;
</script>