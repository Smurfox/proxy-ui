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
      <div
        v-if="$slots.startContent"
        class="absolute left-3 top-3 flex items-center pointer-events-none"
        :class="[
          inlineLabel && label ? 'top-7' : 'top-3',
          props.error ? 'text-danger' : '',
        ]"
      >
        <slot name="startContent" />
      </div>
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
      <textarea
        :placeholder="placeholder"
        :rows="rows"
        class="w-full text-sm transition-[background-color,border-color]"
        :class="[
          inlineLabel && label ? 'pt-6 pb-3 px-3' : 'p-3',
          $slots.startContent ? 'pl-9!' : '',
          $slots.endContent ? 'pr-9!' : '',
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
      class="text-gray-600 dark:text-[#8B92A0] text-xs"
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
    'border border-default bg-default dark:text-white dark:placeholder:text-[#6B7280] enabled:hover:brightness-95 dark:enabled:hover:brightness-110 focus:ring-2 focus:ring-primary focus:outline-none',
  secondary:
    'border border-default bg-card enabled:hover:bg-default dark:text-white dark:placeholder:text-[#6B7280] focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none',
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
    inlineLabel?: boolean
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
    inlineLabel: false,
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
