<template>
  <div class="group relative h-full w-full">
    <div
      class="h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
      style="background: linear-gradient(135deg, #152845 0%, #2f4d7a 50%, #152845 100%)">

      <!-- CSS Visual Container (replaces image) -->
      <div class="relative h-48 overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-5 rounded-full -ml-20 -mb-20"></div>

        <!-- Book visual -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="relative w-32 h-40 md:w-36 md:h-44 transform rotate-3 group-hover:rotate-0 transition-transform duration-500"
            style="background: linear-gradient(145deg, #1e3a8a 0%, #0f172a 100%); border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.3)">
            <!-- Book spine -->
            <div class="absolute left-0 top-0 bottom-0 w-4 bg-black/20"></div>

            <!-- Gold text on cover -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
              <div class="text-amber-300 font-serif">
                <div class="text-[0.5rem] tracking-widest uppercase mb-1">Praca</div>
                <div class="text-sm md:text-base font-bold tracking-wider">DYPLOMOWA</div>
              </div>
              <div class="w-8 h-[1px] bg-amber-300 mt-2 mb-2"></div>
              <div class="text-white/40 text-[0.45rem]">2024</div>
            </div>

            <!-- Corner decorations -->
            <div class="absolute top-2 right-2 w-6 h-6 border-t border-r border-amber-300/30"></div>
            <div class="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-amber-300/30"></div>
          </div>

          <!-- Floating badge -->
          <div
            class="absolute top-4 left-4 px-4 py-2 bg-amber-400 text-burgundy-900 font-bold text-xs rounded-full shadow-lg flex items-center gap-1">
            <UIcon name="heroicons:clock" class="text-sm" />
            <span>24H</span>
          </div>
        </div>

        <!-- Gradient overlay on hover -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-2 p-4 justify-around bg-white">
        <h3 class="text-lg font-bold text-gray-900">Praca dyplomowa</h3>
        <p class="text-sm text-gray-600 line-clamp-2">
          Profesjonalna oprawa twojej pracy dyplomowej z ekspresową realizacją w 24H robocze
        </p>

        <!-- Button -->
        <UButton variant="subtle" to="/products/thesis" color="primary" class="w-full justify-between duration-300">
          <span>Zamów teraz</span>
          <UIcon name="ic:round-arrow-forward"
            class="text-lg transition-transform duration-300 group-hover:translate-x-1" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.text-burgundy-900 {
  color: #4a1527;
}
</style>
