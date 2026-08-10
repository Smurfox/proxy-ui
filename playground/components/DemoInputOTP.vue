<template>
  <div class="p-6 w-full flex flex-col items-start gap-8">
    <div class="flex flex-col gap-5">
      <h2 class="text-2xl font-semibold dark:text-white -mb-4">
        Input OTP
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        One-time-code input with animated digits. Type, paste, or use the arrow
        keys — each character springs into place with motion.
      </p>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Usage
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="basic"
          label="Verification code"
          description="Paste the 6-digit code we sent you — it fills every cell at once."
          required
        />
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Value: <span class="font-mono dark:text-white">{{ basic || "—" }}</span>
        </p>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Verification flow
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
        The <code>complete</code> event fires when the last cell is filled. The
        code for this demo is <span class="font-mono">123456</span>.
      </p>
      <PUCard class="p-6! flex flex-col gap-4 items-start">
        <PUInputOTP
          v-model="flowCode"
          label="Enter the code"
          :error="flowError"
          :disabled="verifying || verified"
          :separator-every="3"
          @complete="verify"
        />
        <div class="flex items-center gap-3">
          <PUButton
            label="Reset"
            variant="outline"
            size="sm"
            @click="reset"
          />
          <span
            v-if="verifying"
            class="text-sm text-gray-600 dark:text-gray-400"
          >Verifying…</span>
          <span
            v-else-if="verified"
            class="text-sm text-success flex items-center gap-1"
          >
            <Icon name="lucide:check-circle-2" /> Code verified
          </span>
        </div>
      </PUCard>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Sizes
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="small"
          label="Small"
          size="sm"
          :length="4"
        />
        <PUInputOTP
          v-model="medium"
          label="Medium"
          size="md"
          :length="4"
        />
        <PUInputOTP
          v-model="large"
          label="Large"
          size="lg"
          :length="4"
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Types
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="numberCode"
          label="Number"
          description="Digits only — letters are rejected as you type."
        />
        <PUInputOTP
          v-model="textCode"
          label="Text"
          type="text"
          :length="5"
          description="Any non-space character."
        />
        <PUInputOTP
          v-model="passwordCode"
          label="Password"
          type="password"
          :length="4"
          description="Masked with a dot, but the value stays readable in v-model."
        />
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Password value:
          <span class="font-mono dark:text-white">{{ passwordCode || "—" }}</span>
        </p>
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Groups &amp; placeholder
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="grouped"
          label="Grouped every 3"
          :separator-every="3"
        />
        <PUInputOTP
          v-model="groupedDots"
          label="Grouped every 2, custom separator"
          :length="6"
          :separator-every="2"
          separator="•"
          variant="secondary"
        />
        <PUInputOTP
          v-model="placeholderCode"
          label="With placeholder"
          :length="4"
          placeholder="0"
          rounded="full"
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Variants &amp; radius
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="variantDefault"
          label="Default"
          :length="4"
        />
        <PUInputOTP
          v-model="variantSecondary"
          label="Secondary"
          variant="secondary"
          :length="4"
        />
        <PUInputOTP
          v-model="roundedNone"
          label="Square"
          rounded="none"
          :length="4"
        />
        <PUInputOTP
          v-model="roundedFull"
          label="Pill"
          rounded="full"
          variant="secondary"
          :length="4"
        />
        <PUInputOTP
          v-model="circleCode"
          label="Circle"
          shape="circle"
          :length="4"
        />
        <PUInputOTP
          v-model="circleSecondary"
          label="Circle — secondary, large"
          shape="circle"
          variant="secondary"
          size="lg"
          :length="4"
        />
      </div>
    </div>

    <div class="w-200 mx-auto flex flex-col gap-3">
      <h1 class="font-semibold text-lg">
        Validation &amp; disabled
      </h1>
      <div
        class="border border-gray-300 flex flex-col gap-6 p-9 w-full rounded-xl"
      >
        <PUInputOTP
          v-model="errorCode"
          label="Security code"
          error="That code is expired. Request a new one."
          required
        />
        <PUInputOTP
          model-value="4821"
          label="Disabled"
          :length="4"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basic = ref('')

const flowCode = ref('')
const flowError = ref('')
const verifying = ref(false)
const verified = ref(false)

const small = ref('')
const medium = ref('')
const large = ref('')

const numberCode = ref('')
const textCode = ref('')
const passwordCode = ref('')

const grouped = ref('')
const groupedDots = ref('')
const placeholderCode = ref('')

const variantDefault = ref('')
const variantSecondary = ref('')
const roundedNone = ref('')
const roundedFull = ref('')
const circleCode = ref('')
const circleSecondary = ref('')

const errorCode = ref('9999')

function verify(code: string) {
  flowError.value = ''
  verifying.value = true
  setTimeout(() => {
    verifying.value = false
    if (code === '123456') {
      verified.value = true
    }
    else {
      flowError.value = 'Invalid code, try again.'
    }
  }, 900)
}

function reset() {
  flowCode.value = ''
  flowError.value = ''
  verified.value = false
  verifying.value = false
}
</script>

<style scoped></style>
