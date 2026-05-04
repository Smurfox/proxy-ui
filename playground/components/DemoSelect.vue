<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">Select</h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of select components for forms and user interactions.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Usage</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          v-model="selectedFramework"
          label="Framework"
          placeholder="Select a framework"
          description="This is a description for the framework select field."
          :options="frameworkOptions"
          required
        />
        <PUSelect
          v-model="selectedRole"
          label="Role"
          placeholder="Select a role"
          variant="secondary"
          :options="roleOptions"
          required
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Validation Field</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          v-model="selectedStatus"
          label="Status"
          placeholder="Select a status"
          error="This is an error message for the status select field."
          :options="statusOptions"
          required
        />
        <PUSelect
          v-model="selectedPriority"
          label="Priority"
          placeholder="Select a priority"
          variant="secondary"
          error="This is an error message for the priority select field."
          :options="priorityOptions"
          required
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Disabled State</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          v-model="selectedDisabledFramework"
          label="Framework"
          placeholder="Select a framework"
          :options="frameworkOptions"
          disabled
        />
        <PUSelect
          v-model="selectedDisabledRole"
          label="Role"
          placeholder="Select a role"
          variant="secondary"
          :options="roleOptions"
          disabled
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Empty State</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          label="Empty options"
          placeholder="Select an option"
          description="Open the select to preview the empty state."
          :options="[]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedFramework = ref('nuxt')
const selectedRole = ref()
const selectedStatus = ref()
const selectedPriority = ref('high')
const selectedDisabledFramework = ref('vue')
const selectedDisabledRole = ref('admin')

const frameworkOptions = [
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
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

<style scoped></style>
