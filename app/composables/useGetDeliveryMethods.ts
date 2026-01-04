import type { PayloadBase } from "../types/payload";

export interface DeliveryOption {
  name: string;
  description: string;
  price: number;
  time?: string;
  id: string;
}

interface DeliveryOptions extends PayloadBase {
  options: Array<DeliveryOption>;
}

export const useGetDeliveryMethods = () => {
  const { cmsUrl } = useApi();
  const url = `${cmsUrl}/globals/deliveryOptions`;
  const { data, pending, error, refresh } = useFetch<DeliveryOptions>(url, {
    key: `delivery-methods`,
    server: true,
    getCachedData() {
      return undefined;
    },
  });
  return { data, pending, error, refresh };
};
