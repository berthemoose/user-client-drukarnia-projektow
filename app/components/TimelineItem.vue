<template>
  <div class="flex">
    <div class="flex flex-col items-center mr-4">
      <div
        class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white"
      >
        {{ number }}
      </div>
      <div class="w-px h-full bg-gray-300"></div>
    </div>
    <div class="pb-8">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ title }}
      </h3>
      <p class="mt-2 text-gray-600">
        {{ description }}
      </p>
      <div v-if="imageSrc" class="mt-4 bg-gray-100 rounded-lg overflow-hidden">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="w-full h-48 object-cover"
        />
      </div>
      <div v-else class="mt-4 bg-gray-100 rounded-lg overflow-hidden">
        <div
          class="h-48 bg-gray-200 flex items-center justify-center text-gray-400"
        >
          {{ imagePlaceholder }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineItemProps {
  number: number
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  imagePlaceholder?: string
}

const props = defineProps<TimelineItemProps>()
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
