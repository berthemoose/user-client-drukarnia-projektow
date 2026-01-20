import type { PayloadBase } from "../../types/payload";
import type { Image } from "../../types/image";
import { useApi } from "../useApi";

/* Interface for all products fetched from Products collection */
export interface Product extends PayloadBase {
  productInfo: {
    productImage: Image;
    productName: string;
    productShortDescription: string;
    productLongDescriptionHTML: string;
    productBottomTexts: Array<{
      text: string;
      id: string;
    }>;
    basePrice: number;
  };
  productSpecs: Array<ProductSpec>;
  prodId?: string;
}
export interface ProductSpec {
  specName: string;
  specDisplayName: string;
  specDesc: string;
  specValues: Array<{
    name: string;
    desc: string;
    id: string;
    priceModifier?: number;
    priceMultiplier?: number;
    conditionalModifiers?: Array<ConditionalModifier>;
  }>;
  id: string;
}

export interface ConditionalModifier {
  dependsOn: string;
  whenValue: string;
  priceModifier?: number;
  priceMultiplier?: number;
}

export interface SpecValue {
  specName: string;
  desc: string;
  id: string;
  priceModifier?: number;
  priceMultiplier?: number;
  conditionalModifiers?: Array<ConditionalModifier>;
}

/* BEWARE: EXTREMELY HARCODED
needs refactoring 
*/
export const useProduct = (prodId: string, formType: "form" | "store") => {
  const { cmsUrl } = useApi();
  /* Condition for global products */
  if (prodId === "thesis") {
    const productUrl = `${cmsUrl}/globals/${prodId}`;
    const { data, pending, error, refresh } = useFetch<Product>(productUrl, {
      key: `product-${prodId}`,
      server: true,
    });
    return {
      data,
      pending,
      error,
      refresh,
    };
    /* Condition for all other products */
  } else {
    if (formType === "store") {
      const productUrl = `${cmsUrl}/products/${prodId}`;
      const { data, pending, error, refresh } = useFetch<Product>(productUrl, {
        key: `product-${prodId}`,
        server: true,
      });
      return {
        data,
        pending,
        error,
        refresh,
      };
    } else if (formType === "form") {
      const productUrl = `${cmsUrl}/no-store-products/${prodId}`;
      const { data, pending, error, refresh } = useFetch<Product>(productUrl, {
        key: `product-${prodId}`,
        server: true,
      });
      return {
        data,
        pending,
        error,
        refresh,
      };
    } else {
      throw new Error(`Invalid formType: ${formType}`);
    }
  }
};
