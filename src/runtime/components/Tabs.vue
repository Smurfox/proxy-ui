<template>
  <div
    :class="
      variant === 'underline'
        ? [
          'flex',
          underlineContainerSizes[size],
          colors.bg,
          colors.border,
          isVertical ? 'flex-col w-fit border-l' : 'flex-row w-full border-b',
        ]
        : [
          'inline-flex',
          containerSizes[size],
          colors.bg,
          roundedClasses[rounded],
          isVertical ? 'flex-col w-fit' : 'flex-row w-fit',
        ]
    "
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="relative flex items-center"
      :disabled="isDisabled(tab)"
      :class="[
        'font-medium transition-colors duration-200',
        variant === 'underline' ? underlineSizes[size] : sizes[size],
        variant === 'underline' ? 'rounded-none' : roundedClasses[rounded],
        isDisabled(tab)
          ? 'text-black/30 dark:text-white/40'
          : modelValue === tab.value
            ? colors.activeText + ' cursor-pointer'
            : colors.inactiveText + ' cursor-pointer',
      ]"
      @click="!isDisabled(tab) && emit('update:modelValue', tab.value)"
    >
      <motion.div
        v-if="modelValue === tab.value"
        :layout-id="layoutId"
        :class="[
          colors.btn,
          variant === 'underline'
            ? isVertical
              ? 'absolute inset-y-0 -left-px w-0.5'
              : 'absolute inset-x-0 -bottom-px h-0.5'
            : ['absolute inset-0 shadow-sm', roundedClasses[rounded]],
        ]"
        :transition="{ type: 'spring', stiffness: 400, damping: 35 }"
      />
      <Icon
        v-if="tab.icon"
        :name="tab.icon"
        :size="iconSize ?? iconSizes[size]"
        class="relative z-10"
      />
      <span class="relative z-10">{{ tab.label }}</span>
      <span
        v-if="tab.badge !== undefined"
        class="relative z-10 inline-flex items-center justify-center rounded-full font-semibold tabular-nums transition-colors duration-200"
        :class="[
          badgeSizes[size],
          modelValue === tab.value ? colors.activeBadge : colors.inactiveBadge,
          isDisabled(tab) && 'opacity-50',
        ]"
      >
        {{ tab.badge }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { motion } from 'motion-v'
import type { TabItem, TabsProps } from '../types'

const roundedClasses = {
  'none': 'rounded-none',
  'xs': 'rounded-xs',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
} as const

const sizes = {
  sm: 'gap-1.5 px-2.5 py-1 text-xs',
  md: 'gap-2 px-4 py-1.5 text-sm',
  lg: 'gap-2 px-5 py-2 text-base',
} as const

const underlineSizes = {
  sm: 'gap-1.5 px-2.5 py-2 text-xs',
  md: 'gap-2 px-3 py-3 text-sm',
  lg: 'gap-2 px-4 py-3.5 text-base',
} as const

const containerSizes = {
  sm: 'gap-0.5 p-0.5',
  md: 'gap-1 p-1',
  lg: 'gap-1 p-1.5',
} as const

const underlineContainerSizes = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
} as const

const iconSizes = {
  sm: 13,
  md: 15,
  lg: 17,
} as const

const badgeSizes = {
  sm: 'min-w-4 h-4 px-1 text-[10px]',
  md: 'min-w-5 h-5 px-1.5 text-xs',
  lg: 'min-w-6 h-6 px-2 text-sm',
} as const

// Color defaults depend on the variant, so they're resolved here instead of in withDefaults
const variantColors = {
  default: {
    bg: 'bg-black/5 dark:bg-white/10',
    btn: 'bg-white dark:bg-white/10',
    border: '',
    activeText: 'text-black dark:text-white',
    inactiveText:
      'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white',
    activeBadge: 'bg-primary text-white',
    inactiveBadge: 'bg-black/10 text-black/70 dark:bg-white/15 dark:text-white/70',
  },
  underline: {
    bg: '',
    btn: 'bg-primary',
    border: 'border-black/10 dark:border-white/10',
    activeText: 'text-primary',
    inactiveText:
      'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white',
    activeBadge: 'bg-primary text-white',
    inactiveBadge: 'bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/70',
  },
} as const

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  variant: 'default',
  size: 'md',
  rounded: 'lg',
  disabledTabs: () => [],
  isVertical: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const colors = computed(() => {
  const defaults = variantColors[props.variant]
  return {
    bg: props.bgColor ?? defaults.bg,
    btn: props.btnColor ?? defaults.btn,
    border: props.borderColor ?? defaults.border,
    activeText: props.activeTextColor ?? defaults.activeText,
    inactiveText: props.inactiveTextColor ?? defaults.inactiveText,
    activeBadge: props.activeBadgeColor ?? defaults.activeBadge,
    inactiveBadge: props.inactiveBadgeColor ?? defaults.inactiveBadge,
  }
})

function isDisabled(tab: TabItem) {
  return tab.disabled || props.disabledTabs.includes(tab.value)
}

// Per-instance layout id so multiple PUTabs on the same page don't share one indicator
const layoutId = `tab-indicator-${useId()}`
</script>

<style scoped></style>
