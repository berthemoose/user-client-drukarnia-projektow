<template>
  <div class="group relative h-full w-full">
    <div
      class="h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <!-- Image Container with Hover Effect -->
      <div class="relative h-48 overflow-hidden">
        <NuxtImg :src="props.cardData.productInfo.productImage.url"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
          width="600" :alt="props.cardData.productInfo.productName" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-2 p-4 justify-around">
        <h3 class="text-lg font-bold text-gray-900">
          {{ props.cardData.productInfo.productName }}
        </h3>
        <p class=" text-sm text-gray-600 line-clamp-2">
          {{ props.cardData.productInfo.productShortDescription }}
        </p>

        <!-- Button -->
        <UButton variant="subtle" color="primary" :to="getProductLink(props.cardData)"
          class="w-full justify-between duration-300">
          <span>Zamów teraz</span>
          <UIcon name="ic:round-arrow-forward"
            class="text-lg transition-transform duration-300 group-hover:translate-x-1" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "../index.vue";

interface Props {
  cardData: Product;
}

const props = defineProps<Props>();
type Params = typeof props.cardData;

const getProductLink = (card: Params): string => {
  const hasPrice = Object.keys(card.productInfo).includes('basePrice');
  return hasPrice ? `products/${card.id}?store=true` : `products/${card.id}?form=true`;
};
</script>
