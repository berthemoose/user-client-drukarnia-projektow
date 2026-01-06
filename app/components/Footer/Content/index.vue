<template>
  <div class="bg-black text-white flex flex-col items-center text-center pb-4 md:pb-2">
    <!-- Main -->

    

    <UContainer>
      <div class="grid md:grid-cols-8 w-full">
        <div class="md:col-span-5 flex flex-col md:items-start items-center gap-2 py-4">
          <div class="md:text-left text-center p-6">
            <div v-if="hero" v-html="hero" class="render-text-html"></div>
          </div>
          <div class="md:text-left text-center p-6">
            <div v-if="hours" v-html="hours" class="render-text-html"></div>
          </div>
        </div>
        <div class="row-span-4 md:col-span-3 flex flex-col items-center justify-center text-center gap-2 py-4">
          <div>
            <div class="flex w-full items-center justify-center mb-2">
              <UIcon name="ic:baseline-phone" class="text-6xl" />
            </div>
            <div>
              <div v-for="phone in pnums" :key="phone.id">
                <NuxtLink :to="phone.href" class="my-1 text-2xl xl:text-3xl block">
                  {{ phone.number }}
                </NuxtLink>
              </div>
            </div>
            <div v-if="address" class="mt-6 md:mt-4">
              <UButton class="text-xl md:text-2xl" :to="`mailto:${address}`" variant="link" color="neutral">
                <UIcon name="system-uicons:paper-plane" class="text-4xl mr-[2px]" />
                {{ address }}
              </UButton>
            </div>
          </div>
        </div>
      </div>


      <div class="flex flex-col items-center justify-end text-center pt-6 pb-4 mt-12 lg:mt-32">
        <div v-if="logo" class="my-2">
          <LazyNuxtImg :src="logo.url" :alt="logo.alt || 'K2 Drukarnia Projektów - logo'"
            class="border w-[100px] h-auto" />
        </div>
        <span class="text-xs">
          &#169; {{ year }} K2 Drukarnia Projektów. Wszystkie prawa zastrzeżone.
        </span>
        <span v-if="legal" class="text-xs mb-1">{{ legal }}</span>
        <hr class="h-2 max-[995px]:w-36 w-64" />
        <NuxtLink to="/regulamin" class="text-xs">
          Regulamin / Polityka Prywatności
        </NuxtLink>
        <div class="flex gap-2 items-center justify-center text-5xl my-4">
          <UIcon name="lineicons:visa" />
          <UIcon name="lineicons:mastercard" />
          <NuxtImg class="h-auto max-w-15"
            src="https://cdn.brandfetch.io/id9mHBGLZz/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764366859367" />
          <UIcon name="lineicons:apple-pay" />
          <UIcon name="lineicons:google-pay" />
        </div>

        <div class="text-xs">
          <!-- Realizacja -->
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import type { Image } from "~/types/image";
import type { Product } from '~/composables/Product/useProduct';
import type { SourceLink } from "~/components/HeaderNew/index.vue";
import { useProductList } from "~/composables/ProductList/useProductList";
import { useNoStoreProductList } from "~/composables/ProductList/useProductList";
import { useHeader } from "~/composables/Header/useHeader";
import type { FooterColumn, FooterColumnLink } from '@nuxt/ui';

const { data: productData } = useProductList();
const { data: noStoreProductData } = useNoStoreProductList();
const { data: headerData } = useHeader();



const footerLinks = computed(() => {
  const links = headerData.value?.headerLinks ?? [];
  return links.map((item: SourceLink) => ({
    label: item.link.label,
    to: item.link.reference
  }))
});

const servicesChildren = computed(() => {
  const services = productData.value?.docs ?? [];
  const servicesNoStore = noStoreProductData.value?.docs ?? [];
  const storeData = services.map((item: Product) => ({
    label: item.productInfo.productName,
    to: `/products/${item.id}?${Object.keys(item.productInfo).includes('basePrice') ? 'store=true' : 'form=true'}`,
  }));
  const noStoreData = servicesNoStore.map((item: Product) => ({
    label: item.productInfo.productName,
    to: `/products/${item.id}?${Object.keys(item.productInfo).includes('basePrice') ? 'store=true' : 'form=true'}`,
  }));

  return [
    ...storeData,
    ...noStoreData
  ];
})

interface FooterContentProps {
  hero: string;
  hours: string;
  pnums: Array<{
    id: string;
    number: string;
    href: string;
  }>;
  address: string;
  year: string;
  legal: string;
  logo?: Image;
}

const props = defineProps<FooterContentProps>();
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
