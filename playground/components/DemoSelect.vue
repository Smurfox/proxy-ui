<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Select
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of select components for forms and user interactions.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
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
      <h1 class="font-semibold text-lg">
        Validation Field
      </h1>
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
      <h1 class="font-semibold text-lg">
        Inline Label
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Floating label inside the trigger.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <div class="grid grid-cols-2 gap-4">
          <PUSelect
            v-model="inlineFramework"
            label="Framework"
            :options="frameworkOptions"
            inline-label
          />
          <PUSelect
            v-model="inlineRole"
            label="Role"
            variant="secondary"
            :options="roleOptions"
            inline-label
            required
          />
        </div>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Custom Rendering
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Use the <code>#selected</code> and <code>#option</code> slots to render custom content.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          v-model="selectedClient"
          label="Select a supplier"
          placeholder="Select a supplier"
          :options="clientOptions"
        >
          <template #selected="{ option }">
            <div class="flex items-center gap-2 min-w-0">
              <span
                class="size-6 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center"
              >{{ String(option.label).charAt(0) }}</span>
              <span class="truncate">{{ option.label }}</span>
            </div>
          </template>
          <template #option="{ option, selected }">
            <div class="flex items-center gap-3 min-w-0">
              <span
                class="size-8 shrink-0 rounded-full bg-primary/15 text-primary text-sm font-semibold flex items-center justify-center"
              >{{ String(option.label).charAt(0) }}</span>
              <div class="flex flex-col min-w-0 leading-tight">
                <span
                  class="text-sm truncate"
                  :class="selected ? 'text-primary' : 'text-black dark:text-white'"
                >{{ option.label }}</span>
                <span class="text-xs text-gray-500 dark:text-white/50 truncate">{{ option.email }}</span>
              </div>
            </div>
          </template>
        </PUSelect>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Multiple
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        With the <code>multiple</code> prop, <code>v-model</code> is an array, picking toggles the option and the dropdown stays open.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUSelect
          v-model="selectedFrameworks"
          label="Frameworks"
          placeholder="Select frameworks"
          :options="frameworkOptions"
          multiple
        />
        <PUSelect
          v-model="selectedClients"
          label="Suppliers"
          placeholder="Select suppliers"
          :options="clientOptions"
          multiple
        >
          <template #selected="{ options }">
            <div class="flex flex-wrap gap-1.5 min-w-0">
              <span
                v-for="opt in options"
                :key="String(opt.value)"
                class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <span
                  class="size-4 shrink-0 rounded-full bg-primary/20 text-[9px] font-semibold flex items-center justify-center"
                >{{ String(opt.label).charAt(0) }}</span>
                {{ opt.label }}
              </span>
            </div>
          </template>
        </PUSelect>
        <p class="text-xs text-gray-500 dark:text-white/50">
          frameworks: <code>{{ selectedFrameworks }}</code> · suppliers:
          <code>{{ selectedClients }}</code>
        </p>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Disabled State
      </h1>
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
      <h1 class="font-semibold text-lg">
        Empty State
      </h1>
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
const inlineFramework = ref('nuxt')
const inlineRole = ref()

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

const selectedClient = ref('default')
const selectedFrameworks = ref<(string | number)[]>(['nuxt', 'vue'])
const selectedClients = ref<(string | number)[]>(['default'])

const clientOptions = [
  { label: 'Default supplier', value: 'default', email: 'supplier@company.com' },
  { label: 'Central Hardware', value: 'central', email: 'sales@centralhw.com' },
  { label: 'North Distribution', value: 'north', email: 'contact@northdist.com' },
]
</script>

<style scoped></style>
