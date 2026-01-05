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

  return useFetch<Thesis>(
    `${cmsUrl}/globals/thesis`,
    {
      key: "thesis",
      server: true,
    }
  );
};

