<template>
  <!-- Pages -->
  <div class="">
    <div class="mb-1">
      <p class="font-semibold text-gray-900 dark:text-gray-100" :class="props.textColor === 'white' ? 'text-white' : 'text-black'">Ilość stron</p>
    </div>

    <!-- Number of pages -->
    <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Liczba stron'" :field="pages"
      :field-attrs="pagesAttrs" :are-inputs-disabled="areInputsDisabledRef" :input-type="'number'" :error="err.pages" />
  </div>

  <!-- Copies -->
  <div class="">
    <div class="mb-1">
      <p class="font-semibold text-gray-900 dark:text-gray-100" :class="props.textColor === 'white' ? 'text-white' : 'text-black'">Nakład</p>
    </div>

    <!-- Number of copies -->
    <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Liczba Kopii'" :field="copies"
      :field-attrs="copiesAttrs" :are-inputs-disabled="areInputsDisabledRef" :input-type="'number'"
      :error="err.copies" />
  </div>

  <!-- Comments -->
  <div class="mt-6">
    <p class="font-semibold text-gray-900 dark:text-gray-100" :class="props.textColor === 'white' ? 'text-white' : 'text-black'">Komentarze</p>
    <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Komentarze'" :field="comments"
      :field-attrs="commentsAttrs" :are-inputs-disabled="areInputsDisabledRef" :input-type="'textarea'"
      :error="err.comments" />
  </div>


</template>

<script lang="ts" setup>
import type { StaticFieldKey } from "../formFields";
import type { DefineFieldReturn } from "../index.vue";

interface InputProps {
  areInputsDisabled: boolean;
  fields: Record<StaticFieldKey, DefineFieldReturn>;
  errors: Partial<Record<string, string | undefined>>;
  textColor: "white" | "black" | null;
}
const props = defineProps<InputProps>();

/* Pages */
const pages = computed(() => props.fields.pages[0]);
const pagesAttrs = computed(() => props.fields.pages[1]);
/* Copies */
const copies = computed(() => props.fields.copies[0]);
const copiesAttrs = computed(() => props.fields.copies[1]);
/* Comments */
const comments = computed(() => props.fields.comments[0]);
const commentsAttrs = computed(() => props.fields.comments[1]);

/* Reactive prop vals */
const { areInputsDisabled: areInputsDisabledRef } = toRefs(props);

/* Reactive field model */
const { errors: err, fields } = toRefs(props);
</script>
