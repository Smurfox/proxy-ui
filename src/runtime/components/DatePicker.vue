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
            <PUCard>
              <div class="flex items-center justify-between mb-2">
                <PUButton
                  size="sm"
                  rounded="lg"
                  color="primary"
                  variant="ghost"
                  :label="monthLabel"
                  end-icon="mdi:chevron-down"
                  :end-icon-class="showYearView ? 'rotate-180' : ''"
                  custom-class="capitalize text-sm font-bold"
                  @click="toggleYearView"
                />
                <div
                  v-show="!showYearView"
                  class="flex items-center gap-1"
                >
                  <PUButton
                    is-icon-only
                    variant="ghost"
                    color="primary"
                    size="sm"
                    rounded="md"
                    icon="mingcute:left-fill"
                    :disabled="!canPrevMonth"
                    @click="prevMonth"
                  />
                  <PUButton
                    is-icon-only
                    variant="ghost"
                    color="primary"
                    size="sm"
                    rounded="md"
                    icon="mingcute:right-fill"
                    :disabled="!canNextMonth"
                    @click="nextMonth"
                  />
                </div>
              </div>

              <div v-if="!showYearView">
                <div class="grid grid-cols-7 gap-1 mb-1">
                  <div
                    v-for="d in texts.weekdays"
                    :key="d"
                    class="uppercase text-center text-[11px] font-medium py-1"
                    :class="isDarkMode ? 'text-white/50' : 'text-gray-500'"
                  >
                    {{ d }}
                  </div>
                </div>

                <div class="grid grid-cols-7 gap-1">
                  <PUButton
                    v-for="(cell, i) in daysGrid"
                    :key="i"
                    is-icon-only
                    size="sm"
                    rounded="lg"
                    :variant="isSelectedDay(cell) ? 'default' : 'ghost'"
                    :color="isSelectedDay(cell) ? 'primary' : 'default'"
                    :label="cell.d.toString()"
                    :custom-class="cell.otherMonth ? 'opacity-40' : ''"
                    :disabled="cell.disabled"
                    @click="pickDate(cell)"
                  />
                </div>

                <div
                  class="flex items-center justify-between mt-2 pt-2 border-t"
                  :class="isDarkMode ? 'border-[#2D323B]' : 'border-gray-100'"
                >
                  <PUButton
                    :label="texts.clear"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    rounded="md"
                    @click="clearDate"
                  />
                  <PUButton
                    :label="texts.today"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    rounded="md"
                    :disabled="!canPickToday"
                    @click="pickToday"
                  />
                </div>
              </div>

              <div
                v-else
                ref="yearListRef"
                class="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-hide"
              >
                <PUButton
                  v-for="year in yearList"
                  :key="year"
                  :ref="(el) => bindYearRef(el, year)"
                  size="sm"
                  rounded="md"
                  color="primary"
                  :variant="viewYear === year ? 'flat' : 'ghost'"
                  :label="year.toString()"
                  :disabled="!isYearAvailable(year)"
                  @click="pickYear(year)"
                />
              </div>
            </PUCard>
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
import type { DatePickerLang, InputRounded, InputVariant } from '../types'
import { createPopoverGroup } from '../composables/popoverGroup'
import PUButton from './Button.vue'

const popoverGroup = createPopoverGroup()
</script>

<script setup lang="ts">
interface DayCell {
  y: number
  m: number
  d: number
  otherMonth: boolean
  disabled: boolean
}

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
  en: {
    weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    clear: 'Clear',
    today: 'Today',
    placeholder: 'mm/dd/yyyy',
  },
  es: {
    weekdays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    clear: 'Borrar',
    today: 'Hoy',
    placeholder: 'dd/mm/aaaa',
  },
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

const texts = computed(() => langTexts[props.lang])

// `locale` overrides the Intl formatting (month names, date order) without
// touching the UI texts; when omitted it follows `lang`.
const dateLocale = computed(() => props.locale ?? props.lang)

