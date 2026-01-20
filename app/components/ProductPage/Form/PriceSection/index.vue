<template>

  <div class="mt-4 flex flex-col">


    <div v-if="isEnabled" class="w-full flex flex-col itemst-start justify-start  text-left">
      <!-- Cena brutto -->
      <div class="flex justify-between font-bold gap-2 text-xl">
        <p>brutto</p>
        <p>{{ formattedPrice.gross }} PLN</p>
      </div>

      <!-- Cena netto -->
      <div class="flex justify-between gap-2">
        <p class="">netto</p>
        <p class="font-bold ">{{ formattedPrice.net }} PLN</p>
      </div>

    </div>

    <div v-else class="w-full flex flex-col itemst-start justify-start  text-left">
      <p>Skontaktujemy się z Państwem w sprawie realizacji zamówienia</p>
    </div>

    <div class="mt-5 w-full flex justify-end">
      <UButton label="Dodaj do koszyka" :loading="isLoading" size="xl" icon="material-symbols:add-shopping-cart"
        :disabled="!isActive" class="hover:cursor-pointer" @click="triggerSubmit()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PriceSectionProps {
  isEnabled: boolean;
  price: number | null;
  isActive: boolean;
  isLoading: boolean;
}

const props = defineProps<PriceSectionProps>();
const emit = defineEmits<{
  (e: "trigger-submit"): void;
}>();

const triggerSubmit = () => {
  emit("trigger-submit");
};



const formattedPrice = computed(() => {
  // 1. Handle null/undefined gracefully (default to 0)
  const netValue = props.price ?? 0;

  // 2. Calculate Gross (Net * 1.23)
  const grossValue = netValue * 1.23;

  // 3. Helper to format to string (e.g., 123.45 -> "123,45")
  const format = (val: number) => val.toFixed(2).replace('.', ',');

  return {
    net: format(netValue),
    gross: format(grossValue)
  };
});
</script>
