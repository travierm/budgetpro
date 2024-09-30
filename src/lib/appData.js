import { syncedRef } from './localStorage';


export const income = syncedRef('income', [])
export const expenses = syncedRef('expenses', [])
export const accountBalances = syncedRef('accountBalances', [])
