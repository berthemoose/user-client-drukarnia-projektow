export const useCms = () => {
  
  // Server-side uses config.cmsUrl (not config.public.cmsUrl)
  const cmsUrl = `https://app-cms-drukarnia-projektow-staging.azurewebsites.net/api`;
  if (!cmsUrl) {
    throw new Error('CMS_URL is not configured in environment variables');
  }
  
  return {
    cmsUrl,
  };
};
