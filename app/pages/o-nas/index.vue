<template>
  <!-- Consistent height hero section -->
  <div class="w-full relative transition-all duration-700 ease-out">
    <!-- Container with consistent viewport height -->
    <div class="relative h-[25vh] md:h-[30vh] lg:h-[35vh] xl:h-[40vh] w-full">
      <!-- Background image -->
      <img :src="topSection?.mainImage?.url" :alt="topSection?.mainImage?.alt || 'Tło sekcji o nas'"
        class="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6">
          <h1 class="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
            {{ topSection?.header || "O Naszej Firmie" }}
          </h1>
          <p v-if="topSection?.paragraph" class="mt-1 text-white/90 text-base sm:text-lg max-w-2xl">
            {{ topSection.paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 pt-12 px-4 sm:px-6 lg:px-8">
    <!-- Content -->
    <div class="max-w-7xl mx-auto">
      <!-- Timeline Section -->
      <div v-if="transformedTimelineItems.length > 0"
        class="max-w-7xl mx-auto transition-all duration-700 ease-out delay-100">
        <TimelineComponent :timelineItems="transformedTimelineItems" />
      </div>

      <!-- CTA Section -->
      <div v-if="ctaSection" class="bg-white py-16 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out delay-200">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {{ ctaSection.header || "Zapraszamy do współpracy!" }}
          </h2>
          <p v-if="ctaSection.paragraph" class="mt-1 text-base text-gray-600 max-w-xl mx-auto text-xl">
            {{ ctaSection.paragraph }}
          </p>
          <p v-if="ctaSection.content" class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            {{ ctaSection.content }}
          </p>
          <div v-if="hasValidButton(ctaSection.primaryButton) || hasValidButton(ctaSection.secondaryButton)"
            class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <NuxtLink v-if="hasValidButton(ctaSection.primaryButton)" :to="ctaSection.primaryButton.url"
              class="inline-flex items-center px-5 py-2.5 text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              {{ ctaSection.primaryButton.label }}
            </NuxtLink>
            <NuxtLink v-if="hasValidButton(ctaSection.secondaryButton)" :to="ctaSection.secondaryButton.url"
              class="inline-flex items-center px-5 py-2.5 text-sm sm:text-base font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {{ ctaSection.secondaryButton.label }}
            </NuxtLink>
          </div>
          <p v-if="ctaSection.phoneNumber" class="mt-4 text-sm sm:text-base text-gray-500">
            Lub zadzwoń:
            <a :href="`tel:${ctaSection.phoneNumber.replace(/\s+/g, '')}`"
              class="font-medium text-primary-600 hover:text-primary-500">
              {{ ctaSection.phoneNumber }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAboutPage } from "~/composables/useAboutPage";
import TimelineComponent from "~/components/AboutPage/timelineComponent/index.vue";

const {
  transformedTimelineItems,
  topSection,
  ctaSection
} = useAboutPage();


// Type guard to check if button has required properties
const hasValidButton = (button: { label: string; url: string } | undefined): button is { label: string; url: string } => {
  return Boolean(button?.label && button.url);
};

useHead({
  title: 'O nas | K2 Drukarnia Projektów, Hallera 11',
  meta: [
    {
      name: "description",
      content: "Skanujemy i drukujemy. Cały Kraj. Digitalizujemy Archiwa. Dokumentnie.",
    },
  ],
});
</script>
