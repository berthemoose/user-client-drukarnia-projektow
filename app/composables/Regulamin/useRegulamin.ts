import type { PayloadBase } from "../../types/payload";

export interface Regulamin extends PayloadBase {
  content: {
    [key: string]: unknown;
  };
  contentHTML: string;
}

export const useRegulamin = () => {
  const { cmsUrl } = useApi();
  const { data, pending, error, refresh } = useFetch<Regulamin>(
    `${cmsUrl}/globals/regulamin`,
    {
      key: "regulamin-data",
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
