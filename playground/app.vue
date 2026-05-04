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

      <div class="grid grid-cols-6 gap-6 max-w-7xl mx-auto">
        <PUTabs
          v-model="activeTab"
          :tabs="demoTabs"
          rounded="lg"
          :disabledTabs="['docs']"
          :isVertical="true"
          class="col-span-1 w-full"
        />
        <div class="col-span-5 max-h-[85vh] overflow-y-auto">
          <DemoButtons v-if="activeTab === 'buttons'" />
          <DemoChips v-else-if="activeTab === 'chips'" />
          <DemoAvatars v-else-if="activeTab === 'avatars'" />
          <DemoCards v-else-if="activeTab === 'cards'" />
          <DemoInputs v-else-if="activeTab === 'inputs'" />
          <DemoSelect v-else-if="activeTab === 'select'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

const activeTab = ref("buttons");
const demoTabs = [
  { label: "Buttons", value: "buttons" },
  { label: "Chips", value: "chips" },
  { label: "Avatars", value: "avatars" },
  { label: "Cards", value: "cards" },
  { label: "Inputs", value: "inputs" },
  { label: "Select", value: "select" },
];

function toggleDark() {
  isDark.value = !isDark.value;
}

// Keyboard shortcut — presiona D para toggle
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    const tag = (e.target as HTMLElement)?.tagName;
    const isEditable =
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      (e.target as HTMLElement)?.isContentEditable;
    if (e.key === "d" && !e.metaKey && !e.ctrlKey && !isEditable) {
      toggleDark();
    }
  });
});
</script>
