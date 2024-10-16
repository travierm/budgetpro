import { ref, watch, computed, toRaw } from "vue"

const LOCAL_STORAGE_KEY = 'app_state'

// Helper function to get nested property using dot notation
function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

// Helper function to set nested property using dot notation
function setNestedProperty(obj, path, value) {
    const parts = path.split('.')
    const last = parts.pop()
    const target = parts.reduce((acc, part) => {
        if (!(part in acc)) {
            acc[part] = {}
        }
        return acc[part]
    }, obj)
    target[last] = value
}

// Create a reactive state
const state = ref(getInitialState())

export function checkAppDataVersion() {
    getNestedProperty(state.value, 'APP_DATA_VERSION')
    if (state.value.APP_DATA_VERSION === undefined) {
        state.value.APP_DATA_VERSION = 1
    }

    return state.value.APP_DATA_VERSION
}

function getInitialState() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    return data ? JSON.parse(data) : { revisions: [], CURRENT_REVISION: 0 }
}

function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value))
}

// Watch for changes in the state and save to localStorage
watch(state, saveState, { deep: true })

export function clearAppState() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)

    window.location.reload()
}

export function getAppState() {
    return state
}

export function createRevision(duplicateIndex) {
    const CURRENT_REVISION = state.value.CURRENT_REVISION ?? 0

    if (!duplicateIndex) {
        duplicateIndex = CURRENT_REVISION
    }

    const length = state.value.revisions.length
    const currentRevision = toRaw(state.value.revisions[duplicateIndex])
    state.value.revisions.push(JSON.parse(JSON.stringify({ ...currentRevision, tabName: `Tab ${length + 1}` })))
}

export function deleteRevision(index) {
    state.value.revisions.splice(index, 1)
}

export const currentRevision = computed({
    get: () => state.value.CURRENT_REVISION,
    set: (newValue) => {
        if (newValue >= 0 && newValue < state.value.revisions.length) {
            state.value.CURRENT_REVISION = newValue
        }
    }
})

export function useReactiveState(path, defaultValue) {
    const value = computed({
        get: () => {
            const result = getNestedProperty(state.value, path)
            return result !== undefined ? result : defaultValue
        },
        set: (newValue) => {
            setNestedProperty(state.value, path, newValue)
        }
    })

    return value
}

export function useReactiveRevisionState(key, defaultValue) {
    if (state.value.revisions.length == 0) {
        state.value.revisions[0] = {}
    }

    if (state.value.revisions.length == 1 && state.value.revisions[0][key] === undefined) {
        state.value.revisions[0][key] = defaultValue
    }

    return computed({
        get: () => {
            const currentRevision = state.value.CURRENT_REVISION
            if (!state.value.revisions[currentRevision]) {
                state.value.revisions[currentRevision] = {}
            }
            const result = state.value.revisions[currentRevision][key]
            if (result === undefined) {
                state.value.revisions[currentRevision][key] = defaultValue
            }

            return result !== undefined ? result : defaultValue
        },
        set: (newValue) => {
            const currentRevision = state.value.CURRENT_REVISION
            if (!state.value.revisions[currentRevision]) {
                state.value.revisions[currentRevision] = {}
            }
            state.value.revisions[currentRevision][key] = newValue
        }
    })
}