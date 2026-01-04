<template>
  <section class="relative py-20 lg:py-24 overflow-hidden">
    <div class="container mx-auto px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <!-- Badge -->
        <LabelBadge :data="badge" />

        <h3
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        >
          {{ header }}
        </h3>
        <p class="text-gray-600 leading-relaxed">
          {{ paragraph }}
        </p>
      </div>

      <!-- Logo Marquee with enhanced styling -->
      <div class="relative py-12">
        <!-- Marquee container with subtle shadow -->

        <NuxtMarquee
          :autoFill="true"
          :direction="'right'"
          :gradient="true"
          :gradientColor="'white'"
          :gradientWidth="400"
          :pauseOnHover="true"
          :speed="20"
          class="my-[2px]"
        >
          <NuxtImg
            v-for="logo in logos"
            :src="logo.logo.url"
            width="160px"
            class="md:mx-[5px] mx-[2px]"
          />
        </NuxtMarquee>
      </div>
      <div
        v-if="links && links.length > 0"
        class="flex items-center justify-center gap-4"
      >
        <SimpleButton v-for="link in links" :key="link.id" :data="link.link" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Image } from "~/app/types/image";
import type { Links } from "~/app/types/links";
import SimpleButton from "../../PageElems/Buttons/SimpleButton/index.vue";
import LabelBadge from "../../PageElems/LabelBadge/index.vue";
import type { Badge } from "~/app/types/badge";

interface TrustedUsData {
  header: string;
  links: Links;
  paragraph: string;
  badge?: Badge;
  logos: Array<{
    logo: Image;
    id: string;
  }>;
}

const props = defineProps<TrustedUsData>();
const logos = computed(() => props.logos || []);
</script>
