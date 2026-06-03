<template>
  <div class="flex flex-wrap justify-end md:justify-between items-center gap-2">
    <div class="flex items-center gap-3">
      <!-- With page-size selector: the count doubles as a toggle that reveals
           the selector on demand, so the control stays collapsed by default. -->
      <div
        v-if="showPageSize"
        class="flex items-center gap-2"
      >
        <button
          type="button"
          class="flex items-center gap-1 text-xs text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-pointer"
          @click="togglePageSize"
        >
          <span
            v-if="showItemsCount"
            class="hidden md:inline"
          >
            Mostrando
            <span class="font-semibold text-black dark:text-white">{{
              startItem
            }}</span>
            -
            <span class="font-semibold text-black dark:text-white">{{
              endItem
            }}</span>
            de
            <span class="font-semibold text-black dark:text-white">{{
              totalItems
            }}</span>
            registros
          </span>
          <span
            :class="showItemsCount ? 'md:hidden' : ''"
            class="whitespace-nowrap"
          >
            {{ pageSizeLabel }}
          </span>
          <Icon
            name="mdi:chevron-down"
            class="shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': isPageSizeOpen }"
          />
        </button>
        <Transition name="pu-pagesize">
          <Select
            v-if="isPageSizeOpen"
            :model-value="itemsPerPage"
            :options="pageSizeSelectOptions"
            rounded="lg"
            class="w-24"
            @update:model-value="onPageSizeChange"
          />
        </Transition>
      </div>

      <!-- Without selector: plain informational count (unchanged). -->
      <h2
        v-else-if="showItemsCount"
        class="hidden md:block text-xs text-black/40 dark:text-white/40"
      >
        Mostrando
        <span class="font-semibold text-black dark:text-white">{{
          startItem
        }}</span>
        -
        <span class="font-semibold text-black dark:text-white">{{
          endItem
        }}</span>
        de
        <span class="font-semibold text-black dark:text-white">{{
          totalItems
        }}</span>
        registros
      </h2>
    </div>
    <div class="flex items-center gap-1 md:gap-2">
      <span :class="['hidden md:inline-flex', disabledWrapperClass(!canGoPrev)]">
        <Button
          is-icon-only
          variant="outline"
          icon="material-symbols:keyboard-double-arrow-left"
          @click="goToFirst"
        />
      </span>
      <span :class="disabledWrapperClass(!canGoPrev)">
        <Button
          is-icon-only
          variant="outline"
          icon="material-symbols:keyboard-arrow-left"
          @click="goToPrev"
        />
      </span>
      <div
        v-if="pageRange.length > 0"
        class="flex items-center gap-1"
      >
        <Button
          v-for="p in pageRange"
          :key="p"
          :label="p.toString()"
          is-icon-only
          :color="p === currentPage ? 'primary' : 'default'"
          :variant="p === currentPage ? 'default' : 'outline'"
          @click="goToPage(p)"
        />
      </div>
      <span :class="disabledWrapperClass(!canGoNext)">
        <Button
          variant="outline"
          icon="material-symbols:keyboard-arrow-right"
          is-icon-only
          @click="goToNext"
        />
      </span>
      <span :class="['hidden md:inline-flex', disabledWrapperClass(!canGoNext)]">
        <Button
          is-icon-only
          variant="outline"
          icon="material-symbols:keyboard-double-arrow-right"
          @click="goToLast"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import Button from './Button.vue'
import Select from './Select.vue'

const emit = defineEmits<{
  'update:page': [page: number]
  'page-change': [page: number]
  'update:itemsPerPage': [itemsPerPage: number]
  'page-size-change': [itemsPerPage: number]
}>()

const props = withDefaults(
  defineProps<{
    page?: number
    totalItems?: number
    itemsPerPage?: number
    showItemsCount?: boolean
    showPageSize?: boolean
    pageSizeOptions?: number[]
    pageSizeLabel?: string
  }>(),
  {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10,
    showItemsCount: true,
    showPageSize: false,
    pageSizeOptions: () => [10, 20, 50, 100],
    pageSizeLabel: 'Filas por página',
  },
)

