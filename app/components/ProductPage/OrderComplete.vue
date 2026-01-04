<template>
  
  <UCard v-if="paymentStatus" class="w-full max-w-4xl">
    <div class="p-6 md:p-12">
      <!-- Success Header -->
      <div class="flex flex-col items-center text-center gap-4 mb-8">
        <div class="bg-green-100 rounded-full p-4">
          <UIcon name="i-heroicons-check-circle" class="text-green-600 text-6xl" />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          Płatność potwierdzona!
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl">
          Dziękujemy za zamówienie. Płatność została zrealizowana pomyślnie, a zamówienie zostało przyjęte do
          realizacji.
        </p>
      </div>

      <!-- Payment Confirmation -->
      <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-check-badge" class="text-green-600 text-2xl flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-green-900 mb-1">Płatność zakończona sukcesem</h3>
            <p class="text-sm text-green-800">
              Kwota {{ formatAmount(amount, currency) }} została pomyślnie przetworzona.
              Potwierdzenie zostało wysłane na adres <strong>{{ customerEmail }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Order Details -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <UIcon name="i-heroicons-document-text" class="text-gray-600" />
            Szczegóły zamówienia
          </h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Numer zamówienia</p>
              <p class="font-mono font-semibold text-gray-900">{{ orderId }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Data złożenia</p>
              <p class="font-medium text-gray-900">{{ formatDate(submittedAt) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Produkt</p>
              <p class="font-medium text-gray-900">{{ productName }}</p>
            </div>
            <div v-if="copies > 0">
              <p class="text-sm text-gray-500">Liczba egzemplarzy</p>
              <p class="font-medium text-gray-900">{{ copies }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <UIcon name="i-heroicons-credit-card" class="text-gray-600" />
            Szczegóły płatności
          </h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Kwota</p>
              <p class="font-semibold text-2xl text-gray-900">{{ formatAmount(amount, currency) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Metoda płatności</p>
              
              <p class="font-medium text-gray-900 capitalize">{{ formatPaymentMethod(paymentMethod) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status płatności</p>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Opłacone
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Details -->
      <div class="mt-6 bg-gray-50 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-user" class="text-gray-600" />
          Dane klienta
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Imię i nazwisko</p>
            <p class="font-medium text-gray-900">{{ customerName }}</p>
          </div>
          <div v-if="company">
            <p class="text-sm text-gray-500">Firma</p>
            <p class="font-medium text-gray-900">{{ company }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="font-medium text-gray-900">{{ customerEmail }}</p>
          </div>
          <div v-if="customerPhone">
            <p class="text-sm text-gray-500">Telefon</p>
            <p class="font-medium text-gray-900">{{ customerPhone }}</p>
          </div>
        </div>
      </div>

      <!-- Specifications -->
      <div v-if="items && items.length > 0" class="mt-6 bg-gray-50 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-cog-6-tooth" class="text-gray-600" />
          Specyfikacja zamówienia
        </h2>
        <div class="grid md:grid-cols-2 gap-3">
          <div v-for="(spec, index) in items" :key="index" class="flex flex-col">
            <div v-for="(value, key) in spec" :key="key">
              <p class="text-sm text-gray-500 capitalize">{{ key }}</p>
              <p class="font-medium text-gray-900">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <UIcon name="i-heroicons-information-circle" class="text-blue-600" />
          Co dalej?
        </h3>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-envelope" class="flex-shrink-0 mt-0.5" />
            <span>Potwierdzenie zamówienia zostało wysłane na adres email</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-clock" class="flex-shrink-0 mt-0.5" />
            <span>Rozpoczynamy realizację Twojego zamówienia</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-phone" class="flex-shrink-0 mt-0.5" />
            <span>W razie pytań skontaktuj się z nami</span>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <UButton @click="navigateTo('/')" variant="solid" size="lg">
          Powrót do strony głównej
        </UButton>
        <UButton @click="handlePrint" variant="outline" size="lg">
          <UIcon name="i-heroicons-printer" class="mr-2" />
          Drukuj potwierdzenie
        </UButton>
      </div>
    </div>
  </UCard>

  <!-- Payment Failed or Order Failed -->
  <UCard v-else class="w-full max-w-4xl">
    <div class="p-6 md:p-12 flex flex-col items-center text-center gap-6">
      <div class="bg-red-100 rounded-full p-4">
        <UIcon name="i-heroicons-exclamation-circle" class="text-red-600 text-6xl" />
      </div>

      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {{ paymentStatus === 'succeeded' ? 'Błąd zamówienia' : 'Błąd płatności' }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl">
          {{ getErrorMessage() }}
        </p>
      </div>

      <div class="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4 text-left">
        <h3 class="font-semibold text-red-900 mb-2">Szczegóły błędu</h3>
        <div class="space-y-2 text-sm text-red-800">
          <p v-if="orderId"><strong>Numer zamówienia:</strong> {{ orderId }}</p>
          <p><strong>Status płatności:</strong> {{ formatPaymentStatus(paymentStatus) }}</p>
          <p v-if="!status"><strong>Status zamówienia:</strong> Odrzucone</p>
        </div>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl">
        <p class="text-sm text-yellow-800">
          <strong>Uwaga:</strong> Jeśli płatność została pobrana, ale zamówienie nie zostało złożone,
          środki zostaną automatycznie zwrócone w ciągu 5-10 dni roboczych.
          Skontaktuj się z nami, jeśli potrzebujesz pomocy.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <UButton @click="navigateTo('/')" variant="solid" size="lg">
          Powrót do strony głównej
        </UButton>
        <UButton @click="navigateTo('/kontakt')" variant="outline" size="lg">
          Skontaktuj się z nami
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface OrderCompleteProps {
  // status: boolean;
  paymentStatus: boolean;
  orderId?: string;
  paymentId?: string;
  submittedAt?: string;
  paymentCreatedAt?: string;
  amount?: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  company?: string;
  items?: Array<{ [key: string]: string }>;
  paymentMethod?: string;
}

const props = defineProps<OrderCompleteProps>();

const formatAmount = (amount: number, currency: string): string => {
  const value = amount / 100; // Convert from smallest unit (cents) to main unit
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(value);
};

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
};

const formatPaymentMethod = (method: string): string => {
  const methods: Record<string, string> = {
    card: 'Karta płatnicza',
    blik: 'BLIK',
    p24: 'Przelewy24',
    paypal: 'PayPal',
  };
  return methods[method] || method;
};

const formatPaymentStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    succeeded: 'Zakończona sukcesem',
    processing: 'W trakcie przetwarzania',
    requires_payment_method: 'Wymaga metody płatności',
    requires_confirmation: 'Wymaga potwierdzenia',
    requires_action: 'Wymaga akcji',
    canceled: 'Anulowana',
    unknown: 'Nieznany',
  };
  return statuses[status] || status;
};

const getErrorMessage = (): string => {
  if (props.paymentStatus !== 'succeeded') {
    return 'Płatność nie została zrealizowana. Nie martw się - żadne środki nie zostały pobrane z Twojego konta.';
  }
  return 'Płatność została zrealizowana, ale wystąpił błąd przy składaniu zamówienia. Skontaktuj się z nami, aby rozwiązać problem.';
};

const handlePrint = (): void => {
  if (typeof window !== 'undefined') {
    window.print();
  }
};
</script>
