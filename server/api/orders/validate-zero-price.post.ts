import { useCms } from "../../composables/useCms";

interface OrderFromClient {
  productId: string;
  productName: string;
}

const { cmsUrl } = useCms();

const isFormProduct = async (productId: string, productName: string) => {
  const products = await $fetch<any>(`${cmsUrl}/no-store-products`);
  const belongs = products.docs.some(
    (product: any) => product.id === productId
  );
  const nameCheck = products.docs.some(
    (product: any) => product.productInfo.productName === productName
  );
  const result = belongs && nameCheck;
  return result;
};

const isStoreProduct = async (productId: string) => {
  const products = await $fetch<any>(`${cmsUrl}/products`);
  const result = products.docs.some((product: any) => product.id === productId);
  return result;
};

const validateClientPriceZero = async (
  productId: string,
  productName: string
) => {
  const isStore = await isStoreProduct(productId);
  const isForm = await isFormProduct(productId, productName);
  const isValid = !isStore && isForm;

  return {
    valid: isValid,
  };
};

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderFromClient>(event);
  const { productId, productName } = body;

  const result = await validateClientPriceZero(productId, productName);
  return result;
});
