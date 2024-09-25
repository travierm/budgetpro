<script setup>
import { ref } from 'vue'

const keyHeaderText = ref('Type')
const valueHeaderText = ref('Cost')

const rows = ref([
    {
        key: 'Rent',
        value: 600
    },
    {
        key: 'Food',
        value: 100
    }
])

const keyInput = ref(null)
const valueInput = ref(null)

function addRow() {
    rows.value.push({
        key: keyInput.value.value,
        value: valueInput.value.value
    })

    keyInput.value.value = ''
    valueInput.value.value = ''
}
</script>

<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">{{ keyHeaderText }}</th>
                        <th scope="col" class="px-4 py-3">{{ valueHeaderText }}</th>
                        <th scope="col" class="px-4 py-3"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, index) in rows" :key="index"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td class="px-6 py-4">
                            {{ row.key }}
                        </td>

                        <td class="px-4 py-4">
                            {{ row.value }}
                        </td>
                        <td class="px-4 py-4"></td>
                    </tr>

                    <tr class="dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-3">
                            <input ref="keyInput" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Type">
                        </td>
                        <td class="px-4 py-3">
                            <input ref="valueInput" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Value">
                        </td>
                        <td class="px-4 py-3">
                            <button @click="addRow"
                                class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>