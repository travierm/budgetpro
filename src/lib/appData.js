import { syncedRef } from './localStorage';


export const income = syncedRef('income', [
    {
        key: 'Work',
        value: 3000
    }
])
export const expenses = syncedRef('expenses', [
    {
        key: 'Rent',
        value: 900
    },
    {
        key: 'Electric',
        value: 80
    },
    {
        key: 'Internet',
        value: 60
    }
])
export const accountBalances = syncedRef('accountBalances', [
    {
        key: 'Checking',
        value: 3000
    },
    {
        key: 'Savings',
        value: 2000
    }
])
