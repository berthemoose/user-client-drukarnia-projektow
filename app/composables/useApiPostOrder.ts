/**
 * Interface for form values.
 * Each key corresponds to a form input field.
 * 'copies' is the number of copies of the product to be ordered.
 * All other keys are optional and correspond to additional order details.
 */
interface FormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  company?: string;
  comments?: string;
  copies: number;
  [key: string]: any;
}

/**
 * Function to handle form submission and order creation.
 * Takes in form values, file, student status, recaptcha token, product name, and client price.
 * Returns a Promise that resolves to the response data.
 */
export const useApiPostOrder = (
  values: FormValues,
  file: Ref<File | null>,
  productId?: string
) => {
  const { orderUrl } = useApi();

  /**
   * Function to send form data to the server and create an order.
   * @param values - FormValues object containing form input values.
   * @param file - File object representing the uploaded file.
   * @param isStudent - Boolean indicating if the user is a student.
   * @param recaptchaToken - String containing the recaptcha token.
   * @param productName - String containing the name of the product.
   * @param clientPrice - Number representing the client price (optional).
   * @returns Promise that resolves to the response data.
   */
  const req = async (
    values: FormValues,
    file: Ref<File | null>,
    isStudent: boolean,
    recaptchaToken: string,
    productName: string,
    clientPrice?: number
  ) => {
    // Create a new FormData object to hold form data
    const formData = new FormData();

    // Convert form values to raw values
    const rawValues = toRaw(values);

    // Get the raw file value
    const rawFile = file.value;

    // Check if a file was selected
    if (!rawFile) {
      throw new Error("No file selected");
    }

    // Define static key-value pairs for order data
    const staticKeys = [
      "name",
      "surname",
      "email",
      "phone",
      "company",
      "comments",
      "copies",
      "pages",
    ];

    // Filter out specs and create an array of objects with key-value pairs
    const specs = Object.entries(rawValues)
      .filter(([key]) => !staticKeys.includes(key))
      .map(([key, value]) => ({ [key]: value }));

    // Initialize an object to hold the order data
    const orderData: any = {};

    // Append static key-val pairs to orderData
    staticKeys.forEach((key) => {
      const value = rawValues[key];
      if (value !== null && value !== undefined && value !== "") {
        orderData[key] = value;
      }
    });

    // Check if product name was provided
    if (!productName) {
      throw new Error("File name is required to submit the order");
    }

    // Add product name to order data
    orderData["product_name"] = productName;

    // Add student status to order data
    orderData["is_student"] = JSON.stringify(isStudent);

    // Add specs to order data
    orderData["specs"] = specs;

    // Add product ID and client price to order data if provided
    if (productId) {
      orderData["product_id"] = productId;
    }
    if (clientPrice !== undefined && clientPrice !== null && clientPrice > 0) {
      orderData["client_price"] = clientPrice;
    }

    // Append order data and file to form data
    formData.append("order_data_raw", JSON.stringify(orderData));
    formData.append("file", rawFile);

    // Check if recaptcha token was provided
    if (!recaptchaToken) {
      throw new Error("reCAPTCHA token is required to submit the order");
    }

    // Append recaptcha token to form data
    formData.append("recaptcha_token", recaptchaToken);

    // Log form data values to console
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Validate price on Nuxt Server
    try {
      const validationResponse = await fetch("/api/orders/validate-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: orderData["product_id"],
          selectedModifiers: rawValues,
          pages: orderData["pages"],
          copies: orderData["copies"],
          clientCalculatedPrice: clientPrice || 0,
        }),
      });

      if (!validationResponse.ok) {
        throw new Error("Price validation failed");
      }

      const validationResult = await validationResponse.json();
      console.log(validationResult.serverPrice);
      
    } catch (err: any) {
      console.error("Error validating price:", err);
      throw err;
    }

    try {
      // Send form data to server and create an order
      const response = await fetch(`${orderUrl}/submit-order/`, {
        method: "POST",
        body: formData,
      });

      // Parse response data
      const responseData = await response.json();
      return responseData;
    } catch (err: any) {
      console.error("Error submitting order:", err);
    }
  };

  return {
    req,
  };
};
