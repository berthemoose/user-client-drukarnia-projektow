
interface UseApiReturn {
  cmsUrl: string;
  orderUrl: string;
}

export const useApi = (): UseApiReturn => {

  
  
  /* CMS URL */
  const cmsUrl = `https://app-cms-drukarnia-projektow-staging.azurewebsites.net`;

  /* Order service URL */
  const orderUrl = `https://app-order-drukarnia-projektow-staging.azurewebsites.net`;

  return {
    cmsUrl,
    orderUrl
  };
};
