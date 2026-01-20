<template>
  <div v-if="orderResponse">
    <UContainer class="flex flex-row items-center justify-center min-h-screen py-8">
      <ProductPageOrderComplete :payment-status="dataFormatted.status()" :order-id="dataFormatted.orderId"
        :payment-id="dataFormatted.paymentId" :submitted-at="dataFormatted.orderSubmittedAt"
        :payment-created-at="dataFormatted.paymentCreatedAt" :amount="dataFormatted.paymentAmount"
        :currency="dataFormatted.currency" :customer-name="dataFormatted.customerName"
        :customer-email="dataFormatted.customerEmail" :customer-phone="dataFormatted.customerPhone"
        :company="dataFormatted.company" :items="dataFormatted.items" :payment-method="dataFormatted.paymentMethod" />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { useOrderResponseStore } from "../../stores/orderResponse";
import { useCartStore } from "../../stores/cart"
const orderResponseStore = useOrderResponseStore();
const orderResponse = orderResponseStore.getOrderResponseData;
const cartStore = useCartStore();

const dataFormatted = computed(() => ({
  status: () => orderResponse.payment?.paymentStatus === 'succeeded',
  orderId: orderResponse.order?.orderId,
  paymentId: orderResponse.payment?.paymentId,
  orderSubmittedAt: orderResponse.order?.submittedAt,
  paymentCreatedAt: orderResponse.payment?.created,
  currency: orderResponse.payment?.currency,
  customerName: orderResponse.order?.customerName,
  customerEmail: orderResponse.order?.customerEmail,
  customerPhone: orderResponse.order?.customerPhone,
  company: orderResponse.order?.company,
  items: orderResponse.order?.items,
  paymentMethod: orderResponse.payment?.paymentMethod,
  paymentAmount: orderResponse.payment?.amount,
}));


/* Todo replace this for pinia, add it  */
onMounted(() => {
  /* Clearing cart on mounted  */
  cartStore.clearCart();
});

useHead({
  title: "Zamówienie zakończone | K2 Drukarnia Projektów",
});
</script>
