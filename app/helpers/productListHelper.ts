import type { ProductListData } from "~/composables/ProductList/useProductList";

interface ProductListFormatted {
  id: string;
  img: string;
  name: string;
  description: string;
}

interface FormattedProductList {
  productListFormatted: Array<{
    id: string;
    img: string;
    name: string;
    description: string;
  }>;
}

export const formatProductList = (
  productListData: ProductListData
): FormattedProductList => {
  const data = productListData;
  const productListFormatted: Array<ProductListFormatted> = [];
  if (data) {
    const rawData = data.docs;
    rawData.forEach((e) => {
      const cardInfo = {
        id: e.id,
        img: e.productInfo.productImage.url,
        name: e.productInfo.productName,
        description: e.productInfo.productShortDescription,
      };
      productListFormatted.push(cardInfo);
    });
  }
  productListFormatted.reverse();

  return {
    productListFormatted,
  };
};
