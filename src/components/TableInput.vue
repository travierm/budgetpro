<template>
    <div class="relative shadow-md sm:rounded-lg overflow-hidden">
        <div
            :class="`bg-gradient-to-r p-2 ${gradientFrom} ${gradientTo} rounded-t-lg flex justify-between items-center`">
            <h1 class="text-md font-bold text-slate-200">{{ name }}</h1>
            <button @click="addRow" class="text-white hover:text-green-500 transition-colors duration-200">
                <PlusCircleIcon class="w-6 h-6" aria-hidden="true" />
            </button>
        </div>
        <div class="max-h-[250px] overflow-y-auto relative" ref="tableContainer" @scroll="handleScroll">
            <table class="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-300">
                <thead v-if="modelValue.length > 0"
                    class="sticky top-0 z-10 text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    <tr>
                        <th scope="col" class="px-4 py-2">{{ keyText }}</th>
                        <th scope="col" class="px-4 py-2">{{ valueText }}</th>
                        <th scope="col" class="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in modelValue" :key="index" class="bg-gray-900 border-b border-gray-700">
                        <td class="px-4 py-2">
                            <input v-model="row.key" type="text"
                                class="bg-transparent text-gray-300 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-500"
                                :placeholder="keyText">
                        </td>
                        <td class="px-4 py-2">
                            <CurrencyInput @keyup.enter="addRow" v-model="row.value" :value-text="valueText" />
                        </td>
                        <td class="px-4 py-2 flex items-center justify-center h-full">
                            <button @click="deleteRow(index)"
                                class="text-red-400 hover:text-red-300 transition-colors duration-200">
                                <TrashIcon class="w-5 h-5" aria-hidden="true" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="isScrollable && !isAtBottom"
                class="absolute bottom-0 left-0 right-0 flex justify-center items-center pointer-events-none"
                :style="{ opacity: scrollIndicatorOpacity }">
                <div class="w-full h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div class="absolute bottom-2 animate-bounce">
                    <ChevronDownIcon class="w-6 h-6 text-blue-400" />
                </div>
            </div>
        </div>
        <div v-if="modelValue.length > 0" :class="`bg-gradient-to-r p-2 ${gradientFrom} ${gradientTo} rounded-b-lg`">
            <div class="flex justify-between text-xs font-semibold text-white">
                <span>Total</span>
                <span>{{ formatCurrency(total) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { PlusCircleIcon, TrashIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted, onUpdated } from 'vue'
import { formatCurrency } from '../lib/useFormatCurrency';
import CurrencyInput from './CurrencyInput.vue';

export default {
    name: 'TableInput',
    components: {
        TrashIcon,
        PlusCircleIcon,
        ChevronDownIcon,
        CurrencyInput
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
        keyText: {
            type: String,
            default: 'Name'
        },
        valueText: {
            type: String,
            default: 'Cost'
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
    setup() {
        const tableContainer = ref(null)
        const isScrollable = ref(false)
        const isAtBottom = ref(false)
        const scrollIndicatorOpacity = ref(1)

        const checkScrollable = () => {
            if (tableContainer.value) {
                isScrollable.value = tableContainer.value.scrollHeight > tableContainer.value.clientHeight
                handleScroll()
            }
        }

        const handleScroll = () => {
            if (tableContainer.value) {
                const { scrollTop, scrollHeight, clientHeight } = tableContainer.value
                isAtBottom.value = scrollHeight - scrollTop === clientHeight

                const scrollableDistance = scrollHeight - clientHeight
                const currentScroll = scrollTop
                scrollIndicatorOpacity.value = 1 - (currentScroll / scrollableDistance)
            }
        }

        onMounted(checkScrollable)
        onUpdated(checkScrollable)

        return {
            tableContainer,
            isScrollable,
            isAtBottom,
            scrollIndicatorOpacity,
            handleScroll
        }
    },
    computed: {
        total() {
            return this.modelValue.reduce((total, row) => total + Number(row.value || 0), 0)
        }
    },
    methods: {
        formatCurrency,
        addRow() {
            this.$emit('update:modelValue', [
                ...this.modelValue,
                { key: '', value: '' }
            ])
        },
        deleteRow(index) {
            this.$emit('update:modelValue', this.modelValue.filter((_, i) => i !== index))
        }
    }
}
</script>