<template>
  <UModal title="Przetwarzanie płatności" :open="isChargingModalOpen">
    <template #body>
      <div class="py-4">
        <Loader :size="60" :show-text="false" />
        <p class="text-xs">Prosimy nie zamykać okna preglądarki</p>
      </div>
      <UProgress size="xl"
        :max="['Zbieranie danych', 'Łączenie z serwisem tranzakcyjnym...', 'Płatność zakończona sukcesem! Przekierowywanie...']"
        v-model="progressBar" />
    </template>
  </UModal>

  <div class="max-w-2xl mx-auto mt-10 p-8 md:p-12 bg-white rounded-xl shadow-lg">
    <h1 class="text-3xl font-bold mb-8">Płatność</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Payment Element Container (supports multiple payment methods) -->
      <div>
        <label class="block text-base font-medium text-gray-700 mb-3">
          Wybierz metodę płatności
        </label>
        <div ref="paymentElement" class="border border-gray-300 rounded-lg p-4"></div>
        <p v-if="paymentError" class="mt-2 text-sm text-red-600">
          {{ paymentError }}
        </p>
      </div>

      <!-- Amount Display -->
      <div class="bg-gray-50 p-6 rounded-lg" v-if="props.amount">
        <p class="text-base text-gray-600 mb-2">Kwota do zapłaty:</p>
        <p class="text-3xl font-bold">{{ props.amount?.toFixed(2) }} PLN</p>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="processing || !stripe"
        class="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
        {{ processing ? "Przetwarzanie..." : "Zapłać teraz" }}
      </button>

      <!-- Status Messages -->
      <div v-if="paymentStatus" class="mt-6 p-5 rounded-lg text-base" :class="{
        'bg-green-50 text-green-800': paymentStatus === 'success',
        'bg-red-50 text-red-800': paymentStatus === 'error',
      }">
        {{ statusMessage }}
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import type { OrderResponseData } from "~/pages/order-complete/index.vue";
import { useOrderResponseStore } from "~/stores/orderResponse";


interface StripeProps {
  paymentIntentId?: string;
  clientSecret?: string;
  amount?: number;
}

const props = defineProps<StripeProps>();
const config = useRuntimeConfig();
const orderResponseStore = useOrderResponseStore()
const isChargingModalOpen = ref<boolean>(false);
const progressBar = ref<number>(0);


// State
const stripe = ref<Stripe | null>(null);
const elements = ref<StripeElements | null>(null);
const paymentElement = ref<HTMLElement | null>(null);
const paymentError = ref<string>("");
const processing = ref(false);
const paymentStatus = ref<"success" | "error" | null>(null);
const statusMessage = ref("");

// Initialize Stripe on mount
onMounted(async () => {
  try {
    // Replace with your actual Stripe publishable key
    const stripePublishableKey =
      "pk_test_51SQftfFmtDJY5GFBqQ8og53JyCeGzcud4BvCY7q2oZ9IDQ9q5dxjf8G4xwgU5KUWwU9HEHUYEjuUG3T3YADaq78y00OmQZZHQi"; // TODO: Move to env

    stripe.value = await loadStripe(stripePublishableKey, {
      locale: "pl", // Polish locale
    });

    if (!stripe.value) {
      throw new Error("Nie udało się załadować Stripe");
    }

    // Step 2: Create Elements instance with client secret
    elements.value = stripe.value.elements({
      clientSecret: props.clientSecret,
      locale: "pl",
    });

    // Step 3: Create and mount Payment Element (supports multiple payment methods)
    const paymentElementInstance = elements.value.create("payment", {
      layout: "tabs",
      paymentMethodOrder: [
        "card",
        "p24",
        "blik",
        "link",
        "google_pay",
        "apple_pay",
      ],
    });

    if (paymentElement.value) {
      paymentElementInstance.mount(paymentElement.value);
    }
  } catch (error: any) {
    console.error("Błąd inicjalizacji Stripe:", error);
    paymentError.value = "Nie udało się zainicjować formularza płatności";
  }
});

// Handle form submission
const handleSubmit = async () => {
  if (!stripe.value || !elements.value) {
    return;
  }

  processing.value = true;
  paymentStatus.value = null;
  paymentError.value = "";

  try {
    // Confirm the payment with Stripe

    const { error, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`, // Redirect after payment
      },
      redirect: "if_required", // Only redirect if needed (e.g., 3D Secure)
    });
    if (error) {
      // Payment failed
      paymentError.value = error.message || "Płatność nie powiodła się";
      paymentStatus.value = "error";
      statusMessage.value = error.message || "Płatność nie powiodła się";
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment succeeded
      paymentStatus.value = "success";

      isChargingModalOpen.value = true
      progressBar.value = 0;

      const formatDate = (timestamp: number) => {
        return new Intl.DateTimeFormat('pl-PL', {
          dateStyle: 'medium', // np. 15 mar 2023
          timeStyle: 'short'   // np. 18:06
        }).format(new Date(timestamp * 1000));
      };

      progressBar.value = 1;

      const paymentResponseFormatted = computed(() => {
        // Helper to safely extract the ID string
        const rawMethod = paymentIntent.payment_method;
        let methodId = "";

        if (typeof rawMethod === 'string') {
          methodId = rawMethod;
        } else if (rawMethod && typeof rawMethod === 'object') {
          methodId = rawMethod.id; // Extract ID if it's an object
        }

        return {
          paymentStatus: paymentIntent.status,
          paymentId: paymentIntent.id,
          created: formatDate(paymentIntent.created),
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          // Now this is guaranteed to be a string
          paymentMethod: methodId
        };
      });
      orderResponseStore.setPaymentResponseData(paymentResponseFormatted.value);
      /* Build a payment status response */

      progressBar.value = 2;

      navigateTo("/order-complete");


    }
  } catch (error: any) {
    console.error("Błąd płatności:", error);
    paymentStatus.value = "error";
    statusMessage.value = error.message || "Wystąpił błąd";
  } finally {
    processing.value = false;
  }
};
</script>
