<template>
  <section class="relative py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
    <div class="container mx-auto px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <LabelBadge :data="props.data?.badge"/>
        
        <h3 
          v-if="props.data?.paragraph"
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        >
          {{ props.data.header }}
        </h3>

        <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
          {{ props.data?.paragraph }}
        </p>
        
        <!-- Additional info -->
        
      </div>

      <!-- Map Container -->
      <div class="max-w-5xl mx-auto">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <!-- Map overlay gradient for depth -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10"></div>
          
          <!-- Map iframe -->
          <div class="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
            <iframe 
              class="w-full h-full" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Drukarnia Projektów&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Badge } from '~/app/types/badge';
import LabelBadge from "../../PageElems/LabelBadge/index.vue"


interface MapData {
  header: string;
  paragraph: string;
  badge?:Badge;
}

interface MapProps {
  data: MapData | null;
}
const props = defineProps<MapProps>();

</script>
