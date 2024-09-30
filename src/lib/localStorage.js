import { watch, ref } from "vue"
const LOCAL_STORAGE_KEY = 'app_state_'

export const getJson = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export const setJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

function getAppData(revision = 1) {
    const appData = getJson(LOCAL_STORAGE_KEY + revision)
    if (!appData) {
        setJson(LOCAL_STORAGE_KEY + revision, {})
        return {}
    }

    return appData
}

function setAppData(key, value, revision = 1) {
    const appData = getAppData(revision)
    appData[key] = value

    setJson(LOCAL_STORAGE_KEY + revision, appData)
}

export function syncedRef(key, defaultValue, revision = 1) {
    const appData = getAppData(revision)
    const reference = ref()

    const appDataValue = appData[key]
    if (!appDataValue) {
        reference.value = defaultValue
        setAppData(key, defaultValue, revision)
    } else {
        reference.value = appDataValue
    }

    watch(
        reference,
        (newValue) => {
            setAppData(key, newValue, revision)
        },
        { deep: true }
    )

    return reference
}