<template>
  
  <UContainer> 
    <UPageBody>

      <div v-if="productListFormatted" class="transition-all duration-700 ease-out delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
        <ProductsGrid :products="productListFormatted" />
      </div>
      <div v-else class="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader :text="'Wczytywanie strony: Złóż zamówienie'" :is-full-screen="true" />
      </div>
    </UPageBody>

  </UContainer>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProductsGrid from "./ProductsGrid/index.vue";
import Loader from "../../components/Loader.vue";
import {
  useProductList,
  useNoStoreProductList,
} from "../../composables/ProductList/useProductList";
import {
  useOrderPage,
  type OrderPageData,
} from "../../composables/OrderPage/useOrderPage";
import { formatProductList } from "../../helpers/productListHelper";

/* Fetch data */
const {
  data: productListData,
} = useProductList();

const {
  data: noStoreProductListData,
} = useNoStoreProductList();

const {
  data: orderPageData,
} = useOrderPage();

/* Format product list data */
const productListFormatted = computed(() => {
  return [
    ...(productListData.value?.docs || []),
    ...(noStoreProductListData.value?.docs || []),
  ];
});

/* Computed values for components */
const hero = computed(() => ({
  header: orderPageData.value?.productsTitle,
  paragraph: orderPageData.value?.productsParagraph,
}));

const isVisible = ref(false);

// Trigger animation when component mounts
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>
