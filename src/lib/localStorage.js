import { watch, ref } from "vue"

const LOCAL_STORAGE_KEY = 'bp_data'
export let CURRENT_REVISION = 0

export const getJson = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export const setJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getAppData() {
    const appData = getJson(LOCAL_STORAGE_KEY)
    if (!appData) {
        setJson(LOCAL_STORAGE_KEY, {
            'revisions': []
        })

        return {}
    }

    return appData
}

export function getRevisionData(revisionIndex = 0) {
    const appData = getAppData()

    if (!appData.revisions[revisionIndex]) {
        appData.revisions[revisionIndex] = {}
    }

    return appData.revisions[revisionIndex]
}

export function createRevision() {
    const currentRevision = getRevisionData(CURRENT_REVISION)
    const appData = getAppData()

    appData.revisions.push(currentRevision)
    replaceAppData(appData)
}

function replaceAppData(object) {
    setJson(LOCAL_STORAGE_KEY, object)
}

function setAppData(key, value, revisionIndex = 0) {
    const appData = getJson(LOCAL_STORAGE_KEY)
    if (!appData.revisions[revisionIndex]) {
        appData.revisions[revisionIndex] = {}
    }

    appData.revisions[revisionIndex][key] = value
    setJson(LOCAL_STORAGE_KEY, appData)
}

export function syncedRef(key, defaultValue, revision = 0) {
    const appData = getRevisionData(revision)
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