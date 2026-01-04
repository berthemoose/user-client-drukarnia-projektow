<template>
  <section id="services" class="relative py-20 lg:py-24 overflow-hidden">
    <div class="container mx-auto px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <LabelBadge :data="props.data?.servicesBadge" />

        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {{ props.data?.header }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
          {{ props.data?.paragraph }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LandingService :data="services" />
      </div>









      <!-- CTA Section -->
      <div class="mt-20">
        <div class="max-w-4xl mx-auto">
          <!-- CTA Card -->
          <UPageSection :headline="props.data?.servicesCtaBadge?.text" :title="props.data?.ctaHeader"
            :description="props.data?.ctaParagraph" :features="features" orientation="horizontal" :links="linksFormatted">
            <NuxtImg src="https://picsum.photos/2000/3000"/>
          </UPageSection>

          <!-- <div
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 shadow-2xl"
          >
            <div class="relative z-10 px-8 py-12 md:px-12 md:py-16 text-center">
              <LabelBadge :data="props.data?.servicesCtaBadge" />

              <h3
                class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
              >
                {{ props.data?.ctaHeader }}
              </h3>
              <p
                class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {{ props.data?.ctaParagraph }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <LandingServiceLinks :links="links" />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LandingServiceLinks from "./LandingServiceLinks/index.vue";
import LabelBadge from "../../PageElems/LabelBadge/index.vue";
import LandingService, { type Service } from "./LandingService/index.vue";
import type { Links } from "../../../types/links";
import type { Badge } from "../../../types/badge";

interface LandingServicesData {
  topLabel: string;
  header: string;
  paragraph: string;
  ctaHeader: string;
  ctaParagraph: string;
  servicesSections: Array<Service>;
  servicesLinks: Links;
  servicesBadge?: Badge;
  servicesCtaBadge?: Badge;
}
interface LandingServicesProp {
  data: LandingServicesData | null;
}

const props = defineProps<LandingServicesProp>();
const linksFormatted = computed(() => {
  const links = props.data?.servicesLinks || [];
  return links.map((item) => ({
    label: item.link.label,
    to: item.link.reference,
    icon: item.link.icon,
    variant: item.link.variant,
  }));
});

const services = props.data?.servicesSections || [];

const features = ref([
  {
    title: 'Icons',
    description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
    icon: 'i-lucide-smile',
    to: '/docs/getting-started/integrations/icons'
  },
  {
    title: 'Fonts',
    description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
    icon: 'i-lucide-a-large-small',
    to: '/docs/getting-started/integrations/fonts'
  },
  {
    title: 'Color Mode',
    description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
    icon: 'i-lucide-sun-moon',
    to: '/docs/getting-started/integrations/color-mode'
  }
])


</script>
