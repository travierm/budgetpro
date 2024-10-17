<script>
const COLOR_VARIANTS = {
    green: 'border-green-500 text-green-400 hover:bg-green-500',
    blue: 'border-blue-500 text-blue-400 hover:bg-blue-500',
    red: 'border-red-500 text-red-400 hover:bg-red-500',
    yellow: 'border-yellow-500 text-yellow-400 hover:bg-yellow-500',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    text: String,
    icon: [Object, Function],
    color: {
        type: String,
        default: 'green',
        validator: (value) => Object.keys(COLOR_VARIANTS).includes(value)
    },
    disabled: Boolean,
});

const emit = defineEmits(['click']);

const baseClasses = 'rounded-full flex items-center px-4 py-2 bg-transparent transition-colors duration-200 border hover:text-black';

const buttonClasses = computed(() => [
    baseClasses,
    COLOR_VARIANTS[props.color],
    { 'opacity-50 cursor-not-allowed': props.disabled }
]);

const handleClick = (event) => {
    if (!props.disabled) {
        emit('click', event);
    }
};
</script>

<template>
    <button @click="handleClick" :disabled="disabled" :class="buttonClasses">
        <component :is="icon" class="w-5 h-5 mr-2" aria-hidden="true" v-if="icon" />
        <slot></slot>
    </button>
</template>