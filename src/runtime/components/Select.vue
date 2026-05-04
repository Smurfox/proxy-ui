<template>
  <div class="flex flex-col gap-1">
    <div v-if="label" class="flex items-start gap-1">
      <label class="dark:text-white" :class="[labelClass]">{{ label }} </label>
      <span v-if="props.required" class="text-danger">*</span>
    </div>

    <div ref="selectRef" class="relative w-full text-left">
      <button
        type="button"
        class="w-full p-3 text-sm text-left transition-colors flex items-center justify-between gap-3"
        :class="[
          roundedVariants[props.rounded],
          props.error ? errorVariants[props.variant] : variants[props.variant],
          props.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
          !selectedOption ? 'text-gray-500 dark:text-white/50' : '',
        ]"
        :disabled="props.disabled"
        @click.stop="toggle"
      >
        <span class="truncate">
          {{ displayText }}
        </span>
        <Icon
          name="mdi:chevron-down"
          class="text-gray-400 transition-transform duration-200 shrink-0"
          :class="{ 'rotate-180': isOpen && !props.disabled }"
        />
      </button>

      <Teleport v-if="isOpen && !props.disabled" to="body">
        <AnimatePresence>
          <motion.div
            v-if="isOpen && !props.disabled"
            :initial="{ scale: 0.96, opacity: 0, y: -6 }"
            :animate="{ scale: 1, opacity: 1, y: 0 }"
            :exit="{ scale: 0.96, opacity: 0, y: -6 }"
            class="fixed p-2 max-h-56 overflow-y-auto origin-top border rounded-xl shadow-xl"
            :class="
              isDarkMode
                ? 'bg-[#212123] border-white/10 text-white'
                : 'bg-white border-gray-100'
            "
            :style="dropdownStyle"
            @click.stop
          >
            <div
              v-if="props.options.length === 0"
              class="px-4 py-2 text-sm text-center"
              :class="isDarkMode ? 'text-white/60' : 'text-black/50'"
            >
              No available options
            </div>
            <template v-else>
              <button
                v-for="option in props.options"
                :key="String(option.value)"
                type="button"
                class="w-full flex items-center justify-between gap-3 px-3 py-2 mb-1 text-left cursor-pointer rounded-lg transition-colors"
                :class="[
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100',
                  option.value === props.modelValue ? selectedOptionClass : '',
                ]"
                @click.stop="selectOption(option)"
              >
                <span
                  class="text-sm truncate"
                  :class="
                    option.value === props.modelValue
                      ? 'text-primary'
                      : unselectedOptionClass
                  "
                >
                  {{ option.label }}
                </span>
                <Icon
                  v-if="option.value === props.modelValue"
                  name="mdi:check"
                  class="text-primary text-sm shrink-0"
                />
              </button>
            </template>
          </motion.div>
        </AnimatePresence>
      </Teleport>
    </div>

    <p
      v-if="description && !props.error"
      class="text-gray-600 dark:text-white/60 text-xs"
    >
      {{ description }}
    </p>
    <p v-if="props.error" class="text-danger text-xs mt-1">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import type { InputRounded, InputVariant } from "../types";

interface SelectOption {
  label: string;
  value: string | number;
}

const roundedVariants = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

const variants = {
  default:
    "border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-white/20 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary focus:outline-none",
  secondary:
    "border border-gray-200 dark:border-white/10 bg-[#EBEBEC] dark:bg-white/20 dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-primary focus:outline-none",
} as const;

const errorVariants = {
  default:
    "border border-danger bg-danger/10 dark:bg-danger/20 text-black dark:text-white enabled:hover:bg-white/20 dark:enabled:hover:bg-white/20 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-danger focus:outline-none",
  secondary:
    "border border-danger bg-danger/22 dark:bg-danger/10 text-black dark:text-white enabled:hover:bg-[#E0E0E1] dark:enabled:hover:bg-white/30 focus:bg-[#EBEBEC] dark:focus:bg-white/20 focus:ring-2 focus:ring-danger focus:outline-none",
} as const;

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    options?: SelectOption[];
    label?: string;
    labelClass?: string;
    placeholder?: string;
    description?: string;
    rounded?: InputRounded;
    variant?: InputVariant;
    required?: boolean;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: null,
    options: () => [],
    labelClass: "text-sm font-semibold",
    placeholder: "Seleccionar",
    rounded: "xl",
    variant: "default",
    required: false,
    error: "",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const selectRef = ref<HTMLDivElement | null>(null);
const isOpen = ref(false);
const isDarkMode = ref(false);
const dropdownPosition = ref({ top: 0, left: 0, width: 0 });

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue);
});

const displayText = computed(() => {
  return selectedOption.value?.label || props.placeholder;
});

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`,
  width: `${dropdownPosition.value.width}px`,
  zIndex: 9999,
}));

const selectedOptionClass = computed(() => {
  return isDarkMode.value ? "bg-white/10" : "bg-primary/10";
});

const unselectedOptionClass = computed(() => {
  return isDarkMode.value ? "text-white" : "text-black";
});

function syncDarkMode() {
  isDarkMode.value = Boolean(selectRef.value?.closest(".dark"));
}

function calculateDropdownPosition() {
  if (!selectRef.value) {
    return;
  }

  syncDarkMode();

  const rect = selectRef.value.getBoundingClientRect();
  dropdownPosition.value = {
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX,
    width: rect.width,
  };
}

async function toggle() {
  if (props.disabled) {
    return;
  }

  if (!isOpen.value) {
    await nextTick();
    calculateDropdownPosition();
  }

  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function selectOption(option: SelectOption) {
  emit("update:modelValue", option.value);
  emit("change", option.value);
  close();
}

function onClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    close();
  }
}

function onScroll() {
  if (isOpen.value) {
    calculateDropdownPosition();
  }
}

onMounted(() => {
  syncDarkMode();
  document.addEventListener("click", onClickOutside);
  window.addEventListener("scroll", onScroll, true);
  window.addEventListener("resize", onScroll);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("scroll", onScroll, true);
  window.removeEventListener("resize", onScroll);
});
</script>
