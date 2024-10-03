import { ref, watch, computed } from "vue"

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

function getInitialState() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    return data ? JSON.parse(data) : { revisions: [], CURRENT_REVISION: 0 }
}

function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value))
}

// Watch for changes in the state and save to localStorage
watch(state, saveState, { deep: true })

export function getAppState() {
    return state
}

export function createRevision() {
    const CURRENT_REVISION = state.value.CURRENT_REVISION ?? 0

    state.value.revisions.push(state.value.revisions[CURRENT_REVISION])
}

export function deleteRevision(index) {
    state.value.revisions.splice(index, 1)
}

export function useReactiveState(path, defaultValue) {
    const value = computed({
        get: () => {
            const result = getNestedProperty(state.value, path)
            return result !== undefined ? result : defaultValue
        },
        set: (newValue) => {
            console.log(newValue, path)
            setNestedProperty(state.value, path, newValue)
        }
    })

    return value
}

export function useReactiveRevisionState(key, defaultValue) {
    const CURRENT_REVISION = state.value.CURRENT_REVISION ?? 0

    if (!state.value.revisions[CURRENT_REVISION]) {
        state.value.revisions[CURRENT_REVISION] = {}
    }
    const result = state.value.revisions[CURRENT_REVISION][key]
    if (result === undefined) {
        state.value.revisions[CURRENT_REVISION][key] = defaultValue
    }

    return computed({
        get: () => {
            const currentRevision = CURRENT_REVISION
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
            const currentRevision = CURRENT_REVISION
            if (!state.value.revisions[currentRevision]) {
                state.value.revisions[currentRevision] = {}
            }
            state.value.revisions[currentRevision][key] = newValue

            console.log(state.value)
        }
    })
}