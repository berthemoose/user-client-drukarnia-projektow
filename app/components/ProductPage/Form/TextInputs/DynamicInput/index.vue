<template>
  <UTextarea
    v-if="inputTypeComputed == 'textarea'"
    v-model="fieldRef"
    v-bind="fieldAttrsRef"
    :placeholder="placeholderComputed"
    :color="error ? 'error' : 'neutral'"
    :highlight="!!error"
    :disabled="areInputsDisabled"
    size="xl"
    :ui="{
      base: 'transition-all duration-200 ease-in-out',
      rounded: 'rounded-xl',
      padding: { xl: 'px-4 py-3.5' },
      ring: 'ring-2 ring-transparent focus:ring-primary-500 dark:focus:ring-primary-400',
      background: 'bg-white dark:bg-gray-800',
      border:
        'border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 dark:focus:border-primary-400',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
    }"
    class="transform hover:scale-[1.01] transition-transform duration-200 w-full" 
  />
  <UInput
    v-else-if="inputTypeComputed == 'text'"
    v-maska="textMask"
    v-model="fieldRef"
    v-bind="fieldAttrsRef"
    :placeholder="placeholderComputed"
    :disabled="areInputsDisabled"
    :color="error ? 'error' : 'neutral'"
    :highlight="!!error"
    size="xl"
    :ui="{
      base: 'transition-all duration-200 ease-in-out',
      rounded: 'rounded-xl',
      padding: { xl: 'px-4 py-3.5' },
      ring: 'ring-2 ring-transparent focus:ring-primary-500 dark:focus:ring-primary-400',
      background: 'bg-white dark:bg-gray-800',
      border:
        'border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 dark:focus:border-primary-400',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
    }"
    class="transform hover:scale-[1.01] transition-transform duration-200 w-full"
  />
  <UInput
    v-else-if="inputTypeComputed == 'number'"
    v-model="fieldRef"
    v-bind="fieldAttrsRef"
    type="number"
    min="1"
    step="1"
    :placeholder="placeholderComputed"
    :disabled="areInputsDisabled"
    :color="error ? 'error' : 'neutral'"
    :highlight="!!error"
    size="xl"
    :ui="{
      base: 'transition-all duration-200 ease-in-out',
      rounded: 'rounded-xl',
      padding: { xl: 'px-4 py-3.5' },
      ring: 'ring-2 ring-transparent focus:ring-primary-500 dark:focus:ring-primary-400',
      background: 'bg-white dark:bg-gray-800',
      border:
        'border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 dark:focus:border-primary-400',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
    }"
    class="transform hover:scale-[1.01] transition-transform duration-200 w-full"
  />
  <UInput
    v-else
    disabled
    placeholder="Wystąpił błąd przy ładowaniu formularza"
    size="xl"
    :ui="{
      rounded: 'rounded-xl',
      padding: { xl: 'px-4 py-3.5' },
    }"
  />
</template>

<script lang="ts" setup>
import { vMaska } from "maska/vue";

interface TextAreaProps {
  label: string;
  desc: string;
  placeholder: string;
  areInputsDisabled: boolean;
  inputType: "textarea" | "text" | "number";
  /* TODO: Type this */
  field: any;
  fieldAttrs: any;
  mask?: string | "";
  error: any;
}

const props = defineProps<TextAreaProps>();
const inputTypeComputed = computed(() => props.inputType);
const placeholderComputed = computed(() => props.placeholder);
const textMask = computed(() => props.mask);

const { field: fieldRef, fieldAttrs: fieldAttrsRef } = toRefs(props);
</script>

<style></style>
