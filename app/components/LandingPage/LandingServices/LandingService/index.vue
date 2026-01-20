<script setup lang="ts">
import type { Image } from "~/app/types/image";
import type { Link } from "~/app/types/link";
export interface Service {
  mediaType: string;
  serviceImg: Image;
  iconId: string;
  sectionHeader: string;
  sectionParagraph: string;
  link?: Link;
  id: string;
}
import SimpleButton from "../../../PageElems/Buttons/SimpleButton/index.vue";

interface ServiceProp {
  data: Array<Service>;
}

const props = defineProps<ServiceProp>();
</script>

<template>

  <div
    v-for="(service, index) in props.data"
    :key="service.id"
    class="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
  >

    <div class="w-16 h-16 mb-6 rounded-lg bg-gray-100 flex items-center justify-center text-2xl" v-if="props.data[index].mediaType == 'icon'">
      <UIcon :name="props.data[index].iconId" class="w-8 h-8 text-gray-700" />
    </div>

    <div class="w-16 h-16 mb-6 rounded-lg bg-gray-100 flex items-center justify-center" v-else>
      <NuxtImg :src="props.data[index].serviceImg.url"/>
    </div>

    <!-- Service Content -->
    <h3 class="text-2xl font-bold text-gray-900 mb-3">
      {{ props.data[index].sectionHeader }}

    </h3>
    <p class="text-gray-600 mb-6">{{ props.data[index].sectionParagraph }}</p>

    <SimpleButton
      v-if="props.data[index].link"
      :data="props.data[index].link"
    />
  </div>
</template>
