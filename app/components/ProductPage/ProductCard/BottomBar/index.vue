<template>
  <div
    class="relative z-10 border-t border-black/20 bg-white/20 backdrop-blur-sm"
  >
    <div class="px-8 md:px-12 lg:px-16 py-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex items-center gap-2 text-black/90">
          <UIcon name="heroicons:truck" class="text-xl text-amber-300" />
          <span class="text-sm md:text-base">Odbiór osobisty lub dostawa</span>
        </div>
        <div class="flex items-center gap-2 text-black/90">
          <UIcon name="heroicons:shield-check" class="text-xl text-amber-300" />
          <span class="text-sm md:text-base">Gwarancja najwyższej jakości</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
