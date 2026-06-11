<template>
  <PUCard class="w-72">
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
          class="uppercase text-center text-[11px] font-medium py-1 text-gray-500 dark:text-white/50"
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
          :custom-class="dayCustomClass(cell)"
          :disabled="cell.disabled"
          @click="pickDate(cell)"
        />
      </div>

      <div
        class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-[#2D323B]"
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
</template>

<script lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { DatePickerLang } from '../types'
import PUButton from './Button.vue'
</script>

<script setup lang="ts">
interface DayCell {
  y: number
  m: number
  d: number
  otherMonth: boolean
  disabled: boolean
}

const langTexts = {
  en: {
    weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    clear: 'Clear',
    today: 'Today',
  },
  es: {
    weekdays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    clear: 'Borrar',
    today: 'Hoy',
  },
} as const

const props = withDefaults(
  defineProps<{
    modelValue?: string
    min?: string
    max?: string
    lang?: DatePickerLang
    locale?: string
    minYear?: number
    maxYear?: number
  }>(),
  {
    modelValue: '',
    lang: 'en',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const texts = computed(() => langTexts[props.lang])

// `locale` overrides the Intl formatting (month names) without touching the
// UI texts; when omitted it follows `lang`.
const dateLocale = computed(() => props.locale ?? props.lang)

const yearListRef = ref<HTMLDivElement | null>(null)
const yearButtonRefs = new Map<number, HTMLButtonElement>()
const showYearView = ref(false)

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
}

function pickToday() {
  if (!canPickToday.value) return
  emit('update:modelValue', toISO(todayParts.y, todayParts.m, todayParts.d))
}

function clearDate() {
  emit('update:modelValue', '')
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

function isToday(cell: DayCell) {
  return (
    cell.y === todayParts.y
    && cell.m === todayParts.m
    && cell.d === todayParts.d
  )
}

// PUButton replaces its color classes with customClass on icon-only buttons,
// so this must return '' (not whitespace) when there is nothing to add, and
// the today ring re-includes the ghost text/hover styles it displaces.
function dayCustomClass(cell: DayCell) {
  return [
    cell.otherMonth ? 'opacity-40' : '',
    isToday(cell) && !isSelectedDay(cell)
      ? 'border border-primary/60 text-black dark:text-white hover:bg-default/80'
      : '',
  ]
    .filter(Boolean)
    .join(' ')
}

watch(
  () => props.modelValue,
  () => {
    syncViewToSelection()
  },
)

onMounted(() => {
  syncViewToSelection()
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
