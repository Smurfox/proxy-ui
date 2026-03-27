<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <div
      class="bg-[#F5F5F7] dark:bg-zinc-950 min-h-screen p-8 transition-colors duration-300"
    >
      <!-- Toggle button -->
      <button
        class="fixed top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white cursor-pointer"
        @click="toggleDark"
      >
        <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" size="20" />
      </button>

      <div>
        <h1 class="text-2xl font-semibold dark:text-white mb-1">ProxyUI</h1>
        <p class="text-sm dark:text-white/70">
          A collection of accessible and customizable Vue components built with
          Tailwind CSS.
        </p>
      </div>

      <div class="grid grid-cols-4">
        <div
          v-for="group in componentGroups"
          :key="group.name"
          class="p-8 w-full flex flex-col items-start gap-8"
        >
          <h2 class="text-lg font-semibold dark:text-white -mb-4">
            {{ group.name }}
          </h2>
          <div v-for="section in group.sections" :key="section.title">
            <div
              class="text-black/60 dark:text-white/50 text-xs font-semibold uppercase tracking-[0.1em] border-b border-white/[0.06] pb-2.5 mb-2"
            >
              {{ section.title }}
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <div
                v-for="item in section.items"
                :key="item.label"
                class="flex flex-col items-center gap-2"
              >
                <div
                  v-if="item.label"
                  class="text-xs dark:text-white font-semibold uppercase mb-2"
                >
                  {{ item.label }}
                </div>
                <component
                  :is="group.component"
                  :label="group.defaultLabel"
                  v-bind="item.props"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1 p-8 w-full flex flex-col items-start gap-8">
          <h2 class="text-lg font-semibold dark:text-white -mb-4">Card</h2>
          <PUCard :isBordered="false" customClass="h-40 w-full" />
          <PUCard
            :isBordered="false"
            customClass="w-full min-h-70 bg-emerald-400 p-6 flex flex-col justify-between gap-3"
          >
            <div class="flex flex-col gap-3">
              <h2 class="text-xs uppercase font-semibold opacity-40">
                Strategy
              </h2>
              <h1 class="text-2xl font-bold">Money market fund</h1>
              <p class="text-sm">
                A money market fund is a type of mutual fund that invests in
                short-term debt securities, such as Treasury bills and
                commercial paper.
              </p>
            </div>
            <div
              class="flex items-center justify-between border-t border-black/10 pt-7"
            >
              <h2 class="text-3xl font-bold">3.5%</h2>
              <h2 class="text-sm">This Month</h2>
            </div>
          </PUCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

function toggleDark() {
  isDark.value = !isDark.value;
}

// Keyboard shortcut — presiona D para toggle
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "d" && !e.metaKey && !e.ctrlKey) {
      toggleDark();
    }
  });
});

type Section = {
  title: string;
  items: { label?: string; props: any }[];
};

type ComponentGroup = {
  name: string;
  component: string;
  defaultLabel: string;
  sections: Section[];
};

