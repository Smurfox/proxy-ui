<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Pagination
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A pagination control with first / prev / next / last buttons and a
        joined numeric page range. Works standalone or embedded in
        <code class="text-xs px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">PUTable</code>
        via <code class="text-xs px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">withPagination</code>.
      </p>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Basic
      </h1>
      <PUCard class="p-6! flex flex-col gap-4">
        <PUPagination
          v-model:page="basicPage"
          :total-items="350"
          :items-per-page="20"
        />
        <p class="text-xs font-mono text-gray-600 dark:text-gray-400">
          page = {{ basicPage }}
        </p>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Without items counter
      </h1>
      <PUCard class="p-6! flex flex-col gap-4">
        <PUPagination
          v-model:page="noCounterPage"
          :total-items="120"
          :items-per-page="10"
          :show-items-count="false"
        />
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Few pages
      </h1>
      <p class="text-xs text-gray-600 dark:text-gray-400">
        The numeric range shrinks automatically when there are fewer than 5
        pages.
      </p>
      <PUCard class="p-6! flex flex-col gap-4">
        <PUPagination
          v-model:page="smallPage"
          :total-items="25"
          :items-per-page="10"
        />
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Inside a PUTable
      </h1>
      <p class="text-xs text-gray-600 dark:text-gray-400">
        The same component is rendered in the table footer when
        <code class="text-xs px-1 rounded bg-black/5 dark:bg-white/10">with-pagination</code>
        is set.
      </p>
      <PUCard class="p-6!">
        <PUTable
          v-model:pagination-page="tablePage"
          :columns="tableColumns"
          :items="pagedTableItems"
          with-pagination
          :pagination-total-items="allTableItems.length"
          :pagination-items-per-page="tablePageSize"
          rounded="xl"
          is-bordered
          :has-shadow="false"
        />
      </PUCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const basicPage = ref(1)
const noCounterPage = ref(2)
const smallPage = ref(1)

const tablePage = ref(1)
const tablePageSize = 5

const allTableItems = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}))

const tableColumns = [
  { name: 'Name', id: 'name', width: '30%' },
  { name: 'Email', id: 'email', width: '45%' },
  { name: 'Role', id: 'role', width: '25%' },
]

const pagedTableItems = computed(() => {
  const start = (tablePage.value - 1) * tablePageSize
  return allTableItems.slice(start, start + tablePageSize)
})
</script>

<style scoped></style>
