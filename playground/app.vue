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

      <div class="mb-4">
        <h1 class="text-2xl font-semibold dark:text-white mb-1">ProxyUI</h1>
        <p class="text-sm dark:text-white/70">
          A collection of accessible and customizable Vue components built with
          Tailwind CSS.
        </p>
      </div>

      <div class="flex flex-col gap-3 py-10 items-start">
        <PUTabs
          v-model="activeTab"
          :tabs="demoTabs"
          rounded="lg"
          btnColor="bg-primary"
          activeTextColor="text-white"
          :disabledTabs="['docs']"
        />
      </div>

      <div class="grid grid-cols-4 gap-6">
        <PUCard
          v-for="group in componentGroups"
          :key="group.name"
          class="p-6 w-full flex flex-col items-start gap-8"
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
        </PUCard>
        <PUCard class="p-6 w-full flex flex-col items-start gap-8">
          <h2 class="text-lg font-semibold dark:text-white -mb-4">Avatar</h2>
          <div class="flex flex-wrap items-center gap-6">
            <PUAvatar size="sm" />
            <PUAvatar size="md" />
            <PUAvatar size="lg" />
            <div class="w-20 h-20">
              <PUAvatar size="full" />
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <PUAvatar rounded="none" />
            <PUAvatar rounded="sm" />
            <PUAvatar rounded="md" />
            <PUAvatar rounded="lg" />
            <PUAvatar rounded="xl" />
            <PUAvatar rounded="2xl" />
            <PUAvatar rounded="full" />
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <PUAvatar
              label="AG"
              class="text-xl font-semibold bg-linear-to-r from-rose-500 to-rose-700 text-black"
            />
            <PUAvatar icon="ion:person" class="text-2xl" />
            <PUAvatar
              image="https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?semt=ais_incoming&w=740&q=80"
            />
          </div>
        </PUCard>
        <div class="col-span-1 p-8 w-full flex flex-col items-start gap-8">
          <h2 class="text-lg font-semibold dark:text-white -mb-4">Card</h2>
          <PUCard
            :isBordered="false"
            customClass="relative h-95 w-full bg-white flex flex-col justify-end"
          >
            <img
              alt="Product image"
              class="absolute top-15 left-1/2 -translate-x-1/2 w-65 h-full object-contain object-top"
              src="https://dlcdnwebimgs.asus.com/files/media/0cb01c7f-25af-4e9b-b7da-3a9a8f5e7d31/v5/images/power-box.webp"
            />
            <div class="px-4 flex flex-col gap-2">
              <h2 class="text-xs uppercase font-semibold opacity-40">New</h2>
              <h1 class="text-xl font-bold">ASUS ROG Xbox Ally X</h1>
              <p class="text-sm">
                Powerful gaming handheld for console-quality gaming on the go.
              </p>
              <div class="flex items-end justify-between">
                <p class="mt-4 text-xl font-bold">$499.99</p>
                <PUButton
                  color="ios"
                  variant="default"
                  label="Buy now"
                  customClass="px-5 py-2.5"
                />
              </div>
            </div>
          </PUCard>
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
              <div class="flex flex-col">
                <p class="text-xs font-semibold">Return</p>
                <h2 class="text-3xl font-bold">3.5%</h2>
              </div>
              <PUButton
                isIconOnly
                icon="stash:arrow-right-solid"
                iconSize="25"
                customClass="bg-black text-white hover:brightness-110"
              />
            </div>
          </PUCard>
          <PUCard
            shadow="md"
            :isBordered="false"
            customClass="relative h-95 w-full bg-white flex flex-col justify-end"
          >
            <img
              alt="Product image"
              class="absolute inset-0 w-full h-full object-cover rounded-2xl"
              src="https://www.southernliving.com/thmb/uC9lfdB-vpeXk1XuxT12bII4EQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1474089369-d2b0855436be4074ae986429058bf15c.jpg"
            />
            <!-- Dark opacity overlay -->
            <div class="absolute inset-0 bg-black/40 rounded-2xl" />

            <div class="p-3 flex flex-col gap-2 z-10 text-white">
              <h2 class="text-xs uppercase font-semibold opacity-70">Travel</h2>
              <h1 class="text-4xl font-bold">Explore the world with us</h1>
              <p class="text-sm opacity-90">
                Discover new destinations, experience different cultures, and
                make unforgettable memories with our travel services.
              </p>
            </div>
          </PUCard>
          <PUCard
            customClass="min-h-100 w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-end p-5"
          >
            <h1
              class="text-6xl text-center uppercase font-black text-white/60 backdrop-blur-sm stroked-text"
            >
              Liquid Glass
            </h1>
            <PUCard
              :isBordered="false"
              customClass="mt-2 h-100 w-full bg-white/60 backdrop-blur-2xl flex flex-col gap-4 border border-white/60 backdrop-saturate-150 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/0 before:pointer-events-none"
              ><PUCard
                shadow="none"
                :isBordered="false"
                customClass="relative mt-2 h-40 w-full bg-white/50 flex flex-col justify-end border border-white/90 overflow-hidden"
              >
                <!-- Ambient glow -->
                <div
                  class="absolute -top-8 right-5 translate-x-1/2 w-40 h-32 bg-purple-500/25 rounded-full blur-[30px] pointer-events-none"
                />
                <img
                  alt="Product image"
                  class="absolute -top-8 right-5 translate-x-1/2 w-35 h-full object-contain object-top"
                  src="https://framerusercontent.com/images/4aKiy891Evx73m4uRXiOoZULpc.png"
                />
                <div class="flex flex-col gap-1">
                  <h1 class="font-bold text-2xl">Refer & Earn Money</h1>
                  <p class="text-xs font-extralight opacity-40">
                    For each friend that you invite
                  </p>
                </div>
              </PUCard>
              <div class="px-2 flex flex-col gap-3">
                <h1 class="font-medium">How it works</h1>
                <div class="flex items-center gap-3">
                  <Icon
                    name="fluent:people-28-regular"
                    size="50"
                    class="opacity-80"
                  />
                  <p class="text-sm opacity-60">
                    Share your unique referral link with friends.
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="fluent:note-add-20-regular"
                    size="80"
                    class="opacity-80"
                  />
                  <p class="text-sm opacity-60">
                    Your friend registers using your link and completes a
                    purchase.
                  </p>
                </div>
              </div>
            </PUCard>
          </PUCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

const activeTab = ref("overview");
const demoTabs = [
  { label: "Overview", value: "overview", icon: "ion:home" },
  { label: "Components", value: "components", icon: "ion:home" },
  { label: "Docs", value: "docs", icon: "ion:home" },
];

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

<style scoped>
.stroked-text {
  /* Apply a black stroke with a width of 2 pixels */
  -webkit-text-stroke: 0.4px rgb(240, 240, 240);

  /* Optional: Adjust other styling properties */
  font-family: "Arial", sans-serif;
}
</style>
