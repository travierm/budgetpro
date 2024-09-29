<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <div class="flex flex-wrap gap-4">
            <div v-for="(month, index) in months" :key="month"
                class="flex-1 min-w-[150px] rounded-lg p-2 flex flex-col items-center justify-between"
                :class="getMonthGradient(month)">
                <div class="font-medium mb-2 text-gray-800">{{ month }}</div>
                <div class="font-bold text-lg text-gray-900">{{ formatCurrency(balances[index]) }}</div>
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

    for (let i = 1; i <= 12; i++) {
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

const getMonthGradient = (month) => {
    const gradients = {
        // Winter (cool blues and cyans)
        'Dec': 'bg-gradient-to-br from-sky-500 to-blue-600',
        'Jan': 'bg-gradient-to-br from-cyan-600 to-blue-700',
        'Feb': 'bg-gradient-to-br from-blue-500 to-cyan-600',

        // Spring (fresh greens and teals)
        'Mar': 'bg-gradient-to-br from-emerald-500 to-teal-600',
        'Apr': 'bg-gradient-to-br from-green-500 to-teal-600',
        'May': 'bg-gradient-to-br from-lime-500 to-green-600',

        // Summer (vibrant blues and greens)
        'Jun': 'bg-gradient-to-br from-green-400 to-teal-500',
        'Jul': 'bg-gradient-to-br from-sky-400 to-blue-500',
        'Aug': 'bg-gradient-to-br from-blue-400 to-indigo-500',

        // Fall (warm reds, oranges, and golds)
        'Sep': 'bg-gradient-to-br from-yellow-500 to-orange-600',
        'Oct': 'bg-gradient-to-br from-orange-500 to-red-600',
        'Nov': 'bg-gradient-to-br from-amber-500 to-rose-500'
    };
    return gradients[month] || 'bg-gradient-to-br from-gray-600 to-gray-700';
};

const months = getNextMonths(9);
const balances = calculateProjectedBalances;
</script>