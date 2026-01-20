import type { Values } from "../index.vue";
import type { Errors } from "../index.vue";

export const submitButtonController = (
  values: Values,
  errors: Errors,
) => {
  const requiredFields = ["copies", "pages"];

  const isSubmitButtonActive = computed(() => {
    try {
      const requiredFieldsFilled = requiredFields.every(
        (field: string) =>
          values[field] !== undefined &&
          values[field] !== null &&
          values[field] !== ""
      );
      const noErrors = Object.keys(errors.value).length === 0;
      return requiredFieldsFilled && noErrors; 
    } catch (error) {
      console.warn("Error computing submit button state:", error);
      return false;
    }
  });
  return { isSubmitButtonActive };
};
