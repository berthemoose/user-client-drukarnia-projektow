<template>
  <NuxtLink 
    to="/cart" 
    class="relative inline-flex items-center justify-center p-2 hover:bg-black/5 rounded-lg transition-colors"
    :class="{ 'hover:bg-white/10': isDark }"
  >
    <UIcon 
      name="mdi:cart-outline" 
      class="text-2xl"
      :class="textColorClass"
    />
    <span 
      v-if="itemCount > 0" 
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5"
    >
      {{ itemCount }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';

interface CartIconProps {
  isDark?: boolean;
}

const props = withDefaults(defineProps<CartIconProps>(), {
  isDark: false,
});

const cartStore = useCartStore();

const itemCount = computed(() => cartStore.itemCount);

const textColorClass = computed(() => 
  props.isDark ? 'text-white' : 'text-black'
);
</script>
