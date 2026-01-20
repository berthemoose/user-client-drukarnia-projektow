import { useGetDeliveryMethods } from "../../composables/useGetDeliveryMethods";

export interface DeliveryOption {
  name: string;
  description: string;
  price: number;
  time?: string;
  id: string;
}

interface DeliveryValidationRequest {
  deliveryOption: DeliveryOption | null;
  clientCalculatedDeliveryPrice: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<DeliveryValidationRequest>(event);
  const { deliveryOption, clientCalculatedDeliveryPrice } = body;

  // If no delivery option (pickup), validate that price is 0
  if (!deliveryOption) {
    const isValid = clientCalculatedDeliveryPrice === 0;
    return {
      valid: isValid,
      serverDeliveryPrice: 0,
      clientDeliveryPrice: clientCalculatedDeliveryPrice,
      deliveryMethod: "pickup",
    };
  }

  // Fetch delivery options from CMS
  const { options: deliveryOptions } = await useGetDeliveryMethods();

  // Find the delivery option on server
  const serverDeliveryOption = deliveryOptions.find(
    (opt) => opt.id === deliveryOption.id
  );

  // Validate delivery option exists
  if (!serverDeliveryOption) {
    throw createError({
      statusCode: 400,
      message: "Invalid delivery option: option does not exist",
    });
  }

  // Validate price matches
  if (serverDeliveryOption.price !== deliveryOption.price) {
    throw createError({
      statusCode: 400,
      message: `Delivery price mismatch: expected ${serverDeliveryOption.price}, got ${deliveryOption.price}`,
    });
  }

  // Validate client calculated price matches server
  const difference = Math.abs(
    serverDeliveryOption.price - clientCalculatedDeliveryPrice
  );
  const isValid = difference <= 0.01;

  return {
    valid: isValid,
    serverDeliveryPrice: serverDeliveryOption.price,
    clientDeliveryPrice: clientCalculatedDeliveryPrice,
    deliveryMethod: serverDeliveryOption.name,
    difference,
  };
});
