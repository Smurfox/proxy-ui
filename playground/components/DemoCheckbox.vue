<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Checkbox
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A checkbox component with animated check state. Work in progress.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUCheckbox
          v-model="acceptTerms"
          label="Acepto los términos y condiciones"
        />
        <PUCheckbox
          v-model="newsletter"
          label="Quiero recibir el newsletter"
        />
        <p class="text-xs text-gray-500 dark:text-white/50">
          acceptTerms: <code>{{ acceptTerms }}</code> · newsletter:
          <code>{{ newsletter }}</code>
        </p>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Sizes
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Three sizes: <code>sm</code>, <code>md</code> (default) and <code>lg</code>.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <PUCheckbox
          v-model="sizeSm"
          label="Small (sm)"
          size="sm"
        />
        <PUCheckbox
          v-model="sizeMd"
          label="Medium (md, default)"
        />
        <PUCheckbox
          v-model="sizeLg"
          label="Large (lg)"
          size="lg"
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Rounded
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Available radii: <code>none</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>, <code>xl</code> and <code>full</code>.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <PUCheckbox
          v-for="radius in roundedOptions"
          :key="radius"
          v-model="roundedChecks[radius]"
          :label="`rounded ${radius}`"
          :rounded="radius"
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Multiple Options
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        A group of checkboxes driven by a list.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <PUCheckbox
          v-for="topping in toppings"
          :key="topping.id"
          v-model="topping.checked"
          :label="topping.label"
        />
        <p class="text-xs text-gray-500 dark:text-white/50">
          Selected:
          <code>{{ selectedToppings.length ? selectedToppings.join(', ') : 'none' }}</code>
        </p>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Without Label
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUCheckbox v-model="standalone" />
        <p class="text-xs text-gray-500 dark:text-white/50">
          standalone: <code>{{ standalone }}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const acceptTerms = ref(false)
const newsletter = ref(true)
const standalone = ref(false)

const sizeSm = ref(true)
const sizeMd = ref(true)
const sizeLg = ref(true)

const roundedOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
const roundedChecks = ref<Record<(typeof roundedOptions)[number], boolean>>({
  none: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  full: true,
})

const toppings = ref([
  { id: 'cheese', label: 'Queso extra', checked: true },
  { id: 'bacon', label: 'Tocino', checked: false },
  { id: 'mushroom', label: 'Champiñones', checked: false },
  { id: 'onion', label: 'Cebolla', checked: false },
])

const selectedToppings = computed(() =>
  toppings.value.filter(t => t.checked).map(t => t.label),
)
</script>

<style scoped></style>
