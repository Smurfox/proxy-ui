<template>
  <div class="flex flex-col gap-1">
    <div
      v-if="props.label"
      class="flex items-start gap-1"
    >
      <label
        class="dark:text-white"
        :class="[props.labelClass]"
      >{{ props.label }}</label>
      <span
        v-if="props.required"
        class="text-danger"
      >*</span>
    </div>

    <motion.div
      class="flex items-center w-fit"
      :class="[gapClasses[props.size], props.disabled ? 'opacity-70' : '']"
      :animate="{ scale: isComplete ? [1, 1.04, 1] : 1 }"
      :transition="completeTransition"
    >
      <template
        v-for="(cell, i) in cells"
        :key="i"
      >
        <motion.div
          class="relative flex items-center justify-center overflow-hidden transition-colors"
          :class="[
            isCircle ? circleSizeClasses[props.size] : sizeClasses[props.size],
            isCircle ? 'rounded-full' : roundedClasses[props.rounded],
            props.error ? errorVariants[props.variant] : variants[props.variant],
            activeIndex === i
              ? props.error
                ? 'ring-2 ring-danger'
                : 'ring-2 ring-primary'
              : '',
          ]"
          :animate="{ scale: activeIndex === i ? 1.06 : 1 }"
          :transition="cellTransition"
        >
          <input
            :ref="el => setInputRef(el, i)"
            class="absolute inset-0 w-full h-full text-center bg-transparent text-transparent caret-transparent outline-none selection:bg-transparent"
            :class="props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
            :value="cell"
            :type="props.type === 'number' ? 'tel' : 'text'"
            :inputmode="props.type === 'number' ? 'numeric' : 'text'"
            :disabled="props.disabled"
            :aria-label="`${props.label || 'Code'} ${i + 1} of ${props.length}`"
            autocomplete="one-time-code"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @input="onInput($event, i)"
            @keydown="onKeydown($event, i)"
            @paste="onPaste($event, i)"
            @focus="onFocus(i)"
            @blur="onBlur(i)"
          >

          <AnimatePresence>
            <motion.span
              v-if="cell"
              :key="`${i}-${cell}`"
              class="absolute inset-0 flex items-center justify-center font-semibold pointer-events-none select-none dark:text-white"
              :class="props.error ? 'text-danger' : ''"
              :initial="charInitial"
              :animate="charAnimate"
              :exit="charExit"
              :transition="charTransition"
            >
              {{ props.type === 'password' ? '•' : cell }}
            </motion.span>
          </AnimatePresence>

          <motion.span
            v-if="!cell && activeIndex === i && !props.disabled"
            class="absolute w-px pointer-events-none"
            :class="[
              caretClasses[props.size],
              props.error ? 'bg-danger' : 'bg-primary',
            ]"
            :animate="{ opacity: [1, 1, 0, 0] }"
            :transition="caretTransition"
          />
          <span
            v-else-if="!cell && props.placeholder"
            class="pointer-events-none select-none text-gray-400 dark:text-white/30"
          >{{ props.placeholder }}</span>
        </motion.div>

        <span
          v-if="hasSeparatorAfter(i)"
          class="select-none text-gray-400 dark:text-white/30"
          :class="separatorClasses[props.size]"
        >{{ props.separator }}</span>
      </template>
    </motion.div>

    <p
      v-if="props.description && !props.error"
      class="text-gray-600 dark:text-[#8B92A0] text-xs"
    >
      {{ props.description }}
    </p>
    <p
      v-if="props.error"
      class="text-danger text-xs mt-1"
    >
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { InputOTPShape, InputOTPSize, InputOTPType, InputRounded, InputVariant } from '../types'

const sizeClasses = {
  sm: 'w-10 h-12 min-w-10 text-lg',
  md: 'w-12 h-14 min-w-12 text-xl',
  lg: 'w-14 h-16 min-w-14 text-2xl',
} as const

const circleSizeClasses = {
  sm: 'w-11 h-11 min-w-11 text-lg',
  md: 'w-14 h-14 min-w-14 text-xl',
  lg: 'w-16 h-16 min-w-16 text-2xl',
} as const

const gapClasses = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
} as const

const caretClasses = {
  sm: 'h-5',
  md: 'h-6',
  lg: 'h-7',
} as const

const separatorClasses = {
  sm: 'text-lg px-0.5',
  md: 'text-xl px-1',
  lg: 'text-2xl px-1.5',
} as const

const roundedClasses = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
} as const

const variants = {
  default: 'border border-default bg-default dark:text-white',
  secondary: 'border border-default bg-card dark:text-white',
} as const

const errorVariants = {
  default: 'border border-danger bg-danger/10 dark:bg-danger/20',
  secondary: 'border border-danger bg-danger/22 dark:bg-danger/10',
} as const

