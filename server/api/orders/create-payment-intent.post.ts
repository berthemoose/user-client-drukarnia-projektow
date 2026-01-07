// server/api/orders/create-payment-intent.post.ts

// 1. Remove the import of the frontend composable
// import { useOrderApi } from "../../composables/useOrderApi"; 

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event);
    
    // 2. Retrieve config directly here instead of using the composable
    // Ensure these keys match your runtimeConfig in nuxt.config.ts
    const PAYMENT_INTENT_API_SECRET = config.paymentIntentApiSecret || process.env.PAYMENT_INTENT_API_SECRET;
    
    // CAUTION: Ensure 'orderUrl' is actually in your runtimeConfig.
    // If it was only inside the composable, you need to add it to nuxt.config.ts
    const orderUrl = config.orderUrl || config.public?.orderUrl || process.env.ORDER_URL;

    // Debugging check (will show in your trap-and-reveal if it fails)
    if (!orderUrl) throw new Error("Order URL is missing in Server Config");
    if (!PAYMENT_INTENT_API_SECRET) throw new Error("Payment Secret is missing");

    const body = await readBody<Items>(event);

    // 3. Call the helper function (refactored below)
    const result = await createPaymentIntent(
      body,
      orderUrl,
      PAYMENT_INTENT_API_SECRET
    );

    return result;

  } catch (error: any) {
    // This is your "Trap and Reveal" that sends the error to the browser
    console.error(`CRITICAL ERROR:`, error);
    return {
      statusCode: 500,
      status: 'error',
      message: error.message, // This will explicitly tell you "useRuntimeConfig is not defined" if that was the issue
      stack: error.stack,
      debug: {
        hasUrl: !!(useRuntimeConfig(event).orderUrl || process.env.ORDER_URL),
        env: process.env.NODE_ENV
      }
    };
  }
});

const createPaymentIntent = async (
  data: Items,
  url: string,
  secret: string
) => {
  // 4. Use $fetch instead of fetch
  try {
    // Note: $fetch throws automatically on 4xx/5xx errors, so we don't need "if (!response.ok)"
    const result = await $fetch(`${url}/create-payment-intent/`, {
      method: "POST",
      body: {
        ...data,
        secret: secret,
      }
    });

    return result;
  } catch (error: any) {
    console.error(`Backend API error: ${error}`);
    // $fetch errors contain useful details in error.data
    throw createError({
      statusCode: error.response?.status || 500,
      message: `Payment service failed: ${JSON.stringify(error.data || error.message)}`,
    });
  }
};