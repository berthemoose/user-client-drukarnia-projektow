import { defineStore } from "pinia";
import { markRaw } from "vue";
import type { FormValues } from "~/components/ProductPage/Form/index.vue";

export interface CartItem extends OrderInCart {
  id: string; // Product ID (immutable, used for price checking)
  cartItemId: string; // Unique cart item ID (for managing cart operations)
  productName: string;
  price?: number; // Total price (basePrice * copies)
  prodTypeId?: string | null;
  basePrice?: number; // Price per single copy (for recalculation)
}

export interface OrderInCart {
  values: FormValues;
  file?: File | null; // Optional - added in cart, not form
}

const CART_STORAGE_KEY = "drukarnia_cart";

// Helper to serialize cart items for storage
const serializeCartItems = (items: CartItem[]) => {
  return items.map((item) => ({
    ...item,
    file: null, // Files cannot be serialized to localStorage
    values: {
      ...item.values, // Convert readonly proxy to plain object
    },
  }));
};

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("Cart loaded from storage:", parsed);
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
  }
  return [];
};

// Helper to save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;

  try {
    const serialized = serializeCartItems(items);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
    console.log("Cart saved to storage:", serialized);
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};

export interface DeliveryOption {
  name: string;
  description: string;
  price: number;
  time?: string;
  id: string;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
    deliveryOption: null as DeliveryOption | null,
    paymentData: {
      clientSecret: null as string | null,
      paymentIntentId: null as string | null,
      amount: 0 as number,
    }
  }),

  getters: {
    // Total number of items in cart
    itemCount: (state) =>
      state.items.length,

    // Subtotal (item.price already includes copies)
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + (item.price || 0), 0),

    // Delivery price
    deliveryPrice(state) {
      if (this.subtotal > 0) {
        return state.deliveryOption?.price || 0;
      } else {
        return 0
      }
    },
    // Total (subtotal + delivery)
    total(): number {
      return this.subtotal + this.deliveryPrice;
    },

    // Check if cart is empty
    isEmpty: (state) => state.items.length === 0,

    // Get item by cart item ID
    getItemByCartItemId: (state) => (cartItemId: string) =>
      state.items.find((item) => item.cartItemId === cartItemId),

    // Get item by product ID
    getItemByProductId: (state) => (productId: string) =>
      state.items.find((item) => item.id === productId),
  },

  actions: {
    // Load cart from localStorage (call on client-side mount)
    loadFromStorage() {
      const loaded = loadCartFromStorage();
      this.items = loaded;
      console.log("Cart hydrated with items:", loaded.length);
    },

    // Add item to cart
    addItem(item: CartItem) {
      // Always add as new item (no merging)
      // Ensure File objects are wrapped with markRaw to prevent reactivity issues
      const safeItem = {
        ...item,
        file: item.file ? markRaw(item.file) : null
      };
      this.items.push(safeItem);
      saveCartToStorage(this.items);
    },

    // Remove item from cart
    removeItem(cartItemId: string) {
      const index = this.items.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (index !== -1) {
        this.items.splice(index, 1);
        saveCartToStorage(this.items);
      }
    },

    setPaymentData(secret: string, id: string, amount: number) {
      this.paymentData = { clientSecret: secret, paymentIntentId: id, amount }
    },
    clearPaymentData() {
      this.paymentData = { clientSecret: null, paymentIntentId: null, amount: 0 };
    },

    // Update item copies
    updateCopies(cartItemId: string, copies: number) {
      const itemIndex = this.items.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (itemIndex !== -1) {
        if (copies <= 0) {
          this.removeItem(cartItemId);
        } else {
          const currentItem = this.items[itemIndex]!; // Safe because itemIndex !== -1
          // Recalculate price based on new copies

          const newPrice = ref<number | null>(null);
          if (currentItem.basePrice) {
            newPrice.value = currentItem.basePrice * copies;
          } else {
            newPrice.value = 0;
          }
          // Replace the entire item with a new object (values is readonly from vee-validate)
          this.items.splice(itemIndex, 1, {
            ...currentItem,
            price: newPrice.value,
            file: currentItem.file ? markRaw(currentItem.file) : null,
            values: {
              ...currentItem.values,
              copies: copies,
            },
          } as CartItem);
          saveCartToStorage(this.items);
        }
      }
    },

    // Clear entire cart
    clearCart() {
      this.items = [];
      saveCartToStorage(this.items);
    },

    // Check if item exists in cart
    hasItem(cartItemId: string): boolean {
      return this.items.some((item) => item.cartItemId === cartItemId);
    },

    // Get item copies
    getItemCopies(cartItemId: string): number {
      const item = this.items.find((item) => item.cartItemId === cartItemId);
      return item ? parseInt(item.values.copies as any) || 1 : 0;
    },

    // Update file for a cart item
    updateFile(cartItemId: string, file: File | null) {
      const item = this.items.find((item) => item.cartItemId === cartItemId);
      if (item) {
        item.file = file ? markRaw(file) : null;
        // Don't save to storage - files can't be persisted to localStorage anyway
        // They're stripped out by serializeCartItems (see line 25)
      }
    },

    // Set delivery option
    setDeliveryOption(option: DeliveryOption | null) {
      this.deliveryOption = option;
      console.log("Delivery option set:", option);
    },

    // Clear delivery option
    clearDeliveryOption() {
      this.deliveryOption = null;
      console.log("Delivery option cleared");
    },
  },
});
