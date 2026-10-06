<template>
  <div
    class="inline-flex"
    :class="[
      containerSizes[size],
      bgColor,
      roundedClasses[rounded],
      isVertical ? 'flex-col w-fit' : 'flex-row w-fit',
    ]"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="relative flex items-center"
      :disabled="tab.disabled || disabledTabs.includes(tab.value)"
      :class="[
        'font-medium transition-colors duration-200',
        sizes[size],
        roundedClasses[rounded],
        tab.disabled || disabledTabs.includes(tab.value)
          ? 'text-black/30 dark:text-white/40'
          : modelValue === tab.value
            ? activeTextColor + ' cursor-pointer'
            : inactiveTextColor + ' cursor-pointer',
      ]"
      @click="
        !(tab.disabled || disabledTabs.includes(tab.value))
          && emit('update:modelValue', tab.value)
      "
    >
      <motion.div
        v-if="modelValue === tab.value"
        :layout-id="layoutId"
        class="absolute inset-0 shadow-sm"
        :class="[btnColor, roundedClasses[rounded]]"
        :transition="{ type: 'spring', stiffness: 400, damping: 35 }"
      />
      <Icon
        v-if="tab.icon"
        :name="tab.icon"
        :size="iconSize ?? iconSizes[size]"
        class="relative z-10"
      />
      <span class="relative z-10">{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { motion } from 'motion-v'
import type { TabsProps } from '../types'

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

const containerSizes = {
  sm: 'gap-0.5 p-0.5',
  md: 'gap-1 p-1',
  lg: 'gap-1 p-1.5',
} as const

const iconSizes = {
  sm: 13,
  md: 15,
  lg: 17,
} as const

withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  size: 'md',
  rounded: 'lg',
  bgColor: 'bg-black/5 dark:bg-white/10',
  btnColor: 'bg-white dark:bg-white/10',
  activeTextColor: 'text-black dark:text-white',
  inactiveTextColor:
    'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white',
  disabledTabs: () => [],
  isVertical: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Per-instance layout id so multiple PUTabs on the same page don't share one indicator
const layoutId = `tab-indicator-${useId()}`
</script>

<style scoped></style>
