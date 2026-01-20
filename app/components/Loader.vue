<template>
  <LoaderSpinner
    :text="props.text"
    :is-full-screen="isFullScreen"
    :show-text="showText"
    :size="size"
  />
</template>

<script setup lang="ts">
interface SpinnerProp {
  text?: string | null;
  isFullScreen?: boolean;
  showText?: boolean;
  size?: number;
}
const props = withDefaults(defineProps<SpinnerProp>(), {
  text: undefined,
  isFullScreen: false,
  showText: true,
  size: 90,
});

import LoaderSpinner from "~/components/LoaderSpinner/index.vue";
</script>