const buttonSections: Section[] = [
  {
    title: "Colors",
    items: (
      ["primary", "default", "success", "danger", "warning", "ios"] as const
    ).map((color) => ({
      label: color,
      props: { color },
    })),
  },
  {
    title: "Sizes",
    items: [
      { label: "small", props: { size: "sm" } },
      { label: "medium", props: { size: "md" } },
      { label: "large", props: { size: "lg" } },
    ],
  },
  {
    title: "Rounded",
    items: [
      { label: "none", props: { rounded: "none" } },
      { label: "xs", props: { rounded: "xs" } },
      { label: "sm", props: { rounded: "sm" } },
      { label: "md", props: { rounded: "md" } },
      { label: "lg", props: { rounded: "lg" } },
      { label: "xl", props: { rounded: "xl" } },
      { label: "2xl", props: { rounded: "2xl" } },
      { label: "full", props: { rounded: "full" } },
    ],
  },
  {
    title: "Variants",
    items: [
      { label: "default", props: { variant: "default", color: "primary" } },
      { label: "secondary", props: { variant: "secondary", color: "primary" } },
      { label: "outline", props: { variant: "outline", color: "primary" } },
      { label: "ghost", props: { variant: "ghost", color: "primary" } },
      { label: "flat", props: { variant: "flat", color: "primary" } },
    ],
  },
  {
    title: "Disabled",
    items: [
      {
        label: "default",
        props: { color: "primary", variant: "default", disabled: true },
      },
      {
        label: "secondary",
        props: { color: "primary", variant: "secondary", disabled: true },
      },
      {
        label: "outline",
        props: { color: "primary", variant: "outline", disabled: true },
      },
      {
        label: "ghost",
        props: { color: "primary", variant: "ghost", disabled: true },
      },
      {
        label: "flat",
        props: { color: "primary", variant: "flat", disabled: true },
      },
    ],
  },
  {
    title: "Loading",
    items: [
      { props: { color: "primary", variant: "default", loading: true } },
      { props: { color: "primary", variant: "secondary", loading: true } },
      { props: { color: "primary", variant: "outline", loading: true } },
      { props: { color: "primary", variant: "ghost", loading: true } },
      { props: { color: "primary", variant: "flat", loading: true } },
    ],
  },
  {
    title: "With Icon",
    items: [
      {
        props: {
          color: "primary",
          variant: "default",
          startIcon: "ion:add",
          label: "New quote",
        },
      },
      {
        props: {
          color: "primary",
          variant: "secondary",
          startIcon: "meteor-icons:download",
          label: "Download",
        },
      },
      {
        props: {
          color: "primary",
          variant: "outline",
          startIcon: "ion:create-outline",
          label: "Edit",
        },
      },
      {
        props: {
          color: "primary",
          variant: "ghost",
          startIcon: "ion:trash-outline",
          label: "Delete",
        },
      },
      {
        props: {
          color: "primary",
          variant: "flat",
          startIcon: "ion:search-outline",
          label: "Search",
        },
      },
    ],
  },
  {
    title: "Custom class",
    items: [
      {
        props: {
          variant: "default",
          color: "custom",
          customClass:
            "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600",
        },
      },
      {
        props: {
          variant: "outline",
          color: "custom",
          customClass:
            "border-2 border-sky-400 dark:border-sky-800 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600",
        },
      },
    ],
  },
];
const chipSections: Section[] = [
  {
    title: "Colors",
    items: (
      ["primary", "default", "success", "danger", "warning", "ios"] as const
    ).map((color) => ({
      label: color,
      props: { color },
    })),
  },
  {
    title: "Sizes",
    items: [
      { label: "small", props: { size: "sm" } },
      { label: "medium", props: { size: "md" } },
      { label: "large", props: { size: "lg" } },
    ],
  },
  {
    title: "Rounded",
    items: [
      { label: "none", props: { rounded: "none" } },
      { label: "sm", props: { rounded: "sm" } },
      { label: "md", props: { rounded: "md" } },
      { label: "lg", props: { rounded: "lg" } },
      { label: "xl", props: { rounded: "xl" } },
      { label: "2xl", props: { rounded: "2xl" } },
      { label: "full", props: { rounded: "full" } },
    ],
  },
  {
    title: "Variants",
    items: [
      { label: "default", props: { variant: "default", color: "primary" } },
      { label: "secondary", props: { variant: "secondary", color: "primary" } },
      { label: "outline", props: { variant: "outline", color: "primary" } },
      { label: "flat", props: { variant: "flat", color: "primary" } },
    ],
  },
  {
    title: "Disabled",
    items: [
      {
        label: "default",
        props: { color: "primary", variant: "default", disabled: true },
      },
      {
        label: "secondary",
        props: { color: "primary", variant: "secondary", disabled: true },
      },
      {
        label: "outline",
        props: { color: "primary", variant: "outline", disabled: true },
      },
      {
        label: "flat",
        props: { color: "primary", variant: "flat", disabled: true },
      },
    ],
  },
  {
    title: "Loading",
    items: [
      { props: { color: "primary", variant: "default", loading: true } },
      { props: { color: "primary", variant: "secondary", loading: true } },
      { props: { color: "primary", variant: "outline", loading: true } },
      { props: { color: "primary", variant: "flat", loading: true } },
    ],
  },
  {
    title: "With Icon",
    items: [
      {
        props: {
          color: "success",
          variant: "default",
          startIcon: "material-symbols-light:circle",
          label: "Active",
        },
      },
      {
        props: {
          color: "default",
          variant: "secondary",
          startIcon: "ion:checkmark-circle",
          label: "Default",
        },
      },
      {
        props: {
          color: "primary",
          variant: "outline",
          startIcon: "ion:upload",
          label: "Upload",
        },
      },
      {
        props: {
          color: "danger",
          variant: "flat",
          startIcon: "ion:close-circle",
          label: "Disabled",
        },
      },
    ],
  },
  {
    title: "With Social Icon",
    items: [
      {
        props: {
          color: "default",
          variant: "default",
          startIcon: "skill-icons:gmail-light",
          label: "example@gmail.com",
          iconSize: "15",
        },
      },
      {
        props: {
          color: "default",
          variant: "default",
          startIcon: "skill-icons:instagram",
          label: "@example",
          iconSize: "15",
        },
      },
    ],
  },
  {
    title: "Custom class",
    items: [
      {
        props: {
          variant: "default",
          color: "custom",
          customClass:
            "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        },
      },
      {
        props: {
          variant: "outline",
          color: "custom",
          customClass:
            "border-2 border-sky-400 dark:border-sky-800 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500",
        },
      },
    ],
  },
];

const componentGroups: ComponentGroup[] = [
  {
    name: "Button",
    component: "PUButton",
    defaultLabel: "Button",
    sections: buttonSections,
  },
  {
    name: "Chip",
    component: "PUChip",
    defaultLabel: "Chip",
    sections: chipSections,
  },
];
</script>
