<template>
  <div>
    <ProductPageFormTextInputsAddressInput 
    :street="address.street"
    :number="address.number"
    :code="address.code"
    :city="address.city"
    :errors="props.errors"
    :are-inputs-disabled="props.areInputsDisabled" />

    
  </div>
</template>

<script lang="ts" setup>
import type { DefineFieldReturn } from "../index.vue";

interface AddressProps {
  areInputsDisabled: boolean;
  fields: Record<string, DefineFieldReturn>;
  errors: Partial<Record<string, string | undefined>>;
}
const props = defineProps<AddressProps>();



const address = computed(() => ({
  street: {
    value: props.fields.addressStreet![0],
    attrs: props.fields.addressStreet![1],
  },
  number: {
    value: props.fields.addressNumber![0],
    attrs: props.fields.addressNumber![1],
  },
  code: {
    value: props.fields.addressCode![0],
    attrs: props.fields.addressCode![1],
  },
  city: {
    value: props.fields.addressCity![0],
    attrs: props.fields.addressCity![1],
  },
}));
</script>
