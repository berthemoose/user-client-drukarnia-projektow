<template>
  <div class="flex flex-col gap-2">
    <div class="mb-3">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Dane osobowe
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Proszę podać dane osobowe, na które zrealizowane będzie zamówienie
      </p>
    </div>

    <div class="flex flex-col gap-2" v-for="(input, index) in inputs">
      <ProductPageFormTextInputsDynamicInput
        :label="''"
        :desc="''"
        :placeholder="input.displayName"
        :field="input.field?.value"
        :field-attrs="input.field?.attrs"
        :are-inputs-disabled="areInputsDisabledRef"
        :input-type="'text'"
        :error="input.error"
        :mask="getMaskString(input.name)"
      />

      <p class="text-sm text-red-600 text-sm" v-if="input.error">
        {{ input.error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface CustomerInputProps {
  areInputsDisabled: boolean;
  name: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
    error: string | undefined;
  };
  surname: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
    error: string | undefined;
  };
  email: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
    error: string | undefined;
  };
  phone: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
    error: string | undefined;
  };
  company?: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
    error: string | undefined;
  };
  errors: Record<string, string | undefined>;
}

const props = defineProps<CustomerInputProps>();
const { areInputsDisabled: areInputsDisabledRef } = toRefs(props);
const inputs = computed(() => ({
  name: { field: props.name, displayName: "Imię", name:'name', error: props.errors.name },
  surname: {
    field: props.surname,
    displayName: "Nazwisko",
    name: "surname",
    error: props.errors.surname,
  },
  email: {
    field: props.email,
    displayName: "Adres e-mail",
    name: "email",
    error: props.errors.email,
  },
  phone: {
    field: props.phone,
    displayName: "Numer telefonu",
    name: "phone",
    error: props.errors.phone,
  },
  company: { field: props.company, displayName: "Firma", error: props.errors.company },
}));

const getMaskString = (fieldName: string) => {
  switch (fieldName) {
    case "phone":
      return '+48 ### ### ###';
    default:
      return null;
  }
}
</script>
