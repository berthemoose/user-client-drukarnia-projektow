import type { Image } from "../../types/image";
import type { PayloadBase } from "../../types/payload";

export interface Footer extends PayloadBase {
  logo: Image;
  footerHero: {
    [key: string]: unknown;
  };
  openingHours: {
    [key: string]: unknown;
  };
  footerHeroHTML: string;
  openingHoursHTML: string;
  footerLinks: [];
  numbers: Array<{
    number: string;
    id: string;
  }>;
  phoneNums: Array<{
    phoneNum: string;
    id: string;
  }>;
  contactUsAddress: string;
  legalNote: string;
}

export const useFooter = () => {
  const { cmsUrl } = useApi();

  const { data, pending, error, refresh } = useFetch<Footer>(
    `${cmsUrl}/globals/footer`,
    {
      key: "footer-data",
      lazy: true,
      server: true,
    }
  );
  return {
    data,
    pending,
    error,
    refresh,
  };
};
