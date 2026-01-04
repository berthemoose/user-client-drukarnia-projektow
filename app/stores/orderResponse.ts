import { defineStore } from 'pinia'
export interface PaymentResponseData {
    paymentStatus: string;
    paymentId: string;
    created: string;
    amount: number;
    currency: string;
    paymentMethod: string;
}

export interface OrderResponseData {
    orderStatus: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    submittedAt: string;
    company: string;
    items: Array<{
        [key: string]: string;
    }>;
    orderId: string;
}

export interface FullOrderResponse {
    paymentResponseData: PaymentResponseData;
    orderResponseData: OrderResponseData;
}

export const useOrderResponseStore = defineStore('order-response', {
    state: () => ({
        orderResponseData: null as OrderResponseData | null,
        paymentResponseData: null as PaymentResponseData | null,
    }),
    getters: {
        getOrderResponseData: (state) => ({
            order: state.orderResponseData,
            payment: state.paymentResponseData
        })
    },
    actions: {
        setOrderResponseData(data: OrderResponseData) {
            this.orderResponseData = data;
        },
        setPaymentResponseData(data: PaymentResponseData) {
            this.paymentResponseData = data;
        },
        /* Call on unmounted in order-finished component */
        resetCompletionData() {
            this.orderResponseData = null;
            this.paymentResponseData = null;
        }
    }
})