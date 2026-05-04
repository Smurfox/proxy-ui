<template>
  <div class="flex flex-col gap-1">
    <div
      v-if="label"
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
      <div
        v-if="$slots.startContent"
        class="absolute left-3 top-3 flex items-center pointer-events-none"
        :class="props.error ? 'text-danger' : ''"
      >
        <slot name="startContent" />
      </div>
      <textarea
        :placeholder="placeholder"
        :rows="rows"
        class="w-full p-3 text-sm transition-colors"
        :class="[
          $slots.startContent ? 'pl-9' : '',
          $slots.endContent ? 'pr-9' : '',
          resizeVariants[props.resize],
          roundedVariants[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70' : '',
        ]"
        :value="modelValue"
        :disabled="props.disabled"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
      />
      <div
        v-if="$slots.endContent"
        class="absolute right-3 top-3 flex items-center"
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
    <p
      v-if="props.error"
      class="text-danger text-xs mt-1"
    >
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type {
  InputRounded,
  InputVariant,
} from '../types'

type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical'

const roundedVariants = {
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
    'border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-white/20 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary focus:outline-none',
  secondary:
    'border border-gray-200 dark:border-white/10 bg-[#EBEBEC] dark:bg-white/20 dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-primary focus:outline-none',
} as const

const errorVariants = {
  default:
    'border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none',
  secondary:
    'border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none',
} as const

const resizeVariants = {
  none: 'resize-none',
  both: 'resize',
  horizontal: 'resize-x',
  vertical: 'resize-y',
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    labelClass?: string
    placeholder?: string
    description?: string
    rounded?: InputRounded
    variant?: InputVariant
    required?: boolean
    error?: string
    disabled?: boolean
    rows?: number | string
    resize?: TextAreaResize
  }>(),
  {
    labelClass: 'text-sm font-semibold',
    rounded: 'xl',
    variant: 'default',
    required: false,
    disabled: false,
    rows: 4,
    resize: 'vertical',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
