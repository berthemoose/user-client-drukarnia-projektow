<template>
  <div class="min-h-screen">
    <ProductPage v-if="prodExists" :prodId="id" :textColor="'black'" :isStudent="false" :colorScheme="'base'"
      :prodType="(prodType as 'form' | 'store')" />
  </div>
</template>

<script setup lang="ts">
import ProductPage from "../../components/ProductPage/index.vue";
import { navigateTo } from "#app";

const route = useRoute();
const id = (
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || ""
) as string;

const form = route.query.form;
const store = route.query.store;

let prodType: "form" | "store" | undefined;

if (form && !store) {
  prodType = "form";
} else if (!form && store) {
  prodType = "store";
} else {
  navigateTo("/no-such-product");
}

const { prodExists, pending } = useCheckIfProdExists(id, prodType);

// Watch for when data loading completes, then check if product exists
watch([prodExists, pending], ([exists, isLoading]) => {
  // Only redirect if loading is complete AND product doesn't exist
  if (!isLoading && exists === false) {
    navigateTo("/no-such-product");
  }
});
</script>
