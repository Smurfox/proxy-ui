<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Date Picker
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of date picker components for forms and scheduling.
      </p>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUDatePicker
          v-model="startDate"
          label="Start date"
          description="Pick the project start date."
          required
        >
          <template #startContent>
            <Icon name="lucide:calendar" />
          </template>
        </PUDatePicker>

        <PUDatePicker
          v-model="endDate"
          label="End date"
          variant="secondary"
          :min="startDate || undefined"
          description="The end date cannot be before the start date."
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Language
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        The <code>lang</code> prop switches every calendar text: weekdays, Clear/Today buttons, placeholder and month names. Default is <code>en</code>.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <div class="grid grid-cols-2 gap-4">
          <PUDatePicker
            v-model="langEnglish"
            label="English (default)"
          />
          <PUDatePicker
            v-model="langSpanish"
            label="Spanish"
            lang="es"
          />
        </div>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Validation Field
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUDatePicker
          v-model="requiredDate"
          label="Birth date"
          placeholder="dd/mm/aaaa"
          description="Click the month/year to jump to any year."
          error="Please select a valid birth date."
          required
        />

        <PUDatePicker
          v-model="blockedDate"
          label="Available date"
          variant="secondary"
          min="2026-01-01"
          max="2026-12-31"
          error="Only dates in 2026 are allowed."
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Inline Label
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Floating label inside the trigger — useful for compact filter rows.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Filter by date
        </p>
        <div class="grid grid-cols-2 gap-4">
          <PUDatePicker
            v-model="inlineStart"
            label="Start date"
            inline-label
          />
          <PUDatePicker
            v-model="inlineEnd"
            label="End date"
            inline-label
            :min="inlineStart || undefined"
          />
        </div>
        <PUDatePicker
          v-model="inlineBirth"
          label="Birth date"
          variant="secondary"
          inline-label
          required
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Disabled State
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUDatePicker
          v-model="disabledDate"
          label="Renewal date"
          disabled
        />

        <PUDatePicker
          label="No selection"
          variant="secondary"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startDate = ref('2026-05-21')
const endDate = ref('2026-05-28')
const langEnglish = ref('2026-06-11')
const langSpanish = ref('2026-06-11')
const requiredDate = ref('')
const blockedDate = ref('2025-12-31')
const disabledDate = ref('2026-07-10')
const inlineStart = ref('2026-01-01')
const inlineEnd = ref('2026-05-25')
const inlineBirth = ref('')
</script>
