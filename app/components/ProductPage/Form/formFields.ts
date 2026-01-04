import type { DefineFieldFunction, DefineFieldReturn } from "./index.vue";
import type { SpecField } from "./index.vue";
import type { Specs } from "./index.vue";
import { reactive } from "vue";
export type StaticFieldKey = (typeof staticFieldKeys)[number];

const staticFieldKeys = ["copies", "pages", "comments"] as const;

export const getFormFields = (
  defineField: DefineFieldFunction,
  specs: Specs
) => {
  const staticFields = Object.fromEntries(
    staticFieldKeys.map((key) => [key, defineField(key)])
  ) as Record<StaticFieldKey, DefineFieldReturn>;

  const specFields = reactive<Record<string, SpecField>>({});
  specs.value.forEach((spec) => {
    const [field, fieldAttrs] = defineField(spec.specName);
    specFields[spec.specName] = { field, fieldAttrs };
  });

  return {
    staticFields,
    specFields,
  };
};
