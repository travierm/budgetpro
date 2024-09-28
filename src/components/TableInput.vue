<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div :class="`bg-gradient-to-r p-2 ${gradientFrom} ${gradientTo}`">
                <h1 class="text-md font-bold text-slate-200">{{ name }}</h1>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-4 py-2">{{ keyHeaderText }}</th>
                        <th scope="col" class="px-4 py-2">{{ valueHeaderText }}</th>
                        <th scope="col" class="px-4 py-2"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, index) in modelValue" :key="index"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td class="px-4 py-2">
                            {{ row.key }}
                        </td>
                        <td class="px-4 py-2">
                            ${{ row.value }}
                        </td>
                        <td class="px-4 py-2 flex items-center justify-center h-full">
                            <button @click="deleteRow(index)"
                                class="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors duration-200">
                                <TrashIcon class="w-5 h-5" aria-hidden="true" />
                            </button>
                        </td>
                    </tr>

                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                        <td class="px-4 py-2">
                            <input v-model="keyInput" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                :placeholder="keyHeaderText">
                        </td>
                        <td class="px-4 py-2">
                            <input v-model="valueInput" @keyup.enter="addRow" type="text"
                                class="bg-transparent text-gray-900 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-400 dark:text-white"
                                :placeholder="valueHeaderText">
                        </td>
                        <td class="px-4 py-2 flex items-center justify-center h-full">
                            <button @click="addRow()"
                                class="text-green-600 hover:text-green-900 dark:hover:text-green-400 transition-colors duration-200">
                                <PlusCircleIcon class="w-5 h-5" aria-hidden="true" />
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="modelValue.length > 0">
                    <tr class="text-xs font-semibold text-white bg-gray-500"
                        :class="`bg-gradient-to-r ${gradientFrom} ${gradientTo}`">
                        <th scope="row" class="px-4 py-3">Total</th>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3 text-center">${{ total.toFixed(2) }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
import { PlusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'

export default {
    name: 'TableInput',
    components: {
        TrashIcon,
        PlusCircleIcon
    },
    props: {
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: Array,
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
    },
    emits: ['update:modelValue'],
    data() {
        return {
            keyHeaderText: 'Name',
            valueHeaderText: 'Cost',
            keyInput: '',
            valueInput: ''
        }
    },
    computed: {
        total() {
            return this.modelValue.reduce((total, row) => total + row.value, 0)
        }
    },
    methods: {
        addRow() {
            if (this.keyInput && this.valueInput) {
                this.$emit('update:modelValue', [
                    ...this.modelValue,
                    {
                        key: this.keyInput,
                        value: parseInt(this.valueInput)
                    }
                ])
                this.keyInput = ''
                this.valueInput = ''
            }
        },
        deleteRow(index) {
            this.$emit('update:modelValue', this.modelValue.filter((_, i) => i !== index))
        }
    }
}
</script>