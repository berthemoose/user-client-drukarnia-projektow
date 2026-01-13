<template>
  <!-- Loading State -->
  <div v-if="pending" class="inset-0 z-50 flex items-center justify-center">
    <Loader :text="'Wczytywanie strony produktu'" :is-full-screen="true" />
  </div>

  <!-- Ready state -->
  <div v-else class="mx-1 lg:mx-12 flex flex-col items-center justify-center py-8 lg:py-12 relative">
    <!-- Breadcrumb container -->

    <!-- Top level product container -->
    <div class="relative z-10 md:px-6">
      <!-- Main Product Card -->


        <div class="flex w-full items-left my-2  ">
          <ProductPageBreadcrumb :product-name="dataFormatted.name" />
        </div>
        <div>
          <ProductPageProductCard :card-data="{
            name: dataFormatted.name,
            productId: typedData?.id,
            imageUrl: dataFormatted.img.url,
            imageAlt: dataFormatted.img.alt,
            desc: longDescSanitized,
            basePrice: dataFormatted?.basePrice || null,
            specs: dataFormatted.specs,
            textColor: props.textColor,
            isStudent: props.isStudent,
            colorScheme: props.colorScheme,
            prodTypeId: dataFormatted?.prodId,
            formType: dataFormatted?.formType,
            bottomTexts: dataFormatted?.bottomTexts,
          }" />
        </div>


    </div>
  </div>
</template>

<script setup lang="ts">
interface ProductProp {
  prodId: string;
  textColor: "white" | "black" | null;
  isStudent: boolean;
  colorScheme: ColorSchemeVariant;
  prodType: "form" | "store";
}

type ProductData = Product;

import { useProduct, type Product } from "~/composables/Product/useProduct";
import { ref, watch, computed, onUnmounted } from "vue";
import { useRichText } from "~/composables/useRichText";
import Loader from "~/components/Loader.vue";
import type { ColorSchemeVariant } from "./ProductCard/getColorScheme";

const props = defineProps<ProductProp>();
const { data, pending } = useProduct(props.prodId, props.prodType);
const typedData = data as Ref<ProductData>;

/* Data for store variant  */
const dataFormatted = computed(() => {
  if (props.prodId === "thesis") {
    const prod = typedData.value as Product;
    return {
      name: prod?.productInfo.productName || "",
      img: prod?.productInfo.productImage || { url: "", alt: "" },
      desc: prod?.productInfo.productShortDescription || "",
      longDesc: prod?.productInfo.productLongDescriptionHTML || "",
      specs: prod?.productSpecs || [],
      bottomTexts: prod?.productInfo.productBottomTexts || [],
      basePrice: prod?.productInfo.basePrice || null,
      prodId: props.prodId || "thesis", //became prodTypeId to avoid confusion
      formType: props.prodType, // becomes formType to avoid confusion
    };
  } else {
    const prod = typedData.value as Product;
    return {
      name: prod?.productInfo.productName || "",
      img: prod?.productInfo.productImage || { url: "", alt: "" },
      desc: prod?.productInfo.productShortDescription || "",
      longDesc: prod?.productInfo.productLongDescriptionHTML || "",
      specs: prod?.productSpecs || [],
      bottomTexts: prod?.productInfo.productBottomTexts || [],
      basePrice: prod?.productInfo.basePrice || null,
      prodId: null,
      formType: props.prodType,
    };
  }
});

const { sanitize, isReady } = useRichText();

const longDescPre = computed(() => dataFormatted.value.longDesc);
const longDescSanitized = ref("");

const updateSanitzedContent = () => {
  if (longDescPre.value) longDescSanitized.value = sanitize(longDescPre.value);
};

const stopWatch = watch(
  [isReady, longDescPre],
  () => {
    if (isReady.value) {
      updateSanitzedContent();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  stopWatch();
});

useHead({
  title: computed(
    () => `${dataFormatted.value.name} | K2 Drukarnia Projektów, Hallera 11`
  ),
  meta: [
    {
      name: "description",
      content:
        "Skanujemy i drukujemy. Cały Kraj. Digitalizujemy Archiwa. Dokumentnie.",
    },
  ],
});
</script>

<style scoped>
.render-text-html:deep(ol) {
  padding-block: 0.25rem;
  margin-block: 1rem;
  padding-inline: 1rem;
  list-style: decimal;
}

/* "Nad-tytuły" */
.render-text-html:deep(.label) {
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1rem;
}

/* Tytuły, największe */
.render-text-html:deep(h1) {
  /* TEXT-5XL */
  font-size: 3rem;
  /* 48px */
  line-height: 1;
  padding-block: 0.5rem;
}

/* Tytuły podstron */
.render-text-html:deep(h2) {
  /* TEXT-3XL */
  font-size: 1.875rem;
  /* 30px */
  line-height: 2.25rem;
  /* 36px */
}

/* Tytuły sekcji */
.render-text-html:deep(h3) {
  /* TEXT-2XL */
  font-size: 1.5rem;
  /* 24px */
  line-height: 2rem;
  /* 32px */
}

/* Wyróżniony tekst */
.render-text-html:deep(h4) {
  /* TEXT-XL */
  font-size: 1.25rem;
  /* 20px */
  line-height: 1.75rem;
  /* 28px */
}
</style>
