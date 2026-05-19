<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Skeleton
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A shimmer loading placeholder. Use it to reserve layout space while
        async content is fetching.
      </p>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Usage
      </h1>
      <PUCard class="p-6! flex flex-col gap-6">
        <PUSkeleton />
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Variants
      </h1>
      <PUCard class="p-6! flex items-end gap-8">
        <div class="flex flex-col items-center gap-2">
          <PUSkeleton
            variant="rectangular"
            height="h-20"
            width="w-32"
          />
          <span class="text-xs font-mono dark:text-white/70">rectangular</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <PUSkeleton
            variant="circular"
            height="h-16"
            width="w-16"
          />
          <span class="text-xs font-mono dark:text-white/70">circular</span>
        </div>
        <div class="flex flex-col items-center gap-2 flex-1">
          <div class="w-full flex flex-col gap-1.5">
            <PUSkeleton
              variant="text"
              height="h-3"
              width="w-full"
            />
            <PUSkeleton
              variant="text"
              height="h-3"
              width="w-5/6"
            />
            <PUSkeleton
              variant="text"
              height="h-3"
              width="w-2/3"
            />
          </div>
          <span class="text-xs font-mono dark:text-white/70">text</span>
        </div>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Heights
      </h1>
      <PUCard class="p-6! flex flex-col gap-4">
        <div
          v-for="h in ['xs', 'sm', 'md', 'lg', 'xl']"
          :key="h"
          class="flex items-center gap-4"
        >
          <span class="w-10 text-xs font-mono dark:text-white/70">{{ h }}</span>
          <PUSkeleton :height="h" />
        </div>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Custom Tailwind sizes
      </h1>
      <p class="text-xs text-gray-600 dark:text-gray-400">
        Pass any Tailwind height/width utility class as a string.
      </p>
      <PUCard class="p-6! flex flex-col gap-4">
        <PUSkeleton height="h-32" />
        <PUSkeleton
          height="h-24"
          width="w-1/2"
        />
        <div class="flex items-center gap-3">
          <PUSkeleton
            height="h-12"
            width="w-12"
          />
          <PUSkeleton height="h-6" />
        </div>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        Card composition
      </h1>
      <p class="text-xs text-gray-600 dark:text-gray-400">
        Compose multiple skeletons to mirror your real content layout.
      </p>
      <PUCard class="p-6! flex flex-col gap-4">
        <PUSkeleton height="h-40" />
        <PUSkeleton
          height="h-5"
          width="w-2/3"
        />
        <PUSkeleton
          height="h-4"
          width="w-1/2"
        />
        <div class="flex items-center gap-3 pt-2">
          <PUSkeleton
            height="h-10"
            width="w-10"
          />
          <div class="flex flex-col gap-1.5 flex-1">
            <PUSkeleton
              height="h-3.5"
              width="w-1/3"
            />
            <PUSkeleton
              height="h-3"
              width="w-1/4"
            />
          </div>
        </div>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg dark:text-white">
        List
      </h1>
      <PUCard class="p-6! flex flex-col gap-3">
        <div
          v-for="i in 4"
          :key="i"
          class="flex items-center gap-3"
        >
          <PUSkeleton
            height="h-10"
            width="w-10"
          />
          <div class="flex flex-col gap-1.5 flex-1">
            <PUSkeleton
              height="h-3.5"
              width="w-1/2"
            />
            <PUSkeleton
              height="h-3"
              width="w-1/3"
            />
          </div>
          <PUSkeleton
            height="h-8"
            width="w-20"
          />
        </div>
      </PUCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
