export const useCms = () => {
  const config = useRuntimeConfig();
  
  // Server-side uses config.cmsUrl (not config.public.cmsUrl)
  const cmsUrl = config.cmsUrl || config.public.cmsUrl;
  
  if (!cmsUrl) {
    throw new Error('CMS_URL is not configured in environment variables');
  }
  
  return {
    cmsUrl: `${cmsUrl}/api`,
    cmsBaseUrl: cmsUrl
  };
};
