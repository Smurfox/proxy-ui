<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Table
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A data table for listing structured rows with columns, sorting,
        selection, and custom cell rendering.
      </p>
    </div>

    <!-- Table with custom cell rendering -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Usage
      </h1>
      <PUCard
        rounded="2xl"
        is-bordered
        class="w-full"
      >
        <PUTable
          :items="items"
          :columns="columns"
          :has-shadow="false"
        />
      </PUCard>
    </div>

    <!-- Custom cell rendering -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Custom Cell Rendering
      </h1>
      <PUTable
        :items="itemsCustom"
        :columns="columnsCustom"
        rounded="2xl"
        is-bordered
        is-body-colored
      >
        <template #cell-folio="{ value }">
          <div class="flex items-center gap-2">
            <Icon
              name="ion:document-text-outline"
              size="20"
            />
            <span class="font-bold text-xs">{{ value }}</span>
          </div>
        </template>
        <template #cell-actions>
          <div class="flex items-center gap-2">
            <Icon
              name="ion:eye-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:pencil-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:trash-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </template>
      </PUTable>
    </div>

    <!-- Table with items selection -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Table with Selection
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Set <code>is-selectable</code> and listen to <code>@row-click</code>.
        Rows highlight on hover and emit the clicked item.
      </p>
      <PUTable
        :items="itemsCustom"
        :columns="columnsCustom"
        rounded="2xl"
        is-bordered
        is-selectable
        is-body-colored
        @row-click="onRowClick"
      >
        <template #cell-folio="{ value }">
          <div class="flex items-center gap-2">
            <Icon
              name="ion:document-text-outline"
              size="20"
            />
            <span class="font-bold text-xs">{{ value }}</span>
          </div>
        </template>
        <template #cell-actions>
          <div class="flex items-center gap-2">
            <Icon
              name="ion:eye-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:pencil-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:trash-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </template>
      </PUTable>
      <p class="text-xs text-gray-500 dark:text-white/60">
        Last clicked:
        <code>{{
          lastClicked ? `${lastClicked.folio} — ${lastClicked.client}` : "—"
        }}</code>
      </p>
    </div>

    <!-- Empty state -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Empty State
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        When the <code>items</code> array is empty, a bundled Lottie animation
        is shown above the default message. Disable it with
        <code>:show-empty-animation="false"</code> or override it with
        <code>:empty-animation-data</code>.
      </p>
      <PUTable
        :items="[]"
        :columns="columnsCustom"
        rounded="2xl"
        is-bordered
        is-selectable
        is-body-colored
        @row-click="onRowClick"
      />
    </div>

    <!-- Empty state without animation -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Empty State (animation disabled)
      </h1>
      <PUTable
        :items="[]"
        :columns="columnsCustom"
        :show-empty-animation="false"
        rounded="2xl"
        is-bordered
        is-body-colored
      />
    </div>

    <!-- With pagination -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        With Pagination
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Set <code>with-pagination</code> to render the table footer with the
        pagination controls. This example has 15 records and displays 5 rows.
      </p>
      <PUTable
        :items="paginatedItemsPreview"
        :columns="columnsCustom"
        :pagination-page="currentPage"
        :pagination-total-items="paginatedItemsCustom.length"
        :pagination-items-per-page="5"
        rounded="2xl"
        is-bordered
        is-body-colored
        with-pagination
        @update:pagination-page="currentPage = $event"
      >
        <template #cell-folio="{ value }">
          <div class="flex items-center gap-2">
            <Icon
              name="ion:document-text-outline"
              size="20"
            />
            <span class="font-bold text-xs">{{ value }}</span>
          </div>
        </template>
        <template #cell-actions>
          <div class="flex items-center gap-2">
            <Icon
              name="ion:eye-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:pencil-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <Icon
              name="ion:trash-outline"
              size="18"
              class="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </template>
      </PUTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface CustomItem {
  id: number
  folio: string
  date: string
  client: string
  store: string
  total: string
}

const lastClicked = ref<CustomItem | null>(null)

function onRowClick(item: { id: string | number, [key: string]: unknown }) {
  lastClicked.value = item as unknown as CustomItem
}

const columns = [
  { name: 'NAME', id: 'name', width: '40%' },
  { name: 'QUANTITY', id: 'quantity', width: '15%' },
  { name: 'U. PRICE', id: 'unitPrice', width: '15%' },
  { name: 'DISCOUNT', id: 'discount', width: '15%' },
  { name: 'TOTAL', id: 'total', width: '20%' },
]
const items = [
  {
    id: 1,
    name: 'Product 1',
    quantity: 2,
    unitPrice: '$10.00',
    discount: '5%',
    total: '$19.00',
  },
  {
    id: 2,
    name: 'Product 2',
    quantity: 1,
    unitPrice: '$20.00',
    discount: '0%',
    total: '$20.00',
  },
]

const columnsCustom = [
  { name: 'folio', id: 'folio', width: '20%' },
  { name: 'date', id: 'date', width: '15%' },
  { name: 'client', id: 'client', width: '15%' },
  { name: 'store', id: 'store', width: '15%' },
  { name: 'total', id: 'total', width: '15%' },
  { name: 'actions', id: 'actions', width: '20%' },
]
const itemsCustom = [
  {
    id: 1,
    folio: 'FOL-001',
    date: '2024-01-01',
    client: 'John Doe',
    store: 'Store A',
    total: '$100.00',
  },
  {
    id: 2,
    folio: 'FOL-002',
    date: '2024-01-02',
    client: 'Jane Smith',
    store: 'Store B',
    total: '$150.00',
  },
]

const paginatedItemsCustom = Array.from({ length: 50 }, (_, index) => {
  const id = index + 1
  return {
    id,
    folio: `FOL-${String(id).padStart(3, '0')}`,
    date: `2024-01-${String((id % 28) + 1).padStart(2, '0')}`,
    client: `Client ${id}`,
    store: `Store ${String.fromCharCode(64 + ((id - 1) % 5) + 1)}`,
    total: `$${(95 + id * 12).toFixed(2)}`,
  }
})

const currentPage = ref(1)
const itemsPerPage = 5

const paginatedItemsPreview = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return paginatedItemsCustom.slice(start, end)
})
</script>

<style scoped></style>
