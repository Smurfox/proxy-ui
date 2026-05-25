<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Inputs
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        A collection of input components for forms and user interactions.
      </p>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
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
            <PUButton
              color="primary"
              variant="ghost"
              size="sm"
              label="Show"
            />
          </template>
        </PUInput>
        <PUTextArea
          label="Message"
          placeholder="Write your message"
          description="This is a description for the message textarea field."
          required
        />
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Validation Field
      </h1>
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
            <PUButton
              color="danger"
              variant="ghost"
              size="sm"
              label="Show"
            />
          </template>
        </PUInput>
        <PUTextArea
          label="Message"
          placeholder="Write your message"
          error="This is an error message for the message textarea field."
          required
        >
          <template #startContent>
            <Icon name="ion:chatbox" />
          </template>
        </PUTextArea>
      </div>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Select on focus
      </h1>
      <PUCard class="p-6! flex flex-col gap-6">
        <PUInput
          v-model="focusValue"
          label="Order code"
          placeholder="Enter the code"
          description="Click the input — the text gets selected so you can replace it in one go."
          focus
        />
        <PUInput
          v-model="focusValueSecondary"
          label="Coupon"
          variant="secondary"
          placeholder="Enter the coupon"
          focus
        >
          <template #startContent>
            <Icon name="ion:pricetag" />
          </template>
        </PUInput>
      </PUCard>
    </div>
    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Inline Label
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        Floating label inside the field for compact layouts.
      </p>
      <div
        class="border border-gray-300 flex flex-col gap-4 p-9 w-full rounded-xl"
      >
        <div class="grid grid-cols-2 gap-4">
          <PUInput
            v-model="inlineName"
            label="Nombre"
            placeholder="Tu nombre"
            inline-label
          />
          <PUInput
            v-model="inlineEmail"
            label="Correo electrónico"
            type="email"
            placeholder="tu@correo.com"
            variant="secondary"
            inline-label
            required
          />
        </div>
        <PUInput
          v-model="inlineWithIcon"
          label="Buscar"
          placeholder="Escribe para filtrar"
          inline-label
        >
          <template #startContent>
            <Icon name="ion:search" />
          </template>
        </PUInput>
        <PUTextArea
          v-model="inlineMessage"
          label="Mensaje"
          placeholder="Escribe tu mensaje"
          inline-label
          :rows="4"
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Disabled State
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInput
          label="Name"
          placeholder="Enter your username"
          disabled
        >
          <template #startContent>
            <Icon
              name="ion:person"
              class="dark:text-white"
            />
          </template>
        </PUInput>
        <PUInput
          label="Name"
          placeholder="Enter your username"
          variant="secondary"
          disabled
        >
          <template #startContent>
            <Icon
              name="ion:person"
              class="dark:text-white"
            />
          </template>
        </PUInput>
        <PUTextArea
          label="Message"
          placeholder="Write your message"
          variant="secondary"
          disabled
        >
          <template #startContent>
            <Icon
              name="ion:chatbox"
              class="dark:text-white"
            />
          </template>
        </PUTextArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const focusValue = ref('ORD-1024')
const focusValueSecondary = ref('SUMMER-25')
const inlineName = ref('Alan')
const inlineEmail = ref('')
const inlineWithIcon = ref('')
const inlineMessage = ref('')
</script>

<style scoped></style>
