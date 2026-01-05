export default defineEventHandler(() => {
    const config = useRuntimeConfig();

    // These values are read from Azure environment variables at runtime
    // and exposed to the client via this API endpoint
    return {
        cmsUrl: config.cmsUrl ? `${config.cmsUrl}/api` : '',
        orderUrl: config.orderUrl || '',
        siteKey: config.siteKey || ''
    };
});
