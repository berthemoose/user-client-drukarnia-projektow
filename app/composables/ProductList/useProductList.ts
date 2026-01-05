export const useProductList = () => {
  const { cmsUrl } = useApi();

  return useFetch<any>(`${cmsUrl}/products`, {
    key: 'product-list-data',
    server: true,
  });
};

export const useNoStoreProductList = () => {
  const { cmsUrl } = useApi();

  return useFetch<any>(`${cmsUrl}/no-store-products`, {
    key: 'no-store-product-list-data',
    server: true,
  });
};

