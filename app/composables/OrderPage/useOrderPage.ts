import type { PayloadBase } from "../../types/payload";

export interface OrderPageData extends PayloadBase {
  productsTitle: string;
  productsParagraph: string;
}

export const useOrderPage = () => {
  const { cmsUrl } = useApi();
  const orderPageData = useState<OrderPageData | null>('order-page-persistent-state', () => null);

  const { data: fetchedData, pending, error, refresh } = useFetch<OrderPageData>(
    `${cmsUrl}/globals/products-page`,
    {
      key: 'order-page-data',
      server: true,
    }
  );

  if (fetchedData.value) {
    orderPageData.value = fetchedData.value;
  }

  watch(fetchedData, (newVal) => {
    if (newVal) {
      orderPageData.value = newVal;
    }
  });

  return {
    data: orderPageData,
    pending,
    error,
    refresh,
  };
};