<template>
  <PUCard class="p-6 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">Button</h2>
    <div v-for="section in buttonSections" :key="section.title">
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
          <PUButton label="Button" v-bind="item.props" />
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
    title: "Icon Only",
    items: [
      {
        props: {
          color: "primary",
          variant: "default",
          isIconOnly: true,
          icon: "ion:add-circle",
          iconSize: "20",
        },
      },
      {
        props: {
          color: "default",
          variant: "default",
          isIconOnly: true,
          rounded: "full",
          icon: "tabler:dots",
          iconSize: "25",
        },
      },
      {
        props: {
          color: "danger",
          variant: "default",
          isIconOnly: true,
          rounded: "full",
          icon: "ion:trash",
          iconSize: "20",
          iconColor: "white",
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
</script>
