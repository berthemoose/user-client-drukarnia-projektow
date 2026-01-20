<template>
  <div class="loader-container" :style="containerHeight">
    <div class="loader-wrapper">
      <CubeLoader
        :size="size"
        :speed="speed"
        :images="{
          front: textureUrl,
          back: textureUrl,
          left: textureUrl,
          right: textureUrl,
          top: textureUrl,
          bottom: textureUrl,
        }"
      />
      <p v-if="showText" class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CubeLoader from "../CubeLoader.vue";

interface Props {
  size?: number;
  speed?: number;
  textureUrl?: string;
  text?: string | null;
  isFullScreen?: boolean;
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 84,
  speed: 2,
  textureUrl: "/loader-texture.webp",
  text: "Wczytywanie",
  showText: true,
  isFullScreen: false,
});

const containerHeight = computed(() => 
  props.isFullScreen ? { minHeight: '100vh' } : {}
);


</script>

<style scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loading-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}
</style>
