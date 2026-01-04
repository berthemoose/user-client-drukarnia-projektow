<template>
  <div class="flex flex-col" :style="textColorAll">
    <!-- v-if not thesis -->
    <div class="flex items-center justify-center lg:justify-start mb-8">
      <div class="">
        <LazyNuxtImg :src="url" :alt="alt"
          class="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105" width="800"
          height="800" loading="eager" />
      </div>
    </div>

    <div class="flex-1">
      <h1 class="text-3xl md:text-4xl font-bold mb-4" :style="textColorAll">
        {{ name }}
      </h1>
      <div class="prose leading-relaxed" :style="textColorAll">
        <div class="">
          <div v-html="desc" class="render-text-html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computeTextColor } from "../../Form/helpers/computeTextColor";
import type { ColorSchemeVariant } from "../getColorScheme";

interface DescriptionProps {
  url: string;
  alt: string;
  name: string;
  desc: string;
  colorScheme: ColorSchemeVariant;
  textColor: "white" | "black" | null;
}
const props = defineProps<DescriptionProps>();
const textColorAll = computeTextColor(props.textColor);
const isZoomed = ref(false);
const isThesis = computed(() => props.colorScheme === 'thesis')

// University rotation logic

</script>
