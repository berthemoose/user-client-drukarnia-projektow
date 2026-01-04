import type { PayloadBase } from "../../types/payload";
import type { ProductSpec } from "../Product/useProduct";
export interface Thesis extends PayloadBase {
  productName: string;
  productShortDescription: string;
  productLongDescriptionHTML: string;
  productSpecs: Array<ProductSpec>;
}

export const useThesis = () => {
  const { cmsUrl } = useApi();

  const { data, pending, error, refresh } = useFetch<Thesis>(
    `${cmsUrl}/globals/thesis`,
    {
      key: "thesis",
      lazy: true,
      server: true,
      getCachedData() {
        return undefined; //bypass cache to always keep product data fresh
      },
    }
  );
  const productLongDescriptionHTML = computed<string | null>(
    () => data.value?.productLongDescriptionHTML || null
  );

  return {
    data,
    pending,
    error,
    refresh,
    productLongDescriptionHTML,
  };
};
