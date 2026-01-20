<template>
  <main>
    <div>
      <div class="bg-brand-500"></div> <!-- This only exists here to "kickstart" the theme (???) -->
      <LandingHero :data="landingHeroData" />
      <LandingServices :data="landingServicesData" />
      <LandingTrusted v-bind="landingTrustedData" />
      <LandingThesis :data="landingThesisData" />
      <!-- TODO: Make work on mobile -->
      <!-- <LandingMap v-bind="mapData" /> -->
      <!-- TODO: A reviews component that pulls and sorts data out from Google Cloud -->
      <!-- <LandingReviews :data="props.data.data.opinionsTexts[0]" /> -->
      <!-- TODO: LandingFaq: Questions about service -->
    </div>
  </main>
</template>

<script setup lang="ts">
import LandingHero from "./LandingHero/index.vue";
import LandingServices from "./LandingServices/index.vue";
import LandingTrusted from "./LandingTrusted/index.vue";

import LandingReviews from "./LandingReviews/index.vue";
import LandingMap from "./LandingMap/index.vue";
import LandingThesis from "./LandingThesis/index.vue";
import {
  useLandingPage,
  type LandingPageData,
} from "../../composables/LandingPage/useLandingPage";
import {
  useProductList,
} from "../../composables/ProductList/useProductList";
import { formatProductList } from "../../helpers/productListHelper";

const { data: landingPageData } = useLandingPage();
const { data: productListData } = useProductList();

/* Load landing hero */
const landingHeroData = computed(() => ({
  landingHero: landingPageData.value?.landingHero || "",
  landingHeroLinks: landingPageData.value?.landingHeroLinks || [],
  landingHeroBadge: landingPageData.value?.heroBadge,
}));

/* Load landing services */
const landingServicesData = computed(() => {
  return {
    topLabel: landingPageData.value?.servicesText?.[0]?.topLabel || "",
    header: landingPageData.value?.servicesText?.[0]?.header || "",
    paragraph: landingPageData.value?.servicesText?.[0]?.paragraph || "",
    strong: landingPageData.value?.servicesText?.[0]?.strong || "",
    ctaHeader: landingPageData.value?.servicesText?.[0]?.ctaHeader || "",
    ctaParagraph: landingPageData.value?.servicesText?.[0]?.ctaParagraph || "",
    servicesSections: landingPageData.value?.servicesSections || [],
    servicesLinks: landingPageData.value?.servicesLinks || [],
    servicesBadge: landingPageData.value?.servicesBadge,
    servicesCtaBadge: landingPageData.value?.servicesCtaBadge,
  };
});

/* Load 'trusted companies' component (logo marquee) */
const landingTrustedData = computed(() => ({
  links: landingPageData.value?.trustedUsLinks || [],
  logos: landingPageData.value?.zaufaliNamLogos || [],
  header: landingPageData.value?.zaufaliNamText?.[0]?.header || "",
  paragraph: landingPageData.value?.zaufaliNamText?.[0]?.paragraph || "",
  badge: landingPageData.value?.trustedUsBadge,
}));

/* Format product list for the marketing conversion component */
const productListFormatted = computed(() => {
  if (!productListData.value) return null;
  return formatProductList(productListData.value);
});

/* Load marketing conversion component */
const landingConversionData = computed(() => ({
  productData: productListFormatted.value?.productListFormatted || [],
  header: landingPageData.value?.konwersjaMarketingowaText?.[0]?.header || "",
  paragraph:
    landingPageData.value?.konwersjaMarketingowaText?.[0]?.paragraph || "",
  topLabel:
    landingPageData.value?.konwersjaMarketingowaText?.[0]?.topLabel || "",
  conversionLinks: landingPageData.value?.conversionLinks || [],
  ctaParagraph:
    landingPageData.value?.konwersjaMarketingowaText?.[0]?.ctaParagraph || "",
  conversionBadge: landingPageData.value?.conversionBadge,
}));

/* Load map component */
const mapData = computed(() => ({
  data: {
    header: landingPageData.value?.mapTexts?.[0]?.header || "",
    paragraph: landingPageData.value?.mapTexts?.[0]?.paragraph || "",
    badge: landingPageData.value?.mapBadge,
  },
}));

const landingThesisData = computed(() => ({
  texts: {
    topLabel: landingPageData.value?.pracaDyplomowaText?.[0]?.topLabel || "",
    header: landingPageData.value?.pracaDyplomowaText?.[0]?.header || "",
    paragraph: landingPageData.value?.pracaDyplomowaText?.[0]?.paragraph || "",
    strong: landingPageData.value?.pracaDyplomowaText?.[0]?.strong || "",
    id: landingPageData.value?.pracaDyplomowaText?.[0]?.id || "",
    productBadge:
      landingPageData.value?.pracaDyplomowaText?.[0]?.productBadge || "",
    specPoints:
      landingPageData.value?.pracaDyplomowaText?.[0]?.specPoints || [],
    bottomSpecs:
      landingPageData.value?.pracaDyplomowaText?.[0]?.bottomSpecs || {
        leftBottomSpec: {
          leftBottomSpecText: "",
          leftBottomSpecIcon: "",
        },
        rightBottomSpec: {
          rightBottomSpecText: "",
          rightBottomSpecIcon: "",
        },
        id: "",
      },
  },
  links: landingPageData.value?.thesisButtons || [],
  badge: landingPageData.value?.thesisBadge || { text: "", variant: "transparent" },
}));
</script>
