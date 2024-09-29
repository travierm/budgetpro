<template>
    <div class="bg-gradient-to-r from-orange-600 via-green-700 to-indigo-700 shadow-lg rounded-lg p-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold text-white">
                    {{ savingsRate.toFixed(2) }}%
                </div>
                <div class="text-base font-medium text-gray-200 mt-1">
                    Savings Rate
                </div>
            </div>
            <!-- Placeholder for additional stats -->
            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold text-white">
                    ${{ netProfit.toFixed(2) }}
                </div>
                <div class="text-base font-medium text-gray-200 mt-1">
                    Net Profit
                </div>
            </div>
            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold text-white">
                    {{ financialRunway }} Months
                </div>
                <div class="text-base font-medium text-gray-200 mt-1">
                    Of Runway
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { income, expenses, accountBalances } from '../lib/appData';

export default {
    name: 'QuickStats',
    setup() {
        const totalIncome = computed(() => income.value.reduce((total, row) => total + row.value, 0));
        const totalExpenses = computed(() => expenses.value.reduce((total, row) => total + row.value, 0));
        const savingsRate = computed(() => {
            if (totalIncome.value === 0) return 0; // Avoid division by zero

            const savings = totalIncome.value - totalExpenses.value;
            return (savings / totalIncome.value) * 100;
        });

        // net profit
        const netProfit = computed(() => totalIncome.value - totalExpenses.value);

        const calculateFinancialRunway = (accountBalances, monthlyExpenses) => {
            // Calculate total account balance
            const totalBalance = accountBalances.reduce((sum, account) => sum + account.value, 0);

            // Calculate total monthly expenses
            const totalMonthlyExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.value, 0);

            // Calculate runway
            if (totalMonthlyExpenses === 0) {
                return Infinity; // Avoid division by zero
            }

            const runway = totalBalance / totalMonthlyExpenses;

            return runway;
        };

        // Usage in a Vue.js computed property
        const financialRunway = computed(() => {
            const runwayMonths = calculateFinancialRunway(accountBalances.value, expenses.value);
            return runwayMonths.toFixed(1); // Round to one decimal place
        });

        return {
            totalIncome,
            totalExpenses,
            savingsRate,
            netProfit,
            financialRunway
        }
    }
}
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>