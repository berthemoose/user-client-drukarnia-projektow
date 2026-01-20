<template>
  <section 
    ref="heroSection" 
    class="relative min-h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center py-8 sm:py-12 gap-y-8 sm:gap-y-16"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:38px_38px] pointer-events-none">
    </div>

    <div class="relative z-10 w-full flex flex-col items-center justify-center px-4">
      <div class="w-full max-w-4xl mx-auto text-center">
        
        <div class="transition-all duration-700 ease-out mb-4"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          <LabelBadge :data="props.data?.landingHeroBadge" />
        </div>

        <h1
          class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight tracking-tight transition-all duration-700 ease-out delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          <span class="block">K2 Drukarnia Projektów</span>
        </h1>

        <p v-if="props.data?.landingHero"
          class="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-normal px-2 sm:px-0 transition-all duration-700 ease-out delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          {{ props.data.landingHero }}
        </p>

        <div v-if="links"
          class="flex flex-col sm:flex-row gap-3 justify-center px-2 sm:px-0 transition-all duration-700 ease-out delay-[400ms]"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          <LandingHeroLinks :links="links" />
        </div>
      </div>
    </div>

    <div class="mt-32 relative z-10 w-full flex flex-col items-center justify-start px-4">
      <div class="mb-4 sm:mb-6 text-center">
        <h3 class="font-bold text-lg sm:text-xl text-gray-800">Najczęściej wybierane produkty</h3>
        <p class="text-xs">Nie znalazłeś produktu, który Cię interesuje? Zapraszamy do kontaktu</p>
      </div>
      
      <div class="w-full max-w-[1400px]">
        <LandingPageLandingHeroLandingHeroTiles />
      </div>
    </div>

    <div v-show="showScrollIndicator"
      class="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ease-in-out z-20"
      :class="showScrollIndicator ? 'opacity-100' : 'opacity-0'">
      <div
        class="animate-bounce w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1 mx-auto bg-white/50 backdrop-blur-sm">
        <div class="w-1 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>

    <div v-show="showScrollIndicator"
      class="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ease-in-out z-20"
      :class="showScrollIndicator ? 'opacity-100' : 'opacity-0'">
      <div class="flex flex-col items-center gap-1">
        <div class="bg-white/50 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
          <UIcon name="mdi:gesture-swipe-down" class="text-xl text-gray-700" />
        </div>
        <span class="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Przesuń</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// Assuming these imports exist in your project structure
import LandingHeroLinks from "./LandingHeroLinks/index.vue";
import LabelBadge from "~/components/PageElems/LabelBadge/index.vue";
// Note: Ensure this path is correct for your project
// import LandingPageLandingHeroLandingHeroTiles from "~/components/LandingPage/LandingHero/LandingHeroTiles.vue"; 

import type { Links } from "~/app/types/links";
import type { Badge } from "~/app/types/badge";

interface HeroData {
  landingHero: string;
  landingHeroLinks: Links;
  landingHeroBadge?: Badge;
}

interface HeroProp {
  data: HeroData | null;
}

const props = defineProps<HeroProp>();
const showScrollIndicator = ref(true);
const heroSection = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const links = props.data?.landingHeroLinks;

const handleScroll = () => {
  if (!heroSection.value) return;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  showScrollIndicator.value = scrollPosition < 100;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>