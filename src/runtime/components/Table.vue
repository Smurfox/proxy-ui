<template>
  <div class="relative w-full">
    <!-- Vista de tabla para pantallas medianas y grandes -->
    <div
      class="hidden md:block overflow-clip"
      :class="[
        roundedClasses[props.rounded],
        hasShadow ? 'pu-shadow-ios' : '',
        isBordered ? 'border border-gray-200 dark:border-[#23272F] ' : '',
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
            <motion.tr
              v-for="item in items"
              :key="item.id"
              :while-hover="props.isSelectable ? { scale: 1.01 } : {}"
              :transition="{ type: 'spring', stiffness: 400, damping: 30 }"
              :class="
                props.isSelectable
                  ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1C2026]'
                  : ''
              "
              @click="props.isSelectable && emit('row-click', item)"
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
            </motion.tr>
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
      </table>
    </div>

    <!-- Vista de tarjetas para dispositivos móviles -->
    <div class="block md:hidden space-y-4 p-1">
      <motion.div
        v-for="item in items"
        :key="item.id"
        :while-hover="props.isSelectable ? { y: -3 } : {}"
        :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        class="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 rounded-lg p-4 shadow-sm"
        :class="
          props.isSelectable
            ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 hover:shadow-md'
            : ''
        "
        @click="props.isSelectable && emit('row-click', item)"
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
      </motion.div>

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
import { motion } from 'motion-v'
import Lottie from './Lottie.vue'
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
  }>(),
  {
    items: () => [],
    columns: () => [],
    rounded: 'lg',
    isBordered: false,
    isSelectable: false,
    headerColor:
      'bg-[#F4F4F5] text-[#71717A] dark:bg-[#20242C] dark:text-[#9CA3AF]',
    isBodyColored: false,
    bodyColor: 'bg-white dark:bg-[#14171C]',
    itemsSize: 'md',
    hasShadow: true,
    emptyStateTitle: 'No results found',
    emptyStateDescription:
      'Try adjusting your search or filter to find what you\'re looking for.',
    showEmptyAnimation: true,
    emptyAnimationData: undefined,
    emptyAnimationSize: 220,
  },
)

const emit = defineEmits<{
  'row-click': [item: TItem]
}>()

function getCellValue(item: TItem, key: string): unknown {
  return (item as Record<string, unknown>)[key]
}
</script>

<style scoped>
.pu-shadow-ios {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}
</style>
