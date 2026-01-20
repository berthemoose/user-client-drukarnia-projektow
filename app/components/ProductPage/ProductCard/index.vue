<template>
  <div class="mt-2">
    <div class="relative overflow-hidden shadow-2xl" :style="colorScheme">
      <!-- Content -->
      <div class="relative z-10 p-8">
        <div class="flex flex-col justify-center">
          <!-- Form Section -->
          <div :class="props.cardData.isStudent ? 'text-white' : 'text-black'">
            <ProductPageForm :product-name="props.cardData.name" :product-id="props.cardData.productId"
              :product-specs="props.cardData.specs || []" :text-color="props.cardData.textColor"
              :is-student="props.cardData.isStudent" :base-price="props.cardData.basePrice"
              :prod-type-id="props.cardData.prodTypeId || undefined" :image-url="props.cardData.imageUrl"
              :image-alt="props.cardData.imageAlt" :desc="props.cardData.desc"
              :color-scheme="props.cardData.colorScheme" />
          </div>
        </div>
      </div>
      <!-- Bottom info bar -->
      <ProductPageProductCardBottomBar :text-color="props.cardData.textColor"
        :bottom-texts="props.cardData.bottomTexts" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getColorScheme, type ColorSchemeVariant } from "./getColorScheme";
import { computed } from "vue";

interface ProductCardProps {
  cardData: {
    name: string;
    productId: string;
    prodTypeId?: string | null;
    imageUrl: string;
    imageAlt: string;
    desc: string;
    basePrice: number | null;
    specs: any;
    textColor: "white" | "black" | null;
    isStudent: boolean;
    colorScheme: ColorSchemeVariant;
    formType: "form" | "store";
    bottomTexts: Array<{ text: string; id: string }>;
  };
}

const colorScheme = computed(() => getColorScheme(props.cardData.colorScheme));
const props = defineProps<ProductCardProps>();
</script>
