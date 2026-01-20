<template>
  <div class="container mx-auto px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="card in props.products" class="h-full">
          <OrderPageProductsGridProductCard :cardData="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from "../../../types/image";
import type { PayloadBase } from "../../../types/payload";
export interface Product extends PayloadBase {
  id: string;
  productInfo: {
    productImage: Image;
    productName: string;
    productShortDescription: string;
    productLongDescription: string;
    productLongDescriptionHTML: string;
    basePrice?: number;
    productSpecs: Array<{
      specName: string;
      specDisplayName: string;
      specDesc: string;
      specValues: Array<{ [key: string]: any }>;
      id: string;
    }>;
  };
}

interface ProductsProp {
  products: Array<Product>;
}
const props = defineProps<ProductsProp>();
</script>