// Remember any "manual" itemsPerPage value (e.g. 8) that isn't in
// pageSizeOptions. We accumulate every value the paginator has had so it stays
// selectable for the component's lifetime — switching to 10 must NOT drop the
// previously-used 8 from the list.
const customSizes = ref<number[]>([])

watch(
  () => props.itemsPerPage,
  (size) => {
    if (
      Number.isFinite(size)
      && size > 0
      && !props.pageSizeOptions.includes(size)
      && !customSizes.value.includes(size)
    ) {
      customSizes.value.push(size)
    }
  },
  { immediate: true },
)

const pageSizeSelectOptions = computed(() => {
  const sizes = new Set<number>(props.pageSizeOptions)
  for (const size of customSizes.value) sizes.add(size)
  if (Number.isFinite(props.itemsPerPage) && props.itemsPerPage > 0) {
    sizes.add(props.itemsPerPage)
  }
  return [...sizes]
    .sort((a, b) => a - b)
    .map(size => ({ label: String(size), value: size }))
})

// The selector is hidden until the user clicks the count/label trigger, so it
// doesn't take up space when it isn't needed.
const isPageSizeOpen = ref(false)

function togglePageSize() {
  isPageSizeOpen.value = !isPageSizeOpen.value
}

const totalPages = computed(() =>
  Math.max(Math.ceil(props.totalItems / props.itemsPerPage), 1),
)

const currentPage = computed(() => {
  return Math.min(Math.max(props.page, 1), totalPages.value)
})

// Disabled state lives on a <span> wrapper, NOT on PUButton. motion-v inside
// PUButton crashes when its :disabled prop changes reactively during a page
// transition (any cascade — even with nextTick deferral — triggers the bug).
// The wrapper uses pointer-events-none to block clicks and opacity to look
// disabled, with zero motion-v involvement.
const canGoPrev = computed(() => props.totalItems > 0 && currentPage.value > 1)
const canGoNext = computed(
  () => props.totalItems > 0 && currentPage.value < totalPages.value,
)

function disabledWrapperClass(isDisabled: boolean) {
  return isDisabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
}

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (currentPage.value - 1) * props.itemsPerPage + 1
})
const endItem = computed(() => {
  const end = currentPage.value * props.itemsPerPage
  return Math.min(end, props.totalItems)
})

const pageRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const maxPages = 5

  let start = Math.max(current - Math.floor(maxPages / 2), 1)
  let end = start + maxPages - 1

  if (end > total) {
    end = total
    start = Math.max(end - maxPages + 1, 1)
  }

  const range = []
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

async function emitPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value)
  if (nextPage === props.page) return
  // Defer the emit so the click frame finishes before the parent re-renders.
  // Otherwise the consumer's watchers (Pinia fetches, etc.) cascade synchronously
  // into row remounts and motion-v crashes on the new buttons' init.
  await nextTick()
  emit('update:page', nextPage)
  emit('page-change', nextPage)
}

function goToPage(page: number) {
  emitPage(page)
}

function goToFirst() {
  emitPage(1)
}

function goToLast() {
  emitPage(totalPages.value)
}

function goToPrev() {
  emitPage(currentPage.value - 1)
}

function goToNext() {
  emitPage(currentPage.value + 1)
}

async function onPageSizeChange(value: string | number) {
  // Collapse the selector once a value is picked.
  isPageSizeOpen.value = false
  const size = Number(value)
  if (!Number.isFinite(size) || size <= 0 || size === props.itemsPerPage) return
  // Defer like emitPage so the click frame finishes before the parent re-renders.
  await nextTick()
  emit('update:itemsPerPage', size)
  emit('page-size-change', size)
  // The page count changes with the new size, so the current page is likely
  // out of range — reset to the first page (the conventional table behavior).
  if (props.page !== 1) {
    emit('update:page', 1)
    emit('page-change', 1)
  }
}
</script>

<style scoped>
.pu-pagesize-enter-active,
.pu-pagesize-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.pu-pagesize-enter-from,
.pu-pagesize-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
