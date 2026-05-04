<template>
  <div class="flex flex-col gap-1">
    <div v-if="label" class="flex items-start gap-1">
      <label class="dark:text-white" :class="[labelClass]">{{ label }} </label>
      <span v-if="props.required" class="text-danger">*</span>
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
      <input
        :type="type"
        :placeholder="placeholder"
        class="w-full p-3 text-sm transition-colors"
        :class="[
          $slots.startContent ? 'pl-9' : '',
          $slots.endContent ? 'pr-9' : '',
          rounded[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70' : '',
        ]"
        :value="modelValue"
        :disabled="props.disabled"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
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
      class="text-gray-600 dark:text-white/60 text-xs"
    >
      {{ description }}
    </p>
    <!-- error message fuera de contenedor relativo -->
    <p v-if="props.error" class="text-danger text-xs mt-1">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { InputVariant, InputRounded } from "../types";

const rounded = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

const variants = {
  default:
    "border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-white/20 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary focus:outline-none",
  secondary:
    "border border-gray-200 dark:border-white/10 bg-[#EBEBEC] dark:bg-white/20 dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-primary focus:outline-none",
} as const;
const errorVariants = {
  default:
    "border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none",
  secondary:
    "border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none",
} as const;

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    type?: string;
    label?: string;
    labelClass?: string;
    placeholder?: string;
    description?: string;
    rounded?: InputRounded;
    variant?: InputVariant;
    required?: boolean;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    type: "text",
    labelClass: "text-sm font-semibold",
    rounded: "xl",
    variant: "default",
    required: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();
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
