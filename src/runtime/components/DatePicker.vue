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
      ref="datePickerRef"
      class="relative w-full"
    >
      <div
        v-if="$slots.startContent"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
        :class="props.error ? 'text-danger' : 'dark:text-white/60'"
      >
        <slot name="startContent" />
      </div>

      <button
        type="button"
        class="w-full text-sm text-left transition-colors flex items-center justify-between gap-3"
        :class="[
          inlineLabel && label ? 'pt-2 pb-2.5 px-3' : 'p-3',
          $slots.startContent ? 'pl-9' : '',
          $slots.endContent ? 'pr-9' : '',
          roundedClasses[props.rounded],
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
            class="truncate w-full"
            :class="!displayValue ? 'text-gray-500 dark:text-white/50' : ''"
          >{{ displayValue || placeholderText }}</span>
        </div>
        <Icon
          v-if="!$slots.endContent"
          name="lucide:calendar"
          class="shrink-0"
          :class="
            props.error ? 'text-danger' : 'text-gray-400 dark:text-white/60'
          "
        />
      </button>

      <div
        v-if="$slots.endContent"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
      >
        <slot name="endContent" />
      </div>

      <Teleport
        v-if="isOpen && !props.disabled"
        to="body"
      >
        <AnimatePresence>
          <motion.div
            v-if="isOpen && !props.disabled"
            :initial="{ scale: 0.96, opacity: 0, y: popoverMotionOffset }"
            :animate="{ scale: 1, opacity: 1, y: 0 }"
            :exit="{ scale: 0.96, opacity: 0, y: popoverMotionOffset }"
            class="fixed w-72"
            :class="[
              { dark: isDarkMode },
              popoverPlacement === 'top' ? 'origin-bottom' : 'origin-top',
            ]"
            :style="popoverStyle"
            @click.stop
          >
            <Calendar
              :model-value="props.modelValue"
              :min="props.min"
              :max="props.max"
              :lang="props.lang"
              :locale="props.locale"
              :min-year="props.minYear"
              :max-year="props.maxYear"
              @update:model-value="onPick"
            />
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
import type { DatePickerLang, InputRounded, InputVariant } from '../types'
import { createPopoverGroup } from '../composables/popoverGroup'
import Calendar from './Calendar.vue'

const popoverGroup = createPopoverGroup()
</script>

<script setup lang="ts">
const roundedClasses = {
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

const langTexts = {
  en: { placeholder: 'mm/dd/yyyy' },
  es: { placeholder: 'dd/mm/aaaa' },
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string
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
    min?: string
    max?: string
    lang?: DatePickerLang
    locale?: string
    minYear?: number
    maxYear?: number
  }>(),
  {
    modelValue: '',
    labelClass: 'text-sm font-semibold',
    inlineLabel: false,
    rounded: 'xl',
    variant: 'default',
    required: false,
    disabled: false,
    lang: 'en',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// `locale` overrides the Intl formatting without touching the UI texts; when
// omitted it follows `lang`.
const dateLocale = computed(() => props.locale ?? props.lang)

const placeholderText = computed(
  () => props.placeholder ?? langTexts[props.lang].placeholder,
)

const datePickerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const isDarkMode = ref(false)
const popoverPosition = ref({ top: 0, bottom: 0, left: 0 })
const popoverPlacement = ref<'bottom' | 'top'>('bottom')

function parseISODate(iso: string | undefined | null) {
  if (!iso) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const y = Number(match[1])
  const m = Number(match[2])
  const d = Number(match[3])
  if (!y || !m || !d) return null
  return { y, m, d }
}

const selectedParts = computed(() => parseISODate(props.modelValue))

const displayValue = computed(() => {
  const parsed = selectedParts.value
  if (!parsed) return ''
  return new Intl.DateTimeFormat(dateLocale.value, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(parsed.y, parsed.m - 1, parsed.d))
})

const popoverStyle = computed(() => {
  const pos = popoverPosition.value
  const style: Record<string, string | number> = {
    left: `${pos.left}px`,
    zIndex: 9999,
  }
  if (popoverPlacement.value === 'top') {
    style.bottom = `${pos.bottom}px`
  }
  else {
    style.top = `${pos.top}px`
  }
  return style
})

// Animate from the side the calendar actually opens toward.
const popoverMotionOffset = computed(() =>
  popoverPlacement.value === 'top' ? 6 : -6,
)

function syncDarkMode() {
  isDarkMode.value = Boolean(datePickerRef.value?.closest('.dark'))
}

function calculatePosition() {
  if (!datePickerRef.value) return
  syncDarkMode()

  const rect = datePickerRef.value.getBoundingClientRect()
  const popoverWidth = 288
  const margin = 8
  // The popover is position: fixed, so coordinates are viewport-relative —
  // never add scroll offsets.
  let left = rect.left
  const viewportRight = window.innerWidth
  if (left + popoverWidth + margin > viewportRight) {
    left = Math.max(margin, viewportRight - popoverWidth - margin)
  }

  // Flip the calendar above the trigger when there isn't enough room below
  // (e.g. the field sits near the bottom of the viewport).
  const estimatedHeight = 360
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  popoverPlacement.value
    = spaceBelow < estimatedHeight + margin && spaceAbove > spaceBelow
      ? 'top'
      : 'bottom'

  popoverPosition.value = {
    top: rect.bottom + margin,
    bottom: window.innerHeight - rect.top + margin,
    left,
  }
}

async function toggle() {
  if (props.disabled) return

  if (isOpen.value) {
    close()
    return
  }

  popoverGroup.open(close)
  await nextTick()
  calculatePosition()
  isOpen.value = true
}

function close() {
  isOpen.value = false
  popoverGroup.release(close)
}

function onPick(value: string) {
  emit('update:modelValue', value)
  close()
}

function onClickOutside(event: MouseEvent) {
  if (
    datePickerRef.value
    && !datePickerRef.value.contains(event.target as Node)
  ) {
    close()
  }
}

function onScroll() {
  if (isOpen.value) calculatePosition()
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) close()
}

onMounted(() => {
  syncDarkMode()
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeyDown)
  window.addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onScroll)
  popoverGroup.release(close)
})
</script>
