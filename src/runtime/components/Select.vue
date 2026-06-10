<template>
  <div class="flex flex-col gap-1">
    <div
      v-if="label && !inlineLabel"
      class="flex items-start gap-1"
    >
      <label
        class="dark:text-white"
        :class="[labelClass]"
      >{{ label }} </label>
      <span
        v-if="props.required"
        class="text-danger"
      >*</span>
    </div>

    <div
      ref="selectRef"
      class="relative w-full text-left"
    >
      <button
        type="button"
        class="w-full text-sm text-left transition-colors flex items-center justify-between gap-3"
        :class="[
          inlineLabel && label ? 'pt-2 pb-2.5 px-3' : 'p-3',
          roundedVariants[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
        ]"
        :disabled="props.disabled"
        @click.stop="toggle"
      >
        <div class="flex flex-col items-start min-w-0 flex-1 leading-tight">
          <span
            v-if="inlineLabel && label"
            class="text-xs font-medium"
            :class="props.error ? 'text-danger' : 'text-gray-600 dark:text-white/60'"
          >
            {{ label }}<span
              v-if="props.required"
              class="text-danger ml-0.5"
            >*</span>
          </span>
          <span
            v-if="!selectedOption"
            class="truncate w-full text-gray-500 dark:text-white/50"
          >{{ placeholder }}</span>
          <slot
            v-else
            name="selected"
            :option="selectedOption"
          >
            <span class="truncate w-full">{{ selectedOption.label }}</span>
          </slot>
        </div>
        <Icon
          name="mdi:chevron-down"
          class="text-gray-400 transition-transform duration-200 shrink-0"
          :class="{ 'rotate-180': isOpen && !props.disabled }"
        />
      </button>

      <Teleport
        v-if="isOpen && !props.disabled"
        to="body"
      >
        <AnimatePresence>
          <motion.div
            v-if="isOpen && !props.disabled"
            :initial="{ scale: 0.96, opacity: 0, y: dropdownMotionOffset }"
            :animate="{ scale: 1, opacity: 1, y: 0 }"
            :exit="{ scale: 0.96, opacity: 0, y: dropdownMotionOffset }"
            class="fixed p-2 max-h-56 overflow-y-auto border border-default rounded-xl shadow-xl bg-card text-black dark:text-white"
            :class="[
              { dark: isDarkMode },
              dropdownPlacement === 'top' ? 'origin-bottom' : 'origin-top',
            ]"
            :style="dropdownStyle"
            @click.stop
          >
            <div
              v-if="props.options.length === 0"
              class="px-4 py-2 text-sm text-center text-black/50 dark:text-[#8B92A0]"
            >
              No available options
            </div>
            <template v-else>
              <button
                v-for="option in props.options"
                :key="String(option.value)"
                type="button"
                class="w-full flex items-center justify-between gap-3 px-3 py-2 mb-1 text-left cursor-pointer rounded-lg transition-colors hover:bg-default"
                :class="option.value === props.modelValue ? 'bg-primary/10 dark:bg-primary/15' : ''"
                @click.stop="selectOption(option)"
              >
                <slot
                  name="option"
                  :option="option"
                  :selected="option.value === props.modelValue"
                >
                  <span
                    class="text-sm truncate"
                    :class="
                      option.value === props.modelValue
                        ? 'text-primary'
                        : 'text-black dark:text-white'
                    "
                  >
                    {{ option.label }}
                  </span>
                </slot>
                <Icon
                  v-if="option.value === props.modelValue"
                  name="mdi:check"
                  class="text-primary text-sm shrink-0"
                />
              </button>
            </template>
          </motion.div>
        </AnimatePresence>
      </Teleport>
    </div>

    <p
      v-if="description && !props.error"
      class="text-gray-600 dark:text-[#8B92A0] text-xs"
    >
      {{ description }}
    </p>
    <p
      v-if="props.error"
      class="text-danger text-xs mt-1"
    >
      {{ props.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { InputRounded, InputVariant, SelectOption } from '../types'
import { createPopoverGroup } from '../composables/popoverGroup'

const popoverGroup = createPopoverGroup()
</script>

<script setup lang="ts">
const roundedVariants = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
} as const

const variants = {
  default:
    'border border-default bg-default dark:text-white enabled:hover:brightness-95 dark:enabled:hover:brightness-110 focus:ring-2 focus:ring-primary focus:outline-none',
  secondary:
    'border border-default bg-card enabled:hover:bg-default dark:text-white focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none',
} as const

const errorVariants = {
  default:
    'border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none',
  secondary:
    'border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none',
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    options?: SelectOption[]
    label?: string
    labelClass?: string
    inlineLabel?: boolean
    placeholder?: string
    description?: string
    rounded?: InputRounded
    variant?: InputVariant
    required?: boolean
    error?: string
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    options: () => [],
    labelClass: 'text-sm font-semibold',
    inlineLabel: false,
    placeholder: 'Seleccionar',
    rounded: 'xl',
    variant: 'default',
    required: false,
    error: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

defineSlots<{
  selected?: (props: { option: SelectOption }) => unknown
  option?: (props: { option: SelectOption, selected: boolean }) => unknown
}>()

const selectRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const isDarkMode = ref(false)
const dropdownPosition = ref({ top: 0, bottom: 0, left: 0, width: 0 })
const dropdownPlacement = ref<'bottom' | 'top'>('bottom')

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const dropdownStyle = computed(() => {
  const pos = dropdownPosition.value
  const style: Record<string, string | number> = {
    left: `${pos.left}px`,
    width: `${pos.width}px`,
    zIndex: 9999,
  }
  if (dropdownPlacement.value === 'top') {
    style.bottom = `${pos.bottom}px`
  }
  else {
    style.top = `${pos.top}px`
  }
  return style
})

// Animate from the side the dropdown actually opens toward.
const dropdownMotionOffset = computed(() =>
  dropdownPlacement.value === 'top' ? 6 : -6,
)

function syncDarkMode() {
  isDarkMode.value = Boolean(selectRef.value?.closest('.dark'))
}

function calculateDropdownPosition() {
  if (!selectRef.value) {
    return
  }

  syncDarkMode()

  const rect = selectRef.value.getBoundingClientRect()
  const gap = 8
  const viewportHeight = window.innerHeight

  // The panel is position: fixed, so coordinates are viewport-relative — never
  // add scroll offsets. Flip it above the trigger when there isn't enough room
  // below (e.g. the select sits near the bottom of the viewport), so its
  // options stay on-screen and clickable.
  const estimatedHeight = Math.min(props.options.length * 44 + 16, 224)
  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top
  dropdownPlacement.value
    = spaceBelow < estimatedHeight + gap && spaceAbove > spaceBelow
      ? 'top'
      : 'bottom'

  dropdownPosition.value = {
    top: rect.bottom + gap,
    bottom: viewportHeight - rect.top + gap,
    left: rect.left,
    width: rect.width,
  }
}

async function toggle() {
  if (props.disabled) {
    return
  }

  if (isOpen.value) {
    close()
    return
  }

  popoverGroup.open(close)
  await nextTick()
  calculateDropdownPosition()
  isOpen.value = true
}

function close() {
  isOpen.value = false
  popoverGroup.release(close)
}

function selectOption(option: SelectOption) {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  close()
}

function onClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    close()
  }
}

function onScroll() {
  if (isOpen.value) {
    calculateDropdownPosition()
  }
}

onMounted(() => {
  syncDarkMode()
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onScroll)
  popoverGroup.release(close)
})
</script>
