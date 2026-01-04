import { useCartStore } from '~/stores/cart';

/**
 * Composable to handle cart persistence with localStorage
 * Call this in app.vue or a layout to enable cart persistence
 */
export const useCartPersistence = () => {
  const cartStore = useCartStore();
  const STORAGE_KEY = 'drukarnia-cart';

  // Load cart from localStorage on mount
  const loadCart = () => {
    if (import.meta.client) {
      try {
        const savedCart = localStorage.getItem(STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          cartStore.$patch(parsed);
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  };

  // Save cart to localStorage whenever it changes
  const saveCart = () => {
    if (import.meta.client) {
      try {
        const cartData = {
          items: cartStore.items,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  };

  // Watch for cart changes and save
  watch(
    () => cartStore.$state,
    () => {
      saveCart();
    },
    { deep: true }
  );

  // Load cart on initialization
  onMounted(() => {
    loadCart();
  });

  return {
    loadCart,
    saveCart,
  };
};
