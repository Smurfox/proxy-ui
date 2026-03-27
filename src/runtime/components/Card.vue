<template>
  <div
    :class="[
      !hasBg ? 'bg-white dark:bg-white/5' : '',
      !hasPadding ? 'p-4' : '',
      customClass,
      roundedClasses[rounded],
      shadowClasses[shadow],
      isBordered ? 'border border-gray-200 dark:border-white/5' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CardRounded, CardShadow } from "../types";

const roundedClasses = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
} as const;

const shadowClasses = {
  none: "shadow-none",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl",
  ios: "shadow-(--shadow-ios)",
} as const;

const props = withDefaults(
  defineProps<{
    rounded?: CardRounded;
    customClass?: string;
    shadow?: CardShadow;
    isBordered?: boolean;
  }>(),
  {
    rounded: "3xl",
    shadow: "ios",
    isBordered: true,
  },
);

const hasBg = computed(() =>
  props.customClass?.split(" ").some((c) => c.startsWith("bg-")),
);
const hasPadding = computed(() =>
  props.customClass?.split(" ").some((c) => /^p[xytblrse]?-/.test(c)),
);
</script>

<style scoped></style>
