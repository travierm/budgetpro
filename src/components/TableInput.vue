<script setup>
import { computed, ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    gradientFrom: {
        type: String,
        default: 'from-blue-600'
    },
    gradientTo: {
        type: String,
        default: 'to-blue-800'
    }
})

const keyHeaderText = ref('Name')
const valueHeaderText = ref('Cost')

const rows = ref([
    {
        key: 'Rent',
        value: 600
    },
    {
        key: 'Food',
        value: 100
    },
    {
        key: 'Transportation',
        value: 200
    }
])

const keyInput = ref(null)
const valueInput = ref(null)

const total = computed(() => {
    return rows.value.reduce((total, row) => {
        return total + row.value
    }, 0)
})

function addRow() {
    rows.value.push({
        key: keyInput.value.value,
        value: parseInt(valueInput.value.value)
    })

    keyInput.value.value = ''
    valueInput.value.value = ''
}
</script>

<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div :class="`bg-gradient-to-r p-2 ${gradientFrom} ${gradientTo}`">
                <h1 class="text-xl font-bold text-slate-200">{{ props.name }}</h1>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-4 py-3">{{ keyHeaderText }}</th>
                        <th scope="col" class="px-4 py-3">{{ valueHeaderText }}</th>
                        <th scope="col" class="px-4 py-3"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, index) in rows" :key="index"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td class="px-4 py-4">
                            {{ row.key }}
                        </td>

                        <td class="px-4 py-4">
                            ${{ row.value }}
                        </td>
                        <td class="px-4 py-4">
                            <button @click="rows.pop()"
                                class="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
                                <TrashIcon class="w-5 h-5" aria-hidden="true" />
                            </button>
                        </td>
                    </tr>

                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                        <td class="px-4 py-3">
                            <input ref="keyInput" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                :placeholder="keyHeaderText">
                        </td>
                        <td class="px-4 py-3">
                            <input @keyup.enter="addRow" ref="valueInput" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                :placeholder="valueHeaderText">
                        </td>
                        <td class="px-4 py-3">
                            <button @click="addRow"
                                class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="rows.length > 0">
                    <tr class="text-xs font-semibold text-white bg-gray-500"
                        :class="`bg-gradient-to-r ${gradientFrom} ${gradientTo}`">
                        <th scope="row" class="px-4 py-3">Total</th>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3 text-center">${{ total }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>