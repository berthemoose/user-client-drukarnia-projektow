interface ItemData {
  id: string;
  productName: string;
  price: number;
  basePrice: number;
  values: {
    [key: string]: string;
  };
}
interface Items {
  items: Array<ItemData>;
  total: number;
  deliveryMethod: string;
}

import { useOrderApi } from "../../composables/useOrderApi";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const PAYMENT_INTENT_API_SECRET = config.paymentIntentApiSecret;

  const { orderUrl } = useOrderApi();

  if (!PAYMENT_INTENT_API_SECRET) {
    throw createError({
      statusCode: 500,
      message: "Payment API secret not configured",
    });
  }

  const body = await readBody<Items>(event);
  const result = await createPaymentIntent(
    body,
    orderUrl,
    PAYMENT_INTENT_API_SECRET
  );

  return result;
});

const createPaymentIntent = async (
  data: Items,
  url: string,
  secret: string
) => {
  try {
    const response = await fetch(`${url}/create-payment-intent/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        secret: secret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Python API error (${response.status}): ${errorText}`);
      throw createError({
        statusCode: response.status,
        message: `Payment service error: ${errorText}`,
      });
    }

    const result = await response.json();
    console.log(
      `Payment intent created successfully: ${JSON.stringify(result)}`
    );
    return result;
  } catch (error) {
    console.error(`Error creating payment intent: ${error}`);
    throw error;
  }
};
