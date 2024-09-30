import { watch, ref } from "vue"

export const getJson = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

export const setJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export function syncedRef(key, defaultValue) {
    const variable = ref()

    const storedData = getJson(key)
    if (storedData) {
        variable.value = storedData
    } else {
        variable.value = defaultValue
    }

    watch(
        variable,
        (newValue) => {
            console.log(newValue)
            localStorage.setItem(key, JSON.stringify(newValue))
        },
        { deep: true }
    )

    return variable
}