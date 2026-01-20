<template>
  <div
    class="relative z-10 border-t border-black/20 bg-white/20 backdrop-blur-sm" :class="props.textColor === 'white' ? 'bg-black/20' : 'bg-white/20'"
  >
    <div class="px-8 md:px-12 lg:px-16 py-6" v-if="props.bottomTexts.length > 0">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex items-center gap-2" :class="props.textColor === 'white' ? 'text-white' : 'text-black/90'">
          <UIcon name="heroicons:truck" class="text-xl text-blue-500" />
          <span class="text-sm md:text-base">{{ props.bottomTexts[0]?.text }}</span>
        </div>    
        <div class="flex items-center gap-2" :class="props.textColor === 'white' ? 'text-white' : 'text-black/90'">
          <UIcon name="heroicons:shield-check" class="text-xl text-blue-500" />
          <span class="text-sm md:text-base">{{ props.bottomTexts[1]?.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface BottomBarProps {
  textColor: "white" | "black" | null;
  bottomTexts: Array<{ text: string; id: string }>;
}

const props = defineProps<BottomBarProps>();
</script>
