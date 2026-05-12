<template>
  <div
    ref="dropdownRef"
    class="relative inline-block text-left"
  >
    <div @click="toggle">
      <slot name="activator" />
    </div>

    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :initial="{ scale: 0.9, opacity: 0, y: -10 }"
        :exit="{ opacity: 0 }"
        :animate="{ scale: 1, opacity: 1, y: 0 }"
        class="absolute right-0 z-50 mt-2 min-w-52 origin-top-right bg-white border border-gray-100 rounded-xl shadow-xl dark:bg-[#18181B] dark:border-black/40"
        @click="handleContentClick"
      >
        <slot name="content" />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup>
import { AnimatePresence, motion } from 'motion-v'
import { ref, onMounted, onUnmounted, provide } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

// Proveer la función close para que los items del dropdown puedan usarla
provide('closeDropdown', close)

const onClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    setTimeout(() => close(), 10)
  }
}

const handleContentClick = (event) => {
  // No cerramos automáticamente, los items se encargarán de cerrar cuando sea necesario
  event.stopPropagation()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
