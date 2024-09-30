<template>
    <input :value="formattedValue" @input="updateValue" @blur="formatOnBlur" @focus="selectAll" type="text"
        class="bg-transparent text-gray-300 text-sm focus:ring-blue-500 focus:outline-none block w-full px-0 dark:placeholder-gray-500"
        :placeholder="valueText">
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
    props: {
        modelValue: {
            type: [Number, String],
            default: 0
        },
        valueText: {
            type: String,
            default: 'Enter value'
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const inputValue = ref(props.modelValue)

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        }

        const formattedValue = computed(() => {
            return formatCurrency(inputValue.value)
        })

        const updateValue = (event) => {
            let value = event.target.value.replace(/[^\d.-]/g, '')
            value = parseFloat(value)
            if (isNaN(value)) value = 0
            inputValue.value = value
            emit('update:modelValue', parseFloat(value))
        }

        const formatOnBlur = () => {
            inputValue.value = parseFloat(inputValue.value).toFixed(2)
        }

        const selectAll = (event) => {
            event.target.select()
        }

        watch(() => props.modelValue, (newValue) => {
            inputValue.value = newValue
        })

        return {
            formattedValue,
            updateValue,
            formatOnBlur,
            selectAll
        }
    }
}
</script>