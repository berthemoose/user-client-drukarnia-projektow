<template>
  <!-- Hero Section -->

  <div
    class="relative w-full bg-black text-white transition-all duration-700 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    style="
      background: linear-gradient(
        45deg,
        #000000 0%,
        #111111 25%,
        #333333 50%,
        #111111 95%,
        #000000 100%
      );
    "
  >
    <div class="container mx-auto px-6 py-20 md:py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
        >
          {{ hero.header }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          {{ hero.paragraph }}
        </p>
      </div>
    </div>
  </div>

  <div
    v-if="productListFormatted"
    class="transition-all duration-700 ease-out delay-100"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
  >
    <ProductsGrid :products="productListFormatted" />
  </div>
  <div
    v-else
    class="fixed inset-0 z-50 flex items-center justify-center bg-white"
  >
    <Loader
      :text="'Wczytywanie strony: Złóż zamówienie'"
      :is-full-screen="true"
    />
  </div>
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
  pending: productListPending,
  error: productListError,
} = useProductList();

const {
  data: noStoreProductListData,
  pending: noStoreProductListPending,
  error: noStoreProductListError,
} = useNoStoreProductList();

const {
  data: orderPageData,
  pending: orderPagePending,
  error: orderPageError,
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
