<template>
  <div>
    <ProductPageFormTextInputsCustomerInput
      :name="customer.name"
      :surname="customer.surname"
      :email="customer.email"
      :phone="customer.phone"
      :company="customer.company"
      :are-inputs-disabled="props.areInputsDisabled"
      :errors="props.errors"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DefineFieldReturn } from "../index.vue";
interface CustomerInputProps {
  areInputsDisabled: boolean;
  fields: Record<string, DefineFieldReturn>;
  errors: Partial<Record<string, string | undefined>>;
}
const props = defineProps<CustomerInputProps>();
const customer = computed(() => ({
  name: {
    value: props.fields.customerName![0],
    attrs: props.fields.customerName![1],
    error: props.errors.name
  },
  surname: {
    value: props.fields.customerSurname![0],
    attrs: props.fields.customerSurname![1],
    error: props.errors.surname
  },
  email: {
    value: props.fields.customerEmail![0],
    attrs: props.fields.customerEmail![1],
    error: props.errors.email
  },
  phone: {
    value: props.fields.customerPhone![0],
    attrs: props.fields.customerPhone![1],
    error: props.errors.phone
  },
  company: {
    value: props.fields.customerCompany![0],
    attrs: props.fields.customerCompany![1],
    error: props.errors.company
  },
}));
</script>
