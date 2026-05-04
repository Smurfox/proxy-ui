<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">Inputs</h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of input components for forms and user interactions.
      </p>
    </div>
    <PUInput label="Name" placeholder="Enter your username" required />
    <PUInput
      label="Password"
      type="password"
      variant="secondary"
      placeholder="Enter your password"
      required
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
