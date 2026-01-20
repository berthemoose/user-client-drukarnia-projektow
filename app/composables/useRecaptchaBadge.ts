/**
 * Composable to control reCAPTCHA badge visibility based on current route
 * Shows badge only on product order pages, hides it everywhere else
 */
export const useRecaptchaBadge = () => {
  const route = useRoute();

  const toggleBadgeVisibility = () => {
    if (process.client) {
      // Wait for next tick to ensure DOM is ready
      nextTick(() => {
        const badge = document.querySelector('.grecaptcha-badge') as HTMLElement;
        if (badge) {
          // Show badge only on product pages (order form)
          const isProductPage = route.path.startsWith('/products/');
          
          if (isProductPage) {
            badge.classList.remove('hidden');
          } else {
            badge.classList.add('hidden');
          }
        }
      });
    }
  };

  // Watch route changes and toggle badge visibility
  watch(() => route.path, toggleBadgeVisibility, { immediate: true });

  // Also toggle on mount
  onMounted(() => {
    toggleBadgeVisibility();
  });
};
