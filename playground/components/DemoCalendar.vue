<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Calendar
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        The inline calendar from the date picker, without the input trigger. Renders directly in the page.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUCalendar v-model="selectedDate" />
        <p class="text-xs text-gray-500 dark:text-white/50">
          selected: <code>{{ selectedDate || 'none' }}</code>
        </p>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Min / Max
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Days outside the range are disabled; the year scroller is clamped too.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUCalendar
          v-model="boundedDate"
          min="2026-06-05"
          max="2026-07-15"
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Language
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Same <code>lang</code> prop as the date picker: <code>en</code> (default) or <code>es</code>.
      </p>
      <div
        class="border border-gray-300 flex flex-wrap gap-6 p-9 w-full rounded-xl"
      >
        <PUCalendar v-model="langEnglish" />
        <PUCalendar
          v-model="langSpanish"
          lang="es"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('2026-06-11')
const boundedDate = ref('2026-06-11')
const langEnglish = ref('2026-06-11')
const langSpanish = ref('2026-06-11')
</script>

<style scoped></style>
