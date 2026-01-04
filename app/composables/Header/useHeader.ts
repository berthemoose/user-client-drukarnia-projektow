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

// Cache for header data (shared across all component instances)
let cachedHeaderData: Ref<Header | null> | null = null;
let cachedHeaderError: Ref<Error | null> | null = null;
let fetchPromise: Promise<void> | null = null;

export const useHeader = async (): Promise<{
  data: Ref<Header | null>;
  error: Ref<Error | null>;
}> => {
  // If we already have cached data, return it immediately
  if (cachedHeaderData !== null && cachedHeaderError !== null) {
    return { data: cachedHeaderData, error: cachedHeaderError };
  }

  // If a fetch is already in progress, wait for it
  if (fetchPromise !== null) {
    await fetchPromise;
    return { data: cachedHeaderData!, error: cachedHeaderError! };
  }

  // Initialize cache refs
  cachedHeaderData = ref<Header | null>(null);
  cachedHeaderError = ref<Error | null>(null);

  const { cmsUrl } = useApi();

  // Create the fetch promise
  fetchPromise = (async () => {
    try {
      const response = await $fetch<Header>(`${cmsUrl}/globals/header`);
      cachedHeaderData!.value = response;
    } catch (err) {
      cachedHeaderError!.value = err as Error;
    } finally {
      fetchPromise = null;
    }
  })();

  await fetchPromise;
  return { data: cachedHeaderData, error: cachedHeaderError };
};
