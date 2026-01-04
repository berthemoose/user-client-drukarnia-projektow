import type { PayloadBase } from "~/app/types/payload";

export interface OrderPageData extends PayloadBase {
  productsTitle: string;
  productsParagraph: string;
}

export const useOrderPage = () => {
  const { cmsUrl } = useApi();

  // Use useFetch without caching to always get fresh order page data
  const { data, pending, error, refresh } = useFetch<OrderPageData>(
    `${cmsUrl}/globals/products-page`,
    {
      key: 'order-page-data', // Unique key for this fetch
      lazy: true, // Don't block navigation
      server: true, // Enable SSR
      // No caching - always fetch fresh data
      getCachedData() {
        return undefined; // Always return undefined to bypass cache
      },
    }
  );

  return {
    data,
    pending,
    error,
    refresh,
  };
};