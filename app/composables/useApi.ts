
interface UseApiReturn {
  cmsUrl: string;
  orderUrl: string;
}

export const useApi = (): UseApiReturn => {
  
  /* CMS URL */
  const cmsUrl = `https://app-cms-drukarnia-projektow-staging.azurewebsites.net/api`;

  /* Order service URL */
  const orderUrl = `https://app-backend-services-drukarnia-projektow-staging.azurewebsites.net`;

  return {
    cmsUrl,
    orderUrl
  };
};
