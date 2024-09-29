import { syncedRef } from './localStorage';

export const income = syncedRef('app.income', [])
export const expenses = syncedRef('app.expenses', [])
export const accountBalances = syncedRef('app.accountBalances', [])
