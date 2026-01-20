<template>
  <div class="border-2 border-dashed border-gray-400 p-4 rounded">
    <p class="font-bold mb-2">FastAPI Server Validation Test</p>

    <div class="text-sm mb-4">
      <p>Product ID: {{ props.productId || "Not set" }}</p>
      <p>Client Price: {{ props.clientCalculatedPrice.toFixed(2) }} PLN</p>
      <p>Pages: {{ props.pages }}</p>
      <p>Copies: {{ props.copies }}</p>
      <p>Modifiers: {{ Object.keys(props.selectedModifiers).length }}</p>
    </div>

    <UButton
      @click="testValidation"
      :loading="isLoading"
      variant="outline"
      size="sm"
    >
      Test FastAPI Server Validation
    </UButton>

    <div
      v-if="result"
      class="mt-4 p-3 rounded text-sm"
      :class="result.valid ? 'bg-green-100' : 'bg-red-100'"
    >
      <p class="font-bold">{{ result.valid ? "✅ Valid" : "❌ Invalid" }}</p>
      <p>Server Price: {{ result.serverPrice.toFixed(2) }} PLN</p>
      <p>Client Price: {{ result.clientPrice.toFixed(2) }} PLN</p>
      <p>Difference: {{ result.difference.toFixed(2) }} PLN</p>
    </div>

    <div v-if="error" class="mt-4 p-3 bg-red-100 rounded text-sm">
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface TestValidationProps {
  productId: string;
  selectedModifiers: { [key: string]: string };
  pages: number;
  copies: number;
  clientCalculatedPrice: number;
}

const props = defineProps<TestValidationProps>();

const isLoading = ref(false);
const result = ref<any>(null);
const error = ref<string | null>(null);

const testValidation = async () => {
  isLoading.value = true;
  result.value = null;
  error.value = null;

  const { orderUrl } = useApi();

  try {
    const response = await $fetch(`${orderUrl}/test-calculator`, {
      method: "POST",
      body: {
        product_id: props.productId,
        form_values: props.selectedModifiers,
        pages: props.pages,
        copies: props.copies,

        client_price: props.clientCalculatedPrice,
      },
    });

    result.value = response;
  } catch (e: any) {
    error.value = e.message || "Validation failed";
  } finally {
    isLoading.value = false;
  }
};
</script>
