<template>
  <NuxtMarquee :autoFill="true" :pauseOnHover="true" :speed="40" class="my-[2px]">
        <p class="max-[995px]:text-sm max-[995px]:mr-[20px] min-[995px]:py-[2px]">{{ props.data.text }}</p>
        <LazyNuxtImg :src="props.data.logo.url" :alt="props.data.logo.alt"
            class="w-48 h-auto px-8 z-20 max-[995px]:hidden block" />
    </NuxtMarquee>
</template>

<script setup lang="ts">
interface InfoBarProp {
  data: {
    text: string;
    logo: {
      url: string;
      alt: string;
    };
  };
}
const props = defineProps<InfoBarProp>();
</script>
