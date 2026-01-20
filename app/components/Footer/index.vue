<template>
  <footer>
    <!-- Ready state -->
    <FooterContent v-if="!pending" :hero="footerContentData.hero" :hours="footerContentData.hours"
      :pnums="footerContentData.pnums" :address="footerContentData.address" :year="footerContentData.year"
      :legal="footerContentData.legal" :logo="footerContentData.logo" />
  </footer>
</template>
<script setup lang="ts">
import { useFooter } from "../../composables/Footer/useFooter";
import { useCurrentYear } from "../../composables/useCurrentYear";
import { useRichText } from "../../composables/useRichText";
import { ref, watch, computed, onUnmounted } from "vue";

const { data, pending } = useFooter();
const { sanitize, isReady } = useRichText();

const footerContentData = computed(() => ({
  hero: heroContent.value || "",
  hours: hoursContent.value || "",
  pnums: phoneLinks.value,
  address: data.value?.contactUsAddress || "",
  year: useCurrentYear().currentYear.toString() || "",
  legal: data.value?.legalNote || "",
  logo: data.value?.logo,
}));

const heroContent = ref("");
const hoursContent = ref("");
const hero = computed(() => data.value?.footerHeroHTML);
const hours = computed(() => data.value?.openingHoursHTML);

const updateSanitizedContent = () => {
  if (hero.value) heroContent.value = sanitize(hero.value);
  if (hours.value) hoursContent.value = sanitize(hours.value);
};

const stopWatch = watch(
  [isReady, hero, hours],
  () => {
    if (isReady.value) {
      updateSanitizedContent();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  stopWatch();
});

interface PhoneNumber {
  id: string;
  phoneNum: string;
}

interface PhoneLink {
  id: string;
  number: string;
  href: string;
}

const phoneLinks = computed<PhoneLink[]>(() => {
  if (!data.value?.phoneNums) return [];
  return data.value.phoneNums.map((phone: PhoneNumber) => ({
    id: phone.id,
    number: phone.phoneNum,
    href: `tel:+48${useTrimPhoneNum(phone.phoneNum)}`,
  }));
});

const currentYear = computed(() => useCurrentYear().currentYear);
</script>
