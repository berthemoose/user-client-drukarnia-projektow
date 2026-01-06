<template>
  <!-- Charging modal -->
  <UModal title="Przetwarzanie zamówienia" :close="false" :open="isChargingModalOpen">
    <template #body>
      <div class="py-4">
        <Loader :size="60" :show-text="false" />
        <p class="text-xs">Prosimy nie zamykać okna preglądarki</p>
      </div>
      <UProgress size="xl" :max="progressArray" v-model="progressBar" />
    </template>
  </UModal>



  <div id="main-container" class="min-h-screen ">
    <div class="flex flex-col justify-center py-12">
      <UContainer class="">
        <div class="p-8 w-full" v-if="cartItems.length">
          <div class="">
            <UStepper v-model="currentStepperStep" color="neutral" :items="stepperItems" />
          </div>
        </div>
      </UContainer>


      <div v-if="currentStep === 'payment'">
        <ProductPageFormStripe v-if="clientSecret" :payment-intent-id="paymentIntentId" :client-secret="clientSecret"
          :amount="amount" />
        <div v-else class="p-6 bg-gray-200 text-gray-600 font-semibold rounded-xl">Tu pojawi się terminal płatniczy
        </div>
      </div>
    </div>

    <UContainer class="py-8">
      <!-- ============================================ -->
      <!-- STEP 1: CART VIEW - EMPTY STATE -->
      <!-- ============================================ -->


      <div v-if="currentStep === 'cart' && cartItems.length === 0" class="text-center py-16">

        <UIcon name="i-lucide-shopping-cart" class="text-6xl text-gray-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">
          Twój koszyk jest pusty
        </h2>
        <p class="text-gray-500 mb-6">
          Dodaj produkty do koszyka, aby kontynuować zakupy
        </p>
        <UButton to="/" label="Kontynuuj zakupy" class="cursor-pointer" size="lg" />
      </div>

      <!-- ============================================ -->
      <!-- STEP 1: CART VIEW - WITH ITEMS -->
      <!-- ============================================ -->
      <div v-else-if="currentStep === 'cart'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- LEFT COLUMN: Cart Items List -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Individual Cart Item Card -->

          <div v-for="item in cartItems" :key="item.cartItemId">
            <CartItem :item="item" class="overflow-hidden" />
          </div>

          <!-- Continue Shopping Button -->
          <UButton to="/" label="Kontynuuj zakupy" icon="i-lucide-arrow-left" color="neutral" variant="ghost"
            class="mt-4 cursor-pointer" />
        </div>

        <!-- RIGHT COLUMN: Order Summary & Trust Badges -->
        <div class="lg:col-span-1">
          <!-- Order Summary Card -->
          <UCard class="sticky top-4">
            <template #header>
              <h2 class="text-xl font-bold">Podsumowanie</h2>
            </template>

            <div class="space-y-4">
              <!-- Price Breakdown -->
              <div class="space-y-2">
                <div v-if="subtotal > 0" class="flex justify-between text-gray-700">
                  <span>Produkty</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div v-if="deliveryPrice > 0" class="flex justify-between text-gray-700">
                  <span>Dostawa</span>
                  <span>{{ formatPrice(deliveryPrice) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-gray-900">
                  <span v-if="total">Razem</span>
                  <span>{{
                    total === 0 ? "Cena na e-mail" : formatPrice(total)
                  }}</span>
                </div>
              </div>

              <!-- Proceed to Checkout Button -->
              <UButton :label="total > 0 ? 'Przejdź do kasy' : 'Złóż zamówienie'" icon="i-lucide-shopping-bag" block
                size="lg" class="mt-6 cursor-pointer" :disabled="!cartItems.every(item => item.file)"
                @click="goToCheckout" />

              <!-- Accepted Payment Methods -->
              <div v-if="total > 0" class="pt-4 border-t">
                <p class="text-xs text-gray-500 text-center mb-2">
                  Akceptujemy
                </p>
                <div class="flex justify-center gap-2">
                  <UIcon name="i-lucide-credit-card" class="text-2xl text-gray-400" />
                  <UIcon name="i-lucide-smartphone" class="text-2xl text-gray-400" />
                  <UIcon name="i-lucide-wallet" class="text-2xl text-gray-400" />
                </div>
              </div>
            </div>
          </UCard>

          <!-- Trust Badges Card -->
          <!-- TODO: Different trust badges! -->
          <UCard class="mt-4">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <UIcon name="i-lucide-shield-check" class="text-green-600 text-xl" />
                <span class="text-gray-700">Bezpieczne płatności</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <UIcon name="i-lucide-rotate-ccw" class="text-orange-600 text-xl" />
                <span class="text-gray-700">30 dni na zwrot</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- STEP 2: CHECKOUT VIEW -->
      <!-- ============================================ -->
      <div v-else-if="currentStep === 'checkout'" class="space-y-6">
        <!-- Stripe Payment Form (shown when payment intent is ready) -->


        <!-- Checkout Debug Information Card -->
        <UCard>
          <template #header>
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900">Finalizacja zamówienia</h1>
              <p class="text-gray-600 mt-2">
                liczba produktów w koszyku: {{ cartItems.length }}
              </p>
              <div class="mb-8">
                <UButton icon="i-lucide-arrow-left" label="Powrót do koszyka" variant="ghost"
                  @click="currentStep = 'cart'" class="cursor-pointer" />
              </div>
            </div>

            <div class="space-y-6">
              <!-- Order Summary -->
              <div class="p-4 bg-blue-50 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Podsumowanie</h3>
                <p><strong>Liczba produktów:</strong> {{ cartItems.length }}</p>
                <p v-if="subtotal > 0">
                  <strong>Cena produktów:</strong> {{ formatPrice(subtotal) }}
                </p>
                <p v-if="deliveryPrice > 0">
                  <strong>Dostawa:</strong> {{ formatPrice(deliveryPrice) }}
                </p>
                <p v-if="total > 0" class="text-lg mt-2">
                  <strong>Całkowita cena:</strong> {{ formatPrice(total) }}
                </p>
              </div>
            </div>
          </template>

          <!-- Customer information -->
          <ProductPageFormCustomerInformation :are-inputs-disabled="false" :fields="customerFields"
            :errors="customerErrors" />


          <!-- Address Form -->
          <ProductPageFormAddress v-if="total > 0" :are-inputs-disabled="false" :fields="addressFields"
            :errors="addressErrors" />

          <UButton :disabled="isOrderDisabled.isDisabled" label="Zamów" icon="i-lucide-shopping-bag" block size="xl"
            class="mt-6 cursor-pointer" @click="
              total > 0
                ? getStripePaymentIntent(orderData)
                : orderWithoutPayment()
              " />
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
// ============================================
// IMPORTS
// ============================================
import { useCartStore, type CartItem } from "../../stores/cart";
import { useOrderResponseStore } from "../../stores/orderResponse";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { computed } from "vue";

// ============================================
// TYPE DEFINITIONS
// ============================================
type AddressFields = Record<string, yup.StringSchema | yup.NumberSchema> & {
  street: yup.StringSchema;
  number: yup.StringSchema;
  code: yup.StringSchema;
  city: yup.StringSchema;
};

type CustomerFields = Record<string, yup.StringSchema | yup.NumberSchema> & {
  name: yup.StringSchema;
  surname: yup.StringSchema;
  email: yup.StringSchema;
  phone: yup.StringSchema;
  company: yup.StringSchema;
};

// ============================================
// STORE & STATE MANAGEMENT
// ============================================
const cartStore = useCartStore();
const orderResponseStore = useOrderResponseStore();



/* Charging progress bar */
const progressBar = ref<number>(0);
const isChargingModalOpen = ref<boolean>(false);

/* Progress arrays */
const progressArray = computed(() => {
  const arrayWithPayment = ['Przygotowywanie danych do płatności...', 'Sprawdzanie danych...', 'Zamówienie zapisane!', 'Wysyłanie plików na serwer...', 'Składanie zamówienia', 'Finalizowanie...'];
  const arrayWithoutPayment = ['Przygotowywanie danych do zamówienia...', '', '', '', 'Wysyłanie plików na serwer...', 'Składanie zamówienia', 'Finalizowanie...'];

  return total.value > 0 ? arrayWithPayment : arrayWithoutPayment
})


// Step management (cart or checkout view)
const currentStep = ref<"cart" | "checkout" | "payment" | "paid">("cart");

// Delivery method toggle (true = delivery, false = pickup)
const isAddress = ref<boolean>(true);

// Provide isAddress to child components (required by AddressInput)
provide("isAddress", isAddress);

// Watch isAddress changes to clear delivery option when switching to pickup
watch(isAddress, (newValue) => {
  if (!newValue) {
    // Switched to pickup - clear delivery option
    cartStore.clearDeliveryOption();
  }
});

const stepperItems = ref([{
  title: 'Podsumowanie',
  description: 'Dodaj pliki i zatwierdź zamówienie',
  icon: 'i-lucide-house'
},
{
  title: 'Dane zamówienia',
  description: 'Wypełnij formularz',
  icon: 'i-lucide-truck'
},
{
  title: 'Płatność',
  description: 'Spersonalizuj metodę płatności',
  icon: 'i-lucide-credit-card'
}]);
const currentStepperStep = ref<number>(0);


// ============================================
// COMPUTED VALUES FROM STORE
// ============================================
const cartItems = computed(() => cartStore.items);
const total = computed(() => cartStore.total);
const selectedDeliveryMethod = computed(() => cartStore.deliveryOption);
const subtotal = computed(() => cartStore.subtotal);
const deliveryPrice = computed(() => cartStore.deliveryPrice);

// ============================================
// PAYMENT INTENT STATE
// ============================================
const paymentIntentId = ref<string>();

const clientSecret = ref<string>();
const amount = ref<number>();

// ============================================
// ADDRESS VALIDATION SCHEMA
// ============================================
const getAddressValidationSchema = () => {
  const fields: AddressFields = {
    street: yup
      .string()
      .required("Proszę podać nazwę ulicy")
      .min(3, "Minimalna ilość znaków: 3")
      .max(256, "Przekroczono dozwoloną ilość znaków"),
    number: yup
      .string()
      .required("Proszę podać numer budynku/lokalu")
      .max(256, "Przekroczono dozwoloną ilość znaków"),
    code: yup
      .string()
      .required("Proszę podać kod pocztowy")
      .matches(/^\d{2}-\d{3}$/, "Proszę podać poprawnie sformatowany kod pocztowy (XX-XXX)")
      .max(256, "Przekroczono dozwoloną ilość znaków"),
    city: yup
      .string()
      .required("Proszę podać miejscowość")
      .min(3, "Minimalna ilość znaków: 3")
      .max(256, "Przekroczono dozwoloną ilość znaków"),
  };
  return yup.object(fields);
};

// ============================================
// ADDRESS FORM SETUP
// ============================================
const addressValidationSchema = getAddressValidationSchema();
const {
  values: addressValues,
  errors: addressErrors,
  defineField: defineAddressField,
} = useForm({
  validationSchema: addressValidationSchema,
});

const addressFields = {
  addressStreet: defineAddressField("street"),
  addressNumber: defineAddressField("number"),
  addressCode: defineAddressField("code"),
  addressCity: defineAddressField("city"),
};

// ============================================
// CUSTOMER VALIDATION SCHEMA
// ============================================
const getCustomerValidationSchema = () => {
  const fields: CustomerFields = {
    name: yup
      .string()
      .required("Proszę podać imię")
      .max(32, "Przekroczono dozwoloną ilość znaków"),
    surname: yup
      .string()
      .required("Proszę podać nazwisko")
      .max(32, "Przekroczono dozwoloną ilość znaków"),
    email: yup
      .string()
      .required("Proszę podać adres email")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Proszę podać poprawnie sformatowany e-mail")
      .max(64, "Przekroczono dozwoloną ilość znaków"),
    phone: yup
      .string()
      .required("Proszę podać numer telefonu")
      .max(32, "Przekroczono dozwoloną ilość znaków"),
    company: yup.string().max(32, "Przekroczono dozwoloną ilość znaków"),
  };
  return yup.object(fields);
};

// ============================================
// CUSTOMER FORM SETUP
// ============================================

const customerValidationSchema = getCustomerValidationSchema();
const {
  values: customerValues,
  errors: customerErrors,
  defineField: defineCustomerField,
} = useForm({
  validationSchema: customerValidationSchema,
});

const customerFields = {
  customerName: defineCustomerField("name"),
  customerSurname: defineCustomerField("surname"),
  customerEmail: defineCustomerField("email"),
  customerPhone: defineCustomerField("phone"),
  customerCompany: defineCustomerField("company"),
};

// ============================================
// PAYMENT INTENT INTERFACE
// ============================================
interface PaymentIntentParams {
  items: CartItem[];
  total: number;
  deliveryMethod: "delivery" | "pickup";
  address: {
    street: string;
    number: string;
    code: string;
    city: string;
  } | null;
}

interface OrderData extends PaymentIntentParams {
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    company?: string;
  };
}


const isOrderDisabled = computed(() => {
  const hasErrorsInObj = (errorsRef: any) => {
    if (!errorsRef || !errorsRef.value) return false;
    return Object.values(errorsRef.value).some((error) => !!error);
  };

  const hasValidationErrors =
    hasErrorsInObj(addressErrors) || hasErrorsInObj(customerErrors);

  const customerFieldsRequired = ["name", "surname", "email", "phone"];

  const areCustomerFieldsFilled = customerFieldsRequired.every((field: string) => customerValues[field] !== undefined &&
    customerValues[field] !== null &&
    customerValues[field] !== "")


  const addressFieldsRequired = ["street", "number", "code", "city"]
  const areAddressFieldsFilled = addressFieldsRequired.every((field: string) => addressValues[field] !== undefined &&
    customerValues[field] !== null &&
    customerValues[field] !== "")

  const hasDeliveryMethod =
    cartStore.deliveryOption !== null &&
    cartStore.deliveryOption !== undefined &&
    cartStore.deliveryOption.name !== "";

  const isDeliveryValid = isAddress.value ? hasDeliveryMethod : true;

  const isStoreFormValid =
    !hasValidationErrors &&
    areCustomerFieldsFilled &&
    (isAddress.value ? areAddressFieldsFilled : true) &&
    isDeliveryValid;

  const isNoStoreFormValid = !hasErrorsInObj(customerErrors) && areCustomerFieldsFilled


  return {
    isDisabled: total.value > 0 ? !isStoreFormValid : !isNoStoreFormValid,
    // Debug:
    hasValidationErrors,
    areCustomerFieldsFilled,
    areAddressFieldsFilled,
    isDeliveryValid,
  };
});

// ============================================
// ORDER DATA COMPUTED
// ============================================
// Aggregates all order information before API call
const orderData = computed<OrderData>(() => ({
  items: cartStore.items,
  total: cartStore.total,
  customerInfo: {
    name: customerValues.name,
    surname: customerValues.surname,
    email: customerValues.email,
    phone: customerValues.phone,
    company: customerValues.company,
  },
  deliveryMethod: isAddress.value ? "delivery" : "pickup",
  deliveryAddress: isAddress.value
    ? {
      street: addressValues.street,
      number: addressValues.number,
      code: addressValues.code,
      city: addressValues.city,
    }
    : null,
}));

// ============================================
// DEBUG STATE (for development)
// ============================================
const testModifiers = ref();
const priceValidationResult = ref<Array<[string, any]>>([]);

// ============================================
// PAYMENT INTENT CREATION
// ============================================
/**
 * Creates a Stripe payment intent after validating prices
 *
 * Process:
 * 1. Validate each item's price with the server
 * 2. Calculate total from validated prices
 * 3. Create payment intent via Stripe API
 * 4. Store payment intent details in component state
 */

const paymentIntentRef = ref();

interface OrderRequest {
  items: CartItem[];
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    company?: string;
  };
  deliveryAddress?: {
    street?: string;
    number?: string;
    code?: string;
    city?: string;
  };
  total: number;
  // TODO: PROPER TYPING!
  paymentIntentId?: any;
  deliveryMethod?: string;
  deliveryOption?: any;
}

