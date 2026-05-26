<template>
  <div
    ref="dropdownRef"
    class="relative inline-block text-left"
  >
    <div
      ref="activatorRef"
      @click="toggle"
    >
      <slot name="activator" />
    </div>

    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          :initial="{ scale: 0.9, opacity: 0, y: -10 }"
          :exit="{ opacity: 0 }"
          :animate="{ scale: 1, opacity: 1, y: 0 }"
          :style="menuStyle"
          :class="[
            'fixed z-50 origin-top-right bg-card border border-gray-100 rounded-xl shadow-xl dark:border-[#2D323B] text-black dark:text-white',
            props.menuMinWidth,
            { dark: isDarkMode },
          ]"
          @click="handleContentClick"
        >
          <slot name="content" />
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { ref, reactive, onMounted, onUnmounted, provide, nextTick, watch } from 'vue'
import { createPopoverGroup } from '../composables/popoverGroup'

const popoverGroup = createPopoverGroup()
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    menuMinWidth?: string
  }>(),
  {
    menuMinWidth: 'min-w-52',
  },
)

const isOpen = ref(false)
const isDarkMode = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)
const activatorRef = ref<HTMLDivElement | null>(null)

const menuStyle = reactive<Record<string, string>>({
  top: '0px',
  right: '0px',
})

const syncDarkMode = () => {
  isDarkMode.value = Boolean(dropdownRef.value?.closest('.dark'))
}

const updatePosition = () => {
  if (!activatorRef.value) return
  syncDarkMode()
  const rect = activatorRef.value.getBoundingClientRect()
  menuStyle.top = `${rect.bottom + 8}px`
  menuStyle.right = `${window.innerWidth - rect.right}px`
}

const close = () => {
  isOpen.value = false
  popoverGroup.release(close)
}

const toggle = () => {
  if (isOpen.value) {
    close()
    return
  }
  popoverGroup.open(close)
  isOpen.value = true
  nextTick(updatePosition)
}

provide('closeDropdown', close)

const onClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node
  if (!dropdownRef.value?.contains(target)) {
    close()
  }
}

const handleContentClick = (event: MouseEvent) => {
  event.stopPropagation()
}

watch(isOpen, (open) => {
  if (open) {
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  }
  else {
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  }
})

onMounted(() => {
  syncDarkMode()
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  popoverGroup.release(close)
})
</script>
