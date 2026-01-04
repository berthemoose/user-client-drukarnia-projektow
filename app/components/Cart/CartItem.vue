<template>
  <div>


    <UCard>
      <div class="space-y-4">
        <!-- File Upload Section -->
        <div class="border-b pb-4">
          <ProductPageFormFileInput :file="item.file || null"
            @update:file="(file) => updateItemFile(item.cartItemId, file)" :are-inputs-disabled="false" />
        </div>

        <!-- Product Information & Controls -->
        <div class="flex gap-4">
          <div class="flex-1 min-w-0">
            <!-- Product Name & Remove Button -->
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.productName }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ item.values.copies }}
                  {{ item.values.copies === 1 ? "kopia" : "kopii" }} ×
                  {{ item.values.pages }}
                  {{ item.values.pages === 1 ? "strona" : "stron" }}
                </p>
              </div>

              <UModal :open="isRemoveModalOpen" :close="false" title="Usuwanie produktu z koszyka">
                <template #body>
                  <p>Czy na pewno chcesz usunąć produkt: {{ item.productName }} z koszyka?</p>
                </template>
                <template #footer>
                  <div class="w-full flex flex-col justify-center items-end">
                    <div class="pr-4 flex gap-4">
                      <UButton label="Nie" variant="subtle" size="xl" color="error" class="hover:cursor-pointer"
                        @click="closeRemovalModal()" />
                      <UButton label="Tak" variant="subtle" size="xl" color="success" class="hover:cursor-pointer"
                        @click="confirmRemoval(item.cartItemId)" />
                    </div>
                  </div>
                </template>
              </UModal>
              <!-- Remove Item Button -->
              <UButton icon="i-lucide-x" class="hover:cursor-pointer" color="neutral" variant="ghost" size="sm"
                @click="openRemovalModal()" />
            </div>

            <!-- Quantity Controls & Price Display -->
            <div class="flex items-center justify-between mt-4">
              <!-- Quantity Adjuster -->
              <div class="flex items-center gap-2">
                <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="sm"
                  :disabled="Number(item.values.copies) <= 1" @click="
                    updateCopies(
                      item.cartItemId,
                      Number(item.values.copies) - 1
                    )
                    " />
                <span class="w-12 text-center font-medium">
                  {{ item.values.copies }}
                </span>
                <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="sm" @click="
                  updateCopies(
                    item.cartItemId,
                    Number(item.values.copies) + 1
                  )
                  " />
              </div>

              <!-- Price Information -->
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900">
                  {{ item.price ? formatPrice(item.price) : "Cena na e-mail" }}
                </p>
                <p v-if="Number(item.values.copies) > 1" class="text-xs text-gray-500">
                  {{
                    item.basePrice
                      ? formatPrice(item.basePrice) + " / szt."
                      : "Skontaktujemy się z Tobą"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { type CartItem, useCartStore } from "../../stores/cart";
interface CartItemProps {
  item: CartItem;
}
const props = defineProps<CartItemProps>();
const cartStore = useCartStore();

const isRemoveModalOpen = ref<boolean>(false);

const openRemovalModal = () => {
  isRemoveModalOpen.value = true;
}

const closeRemovalModal = () => {
  isRemoveModalOpen.value = false;
}
const confirmRemoval = (id: string) => {
  removeItem(id);
  closeRemovalModal();
}

const updateItemFile = (cartItemId: string, file: File | null) => {
  cartStore.updateFile(cartItemId, file);
};

const removeItem = (cartItemId: string) => {
  cartStore.removeItem(cartItemId);
};

const updateCopies = (cartItemId: string, newCopies: number) => {
  cartStore.updateCopies(cartItemId, newCopies);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
};
</script>

<style></style>
