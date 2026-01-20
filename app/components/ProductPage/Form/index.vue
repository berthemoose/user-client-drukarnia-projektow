<template>
  <ProductPageFormStatusModal @trigger-close-modal="closeModal()" :is-modal-open="isModalOpen" :modal-msg="modalMessage"
    :modal-title="modalTitle" :modal-state="modalState" />

  <div class="grid grid-cols-1 md:grid-cols-8 gap-6">


    <div class="md:col-span-3 w-full">
      <ProductPageProductCardDescription :url="props.imageUrl" :alt="props.imageAlt" :name="props.productName"
        :desc="props.desc" :text-color="props.textColor" :color-scheme="props.colorScheme" />
    </div>

    <div class="md:col-span-3 w-full px-0 md:px-6" :style="textColorAll">
      <div class="w-full flex items-start justify-start mb-4">
        <h3 class="text-xl font-bold">Parametry zamówienia</h3>
      </div>

      <div class="gap-4 flex flex-col w-full">
        <ProductPageFormSpecsInputs :errors="errors" :specs="specs" :specFields="specFields"
          :are-inputs-disabled="areInputsDisabled" :text-color="props.textColor" />
      </div>

      <div class="flex flex-col w-full gap-2 mt-8">
        <ProductPageFormTextInputs :errors="errors" :are-inputs-disabled="areInputsDisabled" :fields="staticFields" :text-color="props.textColor" />
      </div>
    </div>

    <div class="md:col-span-2 w-full">
      <div class="w-full flex items-start justify-start mb-4">
        <h3 class="text-xl font-bold">Podsumowanie</h3>
      </div>
      <ProductPageFormPriceSection :is-enabled="basePrice ? true : false" :price="calculatedPrice"
        :is-loading="isButtonLoading" :is-active="isSubmitButtonActive" @trigger-submit="handleSubmit()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductSpec } from "~/composables/Product/useProduct";
import { computeTextColor } from "./helpers/computeTextColor";
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useForm } from "vee-validate";
import { getValidationSchema } from "./validationSchema";
import { getFormFields } from "./formFields";
import { handleModal } from "./modal";
import { submitButtonController } from "./SubmitButton/submitButtonController";
import { usePriceCalculator } from "~/composables/usePriceCalculator";
import { useCartStore, type CartItem } from "~/stores/cart";
import type { ColorSchemeVariant } from "../ProductCard/getColorScheme";

interface FormProps {
  productName: string;
  productId?: string;
  basePrice?: number | null;
  productSpecs: Array<ProductSpec>;
  textColor: "white" | "black" | null;
  isStudent?: boolean;
  prodTypeId?: string;
  imageUrl: string;
  imageAlt: string;
  desc: string;
  colorScheme: ColorSchemeVariant;
}

const props = defineProps<FormProps>();

export interface SpecField {
  field: any;
  fieldAttrs: any;
}

export interface FormValues {
  comments?: string;
  copies: number;
  pages: number;
  [key: string]: any;
}

const priceCalculator = usePriceCalculator();

// Track if user has started filling the form
const hasFormData = computed(() => {
  return Object.values(values).some(
    (value) => value !== "" && value !== undefined
  );
});

// Prevent accidental page refresh/navigation
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasFormData.value) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }
};

onMounted(() => {
  if (props.basePrice) {
    priceCalculator.initializeProduct(props.basePrice || 0, props.productSpecs);
  }
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const calculatedPrice = computed(() => {
  if (props.basePrice) {
    return priceCalculator.calculatePrice(
      values,
      parseInt(values.pages) || 1,
      parseInt(values.copies) || 1
    );
  }
  return 0;
});

const textColorAll = computeTextColor(props.textColor);
const isButtonLoading = ref(false);
const productName = computed(() => props.productName);
const specs = computed(() => props.productSpecs);

const validationSchema = getValidationSchema(specs);

const { values, errors, defineField } = useForm({
  validationSchema: validationSchema,
});

const { staticFields, specFields } = getFormFields(defineField, specs);

const {
  isModalOpen,
  areInputsDisabled,
  modalState,
  modalTitle,
  modalMessage,
  closeModal,
} = handleModal();

const handleSubmit = async () => {
  const cartStore = useCartStore();
  const currentCopies = parseInt(values.copies) || 1;

  if (props.basePrice) {
    const basePriceValue = calculatedPrice.value / currentCopies;
    const cartItem: CartItem = {
      id: `${props.productId}`,
      cartItemId: `${props.productId}-${Date.now()}`,
      productName: productName.value,
      price: calculatedPrice.value,
      basePrice: basePriceValue,
      values: values as FormValues,
      prodTypeId: props.prodTypeId ?? null,
    };
    cartStore.addItem(cartItem);
    navigateTo("/cart");
  } else {
    const cartItem: CartItem = {
      id: `${props.productId}`,
      cartItemId: `${props.productId}-${Date.now()}`,
      productName: productName.value,
      values: values as FormValues,
      price: 0,
    };
    cartStore.addItem(cartItem);
    navigateTo("/cart");
  }
};

const { isSubmitButtonActive } = submitButtonController(values, errors);

export type DefineFieldReturn = ReturnType<typeof defineField>;
export type DefineFieldFunction = typeof defineField;
export type Specs = typeof specs;
export type Values = typeof values;
export type Errors = typeof errors;
</script>