const charInitial = { opacity: 0, scale: 0.3, y: 14, filter: 'blur(6px)' }
const charAnimate = { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
const charExit = { opacity: 0, scale: 0.5, y: -14, filter: 'blur(6px)' }
const charTransition = {
  type: 'spring',
  stiffness: 520,
  damping: 22,
  mass: 0.6,
} as const

const cellTransition = {
  type: 'spring',
  stiffness: 420,
  damping: 20,
  mass: 0.5,
} as const

const completeTransition = { duration: 0.35, ease: 'easeOut' } as const

const caretTransition = {
  duration: 1,
  repeat: Infinity,
  ease: 'linear' as const,
  times: [0, 0.45, 0.5, 1],
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    length?: number
    type?: InputOTPType
    size?: InputOTPSize
    shape?: InputOTPShape
    rounded?: InputRounded
    variant?: InputVariant
    label?: string
    labelClass?: string
    description?: string
    error?: string
    required?: boolean
    disabled?: boolean
    autofocus?: boolean
    placeholder?: string
    separator?: string
    separatorEvery?: number
  }>(),
  {
    length: 6,
    type: 'number',
    size: 'md',
    shape: 'rect',
    rounded: 'xl',
    variant: 'default',
    labelClass: 'text-sm font-semibold',
    required: false,
    disabled: false,
    autofocus: false,
    placeholder: '',
    separator: '-',
    separatorEvery: 0,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'complete': [value: string]
}>()

const inputs = ref<HTMLInputElement[]>([])
const activeIndex = ref<number | null>(null)
const inner = ref<string[]>(toCells(props.modelValue))

const cells = computed(() => inner.value)
const isCircle = computed(() => props.shape === 'circle')
const isComplete = computed(() =>
  inner.value.length === props.length && inner.value.every(Boolean),
)

function isAllowed(char: string) {
  if (props.type === 'number') return /\d/.test(char)
  return /\S/.test(char)
}

function toCells(value?: string | number) {
  const chars = Array.from(String(value ?? ''))
    .filter(isAllowed)
    .slice(0, props.length)
  return Array.from({ length: props.length }, (_, i) => chars[i] ?? '')
}

function setInputRef(el: Element | ComponentPublicInstance | null, i: number) {
  if (el) inputs.value[i] = el as HTMLInputElement
}

function hasSeparatorAfter(i: number) {
  return (
    props.separatorEvery > 0
    && (i + 1) % props.separatorEvery === 0
    && i < props.length - 1
  )
}

function commit() {
  const value = inner.value.join('')
  emit('update:modelValue', value)
  if (value.length === props.length) emit('complete', value)
}

function focusIndex(i: number) {
  const index = Math.min(Math.max(i, 0), props.length - 1)
  nextTick(() => {
    const el = inputs.value[index]
    el?.focus()
    el?.select()
  })
}

function setCell(i: number, char: string) {
  const next = [...inner.value]
  next[i] = char
  inner.value = next
  commit()
}

function fillFrom(start: number, chars: string[]) {
  const next = [...inner.value]
  let i = start
  for (const char of chars) {
    if (i >= props.length) break
    next[i] = char
    i++
  }
  inner.value = next
  commit()
  focusIndex(i >= props.length ? props.length - 1 : i)
}

function onInput(event: Event, i: number) {
  const target = event.target as HTMLInputElement
  const chars = Array.from(target.value).filter(isAllowed)

  if (!chars.length) {
    target.value = ''
    setCell(i, '')
    return
  }

  // SMS autofill / paste land the whole code inside a single cell
  if (chars.length > 1) {
    target.value = chars[0] ?? ''
    fillFrom(i, chars)
    return
  }

  const char = chars[chars.length - 1] ?? ''
  target.value = char
  setCell(i, char)
  focusIndex(i + 1)
}

function onKeydown(event: KeyboardEvent, i: number) {
  if (event.ctrlKey || event.metaKey) return

  switch (event.key) {
    case 'Backspace': {
      event.preventDefault()
      if (inner.value[i]) {
        setCell(i, '')
      }
      else if (i > 0) {
        setCell(i - 1, '')
        focusIndex(i - 1)
      }
      break
    }
    case 'Delete':
      event.preventDefault()
      setCell(i, '')
      break
    case 'ArrowLeft':
      event.preventDefault()
      focusIndex(i - 1)
      break
    case 'ArrowRight':
      event.preventDefault()
      focusIndex(i + 1)
      break
    case 'Home':
      event.preventDefault()
      focusIndex(0)
      break
    case 'End':
      event.preventDefault()
      focusIndex(props.length - 1)
      break
    default:
      // Block characters the current type does not accept before they render
      if (event.key.length === 1 && !isAllowed(event.key)) event.preventDefault()
  }
}

function onPaste(event: ClipboardEvent, i: number) {
  event.preventDefault()
  const text = event.clipboardData?.getData('text') ?? ''
  const chars = Array.from(text).filter(isAllowed)
  if (chars.length) fillFrom(i, chars)
}

function onFocus(i: number) {
  activeIndex.value = i
  inputs.value[i]?.select()
}

function onBlur(i: number) {
  if (activeIndex.value === i) activeIndex.value = null
}

function focus() {
  const firstEmpty = inner.value.findIndex(cell => !cell)
  focusIndex(firstEmpty === -1 ? props.length - 1 : firstEmpty)
}

function clear() {
  inner.value = Array.from({ length: props.length }, () => '')
  emit('update:modelValue', '')
  focusIndex(0)
}

watch(
  () => props.modelValue,
  (value) => {
    const next = toCells(value)
    if (next.join('') !== inner.value.join('')) inner.value = next
  },
)

watch(
  () => props.length,
  () => {
    inner.value = toCells(inner.value.join(''))
  },
)

onMounted(() => {
  if (props.autofocus && !props.disabled) focusIndex(0)
})

defineExpose({ focus, clear })
</script>
