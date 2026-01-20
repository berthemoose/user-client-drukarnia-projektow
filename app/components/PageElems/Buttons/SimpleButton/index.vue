<script setup lang="ts">
import { computed } from 'vue';

import type { Link } from '~/app/types/link';
interface LinkProp {
  data: Link;
}

const props = defineProps<LinkProp>();

// Transform backend link structure to frontend format
const linkTarget = computed(() => {
  // If legacy 'to' field exists, use it for backward compatibility
  if (props.data.to) {
    return props.data.to;
  }
  
  // Handle backend structure based on type
  if (props.data.type === 'reference' && props.data.reference) {
    // Internal reference: convert to route path (e.g., "products" -> "/products")
    return `/${props.data.reference}`;
  } else if (props.data.type === 'custom' && props.data.url) {
    // External URL: use as-is
    return props.data.url;
  }
  
  // Fallback to home
  return '/';
});

// Check if link is external (for proper link handling)
const isExternalLink = computed(() => {
  return props.data.type === 'custom' || (props.data.url && props.data.url.startsWith('http'));
});

// Computed properties for icon styling
const iconMovementClass = computed(() => {
  const direction = props.data.iconMovementDirection || 'up';
  const movementMap = {
    up: 'group-hover:-translate-y-0.5',
    down: 'group-hover:translate-y-0.5',
    left: 'group-hover:-translate-x-0.5',
    right: 'group-hover:translate-x-0.5',
  };
  return movementMap[direction];
});

const iconSpacingClass = computed(() => {
  const position = props.data.iconPosition || 'left';
  return position === 'left' ? 'mr-1.5 sm:mr-2' : 'ml-1.5 sm:ml-2';
});

const isIconLeft = computed(() => {
  return (props.data.iconPosition || 'left') === 'left';
});

const specialButtonBorderClass = computed(() => {
  return props.data.color === 'white' ? 'border border-black' : '';
});
</script>

<template>
  <div v-if="!props.data.isHidden">
    <!-- Simple button appearance -->
    <UButton
      v-if="props.data.appearance === 'simple-button'"
      :label="props.data.label"
      :to="linkTarget"
      :target="isExternalLink ? '_blank' : undefined"
      :size="props.data.size"
      :color="props.data.color"
      :variant="props.data.variant"
      :icon="props.data.icon"
      :disabled="props.data.isDisabled"
    />

    <!-- Special button appearance -->
    <UButton
      v-else-if="props.data.appearance === 'special-button'"
      :to="linkTarget"
      :target="isExternalLink ? '_blank' : undefined"
      :disabled="props.data.isDisabled"
      :color="props.data.color || 'black'"
      size="xl"
      :class="['group relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center', specialButtonBorderClass]"
    >
      <UIcon
        v-if="isIconLeft && props.data.icon"
        :name="props.data.icon"
        :class="['text-lg sm:text-xl transition-transform', iconMovementClass, iconSpacingClass]"
      />
      <span class="whitespace-nowrap">
        {{ props.data.label || 'Wyślij pliki do druku' }}
      </span>
      <UIcon
        v-if="!isIconLeft && props.data.icon"
        :name="props.data.icon"
        :class="['text-lg sm:text-xl transition-transform', iconMovementClass, iconSpacingClass]"
      />
    </UButton>

    <!-- Default link appearance -->
    <NuxtLink
      v-else
      :to="linkTarget"
      :target="isExternalLink ? '_blank' : undefined"
      :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      :class="[
        'no-underline transition-all duration-200 hover:brightness-125 inline-flex items-center',
        { 'pointer-events-none opacity-50': props.data.isDisabled },
      ]"
    >
      <span>{{ props.data.label }}</span>
      <UIcon
        v-if="props.data.icon"
        :name="props.data.icon"
        class="ml-[0.5px] text-xl transition-all"
      />
    </NuxtLink>
  </div>
</template>
