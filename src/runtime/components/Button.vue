<template>
  <motion.button
    :class="[
      isIconOnly ? iconOnlySizes[size] : sizes[size],
      variantClasses[variant],
      isIconOnly && customClass ? customClass : getColorBtn(variant, color),
      roundedClasses[rounded],
      {
        'opacity-50': disabled || loading,
        'cursor-pointer': !disabled && !loading,
        'pointer-events-none': disabled || loading,
      },
    ]"
    :while-press="disabled || loading ? {} : { scale: 0.95 }"
    class="flex items-center justify-center select-none transition-[color,background-color,opacity,filter] duration-200"
    @click="$emit('click')"
  >
    <template v-if="isIconOnly">
      <Icon v-if="loading" name="svg-spinners:ring-resize" />
      <Icon
        v-else-if="icon"
        :name="icon"
        :size="iconSize"
        :class="iconColor ? `text-${iconColor}` : ''"
      />
    </template>
    <template v-else>
      <Icon v-if="loading" name="svg-spinners:ring-resize" class="mr-2" />
      <Icon v-if="startIcon" :name="startIcon" class="mr-2" />
      <slot v-if="!label" />
      <span v-else class="font-medium">{{ label }}</span>
      <Icon v-if="endIcon" :name="endIcon" class="ml-2" />
    </template>
  </motion.button>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import type {
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  ButtonRounded,
} from "../types";

const sizes = {
  sm: "text-xs min-w-20 py-1.5 px-2",
  md: "text-sm min-w-24 py-2 px-4",
  lg: "text-base min-w-32 py-3 px-6",
} as const;

const iconOnlySizes = {
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-11 text-base",
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
  xs: "rounded-xs",
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
    size?: ButtonSize;
    variant?: ButtonVariant;
    color?: ButtonColor;
    rounded?: ButtonRounded;
    disabled?: boolean;
    loading?: boolean;
    isIconOnly?: boolean;
    icon?: string;
    startIcon?: string;
    endIcon?: string;
    iconSize?: string;
    iconColor?: string;
    customClass?: string;
  }>(),
  {
    size: "md",
    variant: "default",
    color: "default",
    rounded: "lg",
  },
);

// #region Color Logic
const defaultColorClasses = {
  default:
    "bg-gray-200/80 dark:bg-white/10 text-black dark:text-white hover:bg-gray-300/80 dark:hover:bg-white/20",
  ios: "bg-blue-500 text-white hover:brightness-110",
  primary: "bg-primary text-white hover:brightness-110",
  danger: "bg-danger text-black hover:brightness-110",
  success: "bg-success text-black hover:brightness-110",
  warning: "bg-warning text-black hover:brightness-110",
} as const;

const secondaryColorClasses = {
  default:
    "bg-gray-100 dark:bg-white/5 text-black dark:text-white hover:bg-gray-200/80 dark:hover:bg-white/10",
  ios: "bg-gray-200/60 dark:bg-white/7 text-blue-500 hover:bg-gray-200 dark:hover:bg-white/10",
  primary:
    "bg-gray-200/60 dark:bg-white/7 text-primary hover:bg-gray-200 dark:hover:bg-white/10",
  danger:
    "bg-gray-200/60 dark:bg-white/7 text-danger hover:bg-gray-200 dark:hover:bg-white/10",
  success:
    "bg-gray-200/60 dark:bg-white/7 text-success hover:bg-gray-200 dark:hover:bg-white/10",
  warning:
    "bg-gray-200/60 dark:bg-white/7 text-warning hover:bg-gray-200 dark:hover:bg-white/10",
} as const;

const outlineColorClasses = {
  default:
    "border border-gray-300 text-black dark:border-white/15 dark:text-white hover:bg-gray-100/80 dark:hover:bg-white/10",
  ios: "border border-blue-500 text-blue-500 hover:bg-blue-500/15 dark:hover:bg-blue-500/25",
  primary:
    "border border-primary text-primary hover:bg-primary/15 dark:hover:bg-primary/25",
  danger:
    "border border-danger text-danger hover:bg-danger/15 dark:hover:bg-danger/25",
  success:
    "border border-success text-success hover:bg-success/15 dark:hover:bg-success/25",
  warning:
    "border border-warning text-warning hover:bg-warning/15 dark:hover:bg-warning/25",
} as const;

const ghostColorClasses = {
  default:
    "text-black dark:text-white hover:bg-gray-200/60 dark:hover:bg-white/10",
  ios: "text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20",
  primary: "text-primary hover:bg-primary/20 dark:hover:bg-primary/30",
  danger: "text-danger hover:bg-danger/20 dark:hover:bg-danger/30",
  success: "text-success hover:bg-success/20 dark:hover:bg-success/30",
  warning: "text-warning hover:bg-warning/20 dark:hover:bg-warning/30",
} as const;

const flatColorClasses = {
  default:
    "bg-gray-100 dark:bg-white/5 text-black dark:text-white hover:bg-gray-200/80 dark:hover:bg-white/10",
  ios: "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25",
  primary:
    "bg-primary/15 text-primary hover:bg-primary/25 dark:hover:bg-primary/30",
  danger: "bg-danger/15 text-danger hover:bg-danger/25 dark:hover:bg-danger/30",
  success:
    "bg-success/15 text-success hover:bg-success/25 dark:hover:bg-success/30",
  warning:
    "bg-warning/15 text-warning hover:bg-warning/25 dark:hover:bg-warning/30",
} as const;

function getColorBtn(variant: ButtonVariant, color: ButtonColor) {
  if (color === "custom") return props.customClass ?? "";
  switch (variant) {
    case "secondary":
      return secondaryColorClasses[color];
    case "outline":
      return outlineColorClasses[color];
    case "ghost":
      return ghostColorClasses[color];
    case "flat":
      return flatColorClasses[color];
    default:
      return defaultColorClasses[color];
  }
}
// #endregion
</script>
<style scoped></style>
