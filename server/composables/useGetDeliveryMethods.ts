import { useCms } from "./useCms";
import type { DeliveryOption } from "../api/orders/validate-delivery.post";

interface PayloadBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface DeliveryOptions extends PayloadBase {
  options: Array<DeliveryOption>;
}

export const useGetDeliveryMethods = async () => {
  const { cmsUrl } = useCms();

  try {
    // Fetch delivery options from CMS globals
    const deliveryOptions = await $fetch<DeliveryOptions>(
      `${cmsUrl}/globals/deliveryOptions`
    );

    return {
      success: true,
      data: deliveryOptions,
      options: deliveryOptions.options,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: "Failed to fetch delivery methods",
      data: error,
    });
  }
};