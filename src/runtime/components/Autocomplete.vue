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
      <label
        v-if="inlineLabel && label"
        class="absolute top-1.5 left-3 text-xs font-medium leading-tight pointer-events-none z-10"
        :class="props.error ? 'text-danger' : 'text-gray-600 dark:text-white/60'"
      >
        {{ label }}<span
          v-if="props.required"
          class="text-danger ml-0.5"
        >*</span>
      </label>
      <!-- While the selected overlay is visible the input renders no text at
        all (value and placeholder are emptied) instead of using
        text-transparent — `transition-colors` would fade the old text out and
        briefly show it under the overlay. -->
      <input
        ref="inputRef"
        type="text"
        :value="showSelectedOverlay ? '' : searchQuery"
        :placeholder="showSelectedOverlay ? '' : props.placeholder"
        :disabled="props.disabled"
        class="w-full pr-10 text-sm transition-colors"
        :class="[
          inlineLabel && label ? 'pt-5 pb-1.5 px-3' : 'p-3',
          roundedVariants[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-text',
          showSelectedOverlay ? 'caret-transparent' : '',
        ]"
        @input="onInput"
        @focus="open"
        @click.stop="open"
      >

      <!-- Rich display of the selected option. An <input> can't render HTML, so
        the slot content overlays it and only hides while the user is typing,
        so it survives merely opening the dropdown. -->
      <div
        v-if="showSelectedOverlay && selectedOptions.length > 0"
        class="absolute inset-y-0 left-0 right-10 flex items-center overflow-hidden pointer-events-none text-sm text-black dark:text-white"
        :class="inlineLabel && label ? 'pt-4 px-3' : 'px-3'"
      >
        <slot
          name="selected"
          :option="selectedOptions[0]!"
          :options="selectedOptions"
        >
          <span class="truncate">{{ displayText }}</span>
        </slot>
      </div>

      <button
        v-if="(searchQuery || selectedOptions.length > 0) && !props.disabled"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
        @click.stop="clear"
      >
        <Icon
          name="mdi:close-circle"
          size="18"
        />
      </button>
      <Icon
        v-else
        name="mdi:chevron-down"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 pointer-events-none"
        :class="{ 'rotate-180': isOpen && !props.disabled }"
      />

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
              v-if="filteredOptions.length === 0"
              class="px-4 py-2 text-sm text-center text-black/50 dark:text-[#8B92A0]"
            >
              No available options
            </div>
            <template v-else>
              <button
                v-for="option in filteredOptions"
                :key="String(option.value)"
                type="button"
                class="w-full flex items-center justify-between gap-3 px-3 py-2 mb-1 text-left cursor-pointer rounded-lg transition-colors hover:bg-default"
                :class="isSelected(option) ? 'bg-primary/10 dark:bg-primary/15' : ''"
                @click.stop="selectOption(option)"
              >
                <slot
                  name="option"
                  :option="option"
                  :selected="isSelected(option)"
                >
                  <span
                    class="text-sm truncate"
                    :class="
                      isSelected(option)
                        ? 'text-primary'
                        : 'text-black dark:text-white'
                    "
                  >
                    {{ option.label }}
                  </span>
                </slot>
                <Icon
                  v-if="isSelected(option)"
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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { AutocompleteOption, InputRounded, InputVariant } from '../types'
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
    'border border-default bg-default dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 enabled:hover:brightness-95 dark:enabled:hover:brightness-110 focus:ring-2 focus:ring-primary focus:outline-none',
  secondary:
    'border border-default bg-card enabled:hover:bg-default dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none',
} as const

const errorVariants = {
  default:
    'border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none',
  secondary:
    'border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none',
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null | (string | number)[]
    options?: AutocompleteOption[]
    multiple?: boolean
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
    multiple: false,
    labelClass: 'text-sm font-semibold',
    inlineLabel: false,
    placeholder: 'Search...',
    rounded: 'xl',
    variant: 'default',
    required: false,
    error: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | (string | number)[]]
  'change': [value: string | number | null | (string | number)[]]
  'search': [value: string]
}>()

