<template>
  <div class="relative w-full">
    <!-- Vista de tabla para pantallas medianas y grandes -->
    <div
      class="hidden md:block overflow-clip"
      :class="[
        roundedClasses[props.rounded],
        hasShadow ? 'pu-shadow-ios' : '',
        isBordered ? 'border border-default' : '',
      ]"
    >
      <table class="w-full text-sm text-left rtl:text-right table-fixed">
        <thead :class="props.headerColor">
          <tr>
            <th
              v-for="(column, index) in props.columns"
              :key="column.id"
              scope="col"
              :style="{ width: column.width || 'auto' }"
              :class="[
                'px-4 py-3 font-bold text-xs uppercase',
                index === 0
                  ? isBordered
                    ? roundedTopStartClasses[props.rounded]
                    : roundedStartClasses[props.rounded]
                  : '',
                index === props.columns.length - 1
                  ? isBordered
                    ? roundedTopEndClasses[props.rounded]
                    : roundedEndClasses[props.rounded]
                  : '',
              ]"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody :class="[props.isBodyColored ? props.bodyColor : '']">
          <template v-if="items.length > 0">
            <tr
              v-for="item in items"
              :key="item.id"
              :data-row-id="item.id"
              :class="
                props.isSelectable
                  ? 'cursor-pointer transition-colors duration-150 hover:bg-default'
                  : ''
              "
              @click="onRowClick"
            >
              <td
                v-for="column in columns"
                :key="column.id"
                :style="{ width: column.width || 'auto' }"
                class="px-4 text-gray-900 dark:text-white break-words"
                :class="sizes[props.itemsSize]"
              >
                <slot
                  :name="`cell-${column.id}`"
                  :item="item"
                  :value="getCellValue(item, column.id)"
                >
                  {{ getCellValue(item, column.id) }}
                </slot>
              </td>
            </tr>
          </template>

          <tr v-else>
            <td
              :colspan="columns.length"
              class="text-center py-10"
            >
              <div class="flex flex-col items-center gap-1">
                <Lottie
                  v-if="props.showEmptyAnimation"
                  :animation-data="
                    props.emptyAnimationData ?? defaultEmptyAnimation
                  "
                  :width="props.emptyAnimationSize"
                  :height="props.emptyAnimationSize"
                />
                <p class="text-lg font-medium text-black/70 dark:text-white/70">
                  {{ props.emptyStateTitle }}
                </p>
                <p
                  v-if="props.emptyStateDescription"
                  class="text-sm text-black/50 dark:text-white/50"
                >
                  {{ props.emptyStateDescription }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot
          v-if="props.withPagination"
          class="border-t border-default"
          :class="[props.isBodyColored ? props.bodyColor : '']"
        >
          <tr>
            <td
              :colspan="columns.length"
              class="px-4 py-3"
            >
              <Pagination
                :page="props.paginationPage"
                :total-items="resolvedPaginationTotalItems"
                :items-per-page="resolvedPaginationItemsPerPage"
                :show-items-count="props.paginationShowItemsCount"
                @update:page="onPaginationPageUpdate"
                @page-change="onPaginationPageChange"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Vista de tarjetas para dispositivos móviles -->
    <div class="block md:hidden space-y-4 p-1">
      <div
        v-for="item in items"
        :key="item.id"
        :data-row-id="item.id"
        class="bg-card border border-default rounded-lg p-4 shadow-sm"
        :class="
          props.isSelectable
            ? 'cursor-pointer transition-all duration-150 hover:bg-default hover:shadow-md hover:-translate-y-0.5'
            : ''
        "
        @click="onRowClick"
      >
        <slot
          name="mobile-card"
          :item="item"
          :columns="columns"
        >
          <!-- Contenido por defecto si no se proporciona slot personalizado -->
          <div class="space-y-2">
            <div
              v-for="column in columns"
              :key="column.id"
              class="flex justify-between items-center"
            >
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"
              >
                {{ column.name }}
              </span>
              <div class="text-sm">
                <slot
                  :name="`cell-${column.id}`"
                  :item="item"
                  :value="getCellValue(item, column.id)"
                >
                  {{ getCellValue(item, column.id) }}
                </slot>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <!-- Mensaje cuando no hay items -->
      <div
        v-if="items.length === 0"
        class="text-center py-10 flex flex-col items-center gap-1"
      >
        <Lottie
          v-if="props.showEmptyAnimation"
          :animation-data="props.emptyAnimationData ?? defaultEmptyAnimation"
          :width="props.emptyAnimationSize"
          :height="props.emptyAnimationSize"
        />
        <p class="text-lg font-medium text-black/70 dark:text-white/70">
          {{ props.emptyStateTitle }}
        </p>
        <p
          v-if="props.emptyStateDescription"
          class="text-sm text-black/50 dark:text-white/50"
        >
          {{ props.emptyStateDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TItem extends { id: string | number }">
import { computed } from 'vue'
import Lottie from './Lottie.vue'
import Pagination from './Pagination.vue'
import defaultEmptyAnimation from '../assets/empty-state.json'

const roundedClasses = {
  'none': 'rounded-none',
  'xs': 'rounded-xs',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  'full': 'rounded-full',
} as const

const roundedStartClasses = {
  'none': 'rounded-s-none',
  'xs': 'rounded-s-xs',
  'sm': 'rounded-s-sm',
  'md': 'rounded-s-md',
  'lg': 'rounded-s-lg',
  'xl': 'rounded-s-xl',
  '2xl': 'rounded-s-2xl',
  '3xl': 'rounded-s-3xl',
  'full': 'rounded-s-full',
} as const

const roundedEndClasses = {
  'none': 'rounded-e-none',
  'xs': 'rounded-e-xs',
  'sm': 'rounded-e-sm',
  'md': 'rounded-e-md',
  'lg': 'rounded-e-lg',
  'xl': 'rounded-e-xl',
  '2xl': 'rounded-e-2xl',
  '3xl': 'rounded-e-3xl',
  'full': 'rounded-e-full',
} as const

const roundedTopStartClasses = {
  'none': 'rounded-ss-none',
  'xs': 'rounded-ss-xs',
  'sm': 'rounded-ss-sm',
  'md': 'rounded-ss-md',
  'lg': 'rounded-ss-lg',
  'xl': 'rounded-ss-xl',
  '2xl': 'rounded-ss-2xl',
  '3xl': 'rounded-ss-3xl',
  'full': 'rounded-ss-full',
} as const

const roundedTopEndClasses = {
  'none': 'rounded-se-none',
  'xs': 'rounded-se-xs',
  'sm': 'rounded-se-sm',
  'md': 'rounded-se-md',
  'lg': 'rounded-se-lg',
  'xl': 'rounded-se-xl',
  '2xl': 'rounded-se-2xl',
  '3xl': 'rounded-se-3xl',
  'full': 'rounded-se-full',
} as const

const sizes = {
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
} as const

const props = withDefaults(
  defineProps<{
    items?: TItem[]
    columns?: { name: string, id: string, width?: string }[]
    rounded?: keyof typeof roundedClasses
    isBordered?: boolean
    isSelectable?: boolean
    headerColor?: string
    isBodyColored?: boolean
    bodyColor?: string
    itemsSize?: keyof typeof sizes
    hasShadow?: boolean
    emptyStateTitle?: string
    emptyStateDescription?: string
    showEmptyAnimation?: boolean
    emptyAnimationData?: object
    emptyAnimationSize?: number
    withPagination?: boolean
    paginationPage?: number
    paginationTotalItems?: number
    paginationItemsPerPage?: number
    paginationShowItemsCount?: boolean
  }>(),
  {
    items: () => [],
    columns: () => [],
    rounded: 'lg',
    isBordered: false,
    isSelectable: false,
    headerColor: 'bg-default text-[#71717A] dark:text-[#9CA3AF]',
    isBodyColored: false,
    bodyColor: 'bg-card',
    itemsSize: 'md',
    hasShadow: true,
    emptyStateTitle: 'No results found',
    emptyStateDescription:
      'Try adjusting your search or filter to find what you\'re looking for.',
    showEmptyAnimation: true,
    emptyAnimationData: undefined,
    emptyAnimationSize: 220,
    withPagination: false,
    paginationPage: 1,
    paginationTotalItems: undefined,
    paginationItemsPerPage: undefined,
    paginationShowItemsCount: true,
  },
)

const resolvedPaginationTotalItems = computed(() => {
  return props.paginationTotalItems ?? props.items.length
})

const resolvedPaginationItemsPerPage = computed(() => {
  if (props.paginationItemsPerPage != null) return props.paginationItemsPerPage
  return props.items.length > 0 ? props.items.length : 10
})

const emit = defineEmits<{
  'row-click': [item: TItem]
  'update:paginationPage': [page: number]
  'pagination-page-change': [page: number]
}>()

function getCellValue(item: TItem, key: string): unknown {
  return (item as Record<string, unknown>)[key]
}

function onRowClick(event: MouseEvent) {
  if (!props.isSelectable) return
  const el = event.currentTarget as HTMLElement | null
  const id = el?.dataset.rowId
  if (id == null) return
  const item = props.items.find(i => String(i.id) === id)
  if (item) emit('row-click', item)
}

function onPaginationPageUpdate(page: number) {
  emit('update:paginationPage', page)
}

function onPaginationPageChange(page: number) {
  emit('pagination-page-change', page)
}
</script>

<style scoped>
.pu-shadow-ios {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}
</style>
