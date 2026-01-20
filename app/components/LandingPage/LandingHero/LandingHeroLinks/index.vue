<script setup lang="ts">
import type { Links } from "~/types/links";

interface LinksProp {
  links: Links | null | undefined; // Allow for null/undefined initially
}

const props = defineProps<LinksProp>();
</script>

<template>
  <div v-if="props.links?.length" class="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
    <UButton 
      v-for="(link, index) in props.links" 
      :key="link.id || index" 
      :label="link.link.label"
      :to="link.link.type === 'reference' ? link.link.reference : link.link.url" 
      :icon="link.link.icon" 
      size="xl" 
    />
  </div>
</template>