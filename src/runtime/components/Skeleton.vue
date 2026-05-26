<template>
  <div
    :class="[
      'skeleton-loader',
      `variant-${variant}`,
      props.variant === 'rectangular' ? 'rounded-xl' : '',
      'overflow-hidden',
      'relative',
      'bg-default',
      heightClass,
      widthClass,
    ]"
  >
    <!-- Shimmer effect -->
    <div class="skeleton-shimmer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  height?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  width?: "full" | "auto" | string;
  variant?: "rectangular" | "circular" | "text";
}

const props = withDefaults(defineProps<Props>(), {
  height: "md",
  width: "full",
  variant: "rectangular",
});

const heightClass = computed(() => {
  if (
    typeof props.height === "string" &&
    !["xs", "sm", "md", "lg", "xl"].includes(props.height)
  ) {
    return props.height;
  }

  const heights = {
    xs: "h-4",
    sm: "h-6",
    md: "h-12",
    lg: "h-16",
    xl: "h-20",
  };
  return heights[props.height as keyof typeof heights];
});

const widthClass = computed(() => {
  if (props.width === "full") return "w-full";
  if (props.width === "auto") return "w-auto";
  return props.width;
});
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

.dark .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

/* Variantes específicas */
.skeleton-loader.variant-circular {
  border-radius: 50%;
}

.skeleton-loader.variant-text {
  border-radius: 4px;
}
</style>
