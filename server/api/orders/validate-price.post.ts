import { useGetProduct } from "../../composables/useGetProduct";
import { calculatePrice } from "../../utils/priceCalculator";

interface OrderFromClient {
  productId: string;
  prodTypeId?: string;
  selectedModifiers: {
    [specName: string]: string;
  };
  pages: number;
  copies: number;
  clientCalculatedPrice: number;
}

const validateClientPrice = async (
  productId: string,
  selectedModifiers: { [key: string]: string },
  pages: number,
  copies: number,
  clientCalculatedPrice: number,
  prodTypeId?: string
) => {
  let basePrice: number;
  let productSpecs: any;

  if (!prodTypeId) {
    const result = await useGetProduct(productId);
    basePrice = result.basePrice;
    productSpecs = result.productSpecs;
  } else {
    const result = await useGetProduct(productId, prodTypeId);
    basePrice = result.basePrice;
    productSpecs = result.productSpecs;
  }

  // Calculate product price only (delivery validated separately)
  const serverPrice = calculatePrice(
    basePrice,
    productSpecs,
    selectedModifiers,
    pages,
    copies
  );

  const difference = Math.abs(serverPrice - clientCalculatedPrice);
  const isValid = difference <= 0.01;

  return {
    valid: isValid,
    serverPrice,
    clientPrice: clientCalculatedPrice,
    difference,
    breakdown: {
      basePrice,
      pages,
      copies,
      modifiersAppied: Object.keys(selectedModifiers).length,
    },
  };
};

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderFromClient>(event);

  const {
    productId,
    selectedModifiers,
    pages,
    clientCalculatedPrice,
    copies,
    prodTypeId,
  } = body;


  const result = await validateClientPrice(
    productId,
    selectedModifiers,
    pages,
    copies,
    clientCalculatedPrice,
    prodTypeId
  );

  return result;
});
