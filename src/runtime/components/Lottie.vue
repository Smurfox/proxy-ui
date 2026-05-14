<template>
  <ClientOnly>
    <Vue3Lottie
      :loop="loop"
      :height="effectiveHeight"
      :width="effectiveWidth"
      :animation-data="animationData"
    />
    <template #fallback>
      <div
        class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
        :style="{ width: `${effectiveWidth}px`, height: `${effectiveHeight}px` }"
      >
        <div class="text-gray-500 dark:text-gray-400">
          Loading animation...
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

const props = withDefaults(
  defineProps<{
    animationData: object
    loop?: boolean
    height?: number
    width?: number
  }>(),
  {
    loop: true,
    height: 420,
    width: 420,
  },
)

const isMobile = ref(false)
let mq: MediaQueryList | null = null

function handleChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches
}

onMounted(() => {
  mq = window.matchMedia('(max-width: 767px)')
  isMobile.value = mq.matches
  mq.addEventListener('change', handleChange)
})

onUnmounted(() => {
  if (mq) mq.removeEventListener('change', handleChange)
})

const effectiveHeight = computed(() =>
  isMobile.value ? Math.max(props.height - 80, 0) : props.height,
)
const effectiveWidth = computed(() =>
  isMobile.value ? Math.max(props.width - 80, 0) : props.width,
)
</script>

<style scoped></style>
