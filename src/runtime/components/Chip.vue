<template>
  <div
    :class="[
      sizes[size],
      variantClasses[variant],
      getColorBtn(variant, color),
      roundedClasses[rounded],
    ]"
    class="flex items-center justify-center"
  >
    <Icon v-if="startIcon" :name="startIcon" :size="iconSize" class="mr-1" />
    <slot v-if="!label" />
    <span v-else class="font-medium">{{ label }}</span>
    <Icon v-if="endIcon" :name="endIcon" :size="iconSize" class="ml-1" />
  </div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import type { ChipSize, ChipVariant, ChipColor, ChipRounded } from "../types";

const sizes = {
  sm: "text-xs min-w-18 py-1 px-2",
  md: "text-xs min-w-20 py-1.5 px-2",
  lg: "text-sm min-w-24 py-2 px-4",
} as const;

const variantClasses = {
  default: "",
  secondary: "",
  outline: "",
  ghost: "",
  flat: "",
} as const;

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: ChipSize;
    variant?: ChipVariant;
    color?: ChipColor;
    rounded?: ChipRounded;
    startIcon?: string;
    endIcon?: string;
    customClass?: string;
    iconSize?: string;
  }>(),
  {
    size: "md",
    variant: "default",
    color: "default",
    rounded: "full",
  },
);

// #region Color Logic
const defaultColorClasses = {
  default: "bg-gray-200/80 dark:bg-white/10 text-black dark:text-white",
  ios: "bg-blue-500 text-white",
  primary: "bg-primary text-white",
  danger: "bg-danger text-black",
  success: "bg-success text-black",
  warning: "bg-warning text-black",
} as const;

const secondaryColorClasses = {
  default: "bg-gray-100 dark:bg-white/5 text-black dark:text-white",
  ios: "bg-gray-200/60 dark:bg-white/7 text-blue-500",
  primary: "bg-gray-200/60 dark:bg-white/7 text-primary",
  danger: "bg-gray-200/60 dark:bg-white/7 text-danger",
  success: "bg-gray-200/60 dark:bg-white/7 text-success",
  warning: "bg-gray-200/60 dark:bg-white/7 text-warning",
} as const;

const outlineColorClasses = {
  default:
    "border border-gray-300 text-black dark:border-white/15 dark:text-white",
  ios: "border border-blue-500 text-blue-500",
  primary: "border border-primary text-primary",
  danger: "border border-danger text-danger",
  success: "border border-success text-success",
  warning: "border border-warning text-warning",
} as const;

const flatColorClasses = {
  default: "bg-gray-100 dark:bg-white/5 text-black dark:text-white",
  ios: "bg-blue-500/15 text-blue-500",
  primary: "bg-primary/15 text-primary",
  danger: "bg-danger/15 text-danger",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
} as const;

function getColorBtn(variant: ChipVariant, color: ChipColor) {
  if (color === "custom") return props.customClass ?? "";
  switch (variant) {
    case "secondary":
      return secondaryColorClasses[color];
    case "outline":
      return outlineColorClasses[color];
    case "flat":
      return flatColorClasses[color];
    default:
      return defaultColorClasses[color];
  }
}
// #endregion
</script>
<style scoped></style>