const getStripePaymentIntent = async (params: PaymentIntentParams) => {
  window.scrollTo(0, 0);


  isChargingModalOpen.value = true;
  progressBar.value = 0; //Przygotowywanie danych do płatności

  currentStep.value = 'payment';
  // Total price after server validation

  progressBar.value = 1; //Sprawdzanie danych
  let validatedTotal = 0;

  // Calculate and validate price of the cart items
  if (orderData.value.items) {
    // For each item in cart
    for (const item of orderData.value.items) {
      // Price modifiers for validation
      const selectedModifiers = item.values;
      // Validate product price
      if (item.price && item.price > 0) {
        const response = await fetch("/api/orders/validate-price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.id,
            selectedModifiers: selectedModifiers,
            pages: item.values.pages,
            copies: item.values.copies,
            clientCalculatedPrice: item.price,
            productName: item.productName,
            prodTypeId: item.prodTypeId,
          }),
        });
        const result = await response.json();
        console.log(
          "Logging the first price validation for a product with price > 0",
          result
        );
        priceValidationResult.value.push([item.productName, result]);

        if (result.valid) {
          validatedTotal += result.serverPrice;
        } else {
          throw new Error("Price validation failed");
        }
      } else if (item.price !== undefined && item.price == 0) {
        // Validate that item is really 0
        const response = await fetch("/api/orders/validate-zero-price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.id,
            productName: item.productName,
          }),
        });
        const result = await response.json();
        console.log(
          "Logging the first price validation for a product with price = 0",
          result
        );
        if (!result.valid) {
          throw new Error("Price validation failed");
        }
      }
    }
  }

  // Calculate and validate price of deliv
  if (isAddress.value && selectedDeliveryMethod.value) {
    const deliveryResponse = await fetch("/api/orders/validate-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryOption: selectedDeliveryMethod.value,
        clientCalculatedDeliveryPrice: deliveryPrice.value,
      }),
    });

    const deliveryResult = await deliveryResponse.json();
    console.log("Delivery validation result:", deliveryResult);

    if (deliveryResult.valid) {
      validatedTotal += deliveryResult.serverDeliveryPrice;
    } else {
      throw new Error("Delivery price validation failed");
    }
  }

  // Verify server total matches client total
  const difference = Math.abs(validatedTotal - params.total);
  if (difference > 0.01) {
    throw new Error(
      `Price mismatch: Server total ${validatedTotal.toFixed(
        2
      )} does not match client total ${params.total.toFixed(
        2
      )} (difference: ${difference.toFixed(2)})`
    );
  }

  // Prepare payment intent data
  const paymentIntentData = computed(() => {
    return {
      items: orderData.value.items.map((item) => ({
        id: item.id,
        productName: item.productName,
        price: item.price,
        basePrice: item.basePrice || 0,
        values: item.values,
        prodTypeId: item.prodTypeId,
      })),
      total: validatedTotal,
      deliveryMethod: params.deliveryMethod,
      deliveryOption: selectedDeliveryMethod.value, // Full delivery option object
    };
  });

  // Request payment intent from Stripe
  const paymentIntentResponse = await fetch(
    "/api/orders/create-payment-intent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentIntentData.value),
    }
  );
  const paymentIntent = await paymentIntentResponse.json();

  // Store payment intent data in component state
  if (paymentIntent.payment) {
    paymentIntentId.value = paymentIntent.payment.stripe_payment_intent_id;
    clientSecret.value = paymentIntent.payment.client_secret;
    amount.value = paymentIntent.payment.amount;
    progressBar.value = 2; //Zamówienie zapisane
  }


  // Prepare order request data
  const orderRequestData = computed(() => {
    return {
      items: orderData.value.items.map((item) => ({
        id: item.id,
        cartItemId: item.cartItemId,
        productName: item.productName,
        /* TODO: add product desc later */
        price: item.price,
        basePrice: item.basePrice || 0,
        values: item.values,
        prodTypeId: item.prodTypeId,
      })),
      customerInfo: {
        name: orderData.value.customerInfo.name,
        surname: orderData.value.customerInfo.surname,
        email: orderData.value.customerInfo.email,
        phone: orderData.value.customerInfo.phone,
        company: orderData.value.customerInfo?.company,
      },
      deliveryAddress: orderData.value.deliveryAddress,
      total: validatedTotal,
      paymentIntentId: paymentIntent.payment?.stripe_payment_intent_id,
      deliveryMethod: orderData.value.deliveryMethod,
      deliveryOption: selectedDeliveryMethod.value,
    };
  });


  if (paymentIntent.payment) {
    progressBar.value = 3 //Wysyłanie plików na serwer
    const orderResponse = await postOrder(orderRequestData.value);

  } else {
    // Handle error
  }
};

