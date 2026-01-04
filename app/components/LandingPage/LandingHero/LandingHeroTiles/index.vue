<template>
  <div>
    <UContainer class="flex flex-col">
      <OrderPageProductsGrid :products="productListFormatted" />
      <div class="w-full flex items-center justify-center">
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import {
  useProductList,
  useNoStoreProductList,
} from "../../../../composables/ProductList/useProductList";
import {
  useOrderPage,
  type OrderPageData,
} from "../../../../composables/OrderPage/useOrderPage";


const productListFormatted = computed(() => {
  return [
    ...(productListData.value?.docs || []),
    ...(noStoreProductListData.value?.docs || []),
  ];
});



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


</script>
