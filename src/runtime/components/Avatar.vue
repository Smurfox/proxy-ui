<template>
  <div
    class="flex items-center justify-center bg-gray-200 dark:bg-white/10"
    :class="[
      !hasText ? 'text-black dark:text-white' : '',
      sizes[props.size],
      rounded[props.rounded],
    ]"
  >
    <h1 v-if="props.label">{{ props.label }}</h1>
    <Icon v-else-if="props.icon" :name="props.icon" />
    <img
      v-else-if="props.image"
      :src="props.image"
      alt="Avatar"
      class="object-cover w-full h-full"
      :class="rounded[props.rounded]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { AvatarSize, AvatarRounded } from "../types";

const attrs = useAttrs();

const sizes = {
  sm: "w-11 h-11",
  md: "w-13 h-13",
  lg: "w-15 h-15",
  full: "w-full h-full",
} as const;
const rounded = {
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
    icon?: string;
    image?: string;
    size?: AvatarSize;
    rounded?: AvatarRounded;
  }>(),
  {
    size: "md",
    rounded: "full",
  },
);

const textSizes =
  /(?:^|:)text-(xs|sm|base|lg|xl|\d*xl|wrap|nowrap|pretty|balance)$/;
const hasText = computed(() => {
  const cls = typeof attrs.class === "string" ? attrs.class : "";
  return cls
    .split(" ")
    .some((c) => /(?:^|:)text-/.test(c) && !textSizes.test(c));
});
</script>

<style scoped></style>
