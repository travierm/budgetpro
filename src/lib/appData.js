import { checkAppDataVersion, useReactiveRevisionState } from './localStorage';

export const APP_DATA_VERSION = checkAppDataVersion()
export const tabName = useReactiveRevisionState('tabName', 'Dashboard')
export const income = useReactiveRevisionState('income', [
    {
        key: 'Work',
        value: 3000
    }
])
export const expenses = useReactiveRevisionState('expenses', [
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
export const accountBalances = useReactiveRevisionState('accountBalances', [
    {
        key: 'Checking',
        value: 3000
    },
    {
        key: 'Savings',
        value: 2000
    }
])