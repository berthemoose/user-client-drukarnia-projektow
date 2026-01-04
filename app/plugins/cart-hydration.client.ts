export default defineNuxtPlugin(() => {
  const cartStore = useCartStore();
  
  // Load cart from localStorage on client-side hydration
  cartStore.loadFromStorage();
});
