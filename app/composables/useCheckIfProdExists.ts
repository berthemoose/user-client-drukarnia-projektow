import {
  useProductList,
  useNoStoreProductList,
} from "./ProductList/useProductList";

export const useCheckIfProdExists = (
  prodId: string,
  prodType?: "form" | "store"
) => {
  if (prodType === "form") {
    const { data, pending } = useNoStoreProductList();
    const prodExists = computed(() =>
      data.value?.docs.some((doc: any) => doc.id === prodId) ?? false
    );
    return { prodExists, pending };
  } else if (prodType === "store") {
    const { data, pending } = useProductList();
    const prodExists = computed(() =>
      data.value?.docs.some((doc: any) => doc.id === prodId) ?? false
    );
    return { prodExists, pending };
  } else {
    throw new Error("Invalid prodType: must be 'form' or 'store'");
  }
};
