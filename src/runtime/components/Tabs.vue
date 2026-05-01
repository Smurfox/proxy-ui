<template>
  <div
    class="inline-flex gap-1 p-1"
    :class="[bgColor, roundedClasses[rounded]]"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="relative flex items-center gap-2"
      :disabled="tab.disabled || disabledTabs.includes(tab.value)"
      :class="[
        'px-4 py-1.5 text-sm font-medium transition-colors duration-200',
        roundedClasses[rounded],
        tab.disabled || disabledTabs.includes(tab.value)
          ? 'text-black/30 dark:text-white/40'
          : modelValue === tab.value
            ? activeTextColor + ' cursor-pointer'
            : inactiveTextColor + ' cursor-pointer',
      ]"
      @click="
        !(tab.disabled || disabledTabs.includes(tab.value)) &&
        emit('update:modelValue', tab.value)
      "
    >
      <motion.div
        v-if="modelValue === tab.value"
        layout-id="tab-indicator"
        class="absolute inset-0 shadow-sm"
        :class="[btnColor, roundedClasses[rounded]]"
        :transition="{ type: 'spring', stiffness: 400, damping: 35 }"
      />
      <Icon
        v-if="tab.icon"
        :name="tab.icon"
        :size="iconSize"
        class="relative z-10"
      />
      <span class="relative z-10">{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import type { TabItem, TabsRounded, TabsProps } from "../types";

const roundedClasses = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: "",
  iconSize: 15,
  rounded: "lg",
  bgColor: "bg-black/5 dark:bg-white/10",
  btnColor: "bg-white dark:bg-white/10",
  activeTextColor: "text-black dark:text-white",
  inactiveTextColor:
    "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white",
  disabledTabs: () => [],
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style scoped></style>
