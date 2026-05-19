<template>
  <div class="flex justify-between items-center">
    <div>
      <h2
        v-if="showItemsCount"
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
    <div class="flex items-center gap-2">
      <!-- <Button variant="outline" startIcon="ion:chevron-back" label="Back" /> -->
      <Button
        is-icon-only
        variant="outline"
        icon="material-symbols:keyboard-double-arrow-left"
        :disabled="!canGoPrev"
        @click="goToFirst"
      />
      <Button
        is-icon-only
        variant="outline"
        icon="material-symbols:keyboard-arrow-left"
        :disabled="!canGoPrev"
        @click="goToPrev"
      />
      <div class="flex items-center gap-1">
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
      <Button
        variant="outline"
        icon="material-symbols:keyboard-arrow-right"
        is-icon-only
        :disabled="!canGoNext"
        @click="goToNext"
      />
      <Button
        is-icon-only
        variant="outline"
        icon="material-symbols:keyboard-double-arrow-right"
        :disabled="!canGoNext"
        @click="goToLast"
      />
      <!-- <Button variant="outline" endIcon="ion:chevron-forward" label="Next" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'

const emit = defineEmits<{
  'update:page': [page: number]
  'page-change': [page: number]
}>()

const props = withDefaults(
  defineProps<{
    page?: number
    totalItems?: number
    itemsPerPage?: number
    showItemsCount?: boolean
  }>(),
  {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10,
    showItemsCount: true,
  },
)

const totalPages = computed(() =>
  Math.max(Math.ceil(props.totalItems / props.itemsPerPage), 1),
)

const currentPage = computed(() => {
  return Math.min(Math.max(props.page, 1), totalPages.value)
})

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

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

function emitPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value)
  if (nextPage === props.page) return
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
</script>

<style scoped></style>
