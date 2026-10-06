<template>
  <PUCard class="p-6 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">
      Tabs
    </h2>
    <div
      v-for="section in tabSections"
      :key="section.title"
    >
      <div
        class="text-black/60 dark:text-white/50 text-xs font-semibold uppercase tracking-[0.1em] border-b border-white/[0.06] pb-2.5 mb-2"
      >
        {{ section.title }}
      </div>
      <div class="flex flex-wrap items-center gap-6">
        <div
          v-for="item in section.items"
          :key="item.label"
          class="flex flex-col items-center gap-2"
        >
          <div class="text-xs dark:text-white font-semibold uppercase mb-2">
            {{ item.label }}
          </div>
          <PUTabs
            v-model="active[item.label]"
            :tabs="item.tabs ?? tabs"
            v-bind="item.props"
          />
        </div>
      </div>
    </div>
  </PUCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

type TabItem = { label: string, value: string, icon?: string }

type Section = {
  title: string
  items: { label: string, tabs?: TabItem[], props?: Record<string, unknown> }[]
}

const tabs: TabItem[] = [
  { label: 'Details', value: 'details', icon: 'lucide:info' },
  { label: 'Upgrades', value: 'upgrades', icon: 'lucide:circle-arrow-up' },
]

const audienceTabs: TabItem[] = [
  { label: 'General Public', value: 'details' },
  { label: 'New', value: 'upgrades' },
]

const tabSections: Section[] = [
  {
    title: 'Sizes',
    items: [
      { label: 'small', props: { size: 'sm' } },
      { label: 'medium', props: { size: 'md' } },
      { label: 'large', props: { size: 'lg' } },
    ],
  },
  {
    title: 'Custom colors',
    items: [
      {
        label: 'danger',
        tabs: audienceTabs,
        props: {
          size: 'sm',
          btnColor: 'bg-danger',
          activeTextColor: 'text-white',
        },
      },
      {
        label: 'full',
        tabs: audienceTabs,
        props: { size: 'sm', rounded: 'full' },
      },
    ],
  },
]

// One v-model per instance so each group keeps its own active tab
const active = reactive<Record<string, string>>(
  Object.fromEntries(
    tabSections.flatMap(s => s.items).map(i => [i.label, 'details']),
  ),
)
</script>