const slots = defineSlots<{
  selected?: (props: { option: AutocompleteOption, options: AutocompleteOption[] }) => unknown
  option?: (props: { option: AutocompleteOption, selected: boolean }) => unknown
}>()

const selectRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const isDarkMode = ref(false)
const dropdownPosition = ref({ top: 0, bottom: 0, left: 0, width: 0 })
const dropdownPlacement = ref<'bottom' | 'top'>('bottom')
const searchQuery = ref('')
const isTyping = ref(false)

const selectedValues = computed<(string | number)[]>(() =>
  Array.isArray(props.modelValue) ? props.modelValue : [],
)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options.filter(option =>
      selectedValues.value.includes(option.value),
    )
  }
  return selectedOption.value ? [selectedOption.value] : []
})

const displayText = computed(() =>
  selectedOptions.value.map(option => option.label).join(', '),
)

function isSelected(option: AutocompleteOption) {
  return props.multiple
    ? selectedValues.value.includes(option.value)
    : option.value === props.modelValue
}

// In multiple mode the input can't represent the selection as editable text,
// so the overlay is also used as the default (slot-less) display.
const showSelectedOverlay = computed(() =>
  Boolean(
    (slots.selected || props.multiple)
    && selectedOptions.value.length > 0
    && !isTyping.value,
  ),
)

const filteredOptions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.options
  if (
    selectedOption.value
    && searchQuery.value === selectedOption.value.label
  ) {
    return props.options
  }
  return props.options.filter(option =>
    option.label.toLowerCase().includes(q),
  )
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

watch(
  () => props.modelValue,
  () => {
    // In multiple mode the selection is displayed by the overlay, not the
    // input text — and the active filter must survive toggling options.
    if (props.multiple) return
    searchQuery.value = selectedOption.value?.label ?? ''
  },
  { immediate: true },
)

function syncDarkMode() {
  isDarkMode.value = Boolean(selectRef.value?.closest('.dark'))
}

function calculateDropdownPosition() {
  if (!selectRef.value) return
  syncDarkMode()
  const rect = selectRef.value.getBoundingClientRect()
  const gap = 8
  const viewportHeight = window.innerHeight

  // The panel is position: fixed, so coordinates are viewport-relative — never
  // add scroll offsets. Flip it above the input when there isn't enough room
  // below, so the options stay on-screen and clickable.
  const rows = Math.max(filteredOptions.value.length, 1)
  const estimatedHeight = Math.min(rows * 44 + 16, 224)
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

async function open() {
  if (props.disabled || isOpen.value) return
  popoverGroup.open(close)
  await nextTick()
  calculateDropdownPosition()
  isOpen.value = true
}

function close() {
  if (!isOpen.value) return
  isOpen.value = false
  popoverGroup.release(close)
  searchQuery.value = props.multiple ? '' : (selectedOption.value?.label ?? '')
  isTyping.value = false
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  isTyping.value = true
  searchQuery.value = value
  emit('search', value)
  if (!isOpen.value) open()
}

function selectOption(option: AutocompleteOption) {
  if (props.multiple) {
    // Toggle membership; keep the dropdown open and the filter intact so the
    // user can pick several options in a row.
    const next = isSelected(option)
      ? selectedValues.value.filter(value => value !== option.value)
      : [...selectedValues.value, option.value]
    emit('update:modelValue', next)
    emit('change', next)
    return
  }
  emit('update:modelValue', option.value)
  emit('change', option.value)
  searchQuery.value = option.label
  isTyping.value = false
  isOpen.value = false
  popoverGroup.release(close)
}

function clear() {
  searchQuery.value = ''
  const cleared = props.multiple ? [] : null
  emit('update:modelValue', cleared)
  emit('change', cleared)
  emit('search', '')
  inputRef.value?.focus()
}

function onClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    close()
  }
}

function onScroll() {
  if (isOpen.value) calculateDropdownPosition()
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
