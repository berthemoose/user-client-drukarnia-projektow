import type { PayloadBase } from "~/app/types/payload";
import type { Image } from "~/app/types/image";
import type { Links } from "~/app/types/links";
export interface Header extends PayloadBase {
  logo: Array<{
    mainLogoFile: Image;
    mobileLogoFile: Image;
    id: string;
  }>;
  infoBar: Array<{
    infoBarText: string;
    infoBarImage: Image;
    id: string;
  }>;
  headerLinks: Links;
  headerLinksRightSide: Links;
  contactUsAddress: string;
  phoneNums: Array<{
    phoneNum: string;
    id: string;
  }>;
}

export const useHeader = () => {
  const { cmsUrl } = useApi();

  return useAsyncData<Header>(
    'header-global-data',
    () => $fetch<Header>(`${cmsUrl}/globals/header`)
  );
};

