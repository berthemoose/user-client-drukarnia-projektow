<template>
  <div v-for="spec in props.specs" :key="spec.id">
    <div class="w-full" v-if="fields[spec.specName]">
      <div class="mb-1">
        <p class="font-semibold text-gray-900 dark:text-gray-100" :class="props.textColor === 'white' ? 'text-white' : 'text-black'">{{ spec.specDisplayName }}</p>
      </div>
      
      <USelect
        :id="spec.specName"
        v-model="fields[spec.specName]!.field"
        v-bind="fields[spec.specName]!.fieldAttrs"
        :items="
          spec.specValues.map((value: any) => ({
            label: value.desc,
            value: value.name,
          }))
        "
        :placeholder="`Wybierz ${(spec.specDisplayName).toLowerCase()} `"
        :disabled="areInputsDisabledRef"
        size="xl"
        class="w-full transform hover:scale-[1.01] transition-transform duration-200"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductSpec } from "~/composables/Product/useProduct";
import type { SpecField } from "../index.vue";

interface SpecsProps {
  specs: Array<ProductSpec>;
  specFields: Record<string, SpecField>;
  errors: Partial<Record<string, string | undefined>>;
  areInputsDisabled: boolean;
  textColor: "white" | "black" | null;
}

const props = defineProps<SpecsProps>();
const { specFields: fields, areInputsDisabled:areInputsDisabledRef } = toRefs(props);

</script>
