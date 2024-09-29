<template>
    <div class="bg-gray-800 shadow-lg rounded-lg p-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold gradient-text-profit">
                    ${{ netProfit.toFixed(2) }}
                </div>
                <div class="text-base font-medium text-gray-200 mt-1">
                    Net Profit
                </div>
            </div>
            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold gradient-text-savings">
                    {{ savingsRate.toFixed(2) }}%
                </div>
                <div class="text-base font-medium text-gray-200 mt-1">
                    Savings Rate
                </div>
            </div>

            <div class="flex flex-col items-center">
                <div class="text-3xl font-extrabold gradient-text-runway">
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
import { computed } from 'vue';
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
.gradient-text-savings {
    background: linear-gradient(45deg, #4ade80, #2dd4bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.gradient-text-profit {
    background: linear-gradient(45deg, #f59e0b, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.gradient-text-runway {
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}
</style>