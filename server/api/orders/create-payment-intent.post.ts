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

  try {
    const config = useRuntimeConfig(event);
  /* TEMPORARILY EXPOSED!!! FIX!!! JUST FOR DEBUGGING!!! */
    const PAYMENT_INTENT_API_SECRET = "}UIVinWwS=;x~6XIb=BD8Q20/}@%8ilB*E8b&k}N-q~xderV/Oq0Y?;066;R~ST"
    const { orderUrl } = useOrderApi(); 
    const body = await readBody<Items>(event);
    const result = await createPaymentIntent(
      body,
      orderUrl,
      PAYMENT_INTENT_API_SECRET
    );
    return result;
    
  } catch (error) {
    console.error(`CRITICAL ERROR: ${error}`);
    return {
      status:'error',
      statusCode:500,
      message: error.message,
      stack: error.stack,
      error: error,
      debug: {
        // Let's verify if your "hardcoded" values are actually working
        hasSecret: !!process.env.PAYMENT_INTENT_API_SECRET, 
        nodeEnv: process.env.NODE_ENV
      }
    };
  }



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
