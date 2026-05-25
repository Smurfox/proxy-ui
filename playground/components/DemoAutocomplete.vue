<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Autocomplete
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Searchable select with a clear button. Type to filter, click to choose.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUAutocomplete
          v-model="selectedFramework"
          label="Framework"
          placeholder="Search a framework"
          description="Start typing to filter the list."
          :options="frameworkOptions"
          required
        />
        <PUAutocomplete
          v-model="selectedCountry"
          label="Country"
          placeholder="Search a country"
          variant="secondary"
          :options="countryOptions"
          required
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Validation Field
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUAutocomplete
          v-model="selectedStatus"
          label="Status"
          placeholder="Search a status"
          error="This is an error message for the status field."
          :options="statusOptions"
          required
        />
        <PUAutocomplete
          v-model="selectedPriority"
          label="Priority"
          placeholder="Search a priority"
          variant="secondary"
          error="This is an error message for the priority field."
          :options="priorityOptions"
          required
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Inline Label
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Floating label inside the search input.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <div class="grid grid-cols-2 gap-4">
          <PUAutocomplete
            v-model="inlineFramework"
            label="Framework"
            placeholder="Search..."
            :options="frameworkOptions"
            inline-label
          />
          <PUAutocomplete
            v-model="inlineCountry"
            label="Country"
            placeholder="Search..."
            variant="secondary"
            :options="countryOptions"
            inline-label
            required
          />
        </div>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Disabled State
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUAutocomplete
          v-model="selectedDisabledFramework"
          label="Framework"
          placeholder="Search a framework"
          :options="frameworkOptions"
          disabled
        />
        <PUAutocomplete
          v-model="selectedDisabledRole"
          label="Role"
          placeholder="Search a role"
          variant="secondary"
          :options="roleOptions"
          disabled
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Empty State
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUAutocomplete
          label="Empty options"
          placeholder="Search an option"
          description="No matches for your query."
          :options="[]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedFramework = ref<string | number | null>('nuxt')
const selectedCountry = ref<string | number | null>(null)
const selectedStatus = ref<string | number | null>(null)
const selectedPriority = ref<string | number | null>('high')
const selectedDisabledFramework = ref<string | number | null>('vue')
const selectedDisabledRole = ref<string | number | null>('admin')
const inlineFramework = ref<string | number | null>('nuxt')
const inlineCountry = ref<string | number | null>(null)

const frameworkOptions = [
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
  { label: 'Astro', value: 'astro' },
  { label: 'Qwik', value: 'qwik' },
]

const countryOptions = [
  { label: 'Argentina', value: 'ar' },
  { label: 'Brazil', value: 'br' },
  { label: 'Chile', value: 'cl' },
  { label: 'Colombia', value: 'co' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Peru', value: 'pe' },
  { label: 'Spain', value: 'es' },
  { label: 'Uruguay', value: 'uy' },
]

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Archived', value: 'archived' },
]

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]
</script>
