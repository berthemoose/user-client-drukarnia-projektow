<template>
  <div class="h-full">
    <div class="h-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col">
      <!-- Review header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {{ review.name.charAt(0) }}
            </div>
            <div class="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow">
              <UIcon 
                :name="review.source === 'Google' ? 'logos:google-icon' : 'logos:facebook'"
                class="w-4 h-4 text-gray-700"
              />
            </div>
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-gray-900">{{ review.name }}</h4>
            <p class="text-sm text-gray-500">{{ review.date }}</p>
          </div>
        </div>
      </div>
      
      <!-- Stars -->
      <div class="flex mb-4">
        <UIcon 
          v-for="i in 5" 
          :key="i" 
          :name="i <= review.rating ? 'material-symbols:star-rate-rounded' : 'material-symbols:star-outline-rounded'"
          class="w-5 h-5 text-yellow-400"
        />
      </div>
      
      <!-- Review content -->
      <div class="flex-1">
        <p class="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
          "{{ review.content }}"
        </p>
      </div>
      
      <!-- Source and rating -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xs text-gray-500">Opinia z {{ review.source }}</span>
        <div class="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
          <span class="text-yellow-600 font-medium text-sm mr-1">{{ review.rating.toFixed(1) }}</span>
          <UIcon name="material-symbols:star-rate-rounded" class="text-yellow-400 w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  content: string;
  source: string;
}

const props = defineProps<{
  review: Review;
}>();
</script>

<style scoped>
/* Add any custom styles here */
</style>
