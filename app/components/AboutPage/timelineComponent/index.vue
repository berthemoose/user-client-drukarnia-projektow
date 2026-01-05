<script setup lang="ts">
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  alignRight?: boolean;
}

const props = defineProps<{
  timelineItems: TimelineItem[];
}>();
</script>

<template>
  <div class="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
    <div class="relative">
      <!-- Timeline line - hidden on mobile -->
      <div class="hidden md:block absolute left-1/2 w-1 h-full bg-primary-200 transform -translate-x-1/2"></div>

      <!-- Timeline items -->
      <!-- Mobile Layout (hidden on md and up) -->
      <template v-for="(item, index) in timelineItems" :key="`mobile-${index}`">
        <div class="md:hidden mb-6 last:mb-0">
          <div class="relative pl-0">
            <!-- Timeline dot - hidden on mobile -->

            <!-- Timeline content -->
            <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3">
              <div class="text-center sm:text-left">
                <p class="text-sm text-primary-600 font-semibold">
                  {{ item.year }}
                </p>
                <h3 class="text-lg font-bold text-gray-900 mb-2">{{ item.title }}</h3>
                <p class="text-gray-600 text-sm">{{ item.description }}</p>
              </div>
            </div>

            <!-- Mobile image -->
            <div class="w-full mt-2">
              <div v-if="item.imageUrl" class="rounded-lg shadow-md overflow-hidden">
                <div class="aspect-w-16 aspect-h-9 w-full">
                  <img :src="item.imageUrl" :alt="item.title || 'Timeline image'" class="w-full h-full object-cover"
                    loading="lazy" />
                </div>
              </div>
              <div v-else
                class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <span>Brak zdjęcia</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Desktop Layout (hidden on mobile) -->
      <div v-for="(item, index) in timelineItems" :key="`desktop-${index}`" :class="[
        'hidden md:flex items-center justify-between mb-12',
        { 'flex-row-reverse': item.alignRight ?? index % 2 === 0 },
      ]">
        <!-- Timeline dot -->
        <div
          class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 absolute left-1/2 -ml-3 border-4 border-white z-10">
        </div>

        <!-- Timeline content -->
        <div class="w-5/12 px-4 py-6 bg-white rounded-lg shadow-sm">
          <div :class="[index % 2 === 0 ? 'text-right' : 'text-left']">
            <p class="text-sm text-primary-600 font-semibold">
              {{ item.year }}
            </p>
            <h3 class="text-lg font-bold text-gray-900">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>

        <!-- Spacer -->
        <div class="w-2/12"></div>

        <!-- Timeline image -->
        <div class="w-5/12">
          <div v-if="item.imageUrl" class="rounded-lg shadow-md overflow-hidden">
            <div class="aspect-w-16 aspect-h-9 w-full">
              <img :src="item.imageUrl" :alt="item.title || 'Timeline image'" class="w-full h-full object-cover"
                loading="lazy" />
            </div>
          </div>
          <div v-else
            class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            <span>Brak zdjęcia</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
