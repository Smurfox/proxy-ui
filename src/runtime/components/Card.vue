<template>
  <div
    :class="[
      !hasBg ? 'bg-white dark:bg-white/5' : '',
      !hasPadding ? 'p-4' : '',
      !hasShadow ? 'shadow-(--shadow-ios)' : '',
      !hasRounded ? 'rounded-2xl' : '',
      customClass,
      isBordered ? 'border border-gray-200 dark:border-white/5' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CardVariant } from "../types";

const props = withDefaults(
  defineProps<{
    variant?: CardVariant;
    customClass?: string;
    isBordered?: boolean;
  }>(),
  {
    isBordered: false,
  },
);

const hasBg = computed(() =>
  props.customClass?.split(" ").some((c) => c.startsWith("bg-")),
);
const hasPadding = computed(() =>
  props.customClass?.split(" ").some((c) => /^p[xytblrse]?-/.test(c)),
);
const hasShadow = computed(() =>
  props.customClass?.split(" ").some((c) => c.startsWith("shadow-")),
);
const hasRounded = computed(() =>
  props.customClass?.split(" ").some((c) => c.startsWith("rounded-")),
);
</script>

<style scoped></style>
