<template>
  <div class="flex flex-col gap-1">
    <div
      v-if="label && !inlineLabel"
      class="flex items-start gap-1"
    >
      <label
        class="dark:text-white"
        :class="[labelClass]"
      >{{ label }} </label>
      <span
        v-if="props.required"
        class="text-danger"
      >*</span>
    </div>
    <div class="relative w-full">
      <!-- startContent -->
      <div
        v-if="$slots.startContent"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
        :class="props.error ? 'text-danger' : ''"
      >
        <slot name="startContent" />
      </div>
      <!-- inline label -->
      <label
        v-if="inlineLabel && label"
        class="absolute top-1.5 text-xs font-medium leading-tight pointer-events-none z-10"
        :class="[
          $slots.startContent ? 'left-9' : 'left-3',
          props.error ? 'text-danger' : 'text-gray-600 dark:text-white/60',
        ]"
      >
        {{ label }}<span
          v-if="props.required"
          class="text-danger ml-0.5"
        >*</span>
      </label>
      <input
        :type="type"
        :placeholder="placeholder"
        class="w-full text-sm transition-colors"
        :class="[
          inlineLabel && label ? 'pt-5 pb-1.5 px-3' : 'p-3',
          $slots.startContent ? 'pl-9!' : '',
          $slots.endContent ? 'pr-9!' : '',
          roundedClasses[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70' : '',
        ]"
        :value="modelValue"
        :disabled="props.disabled"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @focus="handleFocus"
      >
      <!-- endContent -->
      <div
        v-if="$slots.endContent"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
      >
        <slot name="endContent" />
      </div>
    </div>
    <p
      v-if="description && !props.error"
      class="text-gray-600 dark:text-[#8B92A0] text-xs"
    >
      {{ description }}
    </p>
    <!-- error message fuera de contenedor relativo -->
    <p
      v-if="props.error"
      class="text-danger text-xs mt-1"
    >
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { InputVariant, InputRounded } from '../types'

const roundedClasses = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
} as const

const variants = {
  default:
    'border border-default bg-default dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 enabled:hover:brightness-95 dark:enabled:hover:brightness-110 focus:ring-2 focus:ring-primary focus:outline-none',
  secondary:
    'border border-default bg-card enabled:hover:bg-default dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none',
} as const
const errorVariants = {
  default:
    'border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none',
  secondary:
    'border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none',
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    label?: string
    labelClass?: string
    inlineLabel?: boolean
    placeholder?: string
    description?: string
    rounded?: InputRounded
    variant?: InputVariant
    required?: boolean
    error?: string
    disabled?: boolean
    focus?: boolean
  }>(),
  {
    type: 'text',
    labelClass: 'text-sm font-semibold',
    inlineLabel: false,
    rounded: 'xl',
    variant: 'default',
    required: false,
    disabled: false,
    focus: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

// Manejar el evento focus
const handleFocus = (event: Event) => {
  if (props.focus) {
    const target = event.target as HTMLInputElement
    target.select()
  }
}
</script>

<style scoped>
/* Ocultar spinners de input number en Chrome, Safari, Edge */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ocultar spinners de input number en Firefox */
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Eliminar colores de autocompletado del navegador */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px transparent inset !important;
  -webkit-text-fill-color: inherit !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Para modo oscuro - mantener el color del texto */
.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover,
.dark input:-webkit-autofill:focus,
.dark input:-webkit-autofill:active {
  -webkit-text-fill-color: white !important;
}

/* Eliminar fondo de autocompletado en Firefox */
input:-moz-autofill {
  background-color: transparent !important;
}
</style>
