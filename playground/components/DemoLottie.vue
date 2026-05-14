<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Lottie
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Renders a Lottie animation from a JSON object. The library ships with a
        bundled empty-state animation used by
        <code>PUTable</code>, available here as an import from
        <code>@smurfox/proxy-ui</code>.
      </p>
    </div>

    <!-- Default bundled animation -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Bundled empty-state animation
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Same JSON used by <code>PUTable</code>'s empty state, rendered through
        <code>PULottie</code>.
      </p>
      <div
        class="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 rounded-xl p-6 flex justify-center"
      >
        <PULottie :animation-data="emptyStateAnimation" />
      </div>
    </div>

    <!-- Custom size -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Custom size
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Pass <code>:width</code> and <code>:height</code> in pixels. On screens
        narrower than 768px, both shrink by 80px automatically.
      </p>
      <div
        class="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 rounded-xl p-6 flex justify-center"
      >
        <PULottie
          :animation-data="emptyStateAnimation"
          :width="240"
          :height="240"
        />
      </div>
    </div>

    <!-- Loop disabled -->
    <div class="w-full max-w-5xl mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Play once
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Set <code>:loop="false"</code> to play the animation a single time.
      </p>
      <div
        class="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-white/10 rounded-xl p-6 flex justify-center"
      >
        <PULottie
          :animation-data="emptyStateAnimation"
          :width="200"
          :height="200"
          :loop="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emptyStateAnimation from '../../src/runtime/assets/empty-state.json'
</script>

<style scoped></style>
