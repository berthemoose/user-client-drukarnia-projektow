<template>
  <UTabs class="my-4" v-model="selectedTabIndex" :items="tabItems">
    <template #delivery>
      <div class="flex flex-col gap-2">
        <!-- Delivery Method Selection -->
        <div class="mb-4">
          <div class="mb-3">
            <p class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Metoda dostawy
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Wybierz sposób dostawy zamówienia
            </p>
          </div>



          <USelect v-model="selectedDeliveryMethodId" :items="deliveryMethodOptions"
            :placeholder="'Kliknij aby wybrać metodę dostawy'"
            :disabled="areInputsDisabledRef || deliveryMethodsPending" :loading="deliveryMethodsPending" size="xl"
            class="transform hover:scale-[1.01] transition-transform duration-200" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Ulica'" :field="props.street.value"
          :field-attrs="props.street.attrs" :are-inputs-disabled="areInputsDisabledRef" :input-type="'text'"
          :error="props.errors.street" />
        <p class="text-red-600 text-sm" v-if="props.errors.street">
          {{ props.errors.street }}
        </p>

        <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Nr bud./lok.'"
          :field="props.number.value" :field-attrs="props.number.attrs" :are-inputs-disabled="areInputsDisabledRef"
          :input-type="'text'" :error="props.errors.number" />
        <p class="text-red-600 text-sm" v-if="props.errors.number">
          {{ props.errors.number }}
        </p>

        <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Kod pocztowy'"
          :field="props.code.value" :field-attrs="props.code.attrs" :are-inputs-disabled="areInputsDisabledRef"
          :input-type="'text'" :mask="'##-###'" :error="props.errors.code" />

        <p class="text-red-600 text-sm" v-if="props.errors.code">
          {{ props.errors.code }}
        </p>

        <ProductPageFormTextInputsDynamicInput :label="''" :desc="''" :placeholder="'Miejscowość'"
          :field="props.city.value" :field-attrs="props.city.attrs" :are-inputs-disabled="areInputsDisabledRef"
          :input-type="'text'" :error="props.errors.city" />
        <p class="text-red-600 text-sm" v-if="props.errors.city">
          {{ props.errors.city }}
        </p>
      </div>
    </template>
    <template #pickup>
      <div v-if="isMap">
        <div class="max-w-5xl mx-auto">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <!-- Map overlay gradient for depth -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10">
            </div>

            <!-- Map iframe -->
            <div class="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
              <iframe class="w-full h-full" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Drukarnia Projektów&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="max-w-5xl mx-auto">
          <div class="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
            <div class=" flex items-center justify-center absolute inset-0 z-50">
              <UCard class="w-3/4">
                <template #header>
                  <div class="">
                    <h3 class="text-2xl font-bold">Wymagane ciasteczka 🍪</h3>
                  </div>
                </template>
                <div class="">
                  <p>Do poprawnego działania tego elemetu strona potrzebuje wykorzystać dodatkowe pliki cookie
                    pochodzące
                    od
                    zewnętrznego dostawcy.</p>
                  <p class="text-xs"> Jeżeli nie chcesz korzystać z plików cookie, przejdź dalej</p>
                </div>
                <template #footer>
                  <div class="flex flex-col sm:flex-row gap-3 justify-end">
                    <UButton size="xl" variant="solid" label="Zezwól" @click="handleAccept" block
                      class="sm:w-auto hover:cursor-pointer" />
                  </div>
                </template>
              </UCard>
            </div>
            <NuxtImg class="w-full blur-md" src="../public/map_static.png" />
          </div>
        </div>
        
      </div>
    </template>
  </UTabs>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useGetDeliveryMethods } from "../../../../../composables/useGetDeliveryMethods";
import { useCartStore } from "~/stores/cart";
import { useCookieStore } from "~/stores/cookieStore";


interface AddressProps {
  areInputsDisabled: boolean;
  street: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
  };
  number: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
  };
  code: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
  };
  city: {
    value: Ref<unknown>;
    attrs: Ref<unknown>;
  };
  errors: Record<string, string | undefined>;
}
const props = defineProps<AddressProps>();
const { areInputsDisabled: areInputsDisabledRef } = toRefs(props);

// Access cart store for delivery option
const cartStore = useCartStore();
const { cookieRep, acceptCookies, declineCookies } = useCookieStore();
const isMap = ref<boolean>(false)

const handleAccept = () => {
  acceptCookies();
  isMap.value = true;
}

const handleDecline = () => {
  declineCookies();
  isMap.value = false;
}

onMounted(() => {
  if (!cookieRep) {
    isMap.value = false
  } else if (cookieRep === 'accepted') {
    acceptCookies();
    handleAccept();
  }
})



// Inject isAddress ref from parent Form component
const isAddressEnabled = inject<Ref<boolean | null>>("isAddress");

if (!isAddressEnabled) {
  throw new Error("isAddress must be provided by parent component");
}

// Reactive tab items
const tabItems = ref([
  { label: "Dostawa", slot: "delivery", value: 0 },
  { label: "Odbiór osobisty", slot: "pickup", value: 1 },
]);

/* Delivery methods */
const {
  data: deliveryMethods,
  pending: deliveryMethodsPending,
  error: deliveryMethodsError,
  refresh: deliverMethodsRefresh,
} = useGetDeliveryMethods();

// Local ref for the selected ID (USelect works with primitives)
const selectedDeliveryMethodId = ref<string | undefined>(
  cartStore.deliveryOption?.id
);

// Transform delivery methods data into USelect items format
const deliveryMethodOptions = computed(() => {
  if (!deliveryMethods.value?.options) {
    return [];
  }

  return deliveryMethods.value.options.map((option) => ({
    label: `${option.description} - ${option.price.toFixed(2)} PLN`,
    value: option.id,
  }));
});

// Watch for ID changes and update cart store with full object
watch(selectedDeliveryMethodId, (newId) => {
  if (!newId || !deliveryMethods.value?.options) {
    cartStore.clearDeliveryOption();
    return;
  }

  const selectedMethod = deliveryMethods.value.options.find(
    (option) => option.id === newId
  );

  if (selectedMethod) {
    cartStore.setDeliveryOption(selectedMethod);
  }
});

// Watch store changes to sync back to local ID (for initialization)
watch(
  () => cartStore.deliveryOption,
  (newMethod) => {
    if (newMethod?.id !== selectedDeliveryMethodId.value) {
      selectedDeliveryMethodId.value = newMethod?.id;
    }
  },
  { immediate: true }
);

// Track selected tab index (0 = delivery, 1 = pickup)
// Initialize based on isAddress value
const selectedTabIndex = ref(isAddressEnabled.value ? 0 : 1);

// Watch for tab changes and update isAddress accordingly
watch(selectedTabIndex, (newIndex) => {
  // isAddress should be true for 'delivery' (index 0), false for 'pickup' (index 1)
  isAddressEnabled.value = newIndex === 0;
});
</script>

<style></style>
