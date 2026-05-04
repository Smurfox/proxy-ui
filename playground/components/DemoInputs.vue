<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">Inputs</h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of input components for forms and user interactions.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Usage</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInput
          label="Name"
          placeholder="Enter your username"
          description="This is a description for the name input field."
          required
        />
        <PUInput
          label="Password"
          type="password"
          variant="secondary"
          placeholder="Enter your password"
          required
        >
          <template #endContent>
            <PUButton color="primary" variant="ghost" size="sm" label="Show" />
          </template>
        </PUInput>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Validation Field</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInput
          label="Name"
          placeholder="Enter your username"
          error="This is an error message for the name input field."
          required
        >
          <template #startContent>
            <Icon name="ion:person" />
          </template>
        </PUInput>
        <PUInput
          label="Password"
          type="password"
          variant="secondary"
          placeholder="Enter your password"
          error="This is an error message for the password input field."
          required
        >
          <template #startContent>
            <Icon name="ion:lock-closed" />
          </template>
          <template #endContent>
            <PUButton color="danger" variant="ghost" size="sm" label="Show" />
          </template>
        </PUInput>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">Disabled State</h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInput label="Name" placeholder="Enter your username" disabled>
          <template #startContent>
            <Icon name="ion:person" class="dark:text-white" />
          </template>
        </PUInput>
        <PUInput
          label="Name"
          placeholder="Enter your username"
          variant="secondary"
          disabled
        >
          <template #startContent>
            <Icon name="ion:person" class="dark:text-white" />
          </template>
        </PUInput>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
