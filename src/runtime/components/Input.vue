<template>
  <div class="flex flex-col gap-1">
    <div v-if="label" class="flex items-start gap-1">
      <label class="dark:text-white" :class="[labelClass]">{{ label }} </label>
      <span v-if="props.required" class="text-danger">*</span>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full p-3 text-sm transition-colors"
      :class="[variants[props.variant], rounded[props.rounded]]"
    />
  </div>
</template>

<script setup lang="ts">
const rounded = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;
type Rounded = keyof typeof rounded;

const variants = {
  default:
    "border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 dark:text-white",
  secondary:
    "border border-gray-200 dark:border-white/10 bg-[#EBEBEC] dark:bg-white/20 dark:text-white",
} as const;
type Variant = keyof typeof variants;

const props = withDefaults(
  defineProps<{
    type?: string;
    label?: string;
    labelClass?: string;
    placeholder?: string;
    rounded?: Rounded;
    variant?: Variant;
    required?: boolean;
  }>(),
  {
    type: "text",
    labelClass: "text-sm font-semibold",
    placeholder: "",
    rounded: "xl",
    variant: "default",
  },
);
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
