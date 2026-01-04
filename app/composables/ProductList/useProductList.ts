export const useProductList = () => {
  const { cmsUrl } = useApi();

  // Use useFetch without caching to always get fresh product data
  const { data, pending, error, refresh } = useFetch<any>(
    `${cmsUrl}/products`,
    {
      key: "product-list-data", // Unique key for this fetch
      lazy: true, // Don't block navigation
      server: false, // Disable SSR to prevent hydration mismatch
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

export const useNoStoreProductList = () => {
  const { cmsUrl } = useApi();

  // Use useFetch without caching to always get fresh product data
  const { data, pending, error, refresh } = useFetch<any>(
    `${cmsUrl}/no-store-products`,
    {
      key: "no-store-product-list-data", // Unique key for this fetch
      lazy: true, // Don't block navigation
      server: false, // Disable SSR to prevent hydration mismatch
      // No caching - always fetch fresh data
      getCachedData() {
        return undefined; // Always return undefined to bypass cache
      },
    }
  );

  console.log("Logging no store items:", data.value);

  return {
    data,
    pending,
    error,
    refresh,
  };
};