const orderWithoutPayment = async () => {
  const element = document.getElementById('main-container');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Begin the process, open the modal
  isChargingModalOpen.value = true;
  progressBar.value = 0; //Przygotowywanie danych do zamówienia

  const orderRequestData = computed(() => {
    return {
      items: orderData.value.items.map((item) => ({
        id: item.id,
        cartItemId: item.cartItemId,
        productName: item.productName,
        /* TODO: add product desc later */
        price: item.price,
        basePrice: item.basePrice || 0,
        values: item.values,
      })),
      customerInfo: {
        name: orderData.value.customerInfo.name,
        surname: orderData.value.customerInfo.surname,
        email: orderData.value.customerInfo.email,
        phone: orderData.value.customerInfo.phone,
        company: orderData.value.customerInfo?.company,
      },
      total: 0,
    };
  });

  const orderResponse = await postOrder(orderRequestData.value);
};

const postOrder = async (req: OrderRequest) => {
  const { $recaptcha } = useNuxtApp();
  const recaptchaToken = await $recaptcha("submit_order");

  const formData = new FormData();
  formData.append("orderData", JSON.stringify(req));
  formData.append("recaptchaToken", recaptchaToken);
  cartItems.value.forEach((item) => {
    if (item.file) {
      formData.append(`file_${item.cartItemId}`, item.file);
    }
  });

  const orderResponse = await fetch("/api/orders/create-order", {
    method: "POST",
    body: formData,
  });

  progressBar.value = 4 //Składanie zamówienia
  if (!orderResponse.ok) {
    throw new Error(`Order creation failed: ${await orderResponse.text()}`);
  }

  const orderResult = await orderResponse.json();
  const orderResultFormatted = computed(() => ({
    orderStatus: orderResult?.status,
    customerName: `${orderResult?.metadata?.customerInfo?.name} ${orderResult?.metadata?.customerInfo?.surname}`,
    customerEmail: orderResult?.metadata?.customerInfo?.email,
    customerPhone: orderResult?.metadata?.customerInfo?.phone,
    submittedAt: orderResult?.metadata?.submittedAt,
    company: orderResult?.metadata?.customerInfo?.company,
    items: orderResult?.metadata?.items,
    orderId: orderResult?.metadata?.id,
  }));
  progressBar.value = 5 //Finalizowanie

  isChargingModalOpen.value = false;

  /* Save to order store */
  orderResponseStore.setOrderResponseData(orderResultFormatted.value);

  console.log('total', total)

  if (!total.value) {
    currentStep.value = 'paid';
    navigateTo('/order-complete');
  }


};

onBeforeRouteLeave((to, from) => {
  console.log("TO LOG:", to)

  if (currentStep.value === 'payment') {
    // 1. Check if the "automatic" logic is sending us to success
    // If yes, allow navigation immediately
    if (to.fullPath === '/order-complete') {
      return true;
    }

    // 2. Otherwise, since it is a user action, ask for confirmation
    const answer = window.confirm(
      'Czy na pewno chcesz przerwać składanie zamówienia?'
    );

    // Return false to cancel the navigation if they say "Cancel"
    if (!answer) return false;
  }
});

// ============================================
// UTILITY METHODS
// ============================================

/**
 * Formats a number as Polish currency (PLN)
 */
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
};

const goToCheckout = () => {
  currentStep.value = "checkout";
  currentStepperStep.value = 1;
};
</script>
