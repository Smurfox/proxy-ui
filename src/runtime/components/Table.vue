<template>
  <div class="relative w-full">
    <!-- Vista de tabla para pantallas medianas y grandes -->
    <div
      class="hidden md:block overflow-x-auto"
      :class="[
        roundedClasses[props.rounded],
        isBordered ? 'border border-gray-200 dark:border-white/10 ' : '',
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

        <tbody :class="props.bodyColor">
          <template v-if="items.length > 0">
            <tr
              v-for="item in items"
              :key="item.id"
            >
              <td
                v-for="column in columns"
                :key="column.id"
                :style="{ width: column.width || 'auto' }"
                class="px-4 py-2 text-gray-900 dark:text-white break-words"
              >
                <slot
                  :name="`cell-${column.id}`"
                  :item="item"
                  :value="item[column.id]"
                >
                  {{ item[column.id] }}
                </slot>
              </td>
            </tr>
          </template>

          <tr v-else>
            <td
              :colspan="columns.length"
              class="text-lg text-center py-20 text-black/50 dark:text-white/50"
            >
              No se encontraron resultados
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vista de tarjetas para dispositivos móviles -->
    <div class="block md:hidden space-y-4 p-1">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 rounded-lg p-4 shadow-sm"
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
                  :value="item[column.id]"
                >
                  {{ item[column.id] }}
                </slot>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <!-- Mensaje cuando no hay items -->
      <div
        v-if="items.length === 0"
        class="text-lg text-center py-20 text-black/50 dark:text-white/50"
      >
        No se encontraron resultados
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const props = withDefaults(
  defineProps<{
    items?: Array<{ id: string | number, [key: string]: unknown }>
    columns?: { name: string, id: string, width?: string }[]
    rounded?: keyof typeof roundedClasses
    isBordered?: boolean
    headerColor?: string
    bodyColor?: string
  }>(),
  {
    items: () => [],
    columns: () => [],
    rounded: 'lg',
    isBordered: false,
    headerColor:
      'bg-[#F4F4F5] text-[#71717A] dark:bg-[#27272A] dark:text-[#A1A1AA]',
    bodyColor: '',
  },
)
</script>