const placeholderText = computed(
  () => props.placeholder ?? texts.value.placeholder,
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const datePickerRef = ref<HTMLDivElement | null>(null)
const yearListRef = ref<HTMLDivElement | null>(null)
const yearButtonRefs = new Map<number, HTMLButtonElement>()

const isOpen = ref(false)
const isDarkMode = ref(false)
const showYearView = ref(false)
const popoverPosition = ref({ top: 0, bottom: 0, left: 0 })
const popoverPlacement = ref<'bottom' | 'top'>('bottom')

const today = new Date()
const todayParts = {
  y: today.getFullYear(),
  m: today.getMonth() + 1,
  d: today.getDate(),
}

const viewYear = ref(todayParts.y)
const viewMonth = ref(todayParts.m)

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

function toISO(y: number, m: number, d: number) {
  return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function compareYMD(
  a: { y: number, m: number, d: number },
  b: { y: number, m: number, d: number },
) {
  if (a.y !== b.y) return a.y - b.y
  if (a.m !== b.m) return a.m - b.m
  return a.d - b.d
}

const minParts = computed(() => parseISODate(props.min))
const maxParts = computed(() => parseISODate(props.max))
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

const monthLabel = computed(() => {
  return new Intl.DateTimeFormat(dateLocale.value, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(viewYear.value, viewMonth.value - 1, 1))
})

function isDateAvailable(y: number, m: number, d: number) {
  const target = { y, m, d }
  if (minParts.value && compareYMD(target, minParts.value) < 0) return false
  if (maxParts.value && compareYMD(target, maxParts.value) > 0) return false
  return true
}

const daysGrid = computed<DayCell[]>(() => {
  const cells: DayCell[] = []
  const firstDow = new Date(viewYear.value, viewMonth.value - 1, 1).getDay()
  const daysInMonth = new Date(viewYear.value, viewMonth.value, 0).getDate()
  const prevMonthDays = new Date(
    viewYear.value,
    viewMonth.value - 1,
    0,
  ).getDate()

  for (let i = firstDow - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = viewMonth.value === 1 ? 12 : viewMonth.value - 1
    const y = viewMonth.value === 1 ? viewYear.value - 1 : viewYear.value
    cells.push({
      y,
      m,
      d,
      otherMonth: true,
      disabled: !isDateAvailable(y, m, d),
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      y: viewYear.value,
      m: viewMonth.value,
      d,
      otherMonth: false,
      disabled: !isDateAvailable(viewYear.value, viewMonth.value, d),
    })
  }

  let next = 1
  while (cells.length < 42) {
    const m = viewMonth.value === 12 ? 1 : viewMonth.value + 1
    const y = viewMonth.value === 12 ? viewYear.value + 1 : viewYear.value
    cells.push({
      y,
      m,
      d: next,
      otherMonth: true,
      disabled: !isDateAvailable(y, m, next),
    })
    next++
  }

  return cells
})

const canPrevMonth = computed(() => {
  if (!minParts.value) return true
  const prevY = viewMonth.value === 1 ? viewYear.value - 1 : viewYear.value
  const prevM = viewMonth.value === 1 ? 12 : viewMonth.value - 1
  return (
    prevY > minParts.value.y
    || (prevY === minParts.value.y && prevM >= minParts.value.m)
  )
})

const canNextMonth = computed(() => {
  if (!maxParts.value) return true
  const nextY = viewMonth.value === 12 ? viewYear.value + 1 : viewYear.value
  const nextM = viewMonth.value === 12 ? 1 : viewMonth.value + 1
  return (
    nextY < maxParts.value.y
    || (nextY === maxParts.value.y && nextM <= maxParts.value.m)
  )
})

const canPickToday = computed(() =>
  isDateAvailable(todayParts.y, todayParts.m, todayParts.d),
)

const yearList = computed(() => {
  const defaultMin = props.minYear ?? todayParts.y - 100
  const defaultMax = props.maxYear ?? todayParts.y + 10
  const lo = minParts.value
    ? Math.max(minParts.value.y, defaultMin)
    : defaultMin
  const hi = maxParts.value
    ? Math.min(maxParts.value.y, defaultMax)
    : defaultMax
  const start = Math.min(lo, hi)
  const end = Math.max(lo, hi)
  const years: number[] = []
  for (let y = start; y <= end; y++) years.push(y)
  return years
})

function isYearAvailable(year: number) {
  if (minParts.value && year < minParts.value.y) return false
  if (maxParts.value && year > maxParts.value.y) return false
  return true
}

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

  syncViewToSelection()
  popoverGroup.open(close)
  await nextTick()
  calculatePosition()
  isOpen.value = true
}

function close() {
  isOpen.value = false
  showYearView.value = false
  yearButtonRefs.clear()
  popoverGroup.release(close)
}

function syncViewToSelection() {
  const selected = selectedParts.value
  if (selected) {
    viewYear.value = selected.y
    viewMonth.value = selected.m
    return
  }
  viewYear.value = todayParts.y
  viewMonth.value = todayParts.m
}

function prevMonth() {
  if (!canPrevMonth.value) return
  if (viewMonth.value === 1) {
    viewMonth.value = 12
    viewYear.value -= 1
  }
  else {
    viewMonth.value -= 1
  }
}

function nextMonth() {
  if (!canNextMonth.value) return
  if (viewMonth.value === 12) {
    viewMonth.value = 1
    viewYear.value += 1
  }
  else {
    viewMonth.value += 1
  }
}

function pickDate(cell: DayCell) {
  if (cell.disabled) return
  emit('update:modelValue', toISO(cell.y, cell.m, cell.d))
  close()
}

function pickToday() {
  if (!canPickToday.value) return
  emit('update:modelValue', toISO(todayParts.y, todayParts.m, todayParts.d))
  close()
}

function clearDate() {
  emit('update:modelValue', '')
  close()
}

async function toggleYearView() {
  showYearView.value = !showYearView.value
  if (showYearView.value) {
    await nextTick()
    scrollToSelectedYear()
  }
}

function pickYear(year: number) {
  if (!isYearAvailable(year)) return
  viewYear.value = year
  if (
    minParts.value
    && viewYear.value === minParts.value.y
    && viewMonth.value < minParts.value.m
  ) {
    viewMonth.value = minParts.value.m
  }
  if (
    maxParts.value
    && viewYear.value === maxParts.value.y
    && viewMonth.value > maxParts.value.m
  ) {
    viewMonth.value = maxParts.value.m
  }
  showYearView.value = false
}

function bindYearRef(el: unknown, year: number) {
  if (!el) {
    yearButtonRefs.delete(year)
    return
  }
  const dom = (el as { $el?: HTMLElement }).$el ?? (el as HTMLButtonElement)
  yearButtonRefs.set(year, dom as HTMLButtonElement)
}

function scrollToSelectedYear() {
  const target = yearButtonRefs.get(viewYear.value)
  if (!target || !yearListRef.value) return
  const container = yearListRef.value
  const offset
    = target.offsetTop - container.clientHeight / 2 + target.clientHeight / 2
  container.scrollTop = Math.max(0, offset)
}

function isSelectedDay(cell: DayCell) {
  const sel = selectedParts.value
  return !!sel && sel.y === cell.y && sel.m === cell.m && sel.d === cell.d
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

watch(
  () => props.modelValue,
  () => {
    if (!isOpen.value) syncViewToSelection()
  },
)

onMounted(() => {
  syncDarkMode()
  syncViewToSelection()
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

<style scoped>
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
