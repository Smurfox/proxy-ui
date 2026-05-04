<template>
  <PUCard class="p-6 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">Chip</h2>
    <div v-for="section in chipSections" :key="section.title">
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
          <PUChip label="Chip" v-bind="item.props" />
        </div>
      </div>
    </div>
  </PUCard>
</template>

<script setup lang="ts">
type Section = {
  title: string;
  items: { label?: string; props: any }[];
};

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
</script>
