import { useOrderApi } from "~~/server/composables/useOrderApi";

interface OrderItem {
  id: string;
  cartItemId: string;
  productName: string;
  price: number;
  basePrice: number;
  values: { [key: string]: string };
  prodTypeId?: string;
}

interface OrderData {
  items: Array<OrderItem>;
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    company: string;
  };
  deliveryAddress?: {
    street: string;
    number: string;
    code: string;
    city: string;
  };
  total: number;
  deliveryMethod: "delivery" | "pickup";
  deliveryOption?: {
    name: string;
    description: string;
    price: number;
    time?: string;
    id: string;
  };
  recaptchaToken: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  /* TEMPORARILY EXPOSED!!! FIX!!! JUST FOR DEBUGGING!!! */
  const ORDER_API_SECRET = '#QES>9PZ"Kkbx2OP|e)??cO{}hTx1:[#j9<[8%R_)`yK3rUoF,U#-kx~j:&v{tE';
  const {orderUrl} = useOrderApi();
  const ORDER_URL = orderUrl;
  const CLIENT_URL = 'https://app-user-client-drukarnia-projektow-staging.azurewebsites.net';

  if (!ORDER_API_SECRET) {
    throw createError({
      statusCode: 500,
      message: "Order API secret not configured",
    });
  }

  console.log(`Logging order_api_secret ${ORDER_API_SECRET}`);

  // Parse multipart form data
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      statusCode: 400,
      message: "No form data received",
    });
  }

  const orderDataField = formData.find((field) => field.name === "orderData");
  if (!orderDataField) {
    throw createError({
      statusCode: 400,
      message: "Missing orderData field",
    });
  }

  const orderData: OrderData = JSON.parse(
    orderDataField.data.toString("utf-8")
  );

  const recaptchaToken: string = formData
    .find((field) => field.name === "recaptchaToken")
    ?.data.toString() || "";

  const fileMap = new Map<
    string,
    { filename: string; data: Uint8Array; type: string }
  >();
  formData.forEach((field) => {
    if (field.name?.startsWith("file_")) {
      const cartItemId = field.name.replace("file_", "");
      fileMap.set(cartItemId, {
        filename: field.filename || "unknown",
        data: field.data,
        type: field.type || "application/octet-stream",
      });
    }
  });

  console.log("File mapping log:", Array.from(fileMap.entries()));

  // Create order with files
  const result = await createOrder(
    orderData,
    fileMap,
    ORDER_URL as string,
    ORDER_API_SECRET,
    CLIENT_URL as string,
    recaptchaToken
  );

  return result;
});

const createOrder = async (
  orderData: OrderData,
  fileMap: Map<string, { filename: string; data: Uint8Array; type: string }>,
  url: string,
  secret: string,
  origin_url: string,
  recaptchaToken: string
) => {
  try {
    /* Build FormData for the Python backend */
    const backendFormData = new FormData();

    /* add order data */
    backendFormData.append("orderData", JSON.stringify(orderData));
    /* add files with respective id keys */
    fileMap.forEach((file, cartItemId) => {
      const blob = new Blob([file.data as any], { type: file.type });
      backendFormData.append(`file_${cartItemId}`, blob, file.filename);
    });

    backendFormData.append("recaptcha_token", recaptchaToken);

    /* add auth secret */
    backendFormData.append("secret", secret);

    const response = await fetch(`${url}/submit-order/`, {
      method: "POST",
      headers: {
        Origin: origin_url,
      },
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Python API error (${response.status}): ${errorText}`);
      throw createError({
        statusCode: response.status,
        message: `Order service error: ${errorText}`,
      });
    }

    const result = await response.json();
    console.log(`Order created successfully: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.error(`Error creating order: ${error}`);
    throw error;
  }
};
