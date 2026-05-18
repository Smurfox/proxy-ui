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
          ref="menuRef"
          :initial="{ scale: 0.9, opacity: 0, y: -10 }"
          :exit="{ opacity: 0 }"
          :animate="{ scale: 1, opacity: 1, y: 0 }"
          :style="menuStyle"
          :class="[
            'fixed z-50 origin-top-right bg-white border border-gray-100 rounded-xl shadow-xl dark:bg-[#18181B] dark:border-black/40',
            props.menuMinWidth,
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
let activeClose: (() => void) | null = null
</script>

<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { ref, reactive, onMounted, onUnmounted, provide, nextTick, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    menuMinWidth?: string
  }>(),
  {
    menuMinWidth: 'min-w-52',
  },
)

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)
const activatorRef = ref<HTMLDivElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const menuStyle = reactive<Record<string, string>>({
  top: '0px',
  right: '0px',
})

const updatePosition = () => {
  if (!activatorRef.value) return
  const rect = activatorRef.value.getBoundingClientRect()
  menuStyle.top = `${rect.bottom + 8}px`
  menuStyle.right = `${window.innerWidth - rect.right}px`
}

const close = () => {
  isOpen.value = false
  if (activeClose === close) activeClose = null
}

const toggle = () => {
  if (isOpen.value) {
    close()
    return
  }
  if (activeClose && activeClose !== close) activeClose()
  activeClose = close
  isOpen.value = true
  nextTick(updatePosition)
}

provide('closeDropdown', close)

const onClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const insideActivator = dropdownRef.value?.contains(target)
  const insideMenu = menuRef.value?.contains(target)
  if (!insideActivator && !insideMenu) {
    setTimeout(() => close(), 10)
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
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  if (activeClose === close) activeClose = null
})
</script>
