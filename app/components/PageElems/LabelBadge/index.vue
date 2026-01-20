<template>

  <!-- White version -->
  <div v-if="props.data">
    <!-- White version -->
    <div
      v-if="props.data.variant === 'white'"
      class="inline-flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2 mb-4 sm:mb-6 md:mb-8 border border-gray-300 rounded-full bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
    >
      <UIcon
        v-if="props.data.icon"
        :name="props.data.icon"
        class="text-sm sm:text-base text-primary-600"
      />
      <span
        class="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 uppercase"
      >
        {{ props.data.text }}
      </span>
    </div>

    <!-- Transparent version -->
    <div
      v-else
      class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white w-fit"
    >
      <UIcon
        v-if="props.data.icon"
        :name="props.data.icon"
        class="text-xl"
      />
      <span class="uppercase tracking-wider">{{ props.data.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Badge } from '~/app/types/badge';
interface BadgeProp {
  data?: Badge;
}

const props = defineProps<BadgeProp>();
</script>
