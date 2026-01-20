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
    </div>
  </section>
</template>

<script lang="ts" setup>
import LabelBadge from "../../PageElems/LabelBadge/index.vue";
import LandingService, { type Service } from "./LandingService/index.vue";
import type { Links } from "../../../types/links";
import type { Badge } from "../../../types/badge";

interface LandingServicesData {
  topLabel: string;
  header: string;
  paragraph: string;
  servicesSections: Array<Service>;
  servicesLinks: Links;
  servicesBadge?: Badge;
}
interface LandingServicesProp {
  data: LandingServicesData | null;
}

const props = defineProps<LandingServicesProp>();
const services = props.data?.servicesSections || [];

</script>
