<template>
  <div
    class="flex items-center gap-2 cursor-pointer select-none"
    @click="toggle"
  >
    <span
      v-if="props.label && props.labelPosition === 'left'"
      :class="['dark:text-white', props.labelClass]"
    >{{ props.label }}</span>
    <div
      class="border border-default flex items-center justify-center overflow-hidden shrink-0"
      :class="[sizeClasses[props.size], roundedClasses[props.rounded]]"
    >
      <AnimatePresence>
        <motion.div
          v-if="props.modelValue"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0, opacity: 0 }"
          :transition="{ duration: 0.2, ease: 'easeInOut' }"
          class="w-full h-full flex items-center justify-center bg-blue-600"
          :class="roundedClasses[props.rounded]"
        >
          <Icon
            name="ic:round-check"
            class="text-white"
            :class="checkSizeClasses[props.size]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
    <span
      v-if="props.label && props.labelPosition === 'right'"
      :class="['dark:text-white', props.labelClass]"
    >{{ props.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import type { CheckboxLabelPosition, CheckboxRounded, CheckboxSize } from '../types'

const sizeClasses = {
  sm: 'w-4 h-4 min-w-4 min-h-4',
  md: 'w-5 h-5 min-w-5 min-h-5',
  lg: 'w-7 h-7 min-w-7 min-h-7',
} as const

const checkSizeClasses = {
  sm: 'text-[10px]',
  md: 'text-sm',
  lg: 'text-xl',
} as const

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const

const props = withDefaults(
  defineProps<{
    label?: string
    modelValue?: boolean
    size?: CheckboxSize
    rounded?: CheckboxRounded
    labelPosition?: CheckboxLabelPosition
    labelClass?: string
  }>(),
  {
    modelValue: false,
    size: 'md',
    rounded: 'md',
    labelPosition: 'right',
    labelClass: 'text-sm',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
